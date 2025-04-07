import React from "react";
import { Card, Statistic, Row, Col, Table, Typography } from "antd";
import { UserOutlined, UserAddOutlined, CheckCircleOutlined, StopOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";


const { Title } = Typography;

const summaryData = [
    { title: "Tổng nhân viên", value: 150, icon: <UserOutlined />, color: "#1890ff", path: "/employees" },
    { title: "Nhân viên mới", value: 12, icon: <UserAddOutlined />, color: "#52c41a", path: "/new-employees" },
    { title: "Đang làm việc", value: 135, icon: <CheckCircleOutlined />, color: "#faad14", path: "/active-employees" },
    { title: "Nghỉ việc", value: 15, icon: <StopOutlined />, color: "#ff4d4f", path: "/inactive-employees" },
];

const employeeData = [
    { month: "Jan", total: 120 },
    { month: "Feb", total: 130 },
    { month: "Mar", total: 140 },
    { month: "Apr", total: 150 },
];

const columns = [
    { title: "Họ và tên", dataIndex: "name", key: "name" },
    { title: "Chức vụ", dataIndex: "position", key: "position" },
    { title: "Ngày vào làm", dataIndex: "date", key: "date" },
];

const recentEmployees = [
    { key: 1, name: "Nguyễn Văn A", position: "Nhân viên IT", date: "01/03/2025" },
    { key: 2, name: "Trần Thị B", position: "Kế toán", date: "05/03/2025" },
    { key: 3, name: "Lê Văn C", position: "Marketing", date: "10/03/2025" },
];

const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <div style={{ padding: 24 }}>
            <Title level={1} style={{ textAlign: "center", marginBottom: 24 }}>Bảng điều khiển</Title>
            
            <Row gutter={[16, 16]}>
                {summaryData.map((item, index) => (
                    <Col xs={24} sm={12} md={6} key={index}>
                        <Card
                            hoverable
                            style={{ backgroundColor: item.color, color: "#fff", borderRadius: 10 }}
                            onClick={() => navigate(item.path)}
                        >
                            <Statistic
                                title={<span style={{ fontSize: "18px", fontWeight: "bold" }}>{item.title}</span>}
                                value={item.value}
                                prefix={item.icon}
                                valueStyle={{ color: "#fff", fontSize: "24px", fontWeight: "bold" }}
                            />
                        </Card>
                    </Col>
                ))}
            </Row>

            
        </div>
    );
};

export default Dashboard;
