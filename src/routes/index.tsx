import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage';
import LoginPage from '../pages/Login/login';
import RegisterPage from '../pages/Register/Register';
import ForgotPasswordPage from '../pages/ForgotPasswordPage/ForgotPasswordPage';
import ProfilePage from '../pages/Profile-Page/profile';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store/store';
import { loadUser, selectGlobalLoading } from '../store/features/authSlice';
import Loading from '../components/Loading/Loading';
import ProtectedRoute from './ProtectedRoute'; // Định nghĩa một route bảo vệ

const AppRoutes: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const globalLoading = useSelector(selectGlobalLoading);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <>
      {globalLoading && <Loading />}
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sign-in" element={<LoginPage />} />
          <Route path="/sign-up" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          
     
          <Route 
            path="/profile" 
            element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} 
          />
        </Routes>
      </Router>
    </>
  );
};

export default AppRoutes;
