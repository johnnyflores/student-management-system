import { ROUTES } from '@/routes/common/routePath';
import Dashboard from '@/pages/dashboard';
import Students from '@/pages/students';
import StudentDetails from '@/features/student/components/StudentDetails';
import Courses from '@/pages/courses';

export const routesPaths = [
  {
    path: ROUTES.DASHBOARD,
    element: <Dashboard />,
  },
  {
    path: ROUTES.STUDENTS,
    element: <Students />,
  },
  {
    path: ROUTES.COURSES,
    element: <Courses />,
  },
  {
    path: ROUTES.STUDENT_DETAILS(':id'),
    element: <StudentDetails />,
  },
];
