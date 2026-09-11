'use client';
import { formatDate } from '@/utils/formatDate';
import { createColumnHelper } from '@tanstack/react-table';
import type { DataTableFeatures } from '@/components/DataTable/DataTableFeatures';
import type { Student } from '@/features/student/types/student';
import Actions from '@/features/student/components/StudentTable/Actions';

const columnHelper = createColumnHelper<DataTableFeatures, Student>();

export const columns = columnHelper.columns([
  columnHelper.accessor('id', {
    header: 'ID',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('name', {
    header: 'Name',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('grade', {
    header: 'Grade',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('createdAt', {
    header: 'Created At',
    cell: (info) => formatDate(info.getValue()),
  }),
  columnHelper.accessor('updatedAt', {
    header: 'Updated At',
    cell: (info) => formatDate(info.getValue()),
  }),

  columnHelper.display({
    id: 'actions',
    cell: ({ row }) => <Actions row={row} />,
  }),
]);
