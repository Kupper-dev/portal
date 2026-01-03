
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

    return (
        <div className="table-module">
            {/* Header */}
            <div className="table-header">
                <h4 className="no_space_bottom">Ultimas solicitudes</h4>
            </div>

            {/* 
                NOTE: We are NOT using the TableHeaderRow from DevLink yet 
                because standard HTML table structure vs Div structure needs alignment.
                If TableHeaderRow is just a visual bar, we can use it. 
                For now, preserving the visual style of the "Table" component from DevLink manually or 
                using the provided components if they fit the loop.
             */}

            {/* Table Content Loop */}
            <div className="table-content">
                <div className="table-list">
                    <TableHeaderRow /> {/* Use the DevLink Header Row */}

                    {table.getRowModel().rows.map(row => {
                        const s = row.original.service;
                        const d = row.original.device;

                        // Logic to determine Badges/Variants based on status
                        let rowVariant: "Base" | "status process" | "status finished" | "status negative" = "Base";
                        if (s.status?.toLowerCase().includes("reparado") || s.status?.toLowerCase().includes("entregado")) {
                            rowVariant = "status finished";
                        } else if (s.status?.toLowerCase().includes("diagnostico") || s.status?.toLowerCase().includes("revision")) {
                            rowVariant = "status process";
                        }

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

                                // Details (Mapped from newly synced DevLink props)
                                serialNumber={d?.serial || "-"}
                                requestOrIssue={s.servicetype || "-"}
                                dataBackup={s.databackup || "No"}
                                powerAdapter={s.poweradapter || "No"}
                                accesories={s.accessories || "Ninguno"}
                                observations={s.observations || "Ninguna"}

                                // Status Timeline (Defaulting to basic state for now, logic to be refined)
                                statusRow1Variant="check"
                                statusRow1StatusDate={formatDate(s.date)}
                                statusRow1StatusHour={formatTime(s.date)}

                                statusRow2Variant="no_state"
                                statusRow3Variant="no_state"
                                statusRow4Variant="no_state"
                                statusRow5Variant="no_state"
                                statusRow6Variant="no_state"
                                statusRow7Variant="no_state"
                            />
                        );
                    })}
                </div>
            </div>

            {/* Pagination */}
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
        </div>
    );
}
