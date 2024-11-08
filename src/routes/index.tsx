
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage';
import LoginPage from '../pages/Login/login';
import RegisterPage from '../pages/Register/Register';
import ForgotPasswordPage from '../pages/ForgotPasswordPage/ForgotPasswordPage';
import ProfilePage from '../pages/Profile-Page/profile';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
       <Route path="/sign-in" element={<LoginPage />}/>
       <Route path="/sign-up" element={<RegisterPage />}/>
        <Route path="/forgot-password" element={<ForgotPasswordPage />}/>
        <Route path="/profile" element={<ProfilePage />}/>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
