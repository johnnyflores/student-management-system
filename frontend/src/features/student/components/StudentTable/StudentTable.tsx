import { columns } from '@/features/student/components/StudentTable/Columns';
import useStudents from '@/features/student/hooks/useStudents';
import { DataTable } from '@/components/DataTable/DataTable';
import { useSearch } from '@/hooks/useSearch';

const DEFAULT_PAGE_SIZE = 3;

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
  } = useStudents(props.pageSize ?? DEFAULT_PAGE_SIZE);

  const { data, setSearchTerm } = useSearch(students);

  const pagination = {
    totalItems: total,
    totalPages,
    pageNumber: page,
    pageSize: limit,
  };

  const pageSizeOptions = [
    ...Array.from(
      { length: Math.floor(total / DEFAULT_PAGE_SIZE) },
      (_, i) => (i + 1) * DEFAULT_PAGE_SIZE
    ),
    ...(total % DEFAULT_PAGE_SIZE !== 0 ? [total] : []),
  ].filter((value, index, array) => array.indexOf(value) === index);

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
        pageSizeOptions={pageSizeOptions}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>
  );
};

export default StudentTable;
