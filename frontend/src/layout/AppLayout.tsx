import { Outlet } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import EditStudentDrawer from '@/features/student/components/EditStudentDrawer';
import AssignCourseDrawer from '@/features/course/components/CourseDrawer/AssignCourseDrawer';
import EnrolledStudentDrawer from '@/features/course/components/CourseDrawer/EnrolledStudentDrawer';

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
