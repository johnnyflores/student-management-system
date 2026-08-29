import {
  AlertCircle,
  CalendarDays,
  GraduationCap,
  Hash,
  Loader2,
  UserRound,
  Users,
} from 'lucide-react';
import type { Student } from '@/features/student/types/student';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';

interface CourseStudentsTableProps {
  students: Student[];
  isLoading?: boolean;
  isError?: boolean;
}

const CourseStudentsTable = ({
  students,
  isLoading = false,
  isError = false,
}: CourseStudentsTableProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="size-5 text-primary" />
              Students
            </CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">
              Students enrolled in this course
            </p>
          </div>
          {!isLoading && !isError && (
            <Badge variant="outline" className="w-fit gap-1.5">
              <Users className="size-3.5" />
              {students.length} enrolled
            </Badge>
          )}
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="pt-6">
        {isLoading && (
          <div className="flex min-h-45 flex-col items-center justify-center gap-3">
            <Loader2 className="size-6 animate-spin text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Loading students...</p>
          </div>
        )}
        {!isLoading && isError && (
          <div className="flex min-h-45 flex-col items-center justify-center gap-3 text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-destructive/10">
              <AlertCircle className="size-6 text-destructive" />
            </div>
            <div>
              <p className="font-medium">Unable to load students</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Something went wrong while loading the students.
              </p>
            </div>
          </div>
        )}
        {!isLoading && !isError && students.length === 0 && (
          <div className="flex min-h-45 flex-col items-center justify-center gap-3 text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-muted">
              <GraduationCap className="size-6 text-muted-foreground" />
            </div>
            <div>
              <p className="font-medium">No students enrolled</p>
              <p className="mt-1 text-sm text-muted-foreground">
                There are currently no students in this course.
              </p>
            </div>
          </div>
        )}
        {!isLoading && !isError && students.length > 0 && (
          <div className="overflow-hidden rounded-md border min-h-45">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      <div className="flex items-center gap-2">
                        <Hash className="size-4" />
                        Student ID
                      </div>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center gap-2">
                        <UserRound className="size-4" />
                        Name
                      </div>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center gap-2">
                        <CalendarDays className="size-4" />
                        Age
                      </div>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center gap-2">
                        <GraduationCap className="size-4" />
                        Grade
                      </div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.ID}>
                      <TableCell className="font-medium">
                        {student.ID}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                            <UserRound className="size-4 text-primary" />
                          </div>
                          <span>{student.Name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{student.Age}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{student.Grade}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CourseStudentsTable;
