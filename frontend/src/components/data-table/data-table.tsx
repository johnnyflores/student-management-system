'use client';

import * as React from 'react';
import {
  useTable,
  type ColumnDef,
  type ColumnFiltersState,
  type ColumnVisibilityState,
  type RowData,
  type SortingState,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  features,
  type DataTableFeatures,
} from '@/components/data-table/data-table-features';
import { useState } from 'react';
import { X } from 'lucide-react';
import { EmptyState } from '@/components/empty-state';
import { DataTablePagination } from '@/components/data-table/data-table-pagination';
import { cn } from '@/lib/utils';

interface DataTableProps<TData extends RowData> {
  columns: ColumnDef<DataTableFeatures, TData>[];
  pageSizeOptions?: number[];
  data: TData[];
  searchPlaceholder?: string;
  showSearch?: boolean;
  className?: string;
  onSearch?: (term: string) => void;
  isLoading?: boolean;
  isShowPagination?: boolean;
  pagination?: {
    totalItems?: number;
    totalPages?: number;
    pageNumber?: number;
    pageSize?: number;
  };
  onPageChange?: (pageNumber: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
}

export function DataTable<TData extends RowData>({
  columns,
  data,
  searchPlaceholder,
  className,
  showSearch = true,
  isLoading = false,
  isShowPagination = true,
  pagination,
  pageSizeOptions,
  onPageChange,
  onPageSizeChange,
  onSearch,
}: DataTableProps<TData>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<ColumnVisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const table = useTable({
    features,
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
  });

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    onSearch?.(value);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch?.('');
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap justify-between items-center gap-2 pb-4">
        <div className="flex items-center gap-2 flex-wrap flex-1">
          {showSearch && (
            <Input
              placeholder={searchPlaceholder}
              value={searchTerm}
              disabled={isLoading}
              onChange={(e) => handleSearch(e.target.value)}
              className="max-w-sm"
            />
          )}
          {searchTerm && (
            <Button
              variant="ghost"
              disabled={isLoading}
              onClick={handleClear}
              className="h-8 px-2"
            >
              <X className="mr-2 h-4 w-4" />
              Reset
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className={cn('rounded-md border overflow-x-auto', className)}>
        <Table
          className={cn(table.getRowModel().rows.length === 0 ? 'h-50' : '')}
        >
          <TableHeader className="sticky top-0 bg-muted z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="font-medium! text-[13px]!"
                    >
                      {header.isPlaceholder ? null : (
                        <table.FlexRender header={header} />
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-[13.3px]!">
                      <table.FlexRender cell={cell} />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <EmptyState title="No students found" description="" />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {isShowPagination && (
        <div className="flex items-center justify-end space-x-2 py-4">
          <DataTablePagination
            pageNumber={pagination?.pageNumber || 1}
            pageSize={pagination?.pageSize || 10}
            totalCount={pagination?.totalItems || 0}
            totalPages={pagination?.totalPages || 0}
            onPageChange={onPageChange}
            onPageSizeChange={onPageSizeChange}
            pageSizeOptions={pageSizeOptions}
          />
        </div>
      )}
    </div>
  );
}
