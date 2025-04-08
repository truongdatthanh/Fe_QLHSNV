import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, DatePicker, Select, message, Popconfirm } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { api } from '../services/callAPI.service';

const { Option } = Select;

const RewardPunishmentManagement = () => {
    const [data, setData] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formVisible, setFormVisible] = useState(false);
    const [form] = Form.useForm();
    const [editingRecord, setEditingRecord] = useState(null);

    useEffect(() => {
        fetchData();
        fetchEmployees();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await api.getAllRewardPunishments(); // fetch list of rewards and punishments
            setData(res.data.data);
        } catch (error) {
            message.error('Lỗi khi tải dữ liệu');
        }
        setLoading(false);
    };

    const fetchEmployees = async () => {
        try {
            const res = await api.getAllEmployees;
            setEmployees(res.data.data);
        } catch (error) {
            message.error('Không thể tải danh sách nhân viên');
        }
    };

    const handleFinish = async (values) => {
        try {
            const formattedValues = {
                ...values,
                date: values.date.format('YYYY-MM-DD'),
            };

            if (editingRecord) {
                await axios.put(`/api/reward-punishment/${editingRecord._id}`, formattedValues);
                message.success('Cập nhật thành công');
            } else {
                await axios.post('/api/reward-punishment', formattedValues);
                message.success('Thêm thành công');
            }

            form.resetFields();
            setFormVisible(false);
            fetchData();
        } catch (error) {
            message.error('Có lỗi xảy ra');
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/reward-punishment/${id}`);
            message.success('Xóa thành công');
            fetchData();
        } catch (error) {
            message.error('Không thể xóa');
        }
    };

    const openEditForm = (record) => {
        setEditingRecord(record);
        form.setFieldsValue({
            ...record,
            date: moment(record.date),
        });
        setFormVisible(true);
    };

    const openCreateForm = () => {
        setEditingRecord(null);
        form.resetFields();
        setFormVisible(true);
    };

    const columns = [
        {
            title: 'Mã nhân viên',
            dataIndex:['employee', 'employeeCode'],
            key: 'employeeCode'
        },
        {
            title: 'Loại',
            dataIndex: 'type',
        },
        {
            title: 'Lý do',
            dataIndex: 'reason',
        },
        {
            title: 'Ngày',
            dataIndex: 'date',
            render: (text) => moment(text).format('DD/MM/YYYY'),
        },
        {
            title: 'Ghi chú',
            dataIndex: 'note',
        },
        {
            title: 'Hành động',
            render: (_, record) => (
                <>
                    <Button type="link" onClick={() => openEditForm(record)}>Sửa</Button>
                    <Popconfirm title="Bạn có chắc muốn xóa?" onConfirm={() => handleDelete(record._id)}>
                        <Button type="link" danger>Xóa</Button>
                    </Popconfirm>
                </>
            ),
        },
    ];

    return (
        <div>
            <h2>Quản lý khen thưởng / kỷ luật</h2>
            <Button type="primary" onClick={openCreateForm} style={{ marginBottom: 16 }}>
                Thêm mới
            </Button>
            <Table
                rowKey="_id"
                columns={columns}
                dataSource={data}
                loading={loading}
            />

            <Modal
                title={editingRecord ? 'Chỉnh sửa' : 'Thêm mới'}
                open={formVisible}
                onCancel={() => setFormVisible(false)}
                onOk={() => form.submit()}
                okText="Lưu"
                cancelText="Hủy"
            >
                <Form form={form} layout="vertical" onFinish={handleFinish}>
                    <Form.Item name="employee" label="Nhân viên" rules={[{ required: true, message: 'Chọn nhân viên' }]}>
                        <Select placeholder="Chọn nhân viên">
                            {employees.map(emp => (
                                <Option key={emp._id} value={emp._id}>{emp.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item name="type" label="Loại" rules={[{ required: true }]}>
                        <Select>
                            <Option value="Khen thưởng">Khen thưởng</Option>
                            <Option value="Kỷ luật">Kỷ luật</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name="reason" label="Lý do" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="date" label="Ngày" rules={[{ required: true }]}>
                        <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item name="note" label="Ghi chú">
                        <Input.TextArea rows={3} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default RewardPunishmentManagement;
