import { DataTable } from '@/components/DataTable/DataTable';
import { columns } from '@/features/teacher/components/TeacherTable/Columns';
import { useTeachers } from '@/features/teacher/hooks/useTeachers';
import { useSearch } from '@/hooks/useSearch';

const TeacherTable = () => {
  const { teachers, isLoading, isError, error } = useTeachers();

  const { data, setSearchTerm } = useSearch(teachers);

  if (isError) {
    return <div>Error: {error?.message ?? 'Unknown error'}</div>;
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

export default TeacherTable;
