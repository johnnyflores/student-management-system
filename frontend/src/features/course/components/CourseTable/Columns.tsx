'use client';

import { createColumnHelper } from '@tanstack/react-table';
import type { Course } from '@/features/course/types/course';
import type { DataTableFeatures } from '@/components/DataTable/DataTableFeatures';
import Actions from '@/features/course/components/CourseTable/Actions';

const columnHelper = createColumnHelper<DataTableFeatures, Course>();

export const columns = columnHelper.columns([
  columnHelper.accessor('ID', {
    header: 'ID',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('Name', {
    header: 'Name',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('Teacher', {
    header: 'Teacher',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('Students', {
    header: 'Students ID',
    cell: (info) =>
      info.getValue().length
        ? info.getValue().join(', ')
        : 'No students enrolled',
  }),
  columnHelper.display({
    id: 'actions',
    cell: ({ row }) => <Actions row={row} />,
  }),
]);
