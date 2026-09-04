import { useState } from 'react';
import { DataTable } from '@/components/DataTable/DataTable';
import { columns } from '@/features/teacher/components/TeacherTable/Columns';
import { useTeachers } from '@/features/teacher/hooks/useTeachers';

const TeacherTable = () => {
  const { teachers, isLoading, isError, error } = useTeachers();

  const [search, setSearch] = useState('');

  const searchTerm = search.toLowerCase().trim();

  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.Name.toLowerCase().includes(searchTerm) ||
      teacher.Speciality.toLowerCase().includes(searchTerm)
  );

  if (isError) {
    return <div>Error: {error?.message ?? 'Unknown error'}</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <DataTable
        data={filteredTeachers}
        searchPlaceholder="Search by name or speciality..."
        onSearch={setSearch}
        isLoading={isLoading}
        columns={columns}
      />
    </div>
  );
};

export default TeacherTable;
