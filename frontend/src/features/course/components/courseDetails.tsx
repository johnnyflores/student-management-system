import { useParams } from 'react-router-dom';
import { BookOpen, Hash, UserRound, Users } from 'lucide-react';
import useCourses from '@/features/course/hooks/useCourses';
import useCourseStudents from '@/features/course/hooks/useCourseStudents';
import PageLayout from '@/components/PageLayout';
import CourseInfoItem from '@/features/course/components/courseInfoItem';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import CourseStudentsTable from '@/features/course/components/courseStudentsTable';

const CourseDetails = () => {
  const { id } = useParams();

  const { courses } = useCourses();

  const course = courses.find((course) => course.ID.toString() === id);

  const {
    students,
    isLoading: isLoadingStudents,
    isError: isStudentsError,
  } = useCourseStudents(id ? parseInt(id) : 0);

  return (
    <PageLayout
      title="Course Details"
      subtitle="View course details"
      addMarginTop
    >
      {!course ? (
        <Card>
          <CardContent className="flex min-h-50 items-center justify-center">
            <div className="flex flex-col items-center gap-2 text-center">
              <BookOpen className="size-8 text-muted-foreground" />
              <p className="font-medium">Course not found</p>
              <p className="text-sm text-muted-foreground">
                The course you're looking for doesn't exist.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <BookOpen className="size-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold tracking-tight">
                      {course.Name}
                    </h2>
                    <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                      <Hash className="size-4" />
                      <span>Course ID: {course.ID}</span>
                    </div>
                  </div>
                </div>
                <Badge variant="secondary" className="w-fit gap-1.5">
                  <Users className="size-3.5" />
                  {students.length} Students
                </Badge>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="size-5 text-primary" />
                Course Information
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Basic information about this course
              </p>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <CourseInfoItem
                  icon={Hash}
                  label="Course ID"
                  value={course.ID}
                />
                <CourseInfoItem
                  icon={BookOpen}
                  label="Course Name"
                  value={course.Name}
                />
                <CourseInfoItem
                  icon={UserRound}
                  label="Teacher"
                  value={course.Teacher}
                />
                <CourseInfoItem
                  icon={Users}
                  label="Students"
                  value={students.length}
                />
              </div>
            </CardContent>
          </Card>
          <CourseStudentsTable
            students={students}
            isLoading={isLoadingStudents}
            isError={isStudentsError}
          />
        </div>
      )}
    </PageLayout>
  );
};

export default CourseDetails;
