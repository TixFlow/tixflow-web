
import Footer from '../../components/Footer/footer';
import Header from '../../components/Header/header';
import './profile.scss';

const purchasedTickets = [
  { id: 1, title: 'Vé Đêm 2 - Anh Trai Say Hi Concert 2024', price: '200,000 VND', date: '20/04/2024', time: '19 PM' },
  { id: 2, title: 'Vé Festival Âm Nhạc 2024', price: '300,000 VND', date: '22/04/2024', time: '18 PM' },
];

const soldTickets = [
  { id: 1, title: 'Vé Đêm Nhạc Hoành Tráng', price: '250,000 VND', date: '25/04/2024', time: '19 PM' },
  { id: 2, title: 'Vé Sự Kiện Thể Thao 2024', price: '150,000 VND', date: '30/04/2024', time: '17 PM' },
];

const ProfilePage = () => {
  return (
    <div>
        <Header/>
    <div className="container mx-auto p-6">
      <div className="flex items-start space-x-6 mb-6">
        <img
          src="https://via.placeholder.com/100"
          alt="User Avatar"
          className="w-24 h-24 rounded-full object-cover shadow-lg"
        />
        <div>
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">THÔNG TIN CÁ NHÂN</h2>
          <p><strong>Họ và Tên:</strong> Nguyễn Văn A</p>
          <p><strong>Số điện thoại:</strong> 090******9</p>
          <p><strong>Email:</strong> ng******@gmail.com</p>
          <p><strong>Địa chỉ:</strong> ***, Bình Dương</p>
          <p><strong>Điểm đánh giá:</strong> 5.0 / 5.0 ⭐</p>
          <button className="mt-2 bg-purple-500 hover:bg-purple-600 text-white py-1 px-4 rounded shadow-md">CHỈNH SỬA</button>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">QUẢN LÝ VÉ ĐÃ MUA CỦA BẠN</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {purchasedTickets.map((ticket) => (
            <div key={ticket.id} className="bg-gray-100 p-4 rounded shadow-sm hover:shadow-md transition-shadow">
              <img src="https://via.placeholder.com/150" alt="Event" className="w-full h-24 object-cover rounded mb-2" />
              <p className="text-sm font-semibold text-gray-800">{ticket.title}</p>
              <p className="text-xs text-gray-500">{ticket.price} | {ticket.date} | {ticket.time}</p>
            </div>
          ))}
        </div>
        <button className="mt-2 text-blue-500 hover:underline">Xem thêm...</button>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">QUẢN LÝ VÉ ĐANG BÁN CỦA BẠN</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {soldTickets.map((ticket) => (
            <div key={ticket.id} className="bg-gray-100 p-4 rounded shadow-sm hover:shadow-md transition-shadow">
              <img src="https://via.placeholder.com/150" alt="Event" className="w-full h-24 object-cover rounded mb-2" />
              <p className="text-sm font-semibold text-gray-800">{ticket.title}</p>
              <p className="text-xs text-gray-500">{ticket.price} | {ticket.date} | {ticket.time}</p>
            </div>
          ))}
        </div>
        <button className="mt-2 text-blue-500 hover:underline">Xem thêm...</button>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">LỊCH SỬ GIAO DỊCH</h3>
        <div className="bg-gray-100 p-4 rounded shadow-sm">
          <p>15/10/2024 - Thanh toán cho giao dịch 151002410023024 - 1,000,000 VND</p>
          <p>14/10/2024 - Thanh toán cho giao dịch 151002410023025 - 500,000 VND</p>
          <p>13/10/2024 - Thanh toán cho giao dịch 151002410023026 - 750,000 VND</p>
        </div>
        <button className="mt-2 text-blue-500 hover:underline">Xem thêm...</button>
      </div>
    </div>
<Footer/>
    </div>
  );
};

export default ProfilePage;
