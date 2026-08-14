import { Outlet } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import EditStudentDrawer from '@/features/student/components/edit-student-drawer';

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
    </>
  );
};

export default AppLayout;
