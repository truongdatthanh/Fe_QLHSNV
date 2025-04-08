import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Modal, Form, Input, message, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import { api } from '../services/callAPI.service';

const PositionManagement = () => {
    const [positions, setPositions] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentPosition, setCurrentPosition] = useState(null);
    const [form] = Form.useForm();

    const fecthPosition = async () => {
        const res = await api.getAllPositions();
        if (res.status === 200) {
            setPositions(res.data.data);
        } else {
            message.error('Lỗi khi lấy danh sách chức vụ!');
        }
    };

    useEffect(() => {
        fecthPosition();
    }, []);

    // Thêm chức vụ
    const handleAddPosition = async (values) => {
        try {
            const response = await api.postCreatePosition(values);
            if (response.status === 200 || response.status === 201) {

                setPositions((prevPos) => [...prevPos, response.data.data]);
                alert('Thêm chức thành công!');
                setIsModalVisible(false);
                form.resetFields();
            } else {
                alert('Lỗi khi thêm phòng ban!');
            }
        } catch (error) {
            alert('Đã xảy ra lỗi khi thêm phòng ban!');
        }
    };

    // Xóa chức vụ
    const handleDelete = (id) => {
        const updatedPositions = positions.filter(position => position.id !== id);
        setPositions(updatedPositions);
        message.success('Xóa chức vụ thành công!');
    };


    // Cột của bảng
    const columns = [
        { title: 'ID', dataIndex: '_id', key: 'id' },
        { title: 'Tên chức vụ', dataIndex: 'name', key: 'name' },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa chức vụ này?"
                        onConfirm={() => handleDelete(record._id)}
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
                    onFinish={handleAddPosition}
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
                            {'Thêm chức vụ'}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default PositionManagement;
