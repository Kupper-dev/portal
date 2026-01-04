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

// Placeholder type until we have real warranty data
interface WarrantyItem {
    id: string;
    description: string;
    quantity: string;
    warranty: string;
    status: string;
    validity: string;
    observations: string;
}

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
    const columns = [
        columnHelper.accessor('description', { id: 'Description', header: 'Descripción' }),
        columnHelper.accessor('quantity', { id: 'Quantity', header: 'Cantidad' }),
        columnHelper.accessor('warranty', { id: 'Warranty', header: 'Garantía' }),
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

    const getSortVariant = (columnId: string): "Base" | "up" | "down" => {
        const sortState = table.getColumn(columnId)?.getIsSorted();
        if (sortState === 'asc') return 'up';
        if (sortState === 'desc') return 'down';
        return 'Base';
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
                    <div className="table-list">

                        {/* Manual Header Implementation for Sorting */}
                        <div className="table_body_row header">
                            <TableHeaderCell
                                as={(props: any) => (
                                    <Block
                                        {...props}
                                        onClick={() => toggleSort('Description')}
                                        style={{ cursor: 'pointer' }}
                                    />
                                )}
                                variant={getSortVariant('Description')}
                                cellTitle="Descripción"
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
                                cellTitle="Cantidad"
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
                        </div>

                        {table.getRowModel().rows.map(row => {
                            const item = row.original;

                            let badgeVariant: "Base" | "positive" | "negative" = "Base";
                            if (item.status?.toLowerCase() === 'activa') badgeVariant = "positive";
                            if (item.status?.toLowerCase() === 'vencida') badgeVariant = "negative";

                            return (
                                <TableWarranties
                                    key={row.id}
                                    warrantiesItemDescription={item.description}
                                    warrantiesItemQuantity={item.quantity}
                                    warrantiesItemWarranty={item.warranty}
                                    statusBadgeStatusTitle={item.status}
                                    statusBadgeItemStatusBadgeVariant={badgeVariant}
                                    warrantiesItemValidity={item.validity}
                                    warrantiesItemObservations={item.observations}
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
