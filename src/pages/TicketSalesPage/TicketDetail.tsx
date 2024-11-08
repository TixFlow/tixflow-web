import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Row, Space, Typography, Modal, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../config/axios';  

import './TicketDetail.scss';
import Footer from '../../components/Footer/footer';
import Header from '../../components/Header/header';
import Loading from '../../components/Loading/Loading';
import Cookies from 'js-cookie';

const { Title, Text } = Typography;

interface TicketDetail {
  id: string;
  title: string;
  description: string;
  location: string;
  code: string;
  expiryDate: string;
  imageUrl: string;
  price: number;
  userId: string; // Thêm thuộc tính để xác định người sở hữu
}

const TicketDetailPage: React.FC = () => {
  const { ticketId } = useParams<{ ticketId: string }>(); 
  const [ticket, setTicket] = useState<TicketDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const navigate = useNavigate();

  const userId = Cookies.get("userId"); 

  useEffect(() => {
    const fetchTicketDetail = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/tickets/${ticketId}`);
        setTicket(response.data.data);  
        setLoading(false);
      } catch (error) {
        console.error('Lỗi khi lấy thông tin vé:', error);
        setLoading(false);
      }
    };

    fetchTicketDetail();
  }, [ticketId]);

  const handleBuyNow = () => {
    if (ticket) {
      navigate(`/payment/${ticket.id}`, { state: { ticket } });
    }
  };

  const handleCancelSale = async () => {
  if (!ticket) {
    message.error("Vé không hợp lệ.");
    return;
  }

  try {
    await api.delete(`/tickets/${ticket.id}`, {
      headers: { Authorization: `Bearer ${Cookies.get('token')}` }
    });
    message.success("Vé đã được hủy bán thành công!");
    setIsModalVisible(false);
    navigate('/ticket-buy'); 
  } catch (error) {
    console.error("Lỗi khi hủy bán vé:", error);
    message.error("Không thể hủy bán vé.");
  }
};

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  if (loading) {
    return <Loading />; 
  }

  if (!ticket) {
    return <div>Không tìm thấy vé</div>;
  }

  const isUserTicketOwner = ticket.userId === userId;

  return (
    <div>
      <Header />
      <div className="ticket-detail-page container mx-auto px-4 py-6 mt-12">
        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            <Card
              hoverable
              cover={<img alt={ticket.title} src={ticket.imageUrl} className="w-full h-auto" />}
              className="ticket-card mb-4"
            />
          </Col>
          <Col xs={24} md={12}>
            <Card className="ticket-card">
              <Title level={2}>{ticket.title}</Title>
              <Text strong>Mô tả: </Text>
              <Text>{ticket.description}</Text>
              <div className="ticket-info mt-6">
                <Space direction="vertical">
                  <Text><strong>Ngày sự kiện:</strong> {new Date(ticket.expiryDate).toLocaleDateString()}</Text>
                  <Text><strong>Địa điểm:</strong> {ticket.location}</Text>
                  <Text><strong>Mã vé:</strong> {ticket.code}</Text>
                  <Text><strong>Giá vé:</strong> {ticket.price.toLocaleString()} VNĐ</Text>
                </Space>
              </div>
              {isUserTicketOwner ? (
                <Button type="primary" className="mt-4" onClick={showModal}>Hủy bán</Button>
              ) : (
                <Button type="primary" className="mt-4" onClick={handleBuyNow}>Mua ngay</Button>
              )}
            </Card>
          </Col>
        </Row>

        <Modal
          title="Xác nhận hủy bán vé"
          open={isModalVisible}
          onOk={handleCancelSale}
          onCancel={handleModalCancel}
          okText="Xác nhận"
          cancelText="Hủy"
        >
          <p>Bạn có chắc chắn muốn hủy bán vé này không?</p>
        </Modal>
      </div>
      <Footer />
    </div>
  );
};

export default TicketDetailPage;
