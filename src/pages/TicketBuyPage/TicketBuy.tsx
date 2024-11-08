import React from 'react';
import { Button, Card, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { FileTextOutlined, CreditCardOutlined, CheckCircleOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import Footer from '../../components/Footer/footer';
import Header from '../../components/Header/header';
import './TicketBuy.scss';

const { Title, Paragraph } = Typography;

const TicketSaleInfoPage: React.FC = () => {
  const navigate = useNavigate();
  
  const handleUnderstandClick = () => {
    navigate('/upload-ticket-info');
  };

  return (
    <div>
      <Header />
      <div className="ticket-sale-info-page container mx-auto px-4 py-6 mt-12">
        <Card className="ticket-sale-info-card">
          <Title level={2}>Các bước đăng bán vé dễ dàng</Title>

          <div className="steps-description">
            <div className="step-item">
              <FileTextOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
              <Title level={4}>1. Chọn sự kiện và nhập thông tin vé</Title>
              <Paragraph>
                Chọn sự kiện mà bạn muốn bán vé và điền đầy đủ thông tin về vé bạn sở hữu, bao gồm giá và số lượng vé.
              </Paragraph>
            </div>

            <div className="step-item">
              <CreditCardOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
              <Title level={4}>2. Thanh toán phí dịch vụ</Title>
              <Paragraph>
                Để hoàn tất việc đăng bán vé, bạn cần thanh toán phí dịch vụ trên nền tảng của chúng tôi. Đây là khoản phí nhỏ để hỗ trợ duy trì hệ thống và bảo mật giao dịch.
              </Paragraph>
            </div>

            <div className="step-item">
              <CheckCircleOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
              <Title level={4}>3. Chờ người mua và nhận tiền</Title>
              <Paragraph>
                Khi người mua thanh toán vé của bạn, bạn sẽ nhận được khoản tiền trực tiếp vào tài khoản của mình. Chúng tôi đảm bảo quá trình thanh toán nhanh chóng và an toàn.
              </Paragraph>
            </div>

            <Title level={4}>Cam kết của chúng tôi</Title>
            <div className="step-item">
              <SafetyCertificateOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
              <Paragraph>
                - Bảo mật giao dịch và dữ liệu khách hàng tuyệt đối. <br />
                - Hệ thống vận hành 24/7, hỗ trợ mọi lúc. <br />
                - Phát triển và duy trì hệ thống kỹ thuật chuyên nghiệp.
              </Paragraph>
            </div>

            <Title level={4}>Chi phí dịch vụ</Title>
            <Paragraph>
              Phí dịch vụ chúng tôi thu được sẽ được sử dụng để duy trì và phát triển hệ thống. Với chi phí hợp lý, bạn có thể yên tâm rằng hệ thống sẽ luôn ổn định và hiệu quả.
            </Paragraph>
          </div>

          <Button type="primary" block onClick={handleUnderstandClick}>
            ĐÃ HIỂU, TIẾP TỤC
          </Button>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default TicketSaleInfoPage;
