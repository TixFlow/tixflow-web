import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaList, FaTicketAlt, FaShoppingCart, FaUsers, FaUser } from 'react-icons/fa';
import Logo from '../Logo/Logo';
import "./header.scss";
import { useDispatch, useSelector} from 'react-redux';
import { logout, selectUser } from '../../store/features/authSlice';
import { AppDispatch } from '../../store/store';
import { Dropdown, Menu } from 'antd';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector(selectUser);
  const dispatch = useDispatch<AppDispatch>();

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

  const profileMenu = (
    <Menu>
      <Menu.Item key="profile" onClick={() => handleNavigate('/profile')}>
        Thông tin tài khoản
      </Menu.Item>
      <Menu.Item key="tickets" onClick={() => handleNavigate('/tickets')}>
        Quản lý vé đã mua
      </Menu.Item>
      <Menu.Item key="history" onClick={() => handleNavigate('/transaction-history')}>
        Lịch sử giao dịch
      </Menu.Item>
      <Menu.Item key="logout" onClick={handleLogout}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

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
        {user?.firstName ? (
          <Dropdown overlay={profileMenu} trigger={['click']}>
            <div className="profile-dropdown">
              <FaUser className="user-icon" />
                <span className="user-name">Hi {user.firstName}!</span>
            </div>
          </Dropdown>
          
        ) : (
          <>
            <button onClick={() => handleNavigate('/sign-in')}>Đăng nhập</button>
            <button onClick={() => handleNavigate('/sign-up')}>Đăng ký</button>
          </>
        )}
      </div>

    </header>
  );
};

export default Header;
