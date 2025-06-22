import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from '~/features/auth';
import { AuthPage } from '~/pages/auth';
import { HomePage } from '~/pages/home';
import { NotFoundPage } from '~/pages/not-found';

const Router = () => {
  return (
    <Routes>
      <Route element={<AuthPage />} path="/login" />

      <Route
        path="/"
        element={
          <AuthProvider>
            <HomePage />{' '}
          </AuthProvider>
        }
      />

      <Route element={<NotFoundPage />} path="*" />
    </Routes>
  );
};

export default Router;
