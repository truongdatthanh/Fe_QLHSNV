import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Modal, Row, Col, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { api } from '../services/callAPI.service';

const EmployeeManagement = () => {

    const [employees, setEmployees] = useState([]);
    const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
    const [currentEmployee, setCurrentEmployee] = useState(null);

    const handleViewDetails = (employee) => {
        console.log("Employee data:", employee); 
        if (employee) {
            setCurrentEmployee(employee);
            setIsDetailModalVisible(true);
        }
    };

    useEffect(() => { 
        if (currentEmployee) {
            console.log("Current employee updated:", currentEmployee);
            setIsDetailModalVisible(true);
        }
    }, [currentEmployee]);

    useEffect(() => {
        const getAllEmployees = async () => {
            try {
                const res = await api.getAllEmployees();
                if (res.status === 200) {
                    const employeesData = res.data.data;
                    console.log("Danh sách nhân viên:", employeesData);
                    setEmployees(employeesData);
                } else {
                    alert("Lấy danh sách nhân viên thất bại");
                }
            } catch (error) {
                console.error("Error fetching employees:", error);
            }
        }

        getAllEmployees()
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
                    onClick: () => handleViewDetails(record), // Gọi hàm khi click vào một dòng
                })}
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
                                <p><strong>Chức vụ:</strong> {currentEmployee.position?.name}</p>
                                <p><strong>Phòng ban:</strong> {currentEmployee.department?.name}</p>
                            </Col>
                            <Col span={18}>
                                <div style={{ marginBottom: '20px' }}>
                                    <h2>Thông tin cá nhân</h2>
                                    <Row gutter={16}>
                                        <Col span={12}>
                                            <p><strong>Họ và Tên:</strong> {currentEmployee.fullName}</p>
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


// import React, { useEffect, useState } from 'react';
// import { Table, Button, Space, Modal, Row, Col, Avatar } from 'antd';
// import { Link } from 'react-router-dom';
// import { UserOutlined, UploadOutlined } from '@ant-design/icons';
// import { api } from '../services/callAPI.service';

// const EmployeeManagement = () => {

//     const [employees, setEmployees] = useState([]);
//     const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
//     const [currentEmployee, setCurrentEmployee] = useState(null);

//     const handleViewDetails = (employee) => {
//         const employeeData = JSON.stringify(employee);
//         console.log("Employee data:", employeeData); // Log the employee data
//         setCurrentEmployee(employeeData);
//         setIsDetailModalVisible(true);
//     };

//     useEffect(() => {
//         const getAllEmployees = async () => {
//             try {
//                 const res = await api.getAllEmployees();
//                 if (res.status === 200) {
//                     const employeesData = res.data.data;
//                     console.log("Danh sách nhân viên:", employeesData);
//                     setEmployees(employeesData);
//                 } else {
//                     alert("Lấy danh sách nhân viên thất bại");
//                 }
//             } catch (error) {
//                 console.error("Error fetching employees:", error);
//             }
//         };

//         getAllEmployees();
//     }, []);

//     const columns = [
//         { title: 'ID', dataIndex: 'employeeCode', key: 'id' },
//         { title: 'Họ và tên', dataIndex: 'fullName', key: 'fullName' },
//         { title: 'Email', dataIndex: 'email', key: 'email' },
//         { title: 'Số điện thoại', dataIndex: 'phoneNumber', key: 'phoneNumber' },
//         { title: 'Địa chỉ', dataIndex: 'address', key: 'address' },
//         {
//             title: 'Thao tác',
//             key: 'action',
//             render: (_, record) => (
//                 <Space size="middle">
//                     <Button type="primary">Sửa</Button>
//                     <Button type="primary" danger>Xóa</Button>
//                 </Space>
//             ),
//         },
//     ];

//     return (
//         <div style={{ padding: '24px', background: '#f9f9f9', borderRadius: '8px' }}>
//             <h1 style={{ textAlign: 'center', marginBottom: '24px', fontWeight: 'bold', color: '#001529' }}>Quản lý nhân viên</h1>
//             <div style={{ marginBottom: '16px', textAlign: 'right' }}>
//                 <Link to="/employees/add">
//                     <Button type="primary">Thêm Hồ Sơ</Button>
//                 </Link>
//             </div>

//             <Table
//                 columns={columns}
//                 dataSource={employees}
//                 rowKey="id"
//                 pagination={{ pageSize: 8 }}
//                 bordered
//                 style={{ backgroundColor: 'white', borderRadius: '8px', cursor: 'pointer' }}
//                 onRow={(record) => ({
//                     onClick: () => handleViewDetails(record), // Gọi hàm khi click vào một dòng
//                 })}
//             />

//             {/* Modal View Employee Details */}
//             <Modal
//                 title="Hồ sơ nhân viên"
//                 visible={isDetailModalVisible}
//                 onCancel={() => setIsDetailModalVisible(false)}
//                 footer={null}
//                 destroyOnClose={true}
//                 centered
//                 width={800}
//             >
//                 {currentEmployee && (
//                     <div style={{ padding: '20px', background: '#fff', borderRadius: '8px' }}>
//                         <Row gutter={16}>
//                             <Col span={6} style={{ textAlign: 'center' }}>
//                                 <Avatar size={100} icon={<UserOutlined />} />
//                                 <h3>{currentEmployee.fullName}</h3>
//                                 <p>{currentEmployee.position}</p>
//                             </Col>
//                             <Col span={18}>
//                                 <div style={{ marginBottom: '20px' }}>
//                                     <h2>Thông tin cá nhân</h2>
//                                     <Row gutter={16}>
//                                         <Col span={12}>
//                                             <p><strong>Giới tính:</strong> {currentEmployee.gender === 'male' ? 'Nam' : 'Nữ'}</p>
//                                             <p><strong>Ngày sinh:</strong> {currentEmployee.birthDate}</p>
//                                         </Col>
//                                         <Col span={12}>
//                                             <p><strong>Số điện thoại:</strong> {currentEmployee.phoneNumber}</p>
//                                             <p><strong>Email:</strong> {currentEmployee.email}</p>
//                                             <p><strong>Tình trạng hôn nhân:</strong> {currentEmployee.maritalStatus}</p>
//                                             <p><strong>Địa chỉ thường trú:</strong> {currentEmployee.address}</p>
//                                         </Col>
//                                     </Row>
//                                 </div>

//                                 <div style={{ marginBottom: '20px' }}>
//                                     <h2>Thông tin hợp đồng</h2>
//                                     <Row gutter={16}>
//                                         <Col span={12}>
//                                             <p><strong>Loại hợp đồng:</strong> {currentEmployee.contractType}</p>
//                                             <p><strong>Ngày bắt đầu:</strong> {currentEmployee.contractStartDate}</p>
//                                             <p><strong>Ngày kết thúc:</strong> {currentEmployee.contractEndDate}</p>
//                                         </Col>
//                                         <Col span={12}>
//                                             <p><strong>Chức vụ:</strong> {currentEmployee.position}</p>
//                                             <p><strong>Phòng ban:</strong> {currentEmployee.department}</p>
//                                             <p><strong>Mức lương:</strong> {currentEmployee.salary}</p>
//                                         </Col>
//                                     </Row>
//                                 </div>

//                                 <div>
//                                     <h2>Trình độ học vấn</h2>
//                                     <Row gutter={16}>
//                                         <Col span={12}>
//                                             <p><strong>Trình độ:</strong> {currentEmployee.educationLevel}</p>
//                                             <p><strong>Chuyên ngành:</strong> {currentEmployee.major}</p>
//                                         </Col>
//                                         <Col span={12}>
//                                             <p><strong>Năm tốt nghiệp:</strong> {currentEmployee.graduationYear}</p>
//                                         </Col>
//                                     </Row>
//                                 </div>

//                                 {/* CV File Attachment */}
//                                 {currentEmployee.cvFile && (
//                                     <div style={{ marginTop: '20px' }}>
//                                         <h2>Tài liệu đính kèm (CV)</h2>
//                                         <a href={currentEmployee.cvFile} target="_blank" rel="noopener noreferrer">
//                                             <Button type="link" style={{ color: '#1890ff' }}>Xem CV</Button>
//                                         </a>
//                                     </div>
//                                 )}
//                             </Col>
//                         </Row>
//                     </div>
//                 )}
//             </Modal>
//         </div>
//     );
// };

// export default EmployeeManagement;
