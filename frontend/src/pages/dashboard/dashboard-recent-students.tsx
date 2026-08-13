import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ROUTES } from '@/routes/common/routePath';
import StudentTable from '@/features/student/components/student-table';

const DashboardRecentStudents = () => {
  return (
    <Card className="shadow-none! border border-gray-100 dark:border-border">
      <CardHeader className="pb-0!">
        <CardTitle className="text-xl">Recent Students</CardTitle>
        <CardDescription>
          This section displays the most recently added students to the system.
          You can view their details and manage their information from here.
        </CardDescription>
        <CardAction>
          <Button
            asChild
            variant="link"
            className="text-gray-700! dark:text-gray-200! font-normal!"
          >
            <Link to={ROUTES.STUDENTS}>View All</Link>
          </Button>
        </CardAction>
        <Separator className="mt-3 bg-gray-100! dark:bg-gray-800!" />
      </CardHeader>
      <CardContent className="pt-0">
        <StudentTable pageSize={3} isShowPagination={false} />
      </CardContent>
    </Card>
  );
};

export default DashboardRecentStudents;
