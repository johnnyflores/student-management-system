import { ROUTES } from '@/routes/common/routePath';
import Dashboard from '@/pages/dashboard';
import Students from '@/pages/students';
import StudentDetails from '@/features/student/components/StudentDetails';
import Courses from '@/pages/courses';
import CourseDetails from '@/features/course/components/CourseDetails';
import Teachers from '@/pages/teachers';
import TeacherDetails from '@/features/teacher/components/TeacherDetails';

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
  {
    path: ROUTES.COURSE_DETAILS(':id'),
    element: <CourseDetails />,
  },
  {
    path: ROUTES.TEACHERS,
    element: <Teachers />,
  },
  {
    path: ROUTES.TEACHER_DETAILS(':id'),
    element: <TeacherDetails />,
  },
];
