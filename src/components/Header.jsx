import React, { useState } from "react";
import { Layout, Typography, Avatar, Badge, Dropdown, Menu, Button } from "antd";
import { BellOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

const { Header } = Layout;
const { Title } = Typography;

const AppHeader = () => {
    const [currentDate] = useState(() => {
        const date = new Date();
        const weekdays = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
        return `${weekdays[date.getDay()]}, ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    });

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/auth/login", { replace: true });
    }

    const menu = (
        <Menu>
            <Menu.Item key="profile">Hồ sơ</Menu.Item>
            <Menu.Item key="logout" onClick={handleLogout}>
                Đăng xuất
            </Menu.Item>
        </Menu>
    );

    return (
        <Header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#fff", padding: "0 24px", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" }}>
            <div>

                <span style={{ fontSize: "14px", color: "#888" }}>{currentDate}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <Badge count={5}>
                    <BellOutlined style={{ fontSize: "20px", cursor: "pointer" }} />
                </Badge>
                <SettingOutlined style={{ fontSize: "20px", cursor: "pointer" }} />
                <Dropdown overlay={menu} placement="bottomRight">
                    <Avatar size={40} icon={<UserOutlined />} />
                </Dropdown>
            </div>
        </Header>
    );
};

export default AppHeader;
