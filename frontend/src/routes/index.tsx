import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { routesPaths } from '@/routes/common/routes';
import AppLayout from '@/layout/AppLayout';
import NotFoundPage from '@/pages/NotFoundPage';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          {routesPaths.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
