import React, { useEffect, useState } from "react";
import { Layout, Menu, Typography } from "antd";
import { ShoppingOutlined, UserOutlined, HomeOutlined } from "@ant-design/icons"; // Import thêm HomeOutlined
import { NavLink } from "react-router-dom";
import { api } from "../services/callAPI.service";

const { Sider } = Layout;
const { Title } = Typography;

const Sidebar = () => {
    const [user, setUser] = useState([]);

    useEffect(() => {
        const getUser = async () => {
            const token = localStorage.getItem("token");
            try {
                const res = await api.getMe(token);
                console.log("res", res.data.data.username);
                const data = res.data.data;
                setUser(data);
            } catch (err) {
                console.log('Lỗi lấy thông tin user:', err);
            }
        };
        getUser();
    }, [setUser]);

    return (
        <Sider collapsible style={{ minHeight: "100vh", background: "#001529" }}>
            <div style={{ textAlign: "center", padding: "16px" }}>
                <img
                    src="https://www.google.com.vn/url?sa=i&url=https%3A%2F%2Fwww.nhaccuatui.com%2Fnghe-si-son-tung-mtp.html&psig=AOvVaw16dVHwvl6ZWgqiZQ2Zx3QP&ust=1744090985379000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPiA_a6bxYwDFQAAAAAdAAAAABAE"
                    alt="Avatar"
                    style={{ borderRadius: "50%", marginBottom: "8px" }}
                />
                <Title level={4} style={{ color: "#fff" }}>{user.username}</Title>
            </div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={["home"]}>
                <Menu.Item key="home" icon={<HomeOutlined />}>
                    <NavLink to="/">Trang Chủ</NavLink>
                </Menu.Item>
                <Menu.Item key="products" icon={<ShoppingOutlined />}>
                    <NavLink to="/products">Quản Lý Sản Phẩm</NavLink>
                </Menu.Item>
                <Menu.Item key="categories" icon={<ShoppingOutlined />}>
                    <NavLink to="/categories">Quản Lý Danh Mục</NavLink>
                </Menu.Item>
                <Menu.Item key="users" icon={<UserOutlined />}>
                    <NavLink to="/users">Quản Lý Người Dùng</NavLink>
                </Menu.Item>
            </Menu>
        </Sider>
    );
};

export default Sidebar;