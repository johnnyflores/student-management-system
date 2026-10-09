'use client';
import { formatDate } from '@/utils/formatDate';
import { createColumnHelper } from '@tanstack/react-table';
import type { DataTableFeatures } from '@/components/DataTable/DataTableFeatures';
import type { Student } from '@/features/student/types/student';
import Actions from '@/features/student/components/StudentTable/Actions';
import { StudentStatusBadge } from '@/features/student/components/StudentStatusBadge';
import Avatar from '@/components/Avatar';

const columnHelper = createColumnHelper<DataTableFeatures, Student>();

export const columns = columnHelper.columns([
  columnHelper.accessor('id', {
    header: 'ID',
    cell: (info) => info.getValue(),
  }),
  columnHelper.display({
    id: 'name',
    header: 'Name',
    cell: ({ row }) => (
      <Avatar
        firstName={row.original.firstName}
        lastName={row.original.lastName}
        gradeLevel={row.original.grade}
      />
    ),
  }),
  columnHelper.accessor('email', {
    header: 'Email',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('grade', {
    header: 'Grade',
    cell: (info) => info.getValue(),
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
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => <Actions row={row} />,
  }),
]);
