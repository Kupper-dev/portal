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

    const columns = [
        columnHelper.accessor('brandmodel', { id: 'BrandModel', header: 'Dispositivo' }),
        columnHelper.accessor('departmentorcontact', { id: 'Assigned', header: 'Asignado' }),
        columnHelper.accessor('cpu', { id: 'CPU', header: 'Procesador' }),
        columnHelper.accessor('ram', { id: 'RAM', header: 'RAM' }),
        columnHelper.accessor('storage', { id: 'Storage', header: 'Almacenamiento' }),
        columnHelper.accessor('status', { id: 'Status', header: 'Status' }),
        // Using 'any' cast for potential future field
        columnHelper.accessor((row: any) => getDaysRemaining(row.nextmaintenance), { id: 'Maintenance', header: 'Mantenimiento' }),
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

                        {/* Manual Header Implementation */}
                        <div className="table main-header-wrapper">
                            <div className="table_row_1 header">
                                <TableHeaderCell
                                    as={(props: any) => <div {...props} onClick={() => toggleSort('BrandModel')} style={{ cursor: 'pointer' }} />}
                                    variant={getSortVariant('BrandModel', true)}
                                    cellTitle="Dispositivo"
                                />
                                <TableHeaderCell
                                    as={(props: any) => <div {...props} onClick={() => toggleSort('Assigned')} style={{ cursor: 'pointer' }} />}
                                    variant={getSortVariant('Assigned', true)}
                                    cellTitle="Asignado a"
                                />
                                <TableHeaderCell
                                    as={(props: any) => <div {...props} onClick={() => toggleSort('CPU')} style={{ cursor: 'pointer' }} />}
                                    variant={getSortVariant('CPU')}
                                    cellTitle="Procesador"
                                />
                                <TableHeaderCell
                                    as={(props: any) => <div {...props} onClick={() => toggleSort('RAM')} style={{ cursor: 'pointer' }} />}
                                    variant={getSortVariant('RAM')}
                                    cellTitle="RAM"
                                />
                                <TableHeaderCell
                                    as={(props: any) => <div {...props} onClick={() => toggleSort('Storage')} style={{ cursor: 'pointer' }} />}
                                    variant={getSortVariant('Storage')}
                                    cellTitle="Almacenamiento"
                                />
                                <TableHeaderCell
                                    as={(props: any) => <div {...props} onClick={() => toggleSort('Status')} style={{ cursor: 'pointer' }} />}
                                    variant={getSortVariant('Status')}
                                    cellTitle="Status"
                                />
                                <TableHeaderCell
                                    as={(props: any) => <div {...props} onClick={() => toggleSort('Maintenance')} style={{ cursor: 'pointer' }} />}
                                    variant={getSortVariant('Maintenance')}
                                    cellTitle="Mantenimiento"
                                />
                            </div>
                        </div>

                        {/* Rows */}
                        {table.getRowModel().rows.map(row => {
                            const item = row.original;

                            // Status Logic
                            const isActive = item.status === 'Funcional'; // Example logic
                            const statusVariant = isActive ? 'positive' : 'negative';

                            // Storage Display
                            const storageDisplay = `${item.storage || '-'} ${getMemoryType(item.storagetype)}`;

                            return (
                                <DevicesTable
                                    key={row.id}
                                    devicesDeviceBrandAndModel={item.brandmodel || 'N/A'}
                                    devicesDeviceAssignedTo={item.departmentorcontact || '-'}
                                    devicesDeviceFormattedId={item.podio_formatted_id || `#${item.podio_item_id}`}
                                    devicesDeviceCpu={item.cpu || '-'}
                                    devicesDeviceRam={item.ram || '-'}
                                    devicesDeviceStorage={storageDisplay}
                                    devicesDeviceStorageType={item.storagetype || ''}
                                    statusBadgeDeviceStatusText={item.status || 'N/A'}
                                    statusBadgeDeviceStatusBadgeVariant={statusVariant}
                                    // Assuming nextmaintenance exists on the item in DB even if not in type yet? 
                                    // I'll cast to any for now since we just added the field to Supabase but maybe types need refresh
                                    devicesDeviceRemainingDaysToNextMaintenance={`${getDaysRemaining((item as any).nextmaintenance)} días`}
                                    // Include ProgressBar
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
