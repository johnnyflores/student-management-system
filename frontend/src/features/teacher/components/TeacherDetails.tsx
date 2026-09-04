import BackButton from '@/components/BackButton';
import InfoItem from '@/components/InfoItem';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { GraduationCap, Hash, Loader, UserRound } from 'lucide-react';
import useTeacher from '../hooks/useTeacher';
import { useParams } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

const TeacherDetails = () => {
  const { id } = useParams();

  const teacherId = id ? Number(id) : 0;

  const { teacher, isLoading, isError } = useTeacher(teacherId);

  return (
    <PageLayout
      title="Teacher Details"
      subtitle="View and manage teacher information"
      addMarginTop
      rightAction={<BackButton to="/teachers" label="Back to Teachers" />}
    >
      {isLoading && (
        <Card>
          <CardContent className="flex min-h-50 items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <Loader className="size-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">
                Loading teacher...
              </p>
            </div>
          </CardContent>
        </Card>
      )}
      {!isLoading && (isError || !teacher) && (
        <Card>
          <CardContent className="flex min-h-50 items-center justify-center">
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="flex size-12 items-center justify-center rounded-full bg-destructive/10">
                <UserRound className="size-6 text-destructive" />
              </div>
              <div>
                <p className="font-medium">Teacher not found</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  The teacher you're looking for doesn't exist.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      {!isLoading && !isError && teacher && (
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
                      {teacher.Name}
                    </h2>
                    <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                      <Hash className="size-4" />
                      <span>Teacher ID: {teacher.ID}</span>
                    </div>
                  </div>
                </div>
                <Badge variant="secondary" className="w-fit gap-1.5">
                  <GraduationCap className="size-3.5" />
                  Speciality {teacher.Speciality}
                </Badge>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserRound className="size-5 text-primary" />
                Teacher Information
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Personal and academic information
              </p>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <InfoItem icon={Hash} label="Teacher ID" value={teacher.ID} />
                <InfoItem
                  icon={UserRound}
                  label="Teacher Name"
                  value={teacher.Name}
                />
                <InfoItem
                  icon={GraduationCap}
                  label="Speciality"
                  value={teacher.Speciality}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </PageLayout>
  );
};

export default TeacherDetails;
