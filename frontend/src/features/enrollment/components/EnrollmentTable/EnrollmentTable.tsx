import { DataTable } from '@/components/DataTable/DataTable';
import useEnrollments from '@/features/enrollment/hooks/useEnrollments';
import { getColumns } from '@/features/enrollment/components/EnrollmentTable/Columns';
import { useSearch } from '@/hooks/useSearch';

const DEFAULT_PAGE_SIZE = 3;

const EnrollmentTable = (props: {
  pageSize?: number;
  isShowPagination?: boolean;
  courseId: number;
}) => {
  const {
    enrollments = [],
    unenrollStudent,
    isUnenrolling,
    isLoading,
    page,
    limit,
    total,
    totalPages,
    setPage,
    setLimit,
  } = useEnrollments(props.courseId, props.pageSize ?? DEFAULT_PAGE_SIZE);

  const { data, setSearchTerm } = useSearch(enrollments);

  const columns = getColumns(unenrollStudent, isUnenrolling);

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

  const handleSearch = (query: string) => {
    setSearchTerm(query);
  };

  return (
    <div className="flex flex-col gap-4">
      <DataTable
        data={data}
        searchPlaceholder="Search ..."
        onSearch={handleSearch}
        columns={columns}
        isLoading={isLoading}
        isShowPagination={props.isShowPagination}
        pagination={pagination}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        pageSizeOptions={pageSizeOptions}
      />
    </div>
  );
};

export default EnrollmentTable;
