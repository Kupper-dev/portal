
"use client";

import React, { useState } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    createColumnHelper,
    flexRender,
    SortingState,
} from '@tanstack/react-table';
import { TableHeaderRow, TableBodyRow, TablePagination, StatusBadge } from '@/devlink';
import { ServiceItem, DeviceItem } from '@/lib/service-types';

// Helper to format dates
const formatDate = (dateStr: string | null | undefined) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString('es-MX', {
        day: '2-digit',
        month: 'short',
        year: '2-digit'
    });
};

const formatTime = (dateStr: string | null | undefined) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleTimeString('es-MX', {
        hour: '2-digit',
        minute: '2-digit'
    });
};

interface CombinedServiceData {
    service: ServiceItem;
    device: DeviceItem | null;
}

interface ServicesTableWrapperProps {
    items: CombinedServiceData[];
}

export default function ServicesTableWrapper({ items }: ServicesTableWrapperProps) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 5,
    });

    // We only need columns for sorting/definition, but rendering is custom via DevLink
    const columnHelper = createColumnHelper<CombinedServiceData>();
    const columns = [
        columnHelper.accessor(row => row.service.podio_item_id, { id: 'ID', header: 'ID' }),
        columnHelper.accessor(row => row.service.date, { id: 'Fecha', header: 'Fecha' }),
        columnHelper.accessor(row => row.device?.brandmodel, { id: 'Dispositivo', header: 'Dispositivo' }),
        columnHelper.accessor(row => row.service.status, { id: 'Status', header: 'Status' }),
    ];

    const table = useReactTable({
        data: items,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting,
            pagination,
        },
        onSortingChange: setSorting,
        onPaginationChange: setPagination,
    });

    // Status Logic Constants (Moved inside/formatted for component usage)
    const STATUS_ORDER = [
        "Dispositivo recibido",
        "Dispositivo en revision",
        "Enviar diagnostico",
        "Refacciones en camino",
        "Inicia reparación", // Assuming "Inicia reparación" is the correct string from Podio/ServiceStatusWrapper
        "Enviar código de seguridad",
        "Dispositivo entregado"
    ];

    type VariantState = "Base" | "active" | "check" | "no_state" | "hidden";

    return (
        <div className="main-grid">
            <div className="module">
                {/* Header */}
                <div className="table-header">
                    <h4 className="no_space_bottom">Ultimas solicitudes</h4>
                </div>

                {/* Table Content Loop */}
                <div className="table-content">
                    <div className="table-list">
                        <TableHeaderRow /> {/* Use the DevLink Header Row */}

                        {table.getRowModel().rows.map(row => {
                            const s = row.original.service;
                            const d = row.original.device;

                            // 1. Determine Row Variant (General Status)
                            let rowVariant: "Base" | "status process" | "status finished" | "status negative" = "Base";
                            if (s.status?.toLowerCase().includes("reparado") || s.status?.toLowerCase().includes("entregado")) {
                                rowVariant = "status finished";
                            } else if (s.status?.toLowerCase().includes("diagnostico") || s.status?.toLowerCase().includes("revision")) {
                                rowVariant = "status process";
                            }

                            // 2. Determine Step Variants (Timeline)
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
                                return "Base"; // Default fallback
                            };

                            // 3. Status Messages (Descriptions)
                            const getStatusMessage = (stepIndex: number): string => {
                                const variant = getStepVariant(stepIndex);
                                if (variant !== 'active') return "";

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

                            // 4. Alert Logic (Scenario 2: Ready after 6 PM)
                            // Re-implementing simplified alert logic for the table view
                            // We can add more scenarios if needed, sticking to primary ones for now to avoid clutter
                            const getAlertMessage = (stepIndex: number) => {
                                if (getStepVariant(stepIndex) !== 'active') return "";

                                const lastUpdated = new Date(s.last_updated_at);
                                if (stepIndex === 6) { // Ready for collection
                                    const hour = lastUpdated.getHours();
                                    if (hour >= 18) {
                                        return "Tu dispositivo estuvo listo después de las 6:00 PM. Podríamos haber cerrado, verifica antes de venir.";
                                    }
                                }
                                return "";
                            };

                            const alertMessage6 = getAlertMessage(6);

                            return (
                                <TableBodyRow
                                    key={row.id}
                                    variant={rowVariant}

                                    // Basic Row Props
                                    servicesFormattedId={s.podio_formatted_id}
                                    deviceBrandAndModel={d ? d.brandmodel : "Dispositivo desconocido"}
                                    date={formatDate(s.date)}
                                    hour={formatTime(s.date)}
                                    aproxCompletationDate={formatDate(s.daterepairready)}

                                    // Details
                                    serialNumber={d?.serial || "-"}
                                    requestOrIssue={s.servicetype || "-"}
                                    dataBackup={s.databackup || "No"}
                                    powerAdapter={s.poweradapter || "No"}
                                    accesories={s.accessories || "Ninguno"}
                                    observations={s.observations || "Ninguna"}

                                    // Status Timeline Variants
                                    statusRow1Variant={getStepVariant(1)}
                                    statusRow2Variant={getStepVariant(2)}
                                    statusRow3Variant={getStepVariant(3)}
                                    statusRow4Variant={getStepVariant(4)}
                                    statusRow5Variant={getStepVariant(5)}
                                    statusRow6Variant={getStepVariant(6)}
                                    statusRow7Variant={getStepVariant(7)}

                                    // Status Dates
                                    statusRow1StatusDate={formatDate(s.datereceived || s.date)}
                                    statusRow2StatusDate={formatDate(s.datecheckupstart || "")}
                                    statusRow3StatusDate={formatDate(s.datediagnosed || "")}
                                    statusRow4StatusDate={formatDate(s.datepartsordered || "")}
                                    statusRow5StatusDate={formatDate(s.daterepairstart || "")}
                                    statusRow6StatusDate={formatDate(s.daterepairready || "")}
                                    statusRow7StatusDate={formatDate(s.datedevicedelivered || "")}

                                    // Status Hours
                                    statusRow1StatusHour={formatTime(s.datereceived || s.date)}
                                    statusRow2StatusHour={formatTime(s.datecheckupstart || "")}
                                    statusRow3StatusHour={formatTime(s.datediagnosed || "")}
                                    statusRow4StatusHour={formatTime(s.datepartsordered || "")}
                                    statusRow5StatusHour={formatTime(s.daterepairstart || "")}
                                    statusRow6StatusHour={formatTime(s.daterepairready || "")}
                                    statusRow7StatusHour={formatTime(s.datedevicedelivered || "")}

                                    // Status Access Control / Visibility (simplified)
                                    statusRow1StatusActionPopup={false}
                                    statusRow3StatusActionPopup={false} // Disable popup in table view for now? Or implement if needed.

                                    // Status Messages
                                    statusRow1StatusStatusMessage={getStatusMessage(1)}
                                    statusRow2StatusStatusMessage={getStatusMessage(2)}
                                    statusRow3StatusStatusMessage={getStatusMessage(3)}
                                    statusRow4StatusStatusMessage={getStatusMessage(4)}
                                    statusRow5StatusStatusMessage={getStatusMessage(5)}
                                    statusRow6StatusStatusMessage={getStatusMessage(6)}
                                    statusRow7StatusStatusMessage={getStatusMessage(7)}

                                    // Alerts
                                    statusRow6Alert={!!alertMessage6}
                                    statusRow6AlertMessageText={alertMessage6}
                                />
                            );
                        })}
                    </div>
                </div>

                {/* Pagination */}
                {table.getPageCount() > 1 && (
                    <TablePagination
                        anterior={{
                            href: "#",
                            onClick: (e: React.MouseEvent) => {
                                e.preventDefault();
                                if (table.getCanPreviousPage()) table.previousPage();
                            }
                        } as any}
                        siguiente={{
                            href: "#",
                            onClick: (e: React.MouseEvent) => {
                                e.preventDefault();
                                if (table.getCanNextPage()) table.nextPage();
                            }
                        } as any}
                        paginationCountFirst={{ href: "#", text: `${table.getState().pagination.pageIndex + 1}` } as any}
                        paginationPaginationCountSecondVisibility={false}
                        paginationPaginationCountThirdVisibility={false}
                        paginationPaginationCountLastVisibility={false}
                    />
                )}
            </div>
        </div>
    );
}
