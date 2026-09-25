'use client';

import { createColumnHelper } from '@tanstack/react-table';
import type { DataTableFeatures } from '@/components/DataTable/DataTableFeatures';
import type { Enrollment } from '@/features/enrollment/types/enrollment';
import Actions from '@/features/enrollment/components/EnrollmentTable/Actions';

const columnHelper = createColumnHelper<DataTableFeatures, Enrollment>();

export const getColumns = (
  onUnenroll: (studentId: number) => Promise<unknown>,
  isUnenrolling: boolean
) =>
  columnHelper.columns([
    columnHelper.accessor('id', {
      header: 'ID',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('courseId', {
      header: 'Course ID',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('studentId', {
      header: 'Student ID',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('enrolledAt', {
      header: 'Enrolled At',
      cell: (info) => new Date(info.getValue()).toLocaleString(),
    }),
    columnHelper.display({
      id: 'actions',
      header: () => <span className="sr-only">Actions</span>,
      cell: ({ row }) => (
        <Actions
          enrollment={row.original}
          onUnenroll={onUnenroll}
          isUnenrolling={isUnenrolling}
        />
      ),
    }),
  ]);
