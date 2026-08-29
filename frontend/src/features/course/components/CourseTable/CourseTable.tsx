import { DataTable } from '@/components/DataTable/DataTable';
import { columns } from '@/features/course/components/CourseTable/Columns';
import useCourses from '@/features/course/hooks/useCourses';

const CourseTable = () => {
  const { courses, isLoading, isError, error } = useCourses();

  const filteredCourses = courses;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }
  return (
    <div className="flex flex-col gap-4">
      <DataTable
        data={filteredCourses}
        searchPlaceholder="Search courses..."
        isLoading={isLoading}
        columns={columns}
      />
    </div>
  );
};

export default CourseTable;
