import { DataTable } from '@/components/DataTable/DataTable';
import { columns } from '@/features/teacher/components/TeacherTable/Columns';
import { useTeachers } from '@/features/teacher/hooks/useTeachers';
import { useSearch } from '@/hooks/useSearch';

const DEFAULT_PAGE_SIZE = 3;

const TeacherTable = (props: {
  pageSize?: number;
  isShowPagination?: boolean;
}) => {
  const {
    teachers,
    page,
    limit,
    total,
    totalPages,
    isLoading,
    setPage,
    setLimit,
  } = useTeachers(props.pageSize ?? DEFAULT_PAGE_SIZE);

  const { data, setSearchTerm } = useSearch(teachers);

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

export default TeacherTable;
