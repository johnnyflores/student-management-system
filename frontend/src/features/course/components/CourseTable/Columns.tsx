'use client';

import { createColumnHelper } from '@tanstack/react-table';
import type { Course } from '@/features/course/types/course';
import type { DataTableFeatures } from '@/components/DataTable/DataTableFeatures';
import Actions from '@/features/course/components/CourseTable/Actions';

const columnHelper = createColumnHelper<DataTableFeatures, Course>();

export const columns = columnHelper.columns([
  columnHelper.accessor('id', {
    header: 'ID',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('name', {
    header: 'Name',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('teacherId', {
    header: 'Teacher ID',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('studentIds', {
    header: 'Students ID',
    cell: (info) =>
      info.getValue()?.length
        ? info.getValue().join(', ')
        : 'No students enrolled',
  }),
  columnHelper.display({
    id: 'actions',
    cell: ({ row }) => <Actions row={row} />,
  }),
]);
