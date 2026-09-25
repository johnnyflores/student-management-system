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
