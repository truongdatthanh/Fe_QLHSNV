import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, DatePicker, message } from 'antd';

const EmploymentContractManagement = () => {
    const [contracts, setContracts] = useState([
        {
            id: 1,
            employeeName: 'Nguyễn Văn A',
            contractType: 'Hợp đồng xác định thời hạn',
            startDate: '2023-01-01',
            endDate: '2025-01-01',
        },
        {
            id: 2,
            employeeName: 'Trần Thị B',
            contractType: 'Hợp đồng không xác định thời hạn',
            startDate: '2020-05-15',
            endDate: '',
        },
    ]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    const handleAddContract = (values) => {
        const newContract = {
            id: contracts.length + 1,
            ...values,
            startDate: values.startDate.format('YYYY-MM-DD'),
            endDate: values.endDate ? values.endDate.format('YYYY-MM-DD') : '',
        };
        setContracts([...contracts, newContract]);
        message.success('Thêm hợp đồng thành công!');
        handleCancel();
    };

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Tên nhân viên', dataIndex: 'employeeName', key: 'employeeName' },
        { title: 'Loại hợp đồng', dataIndex: 'contractType', key: 'contractType' },
        { title: 'Ngày bắt đầu', dataIndex: 'startDate', key: 'startDate' },
        { title: 'Ngày kết thúc', dataIndex: 'endDate', key: 'endDate' },
    ];

    return (
        <div style={{ padding: '24px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>Quản lý Hợp đồng Lao động</h1>
            <Button
                type="primary"
                onClick={showModal}
                style={{
                    marginBottom: '16px',
                    backgroundColor: '#1890ff',
                    borderColor: '#1890ff',
                }}
            >
                Thêm hợp đồng
            </Button>
            <Table
                columns={columns}
                dataSource={contracts}
                rowKey="id"
                pagination={{ pageSize: 5 }}
                bordered
                style={{ marginTop: '16px' }}
            />

            <Modal
                title="Thêm hợp đồng"
                open={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                width={600}
            >
                <Form form={form} layout="vertical" onFinish={handleAddContract}>
                    <Form.Item
                        name="employeeName"
                        label="Tên nhân viên"
                        rules={[{ required: true, message: 'Vui lòng nhập tên nhân viên' }]}
                    >
                        <Input placeholder="Nhập tên nhân viên" />
                    </Form.Item>

                    <Form.Item
                        name="contractType"
                        label="Loại hợp đồng"
                        rules={[{ required: true, message: 'Vui lòng nhập loại hợp đồng' }]}
                    >
                        <Input placeholder="Nhập loại hợp đồng" />
                    </Form.Item>

                    <Form.Item
                        name="startDate"
                        label="Ngày bắt đầu"
                        rules={[{ required: true, message: 'Vui lòng chọn ngày bắt đầu' }]}
                    >
                        <DatePicker
                            format="YYYY-MM-DD"
                            style={{ width: '100%' }}
                            placeholder="Chọn ngày bắt đầu"
                        />
                    </Form.Item>

                    <Form.Item name="endDate" label="Ngày kết thúc">
                        <DatePicker
                            format="YYYY-MM-DD"
                            style={{ width: '100%' }}
                            placeholder="Chọn ngày kết thúc (nếu có)"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{
                                width: '100%',
                                backgroundColor: '#1890ff',
                                borderColor: '#1890ff',
                                borderRadius: '4px',
                            }}
                        >
                            Thêm hợp đồng
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default EmploymentContractManagement;
