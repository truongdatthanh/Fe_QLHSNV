    import React, { useEffect, useState } from 'react';
    import { Table, Button, Space, Modal, Row, Col, Avatar } from 'antd';
    import { Link } from 'react-router-dom';
    import { UserOutlined } from '@ant-design/icons';
    import { api } from '../services/callAPI.service';
    import { formatDate } from '../utils/helpers/date';


    const EmployeeManagement = () => {
        const [employees, setEmployees] = useState([]);
        const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
        const [currentEmployee, setCurrentEmployee] = useState(null);
        const [contract, setContract] = useState(null);
        const [education, setEducation] = useState(null);

        const fetchEmployees = async () => {
            try {
                const res = await api.getAllEmployees();
                if (res.status === 200) {
                    setEmployees(res.data.data);
                } else {
                    alert("Lấy danh sách nhân viên thất bại");
                }
            } catch (error) {
                console.error("Error fetching employees:", error);
            }
        };

        const fetchContractByEmployee = async (employeeId) => {
            try {
                const res = await api.getContractByEmployeeId(employeeId);
                if (res.status === 200) {
                    setContract(res.data.data);
                } else {
                    alert("Lấy hợp đồng thất bại");
                    setContract(null);
                }
            } catch (error) {
                console.error("Error fetching contract:", error);
                setContract(null);
            }
        };

        const fectEducationByEmployee = async (employeeId) => {
            try {
                const res = await api.getEducationByEmployeeId(employeeId);
                console.log('Education data:', res.data.data); // Debug
                if (res.status === 200) {
                    setEducation(res.data.data);
                } else {
                    alert("Lấy trình độ học vấn thất bại");
                    setEducation(null);
                }
            } catch (error) {
                console.error("Error fetching Education:", error);
                setEducation(null);
            }
        };

        const handleViewDetails = async (employee) => {
            if (employee) {
                setCurrentEmployee(employee);
                await fetchContractByEmployee(employee._id);
                await fectEducationByEmployee(employee._id);
                setIsDetailModalVisible(true);
            }
        };

        useEffect(() => {
            fetchEmployees();
        }, []);

        const columns = [
            { title: 'ID', dataIndex: 'employeeCode', key: '_id' },
            { title: 'Họ và tên', dataIndex: 'fullName', key: 'fullName' },
            { title: 'Email', dataIndex: 'email', key: 'email' },
            { title: 'Số điện thoại', dataIndex: 'phoneNumber', key: 'phoneNumber' },
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
                    rowKey="_id"
                    pagination={{ pageSize: 8 }}
                    bordered
                    style={{ backgroundColor: 'white', borderRadius: '8px', cursor: 'pointer' }}
                    onRow={(record) => ({
                        onClick: () => handleViewDetails(record),
                    })}
                />

                <Modal
                    title="Hồ sơ nhân viên"
                    open={isDetailModalVisible}
                    onCancel={() => setIsDetailModalVisible(false)}
                    footer={null}
                    destroyOnClose
                    centered
                    width={1000}
                >
                    {currentEmployee && (
                        <div style={{ padding: '20px', background: '#fff', borderRadius: '8px' }}>
                            <Row gutter={16}>
                                <Col span={6} style={{ textAlign: 'center' }}>
                                    <Avatar size={100} icon={<UserOutlined />} />
                                    <p><strong>Chức vụ:</strong> {currentEmployee.position?.name}</p>
                                    <p><strong>Phòng ban:</strong> {currentEmployee.department?.name}</p>
                                </Col>
                                <Col span={18}>
                                    <div style={{ marginBottom: '20px' }}>
                                        <h2>Thông tin cá nhân</h2>
                                        <Row gutter={16}>
                                            <Col span={12}>
                                                <p><strong>Họ và Tên:</strong> {currentEmployee.fullName}</p>
                                                <p><strong>Giới tính:</strong> {currentEmployee.gender === 'Nam' ? 'Nam' : 'Nữ'}</p>
                                                <p><strong>Ngày sinh:</strong> {formatDate(currentEmployee.birthDate)}</p>
                                                <p><strong>Căn cước công dân:</strong> {currentEmployee.idCardNumber}</p>
                                                <p><strong>Ngày cấp:</strong> {formatDate(currentEmployee.idCardIssueDate)}</p>
                                            </Col>
                                            <Col span={12}>
                                                <p><strong>Số điện thoại:</strong> {currentEmployee.phoneNumber}</p>
                                                <p><strong>Email:</strong> {currentEmployee.email}</p>
                                                <p><strong>Tình trạng hôn nhân:</strong> {currentEmployee.maritalStatus}</p>
                                                <p><strong>Địa chỉ thường trú:</strong> {currentEmployee.address}</p>
                                            </Col>
                                        </Row>
                                    </div>

                                    {contract && (
                                        <div style={{ marginBottom: '20px' }}>
                                            <h2>Thông tin hợp đồng</h2>
                                            <Row gutter={16}>
                                                <Col span={12}>
                                                    <p><strong>Loại hợp đồng:</strong> {contract.contractType}</p>
                                                    <p><strong>Ngày bắt đầu:</strong> {formatDate(contract?.startDate)}</p>
                                                    <p><strong>Ngày kết thúc:</strong> {formatDate(contract?.endDate)}</p>
                                                </Col>
                                                <Col span={12}>
                                                    <p><strong>Chức vụ:</strong> {currentEmployee.position?.name}</p>
                                                    <p><strong>Phòng ban:</strong> {currentEmployee.department?.name}</p>
                                                    <p><strong>Mức lương:</strong> {contract.salary}</p>
                                                </Col>
                                            </Row>
                                        </div>
                                    )}

                                    {education ? (
                                        <div style={{ marginBottom: '20px' }}>
                                            <h2>Thông tin trình độ học vấn</h2>
                                            <Row gutter={16}>
                                                <Col span={12}>
                                                    <p><strong>Trình độ:</strong> {education.degree}</p>
                                                    <p><strong>Chuyên ngành:</strong> {education.major}</p>
                                                </Col>
                                                <Col span={12}>
                                                    <p><strong>Trường:</strong> {education.school}</p>
                                                    <p><strong>Năm tốt nghiệp:</strong> {education.graduationYear}</p>
                                                </Col>
                                            </Row>
                                        </div>
                                    ) : (
                                        <p>Đang tải thông tin học vấn...</p>
                                    )}

                                    <iframe
                                        src={currentEmployee?.cvFile}
                                        title="CV"
                                        width="100%"
                                        height="100vh"
                                        style={{ border: 'none' }}
                                    />
                                    <Button type="link" style={{ color: '#1890ff' }} onClick={() => window.open(currentEmployee?.cvFile, '_blank')}>
                                        Xem CV
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    )}
                </Modal>
            </div>
        );
    };

    export default EmployeeManagement;
