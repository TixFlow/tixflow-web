import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaList, FaTicketAlt, FaShoppingCart, FaUsers, FaUser } from 'react-icons/fa';
import Logo from '../Logo/Logo';
import "./header.scss";
import { useDispatch} from 'react-redux';
import Cookies from 'js-cookie';
import { logout } from '../../store/features/authSlice';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = Cookies.get('token');
  const dispatch = useDispatch();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const getSelectedKeys = () => {
    switch (location.pathname) {
      case '/':
        return '1';
      case '/blog':
        return '2';
      case '/ban-ve':
        return '3';
      case '/mua-ve':
        return '4';
      case '/ve-chung-toi':
        return '5';
      default:
        return '';
    }
  };

  const handleLogout = () => {
    dispatch(logout()); 
    navigate('/'); 
  };

  return (
    <header className="header">
      <div className="logo" onClick={() => handleNavigate('/')}>
        <Logo />
      </div>

      <nav className="navigation">
        <ul>
          <li className={getSelectedKeys() === '1' ? 'active' : ''} onClick={() => handleNavigate('/')}>
            <FaHome /> Trang chủ
          </li>
          <li className={getSelectedKeys() === '2' ? 'active' : ''} onClick={() => handleNavigate('/blog')}>
            <FaList /> Blog Sự kiện
          </li>
          <li className={getSelectedKeys() === '3' ? 'active' : ''} onClick={() => handleNavigate('/ban-ve')}>
            <FaShoppingCart /> Bán vé
          </li>
          <li className={getSelectedKeys() === '4' ? 'active' : ''} onClick={() => handleNavigate('/mua-ve')}>
            <FaTicketAlt /> Mua vé
          </li>
          <li className={getSelectedKeys() === '5' ? 'active' : ''} onClick={() => handleNavigate('/ve-chung-toi')}>
            <FaUsers /> Vé chúng tôi
          </li>
        </ul>
      </nav>

    <div className="auth-buttons">
        {token ? (

          <>
            <FaUser className="user-icon" onClick={() => handleNavigate('/profile')} /> 
            <button onClick={handleLogout}>Đăng xuất</button>
          </>
        ) : (
          <>
            <button onClick={() => handleNavigate('/dang-nhap')}>Đăng nhập</button>
            <button onClick={() => handleNavigate('/dang-ky')}>Đăng ký</button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
