import { DataTable } from '@/components/DataTable/DataTable';
import { columns } from '@/features/course/components/CourseTable/Columns';
import useCourses from '@/features/course/hooks/useCourses';

import { useSearch } from '@/hooks/useSearch';

const CourseTable = () => {
  const { courses, isLoading, isError, error } = useCourses();

  const { data, setSearchTerm } = useSearch(courses);

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  return (
    <div className="flex flex-col gap-4">
      <DataTable
        data={data}
        searchPlaceholder="Search ..."
        onSearch={handleSearch}
        isLoading={isLoading}
        columns={columns}
      />
    </div>
  );
};

export default CourseTable;
