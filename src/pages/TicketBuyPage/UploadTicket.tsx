import React, { useState, useEffect } from 'react';
import { Button, Form, Input, InputNumber, DatePicker, Checkbox, message, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import api from '../../config/axios';
import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';
import "./UploadTicket.scss"
const { TextArea } = Input;

const UploadTicketInfoPage: React.FC = () => {
  const [ticketData, setTicketData] = useState({
    title: '',
    description: '',
    location: '',
    code: '',
    expiryDate: null as Date | null,
    imageUrl: '',
    price: 0,
    blogId: '', 
    agreedTerms: false,
  });
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await api.get('/blogs');
        setBlogs(response.data.data); 
      } catch (error) {
        console.error("Error fetching blogs:", error);
        message.error("Không thể tải danh sách blog.");
      }
    };
    fetchBlogs();
  }, []);

  const handleFormSubmit = async () => {
  if (!ticketData.agreedTerms) {
    message.error("Bạn cần đồng ý với các Điều khoản & Chính sách.");
    return;
  }

  const { agreedTerms, ...ticketPayload } = ticketData;

  try {
    await api.post('/tickets', ticketPayload); 
    message.success("Thông tin vé đã được đăng bán thành công!");
    navigate('/ticket-sale');
  } catch (error) {
    message.error("Không thể đăng thông tin vé.");
  }
};


  return (
    <div>
      <Header />
      <div className="container mx-auto p-4 mt-12">
        <div className="upload-ticket-info-container bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Đăng bán vé</h2>
          <Form layout="vertical" onFinish={handleFormSubmit}>
            <Form.Item label="Tên vé" required>
              <Input
                value={ticketData.title}
                onChange={(e) => setTicketData({ ...ticketData, title: e.target.value })}
                className="border p-2 rounded-md"
              />
            </Form.Item>

            <Form.Item label="Ngày sử dụng" required>
              <DatePicker
                value={ticketData.expiryDate}
                onChange={(date) => setTicketData({ ...ticketData, expiryDate: date })}
                style={{ width: '100%' }}
                className="border p-2 rounded-md"
              />
            </Form.Item>

            <Form.Item label="Địa chỉ" required>
              <Input
                value={ticketData.location}
                onChange={(e) => setTicketData({ ...ticketData, location: e.target.value })}
                className="border p-2 rounded-md"
              />
            </Form.Item>

            <Form.Item label="Giá vé" required>
              <InputNumber
                value={ticketData.price}
                onChange={(value) => setTicketData({ ...ticketData, price: value })}
                min={0}
                style={{ width: '100%' }}
                className="border p-2 rounded-md"
              />
            </Form.Item>

            <Form.Item label="Chọn blog" required>
              <Select
                value={ticketData.blogId}
                onChange={(value) => setTicketData({ ...ticketData, blogId: value })}
                placeholder="Chọn blog"
                className="border rounded-md w-full"
              >
                {blogs.map((blog: any) => (
                  <Select.Option key={blog.id} value={blog.id}>
                    {blog.title}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Mô tả chi tiết vé" required>
              <TextArea
                value={ticketData.description}
                onChange={(e) => setTicketData({ ...ticketData, description: e.target.value })}
                className="border p-2 rounded-md"
              />
            </Form.Item>

            {/* Add Image URL input */}
            <Form.Item label="URL hình ảnh" required>
              <Input
                value={ticketData.imageUrl}
                onChange={(e) => setTicketData({ ...ticketData, imageUrl: e.target.value })}
                className="border p-2 rounded-md"
              />
            </Form.Item>

            <Form.Item label="Mã vé" required>
              <Input
                value={ticketData.code}
                onChange={(e) => setTicketData({ ...ticketData, code: e.target.value })}
                className="border p-2 rounded-md"
              />
            </Form.Item>

            <Form.Item>
              <Checkbox
                checked={ticketData.agreedTerms}
                onChange={(e) => setTicketData({ ...ticketData, agreedTerms: e.target.checked })}
              >
                Tôi đồng ý với các Điều khoản & Chính sách của TixFlow
              </Checkbox>
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              block
              className="bg-blue-500 text-white rounded-md py-2 font-semibold hover:bg-blue-600"
            >
              Tiến hành đăng bán
            </Button>

            <Button
              onClick={() => navigate('/ticket-sale')}
              style={{ marginTop: '10px' }}
              block
              className="bg-gray-300 text-black rounded-md py-2 mt-4"
            >
              Quay lại
            </Button>
          </Form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UploadTicketInfoPage;
