import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaList, FaTicketAlt, FaShoppingCart, FaUsers, FaUser } from 'react-icons/fa';
import Logo from '../Logo/Logo';
import './header.scss';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser, logout, selectUser } from '../../store/features/authSlice';
import { AppDispatch, RootState } from '../../store/store';
import { Dropdown, MenuProps } from 'antd';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector(selectUser);
  const dispatch = useDispatch<AppDispatch>();

  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const routeKeys = {
    '/': '1',
    '/blog': '2',
    '/ban-ve': '3',
    '/mua-ve': '4',
    '/ve-chung-toi': '5',
  } as const;

  // const getSelectedKeys = () => {
  //   const path = location.pathname as keyof typeof routeKeys;
  //   return routeKeys[path] || ''; 
  // };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  useEffect(() => {
    if (!user) {
      dispatch(loadUser()); 
    }
  }, [dispatch, user]);

 const profileMenu: MenuProps = {
    items: [
      {
        key: 'profile',
        label: 'Thông tin tài khoản',
        onClick: () => handleNavigate('/profile'),
      },
      {
        key: 'tickets',
        label: 'Quản lý vé đã mua',
        onClick: () => handleNavigate('/tickets'),
      },
      {
        key: 'history',
        label: 'Lịch sử giao dịch',
        onClick: () => handleNavigate('/transaction-history'),
      },
      {
        key: 'logout',
        label: 'Đăng xuất',
        onClick: handleLogout,
      },
    ],
  };

  return (
    <header className="header">
      <div className="logo" onClick={() => handleNavigate('/')} role="button" aria-label="Home">
        <Logo />
      </div>

      <nav className="navigation">
        <ul>
          {(Object.keys(routeKeys) as Array<keyof typeof routeKeys>).map((path) => (
            <li
              key={routeKeys[path]}
              className={location.pathname === path ? 'active' : ''}
              onClick={() => handleNavigate(path)}
              role="menuitem"
              aria-current={location.pathname === path ? 'page' : undefined}
            >
              {getIcon(path)} {getLabel(path)}
            </li>
          ))}
        </ul>
      </nav>

      <div className="auth-buttons">
        {isAuthenticated ? (
          <Dropdown menu={profileMenu} trigger={['click']}>
            <div className="profile-dropdown" role="button" aria-label="User profile">
              <FaUser className="user-icon" />
              <span className="user-name">Hi {user?.firstName}!</span>
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

  function getIcon(path: keyof typeof routeKeys) {
    switch (path) {
      case '/':
        return <FaHome />;
      case '/blog':
        return <FaList />;
      case '/ban-ve':
        return <FaShoppingCart />;
      case '/mua-ve':
        return <FaTicketAlt />;
      case '/ve-chung-toi':
        return <FaUsers />;
      default:
        return null;
    }
  }

  function getLabel(path: keyof typeof routeKeys) {
    switch (path) {
      case '/':
        return 'Trang chủ';
      case '/blog':
        return 'Blog Sự kiện';
      case '/ban-ve':
        return 'Bán vé';
      case '/mua-ve':
        return 'Mua vé';
      case '/ve-chung-toi':
        return 'Vé chúng tôi';
      default:
        return '';
    }
  }
};

export default Header;
