'use client';

import * as React from 'react';
import { ServicesDetailsAndStatus } from '@/devlink';
import { ServiceItem, DeviceItem, formatDate, formatTime } from '@/lib/service-types';
import { acceptDiagnosis } from '@/app/actions/service-actions';

interface ServiceStatusWrapperProps {
    items: {
        service: ServiceItem;
        device: DeviceItem | null;
    }[];
}

const STATUS_ORDER = [
    "Dispositivo recibido",
    "Dispositivo en revision", // Note: Ensure this matches Podio string exactly (accent check?) - User said "revision" (no accent) in prompt list.
    "Enviar diagnostico",
    "Refacciones en camino",
    "Inicia reparación", // Prompt said "Inicia reparación"
    "Enviar código de seguridad",
    "Dispositivo entregado" // Also handles "Dispositivo entregado sin reparar"
];

type VariantState = "Base" | "active" | "check" | "no_state" | "hidden";

export default function ServiceStatusWrapper({ items }: ServiceStatusWrapperProps) {
    if (!items || items.length === 0) {
        return <div className="p-4 text-center">No active service found.</div>;
    }

    return (
        <div className="flex flex-col gap-8">
            {items.map(({ service: s, device: d }) => {
                const handleAccept = async (e: any) => {
                    e.preventDefault();
                    if (confirm('¿Estás seguro que deseas aceptar la reparación?')) {
                        await acceptDiagnosis(s.podio_item_id);
                    }
                };

                // Helper to check status for timestamps
                const getDateIfStatus = (targetStatus: string) =>
                    s.status === targetStatus ? formatDate(s.last_updated_at) : "";

                const getTimeIfStatus = (targetStatus: string) =>
                    s.status === targetStatus ? formatTime(s.last_updated_at) : "";

                // Logic to determine variant for each step
                const getStepVariant = (stepIndex: number): VariantState => {
                    let currentStatus = s.status;
                    if (currentStatus === "Dispositivo entregado sin reparar") {
                        currentStatus = "Dispositivo entregado";
                    }

                    const currentIndex = STATUS_ORDER.indexOf(currentStatus);
                    const targetIndex = stepIndex - 1;

                    // Step 4 "Refacciones en camino" Special Logic
                    if (stepIndex === 4) {
                        return currentIndex === targetIndex ? "active" : "hidden";
                    }

                    if (currentIndex === -1) return "Base";

                    if (currentIndex === targetIndex) return "active";
                    if (currentIndex > targetIndex) return "check";
                    return "Base";
                };

                // Helper to parse dates (assuming ISO format from Supabase/Podio)
                const parseDate = (dateStr: string) => new Date(dateStr);

                // Alert Logic
                const getAlertConfig = (stepIndex: number): { show: boolean, message: string } => {
                    const variant = getStepVariant(stepIndex);
                    // Alerts only show on active steps (usually)
                    if (variant !== 'active') return { show: false, message: "" };

                    const creationDate = parseDate(s.date); // 'date' is creation date
                    const lastUpdated = parseDate(s.last_updated_at);
                    const now = new Date();

                    // Scenario 1: Service added after 16:00 (4 PM) - Warn about next day revision
                    // This likely applies to Step 1 (Received) or 2 (Revision)
                    if (stepIndex === 1 || stepIndex === 2) {
                        const hour = creationDate.getHours();
                        if (hour >= 16) {
                            return {
                                show: true,
                                message: "Tu dispositivo fue recibido después de las 4:00 PM. La revisión podría iniciar hasta el día siguiente hábil."
                            };
                        }
                    }

                    // Scenario 2: Step 6 (Ready/Collection) updated after 18:00 (6 PM) - Warn about closing
                    if (stepIndex === 6) { // "Lista para recolección" is Step 6
                        const hour = lastUpdated.getHours();
                        if (hour >= 18) {
                            return {
                                show: true,
                                message: "Tu dispositivo estuvo listo después de las 6:00 PM. Podríamos haber cerrado, por favor verifica antes de venir."
                            };
                        }
                    }

                    // Scenario 3: More than a month (General warning/reminder)
                    // Maybe for "Dispositivo entregado" or just lingering in "Ready"? User said "step 6 is current and more than a month"
                    if (stepIndex === 6) {
                        const diffTime = Math.abs(now.getTime() - lastUpdated.getTime());
                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                        if (diffDays > 30) {
                            return {
                                show: true,
                                message: "Tu dispositivo lleva más de 30 días listo. Podrían aplicar cargos de almacenamiento."
                            };
                        }
                    }

                    return { show: false, message: "" };
                };

                // Status Message Logic (Descriptions for active steps)
                const getStatusMessage = (stepIndex: number): string => {
                    const variant = getStepVariant(stepIndex);
                    if (variant !== 'active') return ""; // Only show message for active step? Or all? Usually active.

                    switch (stepIndex) {
                        case 1: return "Hemos recibido tu dispositivo y empezaremos la revisión tan pronto como sea posible.";
                        case 2: return "Nuestros técnicos están diagnosticando tu dispositivo para encontrar la falla.";
                        case 3: return "Tu diagnóstico está listo. Por favor revísalo y autoriza la reparación.";
                        case 4: return "Estamos esperando las refacciones necesarias para reparar tu equipo.";
                        case 5: return "La reparación está en curso. Te notificaremos cuando termine.";
                        case 6: return "¡Tu dispositivo está listo! Puedes pasar a recogerlo en nuestros horarios de atención.";
                        case 7: return "Gracias por confiar en nosotros. Tu dispositivo ha sido entregado.";
                        default: return "";
                    }
                };

                // Button Visibility Logic
                // Only visible if Step 3 is ACTIVE (Diagnosis ready)
                const showButtons = getStepVariant(3) === 'active';
                const showPopup = getStepVariant(3) === 'active'; // Assuming same logic for popup triggers

                const alert1 = getAlertConfig(1);
                const alert2 = getAlertConfig(2);
                const alert3 = getAlertConfig(3);
                const alert4 = getAlertConfig(4);
                const alert5 = getAlertConfig(5);
                const alert6 = getAlertConfig(6);
                const alert7 = getAlertConfig(7);

                return (
                    <ServicesDetailsAndStatus
                        key={s.podio_item_id}
                        // ... existing props ...
                        devicesDeviceBrandModel={d?.brandmodel || "Unknown Device"}
                        devicesSerial={d?.serial || "N/A"}

                        // Service Info
                        servicesRequestOrIssue={s.servicetype || "No info"}
                        servicesDataBackup={s.databackup || "No"}
                        servicesPowerAdapter={s.poweradapter || "No"}
                        servicesAccessories={s.accessories || "None"}
                        servicesObservations={s.observations || "None"}
                        servicesPrice={s.advancepayment || "Pending"}

                        servicePodioItemIdFormatted={s.podio_formatted_id}

                        // Dates & Times
                        servicesDate={formatDate(s.date)}


                        // Status Dates (Text Bindings via RuntimeProps)
                        statusRow1StatusDate={formatDate(s.date)}
                        statusRow2StatusDate={getDateIfStatus("Dispositivo en revision")}
                        statusRow3StatusDate={getDateIfStatus("Enviar diagnostico")}
                        statusRow4StatusDate={getDateIfStatus("Refacciones en camino")}
                        statusRow5StatusDate={getDateIfStatus("Inicia reparación")}
                        statusRow6StatusDate={getDateIfStatus("Enviar código de seguridad")}
                        statusRow7StatusDate={
                            (s.status === "Dispositivo entregado" || s.status === "Dispositivo entregado sin reparar")
                                ? formatDate(s.last_updated_at) : ""
                        }

                        // Status Hours (Text Bindings via RuntimeProps)
                        statusRow1StatusHour={formatTime(s.date)}
                        statusRow2StatusHour={getTimeIfStatus("Dispositivo en revision")}
                        statusRow3StatusHour={getTimeIfStatus("Enviar diagnostico")}
                        statusRow4StatusHour={getTimeIfStatus("Refacciones en camino")}
                        statusRow5StatusHour={getTimeIfStatus("Inicia reparación")}
                        statusRow6StatusHour={getTimeIfStatus("Enviar código de seguridad")}
                        statusRow7StatusHour={
                            (s.status === "Dispositivo entregado" || s.status === "Dispositivo entregado sin reparar")
                                ? formatTime(s.last_updated_at) : ""
                        }

                        // Alert Messages (Text Bindings via ReactNode)
                        statusRow1AlertMessageText={alert1.message}
                        statusRow2AlertMessageText={alert2.message}
                        statusRow3AlertMessageText={alert3.message}
                        statusRow4AlertMessageText={alert4.message}
                        statusRow5AlertMessageText={alert5.message}
                        statusRow6AlertMessageText={alert6.message}
                        statusRow7AlertMessageText={alert7.message}

                        // State Variants
                        statusRow1Step1State={getStepVariant(1)}
                        statusRow2Step2State={getStepVariant(2)}
                        statusRow3Step3State={getStepVariant(3)}
                        statusRow4Step4State={getStepVariant(4)}
                        statusRow5Step5State={getStepVariant(5)}
                        statusRow6Step6State={getStepVariant(6)}
                        statusRow7Step7State={getStepVariant(7)}

                        // Alert Visibility
                        statusRow1Alert={alert1.show}
                        statusRow2Alert={alert2.show}
                        statusRow3Alert={alert3.show}
                        statusRow4Alert={alert4.show}
                        statusRow5Alert={alert5.show}
                        statusRow6Alert={alert6.show}
                        statusRow7Alert={alert7.show}

                        // Status Messages (Descriptions)
                        statusRow1StatusStatusMessage={getStatusMessage(1)}
                        statusRow2StatusStatusMessage={getStatusMessage(2)}
                        statusRow3StatusStatusMessage={getStatusMessage(3)}
                        statusRow4StatusStatusMessage={getStatusMessage(4)}
                        statusRow5StatusStatusMessage={getStatusMessage(5)}
                        statusRow6StatusStatusMessage={getStatusMessage(6)}
                        statusRow7StatusStatusMessage={getStatusMessage(7)}

                        // Button/Popup Visibility (Step 3 mainly)
                        statusRow3StatusActionPopup={showPopup}
                        statusRow3StatusStatusButton1={showButtons}

                        // Cleanup/Default bindings for others if needed to prevent errors
                        statusRow1StatusActionPopup={false}
                        statusRow1StatusStatusButton1={false}
                        statusRow2StatusActionPopup={false}
                        statusRow2StatusStatusButton1={false}
                        statusRow4StatusActionPopup={false}
                        statusRow4StatusStatusButton1={false}
                        statusRow5StatusActionPopup={false}
                        statusRow5StatusStatusButton1={false}
                        statusRow6StatusActionPopup={false}
                        statusRow6StatusStatusButton1={false}
                        statusRow7StatusActionPopup={false}
                        statusRow7StatusStatusButton1={false}

                        // Actions
                        servicesDiagnosis={{ href: s.diagnosis || "#", target: "_blank" }}
                        servicesDiagnosisAcceptance={{ href: "#", onClick: handleAccept } as any}
                    />
                );
            })}


        </div>
    );
}
