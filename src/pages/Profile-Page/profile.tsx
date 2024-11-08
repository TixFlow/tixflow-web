import { useEffect, useState } from 'react';
import api from '../../config/axios';
import './profile.scss';
import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';
import Cookies from "js-cookie";
import Loading from '../../components/Loading/Loading';
import { Modal, Button, Input, Carousel } from 'antd';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [password, setPassword] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [boughtTickets, setBoughtTickets] = useState<any[]>([]);
  const [sellingTickets, setSellingTickets] = useState<any[]>([]);

  const token = Cookies.get("tokenn");

  useEffect(() => {
    api.get('/auth/verify', { headers: { Authorization: `Bearer ${token}` } })
      .then(response => {
        setUser(response.data.user);
        setPassword(response.data.user.password || '');  
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        setLoading(false);
      });
  }, [token]);

   useEffect(() => {
    api.get('/tickets/my/bought', { headers: { Authorization: `Bearer ${token}` } })
      .then(response => setBoughtTickets(response.data))
      .catch(error => console.error("Error fetching bought tickets:", error));
    console.log(token);
    api.get('/tickets/my/uploaded', { headers: { Authorization: `Bearer ${token}` } })
      .then(response => setSellingTickets(response.data.data))
      .catch(error => console.error("Error fetching selling tickets:", error));
  }, [token]);

  const handleUpdateProfile = async () => {
    try {
      const response = await api.put(`/users/${user.id}`, { ...user, password }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data);
      setIsModalVisible(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Failed to update profile.");
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  if (loading) return <Loading />;

  return (
    <div>
      <Header />
      <div className="profile-container mt-12">
        <div className="profile-header">
          <div className="profile-avatar">
            <img
              src={user?.avatarUrl || "https://via.placeholder.com/100"}
              alt="User Avatar"
              className="rounded-full w-24 h-24 shadow-lg"
            />
          </div>
          <div className="profile-info">
            <h2 className="text-2xl font-semibold text-gray-800">{user?.firstName} {user?.lastName}</h2>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Số điện thoại:</strong> {user?.phoneNumber}</p>
            <p><strong>Giới tính:</strong> {user?.gender}</p>
            <Button onClick={showModal} className="edit-button">Chỉnh sửa</Button>
          </div>
        </div>

        <Modal
          title="Chỉnh sửa thông tin"
          open={isModalVisible}
          onOk={handleUpdateProfile}
          onCancel={handleModalCancel}
          okText="Lưu thay đổi"
          cancelText="Hủy"
        >
          <label>First Name</label>
          <Input
            value={user?.firstName}
            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
          />
          <label>Last Name</label>
          <Input
            value={user?.lastName}
            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
          />
          <label>Phone Number</label>
          <Input
            value={user?.phoneNumber}
            onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
          />
        </Modal>

        <div className="ticket-management">
          <section className="section">
            <h3 className="section-title">Vé Đã Mua</h3>
            <div className="ticket-grid">
              {boughtTickets.length > 0 ? (
                boughtTickets.map(ticket => (
                  <div key={ticket.id} className="ticket-item">
                    <img src={ticket.imageUrl || "https://via.placeholder.com/150"} alt={ticket.title} className="ticket-image" />
                    <h4>{ticket.title}</h4>
                    <p><strong>Description:</strong> {ticket.description}</p>
                    <p><strong>Location:</strong> {ticket.location}</p>
                    <p><strong>Code:</strong> {ticket.code}</p>
                    <p><strong>Price:</strong> {ticket.price}</p>
                  </div>
                ))
              ) : (
                <p>Chưa có vé đã mua.</p>
              )}
            </div>
          </section>

         <section className="section">
  <h3 className="section-title">Vé Đang Bán</h3>
  {sellingTickets.length > 0 ? (
    <Carousel dots={false} slidesToShow={4} arrows className="ticket-carousel">
      {sellingTickets.map(ticket => (
        <div key={ticket.id} className="ticket-item">
          <Link to={`/ticket-detail/${ticket.id}`}>
            <img 
              src={ticket.imageUrl || "https://via.placeholder.com/150"} 
              alt={ticket.title} 
              className="ticket-image" 
            />
            <h4 className="ticket-title">{ticket.title}</h4>
          </Link>
        </div>
      ))}
    </Carousel>
  ) : (
    <p>Chưa có vé đang bán.</p>
  )}
</section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
