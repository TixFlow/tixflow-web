import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, Typography, Button, Space, Input, Select, Checkbox, Row, Col, Divider, message } from 'antd';
import './Payment.scss';
import Footer from '../../components/Footer/footer';
import Header from '../../components/Header/header';
import api from '../../config/axios';

const { Title, Text } = Typography;
const { Option } = Select;

const PaymentPage: React.FC = () => {
  const location = useLocation();
  const { ticket } = location.state as { ticket: any };
  
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [agreement, setAgreement] = useState(false);
  const [discountCode, setDiscountCode] = useState('');

  const handlePayment = async () => {
  if (!customerName || !phoneNumber || !email || !address) {
    message.warning("Vui lòng nhập đầy đủ thông tin khách hàng.");
    return;
  }
  
  if (!agreement) {
    message.warning("Bạn cần đồng ý với các Điều khoản & Chính sách của TixFlow trước khi thanh toán.");
    return;
  }

  const orderData = {
    ticketId: ticket.id,
    type: "buy_ticket",
    paymentMethod: "VNPay", 
    totalAmount: ticket.price.toString(), 
  };

  try {
    const response = await api.post('/orders', orderData);
    const order = response.data.data;

    if (order.status === 'pending') {
      const paymentResponse = await api.post(`/payos/create-payment-url`, {
        orderId: order.id,
        amount: order.totalAmount,
      });

      const paymentUrl = paymentResponse.data.data.paymentUrl;

      if (paymentUrl) {
        window.location.href = paymentUrl;
      } else {
        message.error("Không thể tạo URL thanh toán.");
      }
    } else {
      message.error("Đơn hàng không hợp lệ.");
    }
  } catch (error) {
    console.error("Lỗi thanh toán:", error);
    message.error("Đã xảy ra lỗi khi xử lý thanh toán.");
  }
};


  const handleDiscountCheck = () => {
    if (discountCode === "DISCOUNT50") {
      message.success("Mã giảm giá hợp lệ!");
    } else {
      message.error("Mã giảm giá không hợp lệ.");
    }
  };

  if (!ticket) {
    return <div>Không có vé để thanh toán.</div>;
  }

  return (
    <div>
      <Header />
      <div className="payment-page container mx-auto px-4 py-6 mt-12">
        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            <Card title="Thông tin thanh toán" className="payment-card">
              <Title level={4}>Thông tin khách hàng</Title>
              <Space direction="vertical" size="middle" className="customer-info">
                <Input placeholder="Họ và tên" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
                <Input placeholder="Số điện thoại" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input placeholder="Địa chỉ" value={address} onChange={(e) => setAddress(e.target.value)} />
              </Space>

              <Divider />

              <Title level={4}>Phương thức thanh toán</Title>
              <Select defaultValue="Momo" style={{ width: '100%' }}>
                <Option value="Momo">Ví điện tử Momo</Option>
                <Option value="VNPay">VNPay</Option>
                <Option value="ZaloPay">ZaloPay</Option>
                <Option value="CreditCard">Thẻ tín dụng/Thẻ ghi nợ</Option>
              </Select>
            </Card>
          </Col>

          <Col xs={24} md={12}>
            <Card title="Giỏ hàng của bạn" className="cart-summary-card">
              <Space direction="vertical" size="small" className="cart-summary">
                <Text><strong>{ticket.title}</strong></Text>
                <Text>{ticket.price.toLocaleString()} VNĐ</Text>
              </Space>

              <Divider />

              <div className="discount-code mt-4">
                <Input 
                  placeholder="Mã giảm giá" 
                  value={discountCode} 
                  onChange={(e) => setDiscountCode(e.target.value)} 
                  style={{ width: '70%', marginRight: '8px' }}
                />
                <Button type="primary" onClick={handleDiscountCheck}>Kiểm tra</Button>
              </div>

              <Divider />

              <Row justify="space-between" className="total-summary">
                <Text><strong>Tổng cộng</strong></Text>
                <Text>{ticket.price.toLocaleString()} VNĐ</Text>
              </Row>
              <Checkbox checked={agreement} onChange={(e) => setAgreement(e.target.checked)} className="mt-2">
                Tôi đồng ý với các Điều khoản & Chính sách của TixFlow
              </Checkbox>

              <Space size="middle" className="action-buttons mt-4">
                <Button onClick={() => window.history.back()}>Quay lại</Button>
                <Button type="primary" onClick={handlePayment}>Tiến hành thanh toán</Button>
              </Space>
            </Card>
          </Col>
        </Row>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentPage;
