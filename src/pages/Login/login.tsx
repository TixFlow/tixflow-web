import React, { useEffect, useState } from 'react';
import { Button, Input, Checkbox, Tabs, Form } from 'antd';
import { FacebookOutlined, GoogleOutlined, HomeOutlined } from '@ant-design/icons';
import 'tailwindcss/tailwind.css';
import "./login.scss";

import background from '../../assets/bg.png';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { login, selectAuth } from '../../store/features/authSlice';

const LoginPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('email'); 
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const { status, error} = useSelector(selectAuth);  

  const handleRegister = () => navigate('/sign-up');
  const handleForgotPassword = () => navigate('/forgot-password');
  const handleHome = () => navigate('/');

  const onFinish = (values: { email?: string; phone?: string; password: string }) => {
    if (activeTab === 'phone' && values.phone) {
      dispatch(login({ email: values.phone, password: values.password }));
    } else if (activeTab === 'gmail' && values.email) {
      dispatch(login({ email: values.email, password: values.password }));
    }
  };

  useEffect(() => {
    if (status === 'succeeded') {
      navigate('/');
    }
  }, [status, navigate]);

  const tabItems = [
    {
      key: 'phone',
      label: 'Số điện thoại',
      children: (
        <Form onFinish={onFinish}>
          <Form.Item name="phone" rules={[{ required: true, message: 'Please enter your phone number' }]}>
            <Input placeholder="Số điện thoại" className="w-full rounded-3xl custom-input" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: 'Please enter your password' }]}>
            <Input.Password placeholder="Mật khẩu" className="mb-4 rounded-3xl custom-input" />
          </Form.Item>
          <Button htmlType="submit" type="primary" className="w-full bg-black text-white font-semibold mb-4 rounded-3xl" loading={status === 'loading'} disabled={status === 'loading'}>
            ĐĂNG NHẬP
          </Button>
        </Form>
      ),
    },
    {
      key: 'gmail',
      label: 'Gmail',
      children: (
        <Form onFinish={onFinish}>
          <Form.Item name="email" rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}>
            <Input placeholder="Email" className="w-full rounded-3xl custom-input" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: 'Please enter your password' }]}>
            <Input.Password placeholder="Mật khẩu" className="mb-4 rounded-3xl custom-input" />
          </Form.Item>
          <Button htmlType="submit" type="primary" className="w-full bg-black text-white font-semibold mb-4 rounded-3xl" loading={status === 'loading'} disabled={status === 'loading'}>
            ĐĂNG NHẬP
          </Button>
        </Form>
      ),
    },
  ];


  return (
    <div 
      className="flex items-center justify-center h-screen bg-cover bg-center" 
      style={{ backgroundImage: `url(${background})` }}
    >
      <Button
        type="text"
        icon={<HomeOutlined />}
        onClick={handleHome}
        className="absolute top-4 left-4 text-white bg-transparent hover:bg-white hover:text-gray transition"
        aria-label="Go to home page"
      >
        Trang chủ
      </Button>
      <div className="bg-white bg-opacity-20 rounded-lg p-8 w-full max-w-md backdrop-blur-lg">
        <h2 className="text-center text-white text-2xl font-semibold mb-6">ĐĂNG NHẬP</h2>
         <Tabs activeKey={activeTab} onChange={(key) => setActiveTab(key)} centered items={tabItems} />

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        
        <div className="flex justify-between items-center text-white mb-4">
          <Checkbox className="text-white">Ghi nhớ mật khẩu</Checkbox>
          <Button type="link" onClick={handleForgotPassword} className="text-white">Quên mật khẩu?</Button>
        </div>
        
        <div className="text-center text-white mb-4">HOẶC</div>
        
        <div className="flex justify-center gap-4 mb-4">
          <Button icon={<FacebookOutlined />} shape="circle" aria-label="Login with Facebook" />
          <Button icon={<GoogleOutlined />} shape="circle" aria-label="Login with Google" />
        </div>
        
        <div className="text-center text-white">
          Bạn chưa có tài khoản? <Button type="link" onClick={handleRegister} className="text-blue-500">Đăng ký</Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;