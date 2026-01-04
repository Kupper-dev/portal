
"use client";

import React, { useState } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    createColumnHelper,
    SortingState,
} from '@tanstack/react-table';
import { TableHeaderRow, TableBodyRow, TablePagination } from '@/devlink';
import { ServiceItem, DeviceItem } from '@/lib/service-types';
import { getStepVariant, getStatusMessage, getAlertConfig } from '@/lib/status-logic';

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
                        <TableHeaderRow />

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

                            // Calculate Alerts using shared logic
                            const alert1 = getAlertConfig(s, 1);
                            const alert2 = getAlertConfig(s, 2);
                            const alert3 = getAlertConfig(s, 3);
                            const alert4 = getAlertConfig(s, 4);
                            const alert5 = getAlertConfig(s, 5);
                            const alert6 = getAlertConfig(s, 6);
                            const alert7 = getAlertConfig(s, 7);

                            return (
                                <TableBodyRow
                                    key={row.id}
                                    variant={rowVariant}

                                    // Basic Row Props
                                    servicesFormattedId={s.podio_formatted_id}
                                    deviceBrandAndModel={d ? d.brandmodel : "Dispositivo desconocido"}
                                    date={formatDate(s.date)}
                                    hour={formatTime(s.date)}
                                    aproxCompletationDate={formatDate(s.aproxcompletationdate)}

                                    // Details
                                    serialNumber={d?.serial || "-"}
                                    requestOrIssue={s.requestorissue || s.servicetype || "-"}
                                    issueReformulation={s.issuereformulation || "-"}
                                    dataBackup={s.databackup || "No"}
                                    powerAdapter={s.poweradapter || "No"}
                                    accesories={s.accessories || "Ninguno"}
                                    observations={s.observations || "Ninguna"}

                                    // Status Timeline Variants
                                    statusRow1Variant={getStepVariant(s.status, 1)}
                                    statusRow2Variant={getStepVariant(s.status, 2)}
                                    statusRow3Variant={getStepVariant(s.status, 3)}
                                    statusRow4Variant={getStepVariant(s.status, 4)}
                                    statusRow5Variant={getStepVariant(s.status, 5)}
                                    statusRow6Variant={getStepVariant(s.status, 6)}
                                    statusRow7Variant={getStepVariant(s.status, 7)}

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

                                    // Status Access Control
                                    statusRow1StatusActionPopup={false}
                                    statusRow3StatusActionPopup={false}

                                    // Status Messages
                                    statusRow1StatusStatusMessage={getStatusMessage(s.status, 1, s.price)}
                                    statusRow2StatusStatusMessage={getStatusMessage(s.status, 2, s.price)}
                                    statusRow3StatusStatusMessage={getStatusMessage(s.status, 3, s.price)}
                                    statusRow4StatusStatusMessage={getStatusMessage(s.status, 4, s.price)}
                                    statusRow5StatusStatusMessage={getStatusMessage(s.status, 5, s.price)}
                                    statusRow6StatusStatusMessage={getStatusMessage(s.status, 6, s.price)}
                                    statusRow7StatusStatusMessage={getStatusMessage(s.status, 7, s.price)}

                                    // Alerts (Full Sync with Dashboard Logic)
                                    statusRow1Alert={alert1.show}
                                    statusRow1AlertMessageText={alert1.message}

                                    statusRow2Alert={alert2.show}
                                    statusRow2AlertMessageText={alert2.message}

                                    statusRow3Alert={alert3.show}
                                    statusRow3AlertMessageText={alert3.message}

                                    statusRow4Alert={alert4.show}
                                    statusRow4AlertMessageText={alert4.message}

                                    statusRow5Alert={alert5.show}
                                    statusRow5AlertMessageText={alert5.message}

                                    statusRow6Alert={alert6.show}
                                    statusRow6AlertMessageText={alert6.message}

                                    statusRow7Alert={alert7.show}
                                    statusRow7AlertMessageText={alert7.message}
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
