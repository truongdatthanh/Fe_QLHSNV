import React, { useState } from 'react';
import { Table, Button, Space, Modal, Form, Input, message, Select, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const RecruitmentManagement = () => {
    const [jobPostings, setJobPostings] = useState([
        { key: 1, title: 'Software Developer', department: 'IT', description: 'Develop and maintain software solutions.', status: 'Đang tuyển' },
        { key: 2, title: 'UX/UI Designer', department: 'Design', description: 'Design user-friendly interfaces.', status: 'Đang tuyển' },
    ]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentJob, setCurrentJob] = useState(null);
    const [form] = Form.useForm();

    const handleAddJobPosting = (values) => {
        if (isEditing) {
            setJobPostings((prev) =>
                prev.map((job) =>
                    job.key === currentJob.key ? { ...job, ...values } : job
                )
            );
            message.success('Cập nhật tin tuyển dụng thành công!');
        } else {
            const newJob = { key: Date.now(), ...values };
            setJobPostings([...jobPostings, newJob]);
            message.success('Thêm tin tuyển dụng thành công!');
        }
        setIsModalVisible(false);
        form.resetFields();
        setIsEditing(false);
    };

    const handleEdit = (record) => {
        setCurrentJob(record);
        setIsEditing(true);
        setIsModalVisible(true);
        form.setFieldsValue({ title: record.title, department: record.department, description: record.description });
    };

    const handleDelete = (key) => {
        setJobPostings(jobPostings.filter((job) => job.key !== key));
        message.success('Xóa tin tuyển dụng thành công!');
    };

    const handleStatusChange = (status, jobKey) => {
        setJobPostings(jobPostings.map((job) => job.key === jobKey ? { ...job, status } : job));
        message.success('Cập nhật trạng thái thành công!');
    };

    const handleApply = (job) => {
        // Giả sử nhân viên đã ứng tuyển vào vị trí
        message.success('Ứng tuyển thành công!');
    };

    const columns = [
        { title: 'Vị trí tuyển dụng', dataIndex: 'title', key: 'title' },
        { title: 'Phòng ban', dataIndex: 'department', key: 'department' },
        { title: 'Mô tả', dataIndex: 'description', key: 'description' },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status, record) => (
                <Space>
                    <Tag color={status === 'Đang tuyển' ? 'green' : status === 'Chờ duyệt' ? 'blue' : 'red'}>
                        {status}
                    </Tag>
                    <Select
                        value={status}
                        style={{ width: 200 }}
                        onChange={(value) => handleStatusChange(value, record.key)}
                    >
                        <Select.Option value="Đang tuyển">Đang tuyển</Select.Option>
                        <Select.Option value="Chờ duyệt">Chờ duyệt</Select.Option>
                        <Select.Option value="Đã tuyển">Đã tuyển</Select.Option>
                    </Select>
                </Space>
            ),
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_, record) => (
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleEdit(record)}
                        style={{ borderRadius: '4px', backgroundColor: '#1890ff', borderColor: '#1890ff' }}
                    >
                        Sửa
                    </Button>
                    <Button
                        type="primary"
                        danger
                        onClick={() => handleDelete(record.key)}
                        style={{ borderRadius: '4px', backgroundColor: '#f5222d', borderColor: '#f5222d' }}
                    >
                        Xóa
                    </Button>
                    <Button
                        type="default"
                        onClick={() => handleApply(record)}
                        style={{ borderRadius: '4px', backgroundColor: '#52c41a', borderColor: '#52c41a' }}
                    >
                        Ứng tuyển
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: '24px', backgroundColor: '#f0f2f5', borderRadius: '8px' }}>
            <h1 style={{ textAlign: 'center', color: '#001529', marginBottom: '24px', fontWeight: 'bold' }}>
                Quản lý tuyển dụng
            </h1>

            <div style={{ marginBottom: '16px', textAlign: 'right' }}>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => {
                        setIsEditing(false);
                        setIsModalVisible(true);
                    }}
                    style={{ borderRadius: '4px', backgroundColor: '#1890ff', borderColor: '#1890ff' }}
                >
                    Đăng tin tuyển dụng
                </Button>
            </div>

            <Table
                columns={columns}
                dataSource={jobPostings}
                rowKey="key"
                style={{ marginTop: '16px', backgroundColor: 'white', borderRadius: '8px' }}
                pagination={{ pageSize: 5 }}
                bordered
                rowClassName="hover-row"
                size="middle"
            />

            {/* Modal thêm / sửa tin tuyển dụng */}
            <Modal
                title={isEditing ? 'Chỉnh sửa tin tuyển dụng' : 'Đăng tin tuyển dụng'}
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                destroyOnClose
                centered
            >
                <Form form={form} layout="vertical" onFinish={handleAddJobPosting}>
                    <Form.Item name="title" label="Vị trí tuyển dụng" rules={[{ required: true, message: 'Vui lòng nhập vị trí tuyển dụng' }]}>
                        <Input placeholder="Nhập vị trí tuyển dụng" />
                    </Form.Item>
                    <Form.Item name="department" label="Phòng ban" rules={[{ required: true, message: 'Vui lòng nhập phòng ban' }]}>
                        <Input placeholder="Nhập phòng ban" />
                    </Form.Item>
                    <Form.Item name="description" label="Mô tả công việc" rules={[{ required: true, message: 'Vui lòng nhập mô tả công việc' }]}>
                        <Input.TextArea placeholder="Nhập mô tả công việc" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                            {isEditing ? 'Cập nhật' : 'Đăng'}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default RecruitmentManagement;
