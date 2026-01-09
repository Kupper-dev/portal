import React from 'react';

export const TablePagination = (props: any) => <div className="p-4 bg-gray-100 text-center">Pagination Placeholder</div>;
export const TableHeaderCell = (props: any) => <div className="p-2 font-bold" onClick={props.onClick}>{props.cellTitle || props.children}</div>;
export const TableHeaderRow = (props: any) => <div className="flex font-bold border-b">{props.children}</div>;
export const TableBodyRow = (props: any) => <div className="flex border-b p-2">{props.children} (Missing TableBodyRow)</div>;
export const DevicesTableHeader = (props: any) => <div className="font-bold">Header Placeholder</div>;
export const ProgressBar = (props: any) => <div className="h-2 w-full bg-gray-200"><div className="h-full bg-blue-500" style={props.style}></div></div>;
export const WarrantiesTableHeader = (props: any) => <div className="font-bold">Warranties Header Placeholder</div>;
export const SignupForm = (props: any) => <div>Signup Form Placeholder</div>;
