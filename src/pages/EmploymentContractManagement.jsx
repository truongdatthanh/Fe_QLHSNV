import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, DatePicker, message } from 'antd';
import { api } from '../services/callAPI.service';
import { isVisible } from '@testing-library/user-event/dist/utils';

const EmploymentContractManagement = () => {
    const [contracts, setContracts] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();


    useEffect(() => {
        const fectContract = async () => {
            const res = await api.getAllContracts();
            if (res.status === 200) {
                setContracts(res.data.data);
            } else {
                message.error('Lỗi khi lấy danh sách hợp đồng!');
            }
        };
        fectContract();
    }, []);

    console.log('contracts', contracts);
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
        { title: 'ID', dataIndex: 'id', key: 'id', isVisible: false },
        { title: 'Mã nhân viên', dataIndex: ['employee', 'employeeCode'], key: 'employeeCode', isVisible: true },
        { title: 'Loại hợp đồng', dataIndex: 'contractType', key: 'contractType', isVisible: true  },
        { title: 'Ngày bắt đầu', dataIndex: 'startDate', key: 'startDate' ,isVisible: true },
        { title: 'Ngày kết thúc', dataIndex: 'endDate', key: 'endDate', isVisible: true  },
    ];

    const visibleColumns = columns.filter((column) => column.isVisible !== false);

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
                columns={visibleColumns}
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
