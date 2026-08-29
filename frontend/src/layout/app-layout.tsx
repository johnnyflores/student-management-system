import { Outlet } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import EditStudentDrawer from '@/features/student/components/edit-student-drawer';
import AssignCourseDrawer from '@/features/course/components/course-drawer/assign-course-drawer';
import EnrolledStudentDrawer from '@/features/course/components/course-drawer/enrolled-student-drawer';

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
      <EnrolledStudentDrawer />
    </>
  );
};

export default AppLayout;
