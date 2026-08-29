import { useParams } from 'react-router-dom';
import {
  CalendarDays,
  GraduationCap,
  Hash,
  Loader,
  UserRound,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import useStudent from '@/features/student/hooks/useStudent';
import PageLayout from '@/components/PageLayout';
import BackButton from '@/components/BackButton';
import InfoItem from '@/components/InfoItem';

const StudentDetails = () => {
  const { id } = useParams();

  const studentId = id ? Number(id) : 0;

  const { student, isLoading, isError } = useStudent(studentId);

  return (
    <PageLayout
      title="Student Details"
      subtitle="View and manage student information"
      addMarginTop
      rightAction={<BackButton to="/students" label="Back to Students" />}
    >
      {isLoading && (
        <Card>
          <CardContent className="flex min-h-50 items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <Loader className="size-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">
                Loading student...
              </p>
            </div>
          </CardContent>
        </Card>
      )}
      {!isLoading && (isError || !student) && (
        <Card>
          <CardContent className="flex min-h-50 items-center justify-center">
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="flex size-12 items-center justify-center rounded-full bg-destructive/10">
                <UserRound className="size-6 text-destructive" />
              </div>
              <div>
                <p className="font-medium">Student not found</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  The student you're looking for doesn't exist.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      {!isLoading && !isError && student && (
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <UserRound className="size-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold tracking-tight">
                      {student.Name}
                    </h2>
                    <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                      <Hash className="size-4" />
                      <span>Student ID: {student.ID}</span>
                    </div>
                  </div>
                </div>
                <Badge variant="secondary" className="w-fit gap-1.5">
                  <GraduationCap className="size-3.5" />
                  Grade {student.Grade}
                </Badge>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserRound className="size-5 text-primary" />
                Student Information
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Personal and academic information
              </p>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <InfoItem icon={Hash} label="Student ID" value={student.ID} />
                <InfoItem
                  icon={UserRound}
                  label="Student Name"
                  value={student.Name}
                />
                <InfoItem icon={CalendarDays} label="Age" value={student.Age} />
                <InfoItem
                  icon={GraduationCap}
                  label="Grade"
                  value={student.Grade}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </PageLayout>
  );
};

export default StudentDetails;
