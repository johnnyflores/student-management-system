import { Badge } from '@/components/ui/badge';
import type { StudentStatus } from '@/features/student/types/student';

interface StudentStatusBadgeProps {
  status: StudentStatus;
}

export function StudentStatusBadge({ status }: StudentStatusBadgeProps) {
  const statusConfig = {
    active: {
      label: 'Active',
      className:
        'bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400',
    },
    inactive: {
      label: 'Inactive',
      className:
        'bg-gray-100 text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400',
    },
    graduated: {
      label: 'Graduated',
      className:
        'bg-blue-100 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400',
    },
  } satisfies Record<StudentStatus, { label: string; className: string }>;

  const config = statusConfig[status];

  return <Badge className={config.className}>{config.label}</Badge>;
}
