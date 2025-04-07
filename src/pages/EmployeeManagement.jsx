import React, { useState } from 'react';
import { Table, Button, Space, Modal, Form, Input, Row, Col, Avatar, Upload } from 'antd';
import { Link } from 'react-router-dom';
import { UserOutlined, UploadOutlined } from '@ant-design/icons';

const EmployeeManagement = () => {

    

    const [employees, setEmployees] = useState([
        { 
            id: 1, 
            fullName: 'Nguyễn Văn A', 
            email: 'a@example.com', 
            phone: '0123456789', 
            address: 'Hà Nội',
            lastName: 'Nguyễn', 
            firstName: 'Văn A', 
            gender: 'male', 
            birthDate: '1990-01-01', 
            maritalStatus: 'single', 
            permanentAddress: '123 Đường Láng, Hà Nội',
            contractType: 'permanent', 
            contractStartDate: '2020-01-01', 
            contractEndDate: null,
            position: 'Developer', 
            department: 'IT', 
            salary: 15000000,
            educationLevel: 'bachelor', 
            major: 'Computer Science', 
            graduationYear: 2012,
            cvFile: 'https://example.com/cv.pdf' // Add CV file URL or file here
        },
        // Add other employees with their info
    ]);
    const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
    const [currentEmployee, setCurrentEmployee] = useState(null);

    const handleViewDetails = (employee) => {
        setCurrentEmployee(employee);
        setIsDetailModalVisible(true);
    };

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { 
            title: 'Họ và tên', 
            dataIndex: 'fullName', 
            key: 'fullName', 
            render: (text, record) => (
                <a onClick={() => handleViewDetails(record)}>{text}</a>
            )
        },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Số điện thoại', dataIndex: 'phone', key: 'phone' },
        { title: 'Địa chỉ', dataIndex: 'address', key: 'address' },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary">Sửa</Button>
                    <Button type="primary" danger>Xóa</Button>
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: '24px', background: '#f9f9f9', borderRadius: '8px' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '24px', fontWeight: 'bold', color: '#001529' }}>Quản lý nhân viên</h1>
            <div style={{ marginBottom: '16px', textAlign: 'right' }}>
                <Link to="/employees/add">
                    <Button type="primary">Thêm Hồ Sơ</Button>
                </Link>
            </div>
            <Table
                columns={columns}
                dataSource={employees}
                rowKey="id"
                pagination={{ pageSize: 8 }}
                bordered
                style={{ backgroundColor: 'white', borderRadius: '8px' }}
            />

            {/* Modal View Employee Details */}
            <Modal
                title="Hồ sơ nhân viên"
                visible={isDetailModalVisible}
                onCancel={() => setIsDetailModalVisible(false)}
                footer={null}
                destroyOnClose={true}
                centered
                width={800}
            >
                {currentEmployee && (
                    <div style={{ padding: '20px', background: '#fff', borderRadius: '8px' }}>
                        <Row gutter={16}>
                            <Col span={6} style={{ textAlign: 'center' }}>
                                <Avatar size={100} icon={<UserOutlined />} />
                                <h3>{currentEmployee.fullName}</h3>
                                <p>{currentEmployee.position}</p>
                            </Col>
                            <Col span={18}>
                                <div style={{ marginBottom: '20px' }}>
                                    <h2>Thông tin cá nhân</h2>
                                    <Row gutter={16}>
                                        <Col span={12}>
                                            <p><strong>Họ:</strong> {currentEmployee.lastName}</p>
                                            <p><strong>Tên:</strong> {currentEmployee.firstName}</p>
                                            <p><strong>Giới tính:</strong> {currentEmployee.gender === 'male' ? 'Nam' : 'Nữ'}</p>
                                            <p><strong>Ngày sinh:</strong> {currentEmployee.birthDate}</p>
                                        </Col>
                                        <Col span={12}>
                                            <p><strong>Số điện thoại:</strong> {currentEmployee.phone}</p>
                                            <p><strong>Email:</strong> {currentEmployee.email}</p>
                                            <p><strong>Tình trạng hôn nhân:</strong> {currentEmployee.maritalStatus}</p>
                                            <p><strong>Địa chỉ thường trú:</strong> {currentEmployee.permanentAddress}</p>
                                        </Col>
                                    </Row>
                                </div>

                                <div style={{ marginBottom: '20px' }}>
                                    <h2>Thông tin hợp đồng</h2>
                                    <Row gutter={16}>
                                        <Col span={12}>
                                            <p><strong>Loại hợp đồng:</strong> {currentEmployee.contractType}</p>
                                            <p><strong>Ngày bắt đầu:</strong> {currentEmployee.contractStartDate}</p>
                                            <p><strong>Ngày kết thúc:</strong> {currentEmployee.contractEndDate}</p>
                                        </Col>
                                        <Col span={12}>
                                            <p><strong>Chức vụ:</strong> {currentEmployee.position}</p>
                                            <p><strong>Phòng ban:</strong> {currentEmployee.department}</p>
                                            <p><strong>Mức lương:</strong> {currentEmployee.salary}</p>
                                        </Col>
                                    </Row>
                                </div>

                                <div>
                                    <h2>Trình độ học vấn</h2>
                                    <Row gutter={16}>
                                        <Col span={12}>
                                            <p><strong>Trình độ:</strong> {currentEmployee.educationLevel}</p>
                                            <p><strong>Chuyên ngành:</strong> {currentEmployee.major}</p>
                                        </Col>
                                        <Col span={12}>
                                            <p><strong>Năm tốt nghiệp:</strong> {currentEmployee.graduationYear}</p>
                                        </Col>
                                    </Row>
                                </div>

                                {/* CV File Attachment */}
                                {currentEmployee.cvFile && (
                                    <div style={{ marginTop: '20px' }}>
                                        <h2>Tài liệu đính kèm (CV)</h2>
                                        <a href={currentEmployee.cvFile} target="_blank" rel="noopener noreferrer">
                                            <Button type="link" style={{ color: '#1890ff' }}>Xem CV</Button>
                                        </a>
                                    </div>
                                )}
                            </Col>
                        </Row>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default EmployeeManagement;
