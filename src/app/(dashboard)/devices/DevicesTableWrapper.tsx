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
import { TablePagination, TableHeaderCell, DevicesTable, ProgressBar } from '@/devlink';
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

    // Helper to calculate days remaining like in the spec
    // Note: You'll need a real field for 'next_maintenance' if you want this to work.
    // For now, I'll assume we can use 'last_updated_at' or if you add 'nextmaintenance' to type
    const getDaysRemaining = (dateStr?: string) => {
        if (!dateStr) return 'N/A';
        const target = new Date(dateStr);
        const now = new Date();
        const diff = target.getTime() - now.getTime();
        return Math.ceil(diff / (1000 * 60 * 60 * 24));
    };

    // Updated columns to match request: Type (implied/icon), Brand/Model, Maintenance, Status
    const columns = [
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

    const getMemoryType = (type?: string) => type || 'N/A';

    return (
        <div className="main-grid">
            <div className="module">
                {/* Header */}
                <div className="table-header">
                    <h4 className="no_space_bottom">Dispositivos</h4>
                </div>

                <div className="table-content">
                    <div className="table-list devices-list">

                        {/* Manual Header Implementation - 4 Columns */}
                        <div className="table main-header-wrapper">
                            <div className="table_row_1 header">
                                {/* Column 1: Tipo - usually specific width or just visual */}
                                <div className="table_header_cell">
                                    <div className="text-block-header">Tipo</div>
                                </div>

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

                            // Status Logic
                            const isActive = item.status === 'Funcional';
                            const statusVariant = isActive ? 'positive' : 'negative';

                            // Mocking icon based on brand/model detection or generic fallback
                            const getDeviceIcon = (brandModel: string = '') => {
                                const lower = brandModel.toLowerCase();
                                if (lower.includes('mac') || lower.includes('laptop')) return "https://cdn.prod.website-files.com/plugins/Basic/assets/placeholder.60f9b1840c.svg";
                                return "https://cdn.prod.website-files.com/plugins/Basic/assets/placeholder.60f9b1840c.svg";
                            };

                            return (
                                <DevicesTable
                                    key={row.id}
                                    devicesDeviceBrandAndModel={item.brandmodel || 'N/A'}
                                    // Mapping fields as requested; irrelevant visual props for columns are passed but not highlighted in header
                                    devicesDeviceAssignedTo={item.departmentorcontact || '-'}
                                    devicesDeviceFormattedId={item.podio_formatted_id || `#${item.podio_item_id}`}
                                    devicesDeviceType={getDeviceIcon(item.brandmodel)}

                                    devicesDeviceCpu={item.cpu || '-'}
                                    devicesDeviceRam={item.ram || '-'}
                                    devicesDeviceStorage={item.storage || '-'}
                                    devicesDeviceStorageType={item.storagetype || ''}

                                    statusBadgeDeviceStatusText={item.status || 'N/A'}
                                    statusBadgeDeviceStatusBadgeVariant={statusVariant}

                                    devicesDeviceRemainingDaysToNextMaintenance={`${getDaysRemaining((item as any).nextmaintenance)} días`}
                                    devicesDeviceProgressBar={{
                                        render: () => <ProgressBar variant={statusVariant} />
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
