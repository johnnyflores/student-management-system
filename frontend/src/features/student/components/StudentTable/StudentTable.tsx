import { columns } from '@/features/student/components/StudentTable/Columns';
import useStudents from '@/features/student/hooks/useStudents';
import { DataTable } from '@/components/DataTable/DataTable';
import { useSearch } from '@/hooks/useSearch';

const StudentTable = (props: {
  pageSize?: number;
  isShowPagination?: boolean;
}) => {
  const {
    students,
    page,
    limit,
    total,
    totalPages,
    isLoading,
    setPage,
    setLimit,
  } = useStudents(props.pageSize ?? 10);

  const { data, setSearchTerm } = useSearch(students);

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

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  return (
    <div className="flex flex-col gap-4">
      <DataTable
        data={data}
        searchPlaceholder="Search ..."
        isLoading={isLoading}
        columns={columns}
        onSearch={handleSearch}
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
