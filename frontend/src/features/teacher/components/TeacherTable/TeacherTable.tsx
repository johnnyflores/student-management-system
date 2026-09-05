import { DataTable } from '@/components/DataTable/DataTable';
import { columns } from '@/features/teacher/components/TeacherTable/Columns';
import { useTeachers } from '@/features/teacher/hooks/useTeachers';
import useDebouncedSearch from '@/hooks/useDebounceSearch';

const TeacherTable = () => {
  const { teachers, isLoading, isError, error } = useTeachers();

  const { setSearchTerm, debouncedTerm } = useDebouncedSearch('', {
    delay: 500,
  });

  const searchTerm = debouncedTerm.toLowerCase().trim();

  const data = teachers.filter((teacher) => {
    const searchableText = Object.values(teacher).join(' ').toLowerCase();
    return searchableText.includes(searchTerm);
  });

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
