import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface DataTablePaginationProps {
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  pageSizeOptions?: number[];
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
}

export function DataTablePagination({
  pageNumber,
  pageSize,
  totalCount,
  totalPages,
  pageSizeOptions,
  onPageChange,
  onPageSizeChange,
}: DataTablePaginationProps) {
  const handlePageSizeChange = (newSize: number) => {
    onPageSizeChange?.(newSize);
  };

  const handlePageChange = (newPage: number) => {
    onPageChange?.(newPage);
  };

  const resolvedPageSizeOptions = pageSizeOptions ?? [5, 10, 20, 30, 40, 50];

  return (
    <div className="flex flex-col gap-4 px-2 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex-1 text-sm text-muted-foreground">
        Showing {(pageNumber - 1) * pageSize + 1}-
        {Math.min(pageNumber * pageSize, totalCount)} of {totalCount}
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:gap-8">
        <div className="flex items-center justify-between sm:justify-start space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${pageSize}`}
            onValueChange={(value) => {
              const size = Number(value);
              onPageChange?.(1);
              handlePageSizeChange(size);
            }}
          >
            <SelectTrigger className="h-8 w-17.5">
              <SelectValue placeholder={`${pageSize}`} />
            </SelectTrigger>
            <SelectContent side="top">
              {resolvedPageSizeOptions.map((size) => (
                <SelectItem key={size} value={`${size}`}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="whitespace-nowrap text-sm font-medium">
            Page {pageNumber} of {totalPages}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8"
              onClick={() => handlePageChange(pageNumber - 1)}
              disabled={pageNumber === 1}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeft />
              <span className="hidden sm:inline">Previous</span>
            </Button>
            <div className="hidden items-center gap-1 sm:flex">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum: number;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (pageNumber <= 3) {
                  pageNum = i + 1;
                } else if (pageNumber >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = pageNumber - 2 + i;
                }

                return (
                  <Button
                    key={pageNum}
                    variant={pageNumber === pageNum ? 'default' : 'outline'}
                    className="h-8 w-8 p-0"
                    onClick={() => handlePageChange(pageNum)}
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>
            <Button
              variant="outline"
              size="sm"
              className="h-8"
              onClick={() => handlePageChange(pageNumber + 1)}
              disabled={pageNumber >= totalPages}
            >
              <span className="hidden sm:inline">Next</span>
              <span className="sr-only">Go to next page</span>
              <ChevronRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
