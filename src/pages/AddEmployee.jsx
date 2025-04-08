import React, { use, useEffect, useState } from 'react';
import { Tabs, Form, Input, DatePicker, Button, Upload, Row, Col, Select, Avatar, InputNumber, Space } from 'antd';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { api } from '../services/callAPI.service';

const { TabPane } = Tabs;
const { Option } = Select;

const AddEmployee = () => {
    const [form] = Form.useForm();
    const [avatar, setAvatar] = useState(null);
    const [positions, setPosition] = useState([]);
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await api.getAllDepartments();
                if (response.status === 200) {
                    setDepartments(response.data.data);
                } else {
                    alert("Lỗi khi tải danh sách phòng ban");
                }
            } catch (error) {
                console.error('Lỗi khi tải danh sách phòng ban:', error);
            }
        };
        fetchDepartments();
    }, []);

    useEffect(() => {
        const fetchPositions = async () => {
            try {
                const response = await api.getAllPositions();
                if (response.status === 200) {
                    setPosition(response.data.data);
                } else {
                    alert("Lỗi khi tải danh sách chức vụ");
                }
            } catch (error) {
                console.error('Lỗi khi tải danh sách chức vụ:', error);
            }
        };
        fetchPositions();
    }, []);



    const handleAvatarChange = (info) => {
        if (info.file.status === 'done' || info.file.status === 'uploading') {
            setAvatar(URL.createObjectURL(info.file.originFileObj));
        }
    };

    const handleSubmit = async (values) => {
        const formattedValues = {
            ...values
        };
        try {
            const newEmploy = await api.postCreateEmployee({
                employeeCode: formattedValues.employeeCode,
                fullName: formattedValues.fullname,
                gender: formattedValues.gender,
                birthDate: formattedValues.birthDate,
                idCardNumber: formattedValues.idCardNumber,
                idCardIssueDate: formattedValues.idCardIssueDate,
                address: formattedValues.address,
                phoneNumber: formattedValues.phone,
                email: formattedValues.email,
                maritalStatus: formattedValues.maritalStatus,
                department: formattedValues.department,
                position: formattedValues.position,
            });


            const newContract = await api.postCreateContract({
                employeeCode: formattedValues.employeeCode,
                contractType: formattedValues.contractType,
                startDate: formattedValues.contractStartDate,
                endDate: formattedValues.contractEndDate,
                salary: formattedValues.salary
            });
            
            const newEdu = await api.postCreateEducation({
                employee: formattedValues.employeeCode,
                degree: formattedValues.degree,
                major: formattedValues.major,
                graduationYear: formattedValues.graduationYear,
                school: formattedValues.school,
            });

            if (newEmploy.status === 200 && newContract.status === 200 && newEdu.status === 200) {
                alert("Thêm nhân viên thành công");
                // form.resetFields();
            }
            else {
                alert("Thêm nhân viên thất bại");
            }
        } catch (error) {
            console.error('Lỗi khi thêm:', error);
        }
    };


    return (
        <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
            {/* Back Button */}
            <Link to="/employees">
                <Button type="link" style={{ paddingLeft: 0, marginBottom: '16px', color: '#1890ff' }}>
                    &lt; Quay lại danh sách nhân viên
                </Button>
            </Link>

            <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#001529' }}>Thêm Hồ Sơ Nhân Viên</h2>

            {/* Avatar Section */}
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
                <Upload showUploadList={false} beforeUpload={() => false} onChange={handleAvatarChange}>
                    <Avatar
                        size={100}
                        src={avatar}
                        icon={!avatar && <UserOutlined />}
                        style={{ position: 'relative', cursor: 'pointer' }}
                    >
                        {/* Nút Chọn ảnh nằm trong Avatar */}
                        <div
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                background: 'rgba(0, 0, 0, 0.6)',
                                color: 'white',
                                textAlign: 'center',
                                padding: '5px 0',
                                fontSize: '12px',
                                borderBottomLeftRadius: '50px',
                                borderBottomRightRadius: '50px',
                            }}
                        >
                            <UploadOutlined /> Chọn ảnh
                        </div>
                    </Avatar>
                </Upload>
            </div>

            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Tabs defaultActiveKey="1" tabPosition="top" style={{ marginBottom: 32 }}>
                    {/* Tab Thông tin cá nhân */}
                    <TabPane tab="Thông tin cá nhân" key="1">
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="employeeCode"
                                    label="ID Nhân Viên"
                                    rules={[{ required: true, message: 'Vui lòng nhập ID nhân viên' }]}
                                >
                                    <Input placeholder="Nhập ID nhân viên" />
                                </Form.Item>
                                <Form.Item name="fullname" label="Họ và Tên" rules={[{ required: true, message: 'Vui lòng nhập Họ và Tên' }]}>
                                    <Input placeholder="Nhập Họ và Tên" />
                                </Form.Item>
                                <Form.Item name="gender" label="Giới tính" rules={[{ required: true, message: 'Vui lòng chọn giới tính' }]}>
                                    <Select placeholder="Chọn giới tính">
                                        <Option value="Nam">Nam</Option>
                                        <Option value="Nữ">Nữ</Option>
                                        <Option value="Khác">Khác</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item name="birthDate" label="Ngày sinh" rules={[{ required: true, message: 'Vui lòng chọn ngày sinh' }]}>
                                    <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="phone" label="Số điện thoại" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}>
                                    <Input placeholder="Nhập số điện thoại" />
                                </Form.Item>
                                <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Vui lòng nhập email' }, { type: 'email', message: 'Email không hợp lệ' }]}>
                                    <Input placeholder="Nhập email" />
                                </Form.Item>
                                <Form.Item name="maritalStatus" label="Tình trạng hôn nhân">
                                    <Select placeholder="Chọn tình trạng">
                                        <Option value="Độc thân">Độc thân</Option>
                                        <Option value="Đã kết hôn">Đã kết hôn</Option>
                                        <Option value="Ly hôn">Ly hôn</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item name="idCardNumber" label="Căn Cước Công Dân" rules={[{ required: true, message: 'Vui lòng nhập Căn Cước Công Dân' }]}>
                                    <Input placeholder="Nhập Căn Cước Công Dân" />
                                </Form.Item>
                                <Form.Item name="idCardIssueDate" label="Ngày Cấp" rules={[{ required: true, message: 'Vui lòng nhập Ngày Cấp' }]}>
                                    <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item name="address" label="Địa chỉ thường trú" rules={[{ required: true, message: 'Vui lòng nhập địa chỉ thường trú' }]}>
                            <Input.TextArea rows={3} placeholder="Nhập địa chỉ thường trú" />
                        </Form.Item>
                    </TabPane>

                    {/* Tab Thông tin hợp đồng */}
                    <TabPane tab="Thông tin hợp đồng" key="2">
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item name="contractType" label="Loại hợp đồng" rules={[{ required: true, message: 'Vui lòng chọn loại hợp đồng' }]}>
                                    <Select placeholder="Chọn loại hợp đồng">
                                        <Option value="Có thời hạn">Có thời hạn</Option>
                                        <Option value="Không thời hạn">Không thời hạn</Option>
                                        <Option value="Thử việc">Thử việc</Option>
                                        <Option value="Thời vụ">Thời vụ</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item name="contractStartDate" label="Ngày bắt đầu" rules={[{ required: true, message: 'Vui lòng chọn ngày bắt đầu' }]}>
                                    <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
                                </Form.Item>
                                <Form.Item name="contractEndDate" label="Ngày kết thúc">
                                    <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="position" label="Chức vụ" rules={[{ required: true, message: 'Vui lòng chọn chức vụ' }]}>
                                    <Select placeholder="Chọn chức vụ">
                                        {positions.map((dept) => (
                                            <Option key={dept._id} value={dept.name}>
                                                {dept.name}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item name="department" label="Phòng ban" rules={[{ required: true, message: 'Vui lòng chọn phòng ban' }]}>
                                    <Select placeholder="Chọn phòng ban">
                                        {departments.map((dept) => (
                                            <Option key={dept._id} value={dept.name}>
                                                {dept.name}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item name="salary" label="Mức lương cơ bản (VNĐ)" rules={[{ required: true, message: 'Vui lòng nhập mức lương' }]}>
                                    <InputNumber min={0} step={100000} style={{ width: '100%' }} formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </TabPane>

                    {/* Tab Trình độ học vấn */}
                    <TabPane tab="Trình độ học vấn" key="3">
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item name="degree" label="Trình độ học vấn" rules={[{ required: true, message: 'Vui lòng chọn trình độ học vấn' }]}>
                                    <Select placeholder="Chọn trình độ">
                                        <Option value="Sinh viên">Sinh viên</Option>
                                        <Option value="Cao đẳng">Cao đẳng</Option>
                                        <Option value="Đại học">Đại học</Option>
                                        <Option value="Thạc sĩ">Thạc sĩ</Option>
                                        <Option value="Tiến sĩ">Tiến sĩ</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item name="major" label="Chuyên ngành">
                                    <Input placeholder="Nhập chuyên ngành" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="graduationYear" label="Năm tốt nghiệp">
                                    <InputNumber placeholder='Năm tốt nghiệp' min={1900} max={moment().year()} style={{ width: '100%' }} />
                                </Form.Item>
                                <Form.Item name="school" label="Trường">
                                    <Input placeholder="Nhập trường học" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </TabPane>

                    {/* Tab Tài liệu bổ sung */}
                    <TabPane tab="Tài liệu bổ sung" key="4">
                        <Form.Item name="documents" label="Tải lên tài liệu (CMND, Bằng cấp)">
                            <Upload multiple>
                                <Button icon={<UploadOutlined />}>Chọn tệp</Button>
                            </Upload>
                        </Form.Item>
                    </TabPane>
                </Tabs>

                {/* Nút Lưu */}
                <Form.Item style={{ textAlign: 'center' }}>
                    <Button type="primary" onClick={() => handleSubmit} htmlType="submit" size="large" style={{ width: '200px' }}>
                        Lưu hồ sơ
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AddEmployee;

