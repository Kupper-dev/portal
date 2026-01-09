"use client";

import React, { useState } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    createColumnHelper,
    SortingState,
} from '@tanstack/react-table';
import { TablePagination, TableHeaderCell, ProgressBar } from '@/devlink/stubs';
import { TableDevices } from '@/devlink/TableDevices';
// const DevicesTableHeader = () => null; // Not used or stubbed
import { DeviceItem } from '@/lib/service-types';

interface DevicesTableWrapperProps {
    items?: DeviceItem[];
}

export default function DevicesTableWrapper({ items = [] }: DevicesTableWrapperProps) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 5,
    });

    const columnHelper = createColumnHelper<DeviceItem>();

    // Helper to calculate days remaining
    const getDaysRemaining = (dateStr?: string) => {
        if (!dateStr) return 'N/A';
        const target = new Date(dateStr);
        const now = new Date();
        const diff = target.getTime() - now.getTime();
        return Math.ceil(diff / (1000 * 60 * 60 * 24));
    };

    const columns = [
        columnHelper.accessor('type', { id: 'Type', header: 'Tipo' }),
        columnHelper.accessor('brandmodel', { id: 'BrandModel', header: 'Dispositivo' }),
        // Using 'any' cast for potential future field
        columnHelper.accessor((row: any) => getDaysRemaining(row.nextmaintenance), { id: 'Maintenance', header: 'Mantenimiento' }),
        columnHelper.accessor('status', { id: 'Status', header: 'Status' }),
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

    const getSortVariant = (columnId: string, isWide = false): "up" | "down" | "2up" | "2down" => {
        const sortState = table.getColumn(columnId)?.getIsSorted();
        if (isWide) {
            return sortState === 'asc' ? '2up' : '2down';
        }
        return sortState === 'asc' ? 'up' : 'down';
    };

    const toggleSort = (columnId: string) => {
        table.getColumn(columnId)?.toggleSorting(table.getColumn(columnId)?.getIsSorted() === 'asc');
    };

    return (
        <div className="main-grid">
            <div className="module">
                <div className="table-header">
                    <h4 className="no_space_bottom">Dispositivos</h4>
                </div>

                <div className="table-content">
                    <div className="table-list devices-list">

                        {/* Manual Header Implementation - 4 Columns */}
                        <div className="table main-header-wrapper">
                            <div className="table_row_2 header">
                                {/* Column 1: Tipo */}
                                <TableHeaderCell
                                    as={(props: any) => <div {...props} onClick={() => toggleSort('Type')} style={{ cursor: 'pointer' }} />}
                                    variant={getSortVariant('Type', true)}
                                    cellTitle="Tipo"
                                />

                                {/* Column 2: Marca y Modelo */}
                                <TableHeaderCell
                                    as={(props: any) => <div {...props} onClick={() => toggleSort('BrandModel')} style={{ cursor: 'pointer' }} />}
                                    variant={getSortVariant('BrandModel', true)}
                                    cellTitle="Marca y Modelo"
                                />

                                {/* Column 3: Proximo Mantenimiento */}
                                <TableHeaderCell
                                    as={(props: any) => <div {...props} onClick={() => toggleSort('Maintenance')} style={{ cursor: 'pointer' }} />}
                                    variant={getSortVariant('Maintenance')}
                                    cellTitle="Próximo Mantenimiento"
                                />

                                {/* Column 4: Status */}
                                <TableHeaderCell
                                    as={(props: any) => <div {...props} onClick={() => toggleSort('Status')} style={{ cursor: 'pointer' }} />}
                                    variant={getSortVariant('Status')}
                                    cellTitle="Status"
                                />
                            </div>
                        </div>
                        {/* Rows */}
                        {table.getRowModel().rows.map(row => {
                            const item = row.original;

                            // Maintenance Progress Logic
                            const getMaintenanceStatus = (nextDateStr?: string) => {
                                if (!nextDateStr) return { percent: 0, variant: 'no-maintenance' as const };

                                const nextDate = new Date(nextDateStr);
                                const today = new Date();

                                // Logic: Maintenance is every year. 
                                const oneYearMs = 365 * 24 * 60 * 60 * 1000;
                                const startDate = new Date(nextDate.getTime() - oneYearMs);

                                const totalDuration = nextDate.getTime() - startDate.getTime();
                                const elapsed = today.getTime() - startDate.getTime();

                                let percent = (elapsed / totalDuration) * 100;

                                // Clamp
                                if (percent < 0) percent = 0;
                                if (percent > 100) percent = 100;

                                let variant: "positive" | "Base" | "negative" | "no-maintenance" = "positive";

                                if (percent <= 92) {
                                    variant = "positive";
                                } else if (percent > 92 && percent <= 97) {
                                    variant = "Base";
                                } else {
                                    variant = "negative";
                                }

                                return { percent, variant };
                            };

                            const maintenanceStatus = getMaintenanceStatus(item.nextmaintenance);

                            // Icon Mapping Logic
                            const getDeviceIcon = (type: string = '') => {
                                const typeLower = type.toLowerCase();
                                const iconMap: Record<string, string> = {
                                    'laptop': 'https://cdn.prod.website-files.com/68d88947f902d5546e5fd07a/695bfd4e5b39ae5f0433564e_Laptop%20Icon.png',
                                    'aio': 'https://cdn.prod.website-files.com/68d88947f902d5546e5fd07a/695bfd4e650d70452456c089_AIO%20icon.png',
                                    'pc': 'https://cdn.prod.website-files.com/68d88947f902d5546e5fd07a/695bfd4f7c0ed258d3196a8f_PC%20Icon.png',
                                    'otro': 'https://cdn.prod.website-files.com/68d88947f902d5546e5fd07a/695bfd4f7efd6d0463ee5d37_Other%20icon.png'
                                };
                                return iconMap[typeLower] || iconMap['laptop']; // Default to laptop if unknown
                            };

                            // Status Badge Logic
                            const getStatusVariant = (status: string) => {
                                switch (status) {
                                    case 'Operacional': return 'positive';
                                    case 'En revisión': return 'Base';
                                    case 'No reparable': return 'negative';
                                    default: return 'Base';
                                }
                            };
                            const statusBadgeVariant = getStatusVariant(item.status || '');

                            return (
                                <TableDevices
                                    key={row.id}
                                    devicesBrandAndModel={item.brandmodel || 'N/A'}
                                    // Mapping fields as requested; irrelevant visual props for columns are passed but not highlighted in header
                                    devicesDepartmentOrContact={item.departmentorcontact || '-'}
                                    devicesItemIdFormatted={item.podio_formatted_id || `#${item.podio_item_id}`}
                                    devicesTypeIcon={getDeviceIcon(item.type)}
                                    devicesStatusText={item.status || 'N/A'}
                                    // statusBadgeDeviceStatusBadgeVariant={statusBadgeVariant} // Not in TableDevices props?

                                    remainingDaysToNextMaintenance={`${getDaysRemaining(item.nextmaintenance)} días`}
                                    // progressBarVariantProgressBar={maintenanceStatus.variant} // Not in TableDevices?
                                    devicesProgressBar={{
                                        style: { width: `${maintenanceStatus.percent}%` }
                                    }}
                                />
                            );
                        })}

                        {/* Empty State */}
                        {items.length === 0 && (
                            <div style={{ padding: '20px', textAlign: 'center', color: '#888' }}>
                                No hay dispositivos registrados.
                            </div>
                        )}
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
