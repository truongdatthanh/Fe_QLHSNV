import React from "react";
import { Card, Statistic, Row, Col, Typography } from "antd";
import { ShoppingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const summaryData = [
    { title: "Quản lý sản phẩm", value: 150, icon: <ShoppingOutlined />, color: "#1890ff", path: "/products" },
];

const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <div style={{ padding: 24 }}>
            <Title level={1} style={{ textAlign: "center", marginBottom: 24 }}>Bảng điều khiển</Title>
            
            <Row gutter={[16, 16]}>
                {summaryData.map((item, index) => (
                    <Col xs={24} sm={12} md={6} key={index}>
                      
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default Dashboard;