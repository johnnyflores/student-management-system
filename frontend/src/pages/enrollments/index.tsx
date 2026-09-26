import { useParams } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import EnrollmentTable from '@/features/enrollment/components/EnrollmentTable';
import BackButton from '@/components/BackButton';
import useTitle from '@/hooks/useTitle';

const EnrollmentPage = () => {
  const { id } = useParams<{ id: string }>();
  const courseId = parseInt(id || '0');
  useTitle({ title: 'Enrollments' });

  return (
    <PageLayout
      title="All Enrollments"
      subtitle="View and manage all enrollments"
      addMarginTop
      rightAction={
        <div className="flex items-center gap-2">
          <BackButton to="/courses" label="Back to Courses" />
        </div>
      }
    >
      <div className="w-full px-5 lg:px-0">
        <Card className="border-0 shadow-none">
          <CardContent>
            <EnrollmentTable courseId={courseId} isShowPagination={true} />
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default EnrollmentPage;
