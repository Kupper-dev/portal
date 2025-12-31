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

                    // Normalize for accent safety if needed, utilizing exact strings from prompt for now
                    const currentIndex = STATUS_ORDER.indexOf(currentStatus);
                    const targetIndex = stepIndex - 1;

                    // Step 4 "Refacciones en camino" Special Logic
                    // "Always hidden, removed hidden if status is updated to 4"
                    if (stepIndex === 4) {
                        return currentIndex === targetIndex ? "active" : "hidden";
                    }

                    if (currentIndex === -1) return "Base"; // Unknown status

                    if (currentIndex === targetIndex) return "active";
                    if (currentIndex > targetIndex) return "check";
                    return "Base"; // Future
                };

                return (
                    <ServicesDetailsAndStatus
                        key={s.podio_item_id}
                        // Device Info
                        devicesDeviceBrandModel={d?.brandmodel || "Unknown Device"}
                        devicesSerial={d?.serial || "N/A"}

                        // Service Info
                        servicesRequestOrIssue={s.servicetype || "No info"}
                        servicesDataBackup={s.databackup || "No"}
                        servicesPowerAdapter={s.poweradapter || "No"}
                        servicesAccessories={s.accessories || "None"}
                        servicesObservations={s.observations || "None"}
                        servicesPrice={s.advancepayment || "Pending"} // Assuming advancepayment/price

                        servicesServicePodioItemIdFormatted={{ children: s.podio_formatted_id }}

                        // Dates & Times
                        servicesDate={formatDate(s.date)} // Creation date

                        // Status Dates
                        servicesDateServicesStatusDispositivoRecibido={formatDate(s.date)}
                        servicesDateServicesStatusDispositivoEnRevision={getDateIfStatus("Dispositivo en revision")}
                        servicesDateServiceStatusEnviarDiagnostico={getDateIfStatus("Enviar diagnostico")}
                        servicesDateServicesStatusRefaccionesEnCamino={getDateIfStatus("Refacciones en camino")}
                        servicesDateServicesStatusIniciaReparacion={getDateIfStatus("Inicia reparación")}
                        servicesDateServicesStatusEnviarCodigoDeSeguridad={getDateIfStatus("Enviar código de seguridad")}
                        servicesDateServicesStatusDispositivoEntregado={
                            (s.status === "Dispositivo entregado" || s.status === "Dispositivo entregado sin reparar")
                                ? formatDate(s.last_updated_at) : ""
                        }

                        // Status Times
                        servicesHourServicesStatusDispositivoRecibido={formatTime(s.date)}
                        servicesHourServicesStatusDispositivoEnRevision={getTimeIfStatus("Dispositivo en revision")}
                        servicesHourServicesStatusEnviarDiagnostico={getTimeIfStatus("Enviar diagnostico")}
                        servicesHourServicesStatusRefaccionesEnCamino={getTimeIfStatus("Refacciones en camino")}
                        servicesHourServicesStatusIniciaReparacion={getTimeIfStatus("Inicia reparación")}
                        servicesHourServicesStatusEnviarCodigoDeSeguridad={getTimeIfStatus("Enviar código de seguridad")}
                        servicesHourServicesStatusDispositivoEntregado={
                            (s.status === "Dispositivo entregado" || s.status === "Dispositivo entregado sin reparar")
                                ? formatTime(s.last_updated_at) : ""
                        }

                        // State Variants
                        statusRow1Step1State={getStepVariant(1)}
                        statusRow2Step2State={getStepVariant(2)}
                        statusRow3Step3State={getStepVariant(3)}
                        statusRow4Step4State={getStepVariant(4)} // Refacciones
                        statusRow5Step5State={getStepVariant(5)}
                        statusRow6Step6State={getStepVariant(6)}
                        // statusRow7Step7State={getStepVariant(7)} // Prop missing in DevLink export

                        // Actions
                        servicesDiagnosis={{ href: s.diagnosis || "#", target: "_blank" }}
                        servicesDiagnosisAcceptance={{ href: "#", onClick: handleAccept } as any}
                    />
                );
            })}
        </div>
    );
}
