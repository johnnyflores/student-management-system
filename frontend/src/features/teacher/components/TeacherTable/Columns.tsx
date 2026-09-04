'use client';

import { createColumnHelper } from '@tanstack/react-table';
import type { DataTableFeatures } from '@/components/DataTable/DataTableFeatures';
import Actions from '@/features/teacher/components/TeacherTable/Actions';
import type { Teacher } from '@/features/teacher/types/teacher';

const columnHelper = createColumnHelper<DataTableFeatures, Teacher>();

export const columns = columnHelper.columns([
  columnHelper.accessor('ID', {
    header: 'ID',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('Name', {
    header: 'Name',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('Speciality', {
    header: 'Speciality',
    cell: (info) => info.getValue(),
  }),

  columnHelper.display({
    id: 'actions',
    cell: ({ row }) => <Actions row={row} />,
  }),
]);
