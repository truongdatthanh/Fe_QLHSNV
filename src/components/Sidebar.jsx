import React, { useEffect, useState } from "react";
import { Layout, Menu, Typography } from "antd";
import {
    TeamOutlined,
    ApartmentOutlined,
    SolutionOutlined,
    FileTextOutlined,
    UserSwitchOutlined,
    BarChartOutlined,
    HomeOutlined,
    GiftOutlined,
} from "@ant-design/icons";
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
        }
        getUser();
    }, [setUser]);

    console.log("user", user.role);

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
            <Menu theme="dark" mode="inline" defaultSelectedKeys={["/"]}>
                <Menu.Item key="/" icon={<HomeOutlined  />}>
                    <NavLink to="/">Trang Chủ</NavLink>
                </Menu.Item>
                <Menu.Item key="/employees" icon={<TeamOutlined />}>
                    <NavLink to="/employees">Quản Lý Nhân Viên</NavLink>
                </Menu.Item>
                <Menu.Item key="/departments" icon={<ApartmentOutlined />}>
                    <NavLink to="/departments">Quản Lý Phòng Ban</NavLink>
                </Menu.Item>
                <Menu.Item key="/positions" icon={<SolutionOutlined />}>
                    <NavLink to="/positions">Quản Lý Chức Vụ</NavLink>
                </Menu.Item>
                <Menu.Item key="/contracts" icon={<FileTextOutlined />}>
                    <NavLink to="/contracts">Hợp Đồng Lao Động</NavLink>
                </Menu.Item>
                <Menu.Item key="/recruitment" icon={<UserSwitchOutlined />}>
                    <NavLink to="/recruitment">Tuyển Dụng</NavLink>
                </Menu.Item>
                <Menu.Item key="/reward" icon={<GiftOutlined  />}>
                    <NavLink to="/reward">Quản lý khen thưởng</NavLink>
                </Menu.Item>
                <Menu.Item key="/reports" icon={<BarChartOutlined />}>
                    <NavLink to="/reports">Báo Cáo & Thống Kê</NavLink>
                </Menu.Item>
            </Menu>
        </Sider >
    );
};

export default Sidebar;
