import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import MainLayout from '../layouts/MainLayout';

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="login" element={<LoginPage />} />
      </Route>
    </Routes>
  </Router>
);

export default AppRoutes;