'use client';

import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Table, THead, TRow } from '../ui/table';

export default function SimpleTable({ columns, data }) {
  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });

  return (
    <Table>
      <THead>
        {table.getHeaderGroups().map((headerGroup) =>
          headerGroup.headers.map((header) => (
            <span key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</span>
          ))
        )}
      </THead>
      {table.getRowModel().rows.map((row) => (
        <TRow key={row.id}>
          {row.getVisibleCells().map((cell) => (
            <span key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</span>
          ))}
        </TRow>
      ))}
    </Table>
  );
}
