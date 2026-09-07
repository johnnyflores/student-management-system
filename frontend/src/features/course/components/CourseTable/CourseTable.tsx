import { DataTable } from '@/components/DataTable/DataTable';
import { columns } from '@/features/course/components/CourseTable/Columns';
import useCourses from '@/features/course/hooks/useCourses';
import { useSearch } from '@/hooks/useSearch';

const DEFAULT_PAGE_SIZE = 10;

const CourseTable = (props: {
  pageSize?: number;
  isShowPagination?: boolean;
}) => {
  const {
    courses,
    isLoading,
    isError,
    error,
    page,
    limit,
    total,
    totalPages,
    setPage,
    setLimit,
  } = useCourses(props.pageSize ?? DEFAULT_PAGE_SIZE);

  const { data, setSearchTerm } = useSearch(courses);

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

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <DataTable
        data={data}
        searchPlaceholder="Search ..."
        onSearch={handleSearch}
        isLoading={isLoading}
        columns={columns}
        isShowPagination={props.isShowPagination}
        pagination={pagination}
        pageSizeOptions={pageSizeOptions}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>
  );
};

export default CourseTable;
