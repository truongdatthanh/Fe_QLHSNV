import React from 'react';
import { Avatar, Button, Dropdown, Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';

const { Header } = Layout;

const HeaderComponent = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/auth/login", { replace: true });
    }

    const menu = (
            <Menu>
                <Menu.Item key="profile">Hồ sơ</Menu.Item>
                <Menu.Item key="change-password" onClick={() => navigate('/auth/change-password')}>
                    Thay đổi mật khẩu
            </Menu.Item>
            <Menu.Item key="logout" onClick={handleLogout}>
                    Đăng xuất
                </Menu.Item>
            </Menu>
        );
    return (
        <>
            <Header
                style={{
                    background: '#fff',
                    padding: '0 40px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <div style={{ fontSize: '24px', fontWeight: 'bold' }}>Logo</div>

                <div style={{ flex: 1, marginLeft: '40px' }}>
                    <Menu
                        mode="horizontal"
                        theme="light"
                        style={{ lineHeight: '64px', justifyContent: 'flex-end' }}
                    >
                        <Menu.Item key="1" onClick={() => navigate('/')}>Trang chủ</Menu.Item>
                        <Menu.Item key="2" onClick={() => navigate('/about')}>Giới thiệu</Menu.Item>
                        <Menu.Item key="3" onClick={() => navigate('/products')}>Sản phẩm</Menu.Item>
                        <Menu.Item key="4" onClick={() => navigate('/carts')}>Giỏ hàng</Menu.Item>
                    </Menu>
                </div>

                <Dropdown overlay={menu} placement="bottomRight">
                    <Avatar size={40} icon={<UserOutlined />} />
                </Dropdown>
            </Header>
        </>
    );
};

export default HeaderComponent;
