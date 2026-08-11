import { DataTable } from '@/components/data-table/data-table';
import { Ellipsis } from 'lucide-react';
import useStudents from '@/features/student/hooks/useStudents';
import { useState } from 'react';

const StudentTable = (props: {
  pageSize?: number;
  isShowPagination?: boolean;
}) => {
  const {
    students,
    searchStudentsByName,
    page,
    limit,
    total,
    totalPages,
    loading,
    setPage,
    setLimit,
  } = useStudents(props.pageSize ?? 10);

  const [searchText, setSearchText] = useState('');

  const searchStudentsByNameHandler = (name: string) => {
    setSearchText(name);
    searchStudentsByName(name);
  };

  const filteredStudents = students.filter((student) =>
    student.Name.toLowerCase().includes(searchText.toLowerCase())
  );

  const pagination = {
    totalItems: total,
    totalPages: totalPages,
    pageNumber: page,
    pageSize: limit,
  };

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const handlePageSizeChange = (pageSize: number) => {
    setLimit(pageSize);
    setPage(1);
  };

  return (
    <div className="flex flex-col gap-4">
      <DataTable
        data={filteredStudents}
        searchPlaceholder="Search students..."
        isLoading={loading}
        onSearch={searchStudentsByNameHandler}
        isShowPagination={props.isShowPagination}
        columns={[
          { header: 'ID', accessorKey: 'ID' },
          { header: 'Name', accessorKey: 'Name' },
          { header: 'Grade', accessorKey: 'Grade' },
          {
            header: 'Actions',
            accessorKey: 'actions',
            cell: () => <Ellipsis size={20} />,
          },
        ]}
        pagination={pagination}
        pageSizeOptions={[3, 6, 9, 20, 50]}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>
  );
};

export default StudentTable;
