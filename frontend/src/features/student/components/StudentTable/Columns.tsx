'use client';
import { formatDate } from '@/utils/formatDate';
import { createColumnHelper } from '@tanstack/react-table';
import type { DataTableFeatures } from '@/components/DataTable/DataTableFeatures';
import type { Student } from '@/features/student/types/student';
import Actions from '@/features/student/components/StudentTable/Actions';
import { StudentStatusBadge } from '@/features/student/components/StudentStatusBadge';

const columnHelper = createColumnHelper<DataTableFeatures, Student>();

export const columns = columnHelper.columns([
  columnHelper.accessor('id', {
    header: 'ID',
  }),

  columnHelper.display({
    id: 'name',
    header: 'Name',
    cell: ({ row }) => `${row.original.firstName} ${row.original.lastName}`,
  }),

  columnHelper.accessor('email', {
    header: 'Email',
  }),

  columnHelper.accessor('grade', {
    header: 'Grade',
  }),

  columnHelper.accessor('status', {
    header: 'Status',
    cell: ({ row }) => <StudentStatusBadge status={row.original.status} />,
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
