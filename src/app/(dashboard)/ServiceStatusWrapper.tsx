'use client';

import * as React from 'react';
import { ServicesDetailsAndStatus } from '@/devlink';
import { ServiceItem, DeviceItem, formatDate, formatTime } from '@/lib/data-service';
import { acceptDiagnosis } from '@/app/actions/service-actions';

interface ServiceStatusWrapperProps {
    items: {
        service: ServiceItem;
        device: DeviceItem | null;
    }[];
}

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

                        // Actions
                        servicesDiagnosis={{ href: s.diagnosis || "#", target: "_blank" }}
                        servicesDiagnosisAcceptance={{ href: "#", onClick: handleAccept } as any}
                    />
                );
            })}
        </div>
    );
}
