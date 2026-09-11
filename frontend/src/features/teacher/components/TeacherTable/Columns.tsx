'use client';

import { createColumnHelper } from '@tanstack/react-table';
import type { DataTableFeatures } from '@/components/DataTable/DataTableFeatures';
import Actions from '@/features/teacher/components/TeacherTable/Actions';
import type { Teacher } from '@/features/teacher/types/teacher';

const columnHelper = createColumnHelper<DataTableFeatures, Teacher>();

export const columns = columnHelper.columns([
  columnHelper.accessor('id', {
    header: 'ID',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('name', {
    header: 'Name',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('speciality', {
    header: 'Speciality',
    cell: (info) => info.getValue(),
  }),

  columnHelper.display({
    id: 'actions',
    cell: ({ row }) => <Actions row={row} />,
  }),
]);
