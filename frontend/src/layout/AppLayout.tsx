import { Outlet } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import EditStudentDrawer from '@/features/student/components/StudentDrawer/EditStudentDrawer';
import AssignCourseDrawer from '@/features/course/components/CourseDrawer/AssignCourseDrawer';
import EditTeacherDrawer from '@/features/teacher/components/TeacherDrawer/EditTeacherDrawer';

const AppLayout = () => {
  return (
    <>
      <div>
        <Navbar />
        <main>
          <Outlet />
        </main>
      </div>
      <EditStudentDrawer />
      <AssignCourseDrawer />
      <EditTeacherDrawer />
    </>
  );
};

export default AppLayout;
