import { useState } from 'react';
import { columns } from '@/features/student/components/student-table/column';
import useStudents from '@/features/student/hooks/useStudents';

import { DataTable } from '@/components/data-table/data-table';

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
    totalPages,
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
        columns={columns}
        onSearch={searchStudentsByNameHandler}
        isShowPagination={props.isShowPagination}
        pagination={pagination}
        pageSizeOptions={[3, 6, 9, 20, 50]}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>
  );
};

export default StudentTable;
