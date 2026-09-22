import { useParams } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import EnrollmentTable from '@/features/enrollment/components/EnrollmentTable';

const EnrollmentPage = () => {
  const { id } = useParams<{ id: string }>();

  const courseId = parseInt(id || '0');
  return (
    <PageLayout
      title="All Enrollments"
      subtitle="View and manage all enrollments"
      addMarginTop
    >
      <Card className="border-0 shadow-none">
        <CardContent>
          <EnrollmentTable courseId={courseId} isShowPagination={true} />
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default EnrollmentPage;
