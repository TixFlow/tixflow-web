import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer bg-gray-50 py-10 px-20">
      <div className="footer-content container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="footer-section">
          <h3 className="footer-title">TÀI KHOẢN CỦA BẠN</h3>
          <ul className="footer-list">
            <li>THÔNG TIN TÀI KHOẢN</li>
            <li>VÉ ĐÃ ĐĂNG BÁN</li>
            <li>VÉ ĐÃ MUA</li>
            <li>GÓI DỊCH VỤ CỦA BẠN</li>
            <li>QUẢN LÍ THU NHẬP</li>
            <li>VÔ HIỆU HOÁ TÀI KHOẢN</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">VỀ CHÚNG TÔI</h3>
          <ul className="footer-list">
            <li>MẠNG XÃ HỘI</li>
            <li>NGƯỜI PHÁT TRIỂN</li>
            <li>CHÍNH SÁCH QUYỀN RIÊNG TƯ</li>
            <li>CHÍNH SÁCH SỬ DỤNG</li>
            <li>CHÍNH SÁCH DỊCH VỤ</li>
            <li>LIÊN HỆ HỢP TÁC</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">TRANG</h3>
          <ul className="footer-list">
            <li>TRANG CHỦ</li>
            <li>MUA VÉ</li>
            <li>BÁN VÉ</li>
            <li>VÉ ĐÃ MUA</li>
            <li>CÁC CHÍNH SÁCH</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">THEO DÕI CHÚNG TÔI</h3>
          <ul className="footer-list">
            <li>FACEBOOK</li>
            <li>INSTAGRAM</li>
            <li>TIKTOK</li>
          
            <Link to="/" className="footer-logo-link">
                <Logo/>
              </Link>
          </ul>
        </div>
      </div>

      <div className="footer-bottom text-center border-t border-gray-300 mt-8 pt-4">
        <p className="text-gray-500 text-sm">© Bản quyền ©2024 TixFlow. Bảo lưu mọi quyền</p>
      </div>
    </footer>
  );
};

export default Footer;
