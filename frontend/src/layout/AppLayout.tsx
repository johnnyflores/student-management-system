import { Outlet } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import EditStudentDrawer from '@/features/student/components/StudentDrawer/EditStudentDrawer';
import AssignCourseDrawer from '@/features/course/components/CourseDrawer/AssignCourseDrawer';
import EditTeacherDrawer from '@/features/teacher/components/TeacherDrawer/EditTeacherDrawer';

const AppLayout = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <EditStudentDrawer />
      <AssignCourseDrawer />
      <EditTeacherDrawer />
    </div>
  );
};

export default AppLayout;
