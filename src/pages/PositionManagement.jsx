import React, { useState } from 'react';
import { Table, Button, Space, Modal, Form, Input, message, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';

const PositionManagement = () => {
    const [positions, setPositions] = useState([
        { id: 1, name: 'Giám đốc', description: 'Quản lý toàn bộ công ty' },
        { id: 2, name: 'Trưởng phòng', description: 'Quản lý nhân viên trong phòng' },
        { id: 3, name: 'Nhân viên', description: 'Thực hiện công việc được giao' }
    ]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentPosition, setCurrentPosition] = useState(null);
    const [form] = Form.useForm();

    // Thêm chức vụ
    const handleAddPosition = (values) => {
        const newPosition = {
            id: positions.length + 1,
            ...values
        };
        setPositions([...positions, newPosition]);
        message.success('Thêm chức vụ thành công!');
        setIsModalVisible(false);
        form.resetFields();
    };

    // Cập nhật chức vụ
    const handleEditPosition = (values) => {
        setPositions(positions.map(position =>
            position.id === currentPosition.id ? { ...position, ...values } : position
        ));
        message.success('Cập nhật chức vụ thành công!');
        setIsModalVisible(false);
        setIsEditing(false);
        form.resetFields();
    };

    // Xóa chức vụ
    const handleDelete = (id) => {
        const updatedPositions = positions.filter(position => position.id !== id);
        setPositions(updatedPositions);
        message.success('Xóa chức vụ thành công!');
    };

    // Chỉnh sửa chức vụ
    const handleEdit = (record) => {

        setIsEditing(true);
        setCurrentPosition(record);
        form.setFieldsValue({
            name: record.name,
            description: record.description
        });
        setIsModalVisible(true);

        
    };

    // Cột của bảng
    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Tên chức vụ', dataIndex: 'name', key: 'name' },
        { title: 'Mô tả', dataIndex: 'description', key: 'description' },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        icon={<EditOutlined />}
                        type="default"
                        onClick={() => handleEdit(record)}
                        style={{ borderRadius: '4px', color: '#1890ff' }}
                    >
                        Sửa
                    </Button>
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa chức vụ này?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Có"
                        cancelText="Không"
                    >
                        <Button
                            type="danger"
                            style={{ borderRadius: '4px' }}
                        >
                            Xóa
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: '24px', backgroundColor: '#fff', borderRadius: '8px' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '24px', fontWeight: 'bold' }}>Quản lý chức vụ</h1>

            <div style={{ marginBottom: '16px', textAlign: 'right' }}>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => {
                        setIsEditing(false);
                        setIsModalVisible(true);
                    }}
                    style={{ borderRadius: '4px' }}
                >
                    Thêm chức vụ
                </Button>
            </div>

            <Table
                columns={columns}
                dataSource={positions}
                rowKey="id"
                pagination={{ pageSize: 5 }}
                bordered
                style={{ backgroundColor: '#f9f9f9' }}
            />

            {/* Modal thêm / sửa chức vụ */}
            <Modal
                title={isEditing ? 'Chỉnh sửa chức vụ' : 'Thêm chức vụ'}
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                destroyOnClose
                centered
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={isEditing ? handleEditPosition : handleAddPosition}
                >
                    <Form.Item
                        name="name"
                        label="Tên chức vụ"
                        rules={[{ required: true, message: 'Vui lòng nhập tên chức vụ' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="Mô tả">
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{ width: '100%' }}
                        >
                            {isEditing ? 'Cập nhật chức vụ' : 'Thêm chức vụ'}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default PositionManagement;
