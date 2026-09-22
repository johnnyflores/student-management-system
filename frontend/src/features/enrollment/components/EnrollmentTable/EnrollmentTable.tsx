import { DataTable } from '@/components/DataTable/DataTable';
import useEnrollments from '@/features/enrollment/hooks/useEnrollments';
import { getColumns } from '@/features/enrollment/components/EnrollmentTable/Columns';

const EnrollmentTable = (props: {
  pageSize?: number;
  isShowPagination?: boolean;
  courseId: number;
}) => {
  const {
    enrollments = [],
    unenrollStudent,
    isUnenrolling,
    isLoading,
  } = useEnrollments(props.courseId);

  const columns = getColumns(unenrollStudent, isUnenrolling);

  return (
    <div>
      <div className="flex flex-col gap-4">
        <DataTable data={enrollments} columns={columns} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default EnrollmentTable;
