import React, { useState } from 'react';
import { Table, Button, Space, Modal, Form, Input, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const DepartmentManagement = () => {
    const [departments, setDepartments] = useState([
        { id: 1, name: 'Phòng Kế Toán' },
        { id: 2, name: 'Phòng Nhân Sự' },
        { id: 3, name: 'Phòng IT' },
    ]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentDepartment, setCurrentDepartment] = useState(null);
    const [form] = Form.useForm();

    const handleAddDepartment = (values) => {
        if (isEditing) {
            setDepartments((prev) => prev.map((dept) => (dept.id === currentDepartment.id ? { ...dept, name: values.name } : dept)));
            message.success('Cập nhật phòng ban thành công!');
        } else {
            const newDepartment = { id: Date.now(), name: values.name };
            setDepartments([...departments, newDepartment]);
            message.success('Thêm phòng ban thành công!');
        }
        setIsModalVisible(false);
        form.resetFields();
        setIsEditing(false);
    };

    const handleEdit = (record) => {
        setCurrentDepartment(record);
        setIsEditing(true);
        setIsModalVisible(true);
        form.setFieldsValue({ name: record.name });
    };

    const handleDelete = (id) => {
        setDepartments(departments.filter((dept) => dept.id !== id));
        message.success('Xóa phòng ban thành công!');
    };

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Tên phòng ban', dataIndex: 'name', key: 'name' },
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
                        onClick={() => handleDelete(record.id)}
                        style={{ borderRadius: '4px', backgroundColor: '#f5222d', borderColor: '#f5222d' }}
                    >
                        Xóa
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: '24px', backgroundColor: '#f0f2f5', borderRadius: '8px' }}>
            <h1 style={{ textAlign: 'center', color: '#001529', marginBottom: '24px', fontWeight: 'bold' }}>Quản lý phòng ban</h1>

            <div style={{ marginBottom: '16px', textAlign: 'right' }}>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => { setIsEditing(false); setIsModalVisible(true); }}
                    style={{ borderRadius: '4px', backgroundColor: '#1890ff', borderColor: '#1890ff' }}
                >
                    Thêm phòng ban
                </Button>
            </div>

            <Table
                columns={columns}
                dataSource={departments}
                rowKey="id"
                style={{ marginTop: '16px', backgroundColor: 'white', borderRadius: '8px' }}
                pagination={{ pageSize: 5 }}
                bordered
                rowClassName="hover-row"
                size="middle"
            />

            {/* Modal thêm / sửa phòng ban */}
            <Modal
                title={isEditing ? 'Chỉnh sửa phòng ban' : 'Thêm phòng ban'}
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                destroyOnClose
                centered
            >
                <Form form={form} layout="vertical" onFinish={handleAddDepartment}>
                    <Form.Item name="name" label="Tên phòng ban" rules={[{ required: true, message: 'Vui lòng nhập tên phòng ban' }]}>
                        <Input placeholder="Nhập tên phòng ban" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                            {isEditing ? 'Cập nhật' : 'Thêm'}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default DepartmentManagement;
