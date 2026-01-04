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
import { TableHeaderRow, TableWarranties, TablePagination, TableHeaderCell } from '@/devlink';
import { Block } from '@/devlink/_Builtin';

import { WarrantyItem } from '@/lib/service-types';

interface WarrantiesTableWrapperProps {
    items?: WarrantyItem[];
}

export default function WarrantiesTableWrapper({ items = [] }: WarrantiesTableWrapperProps) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 5,
    });

    const columnHelper = createColumnHelper<WarrantyItem>();

    // Helper to calculate Validity
    const getValidityString = (dateEnds: string | undefined) => {
        if (!dateEnds) return '0 días';
        const now = new Date();
        const end = new Date(dateEnds);
        const diffTime = end.getTime() - now.getTime();
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    const columns = [
        columnHelper.accessor('description', { id: 'Description', header: 'Descripción' }),
        columnHelper.accessor('observations', { id: 'Observaciones', header: 'Observaciones' }),
        columnHelper.accessor('quantity', { id: 'Quantity', header: 'Cantidad' }),
        columnHelper.accessor('warranty', { id: 'Warranty', header: 'Garantía' }),
        columnHelper.accessor((row) => {
            if (!row.dateends) return 'N/A';
            return new Date(row.dateends) > new Date() ? 'Activa' : 'Inactiva';
        }, { id: 'Status', header: 'Status' }),
        columnHelper.accessor((row) => getValidityString(row.dateends), { id: 'Vigencia', header: 'Vigencia' }),
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
                {/* Header */}
                <div className="table-header">
                    <h4 className="no_space_bottom">Garantías</h4>
                </div>

                {/* Table Content Loop */}
                <div className="table-content">
                    <div className="table-list warranties-list">

                        {/* Manual Header Implementation for Sorting */}
                        <div className="table">
                            <div className="table_row_1 header">
                                <TableHeaderCell
                                    as={(props: any) => (
                                        <Block
                                            {...props}
                                            onClick={() => toggleSort('Description')}
                                            style={{ cursor: 'pointer' }}
                                        />
                                    )}
                                    variant={getSortVariant('Description', true)}
                                    cellTitle="Descripción"
                                />
                                <TableHeaderCell
                                    as={(props: any) => (
                                        <Block
                                            {...props}
                                            onClick={() => toggleSort('Observaciones')}
                                            style={{ cursor: 'pointer' }}
                                        />
                                    )}
                                    variant={getSortVariant('Observaciones', true)}
                                    cellTitle="Observaciones"
                                />
                                <TableHeaderCell
                                    as={(props: any) => (
                                        <Block
                                            {...props}
                                            onClick={() => toggleSort('Quantity')}
                                            style={{ cursor: 'pointer' }}
                                        />
                                    )}
                                    variant={getSortVariant('Quantity')}
                                    cellTitle="Cant"
                                />
                                <TableHeaderCell
                                    as={(props: any) => (
                                        <Block
                                            {...props}
                                            onClick={() => toggleSort('Warranty')}
                                            style={{ cursor: 'pointer' }}
                                        />
                                    )}
                                    variant={getSortVariant('Warranty')}
                                    cellTitle="Garantía"
                                />
                                <TableHeaderCell
                                    as={(props: any) => (
                                        <Block
                                            {...props}
                                            onClick={() => toggleSort('Status')}
                                            style={{ cursor: 'pointer' }}
                                        />
                                    )}
                                    variant={getSortVariant('Status')}
                                    cellTitle="Status"
                                />
                                <TableHeaderCell
                                    as={(props: any) => (
                                        <Block
                                            {...props}
                                            onClick={() => toggleSort('Vigencia')}
                                            style={{ cursor: 'pointer' }}
                                        />
                                    )}
                                    variant={getSortVariant('Vigencia')}
                                    cellTitle="Vigencia"
                                />
                            </div>
                        </div>

                        {table.getRowModel().rows.map(row => {
                            const item = row.original;

                            // Status Logic
                            const now = new Date();
                            const dateEnds = item.dateends ? new Date(item.dateends) : null;

                            let statusText = "N/A";
                            let badgeVariant: "Base" | "positive" | "negative" = "Base";
                            let validityText = "0 días";

                            if (dateEnds) {
                                const diffTime = dateEnds.getTime() - now.getTime();
                                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                                validityText = `${diffDays} días`;

                                if (dateEnds > now) {
                                    statusText = "Activa";
                                    badgeVariant = "positive";
                                } else {
                                    statusText = "Inactiva";
                                    badgeVariant = "negative";
                                }
                            }

                            return (
                                <TableWarranties
                                    key={row.id}
                                    warrantiesItemDescription={item.description || 'Sin descripción'}
                                    warrantiesItemQuantity={item.quantity ? String(item.quantity) : '0'}
                                    warrantiesItemWarranty={item.warranty || 'N/A'}
                                    statusBadgeStatusTitle={statusText}
                                    statusBadgeItemStatusBadgeVariant={badgeVariant}
                                    warrantiesItemValidity={validityText}
                                    warrantiesItemObservations={item.observations || '-'}
                                />
                            );
                        })}

                        {/* Empty State if no items */}
                        {items.length === 0 && (
                            <div style={{ padding: '20px', textAlign: 'center', color: '#888' }}>
                                No hay garantías registradas.
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
