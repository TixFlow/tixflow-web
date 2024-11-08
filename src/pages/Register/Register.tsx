import React, { useState } from 'react';
import { Button, Input, Radio, Form, message } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

import './register.scss'; 
import background from '../../assets/bg.png';
import { useNavigate } from 'react-router-dom';
import api from '../../config/axios';
import Loading from '../../components/Loading/Loading';

interface RegisterFormValues {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  gender: string;
}

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleHome = () => {
    navigate('/');
  };


  const handleRegister = async (values: RegisterFormValues) => {
    setLoading(true);
    try {
      const response = await api.post('/auth/signup', values);
      if (response.status === 201) {
        message.success('Đăng ký thành công!');
        navigate('/sign-in'); 
      }
    } catch (error: any) {
      message.error(error.response?.data?.message || 'Đăng ký thất bại, vui lòng thử lại!');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div 
      className="flex items-center justify-center h-screen bg-cover bg-center" 
      style={{ backgroundImage: `url(${background})` }}
    >
      {loading && <Loading />}
      <Button
        type="text"
        icon={<HomeOutlined />}
        onClick={handleHome}
        className="absolute top-4 left-4 text-white bg-transparent hover:bg-white hover:text-gray transition"
      >
        Trang chủ
      </Button>
      <div className="bg-white bg-opacity-20 rounded-lg p-8 w-full max-w-md backdrop-blur-lg">
        <h2 className="text-center text-white text-2xl font-semibold mb-4">ĐĂNG KÝ</h2>
        
        <Form<RegisterFormValues> onFinish={handleRegister} layout="vertical" className="text-white">
          <Form.Item 
            label="Email" 
            name="email" 
            rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
             className="mb-3"
             
          >
            <Input placeholder="Email" className="w-full rounded-3xl custom-input" />
          </Form.Item>
          
          <Form.Item 
            label="Mật khẩu" 
            name="password" 
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
            className="mb-3"
          >
            <Input.Password placeholder="Mật khẩu" className="w-full rounded-3xl custom-input" />
          </Form.Item>

          <Form.Item 
            label="Họ" 
            name="lastName" 
            rules={[{ required: true, message: 'Vui lòng nhập họ!' }]}
            className="mb-3"
          >
            <Input placeholder="Họ" className="w-full rounded-3xl custom-input" />
          </Form.Item>

          <Form.Item 
            label="Tên" 
            name="firstName" 
            rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
            className="mb-3"
          >
            <Input placeholder="Tên" className="w-full rounded-3xl custom-input" />
          </Form.Item>

          <Form.Item 
            label="Số điện thoại" 
            name="phoneNumber" 
            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
            className="mb-3"
          >
            <Input placeholder="Số điện thoại" className="w-full rounded-3xl custom-input" />
          </Form.Item>

          <Form.Item 
            label="Giới tính" 
            name="gender" 
            rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}
            className="mb-3"
          >
            <Radio.Group>
              <Radio value="male" className="text-white">Nam</Radio>
              <Radio value="female" className="text-white">Nữ</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              className="w-full bg-black text-white font-semibold rounded-3xl mb-3  "
            >
              ĐĂNG KÝ
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center text-white mt-4">
          Đã có tài khoản? <a href="#" onClick={() => navigate('/sign-in')} className="text-blue-500">Đăng nhập</a>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
