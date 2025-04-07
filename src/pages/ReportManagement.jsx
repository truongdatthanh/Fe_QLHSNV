import React, { useState } from 'react';
import { Table, Button, Space, Modal, Form, Input, message, Select, Tag, Row, Col, Statistic, Card } from 'antd';
import { PlusOutlined, BarChartOutlined, FileDoneOutlined } from '@ant-design/icons';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const { Option } = Select;

const ReportManagement = () => {
    const [employees, setEmployees] = useState([
        { key: '1', name: 'Nguyễn Văn A', department: 'IT', status: 'Đang làm việc', contractEnd: '2024-06-30' },
        { key: '2', name: 'Trần Thị B', department: 'Design', status: 'Nghỉ việc', contractEnd: '2023-12-15' },
        { key: '3', name: 'Lê Thị C', department: 'Marketing', status: 'Mới nhận việc', contractEnd: '2024-12-01' },
        // thêm dữ liệu giả cho bảng
    ]);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [selectedStat, setSelectedStat] = useState(null);  // Trạng thái để điều khiển danh sách hiển thị
    const [currentQuarter, setCurrentQuarter] = useState(1); // Trạng thái lưu quý hiện tại

    const chartData = {
        labels: ['Jan', 'Feb', 'Mar'],
        datasets: [
            {
                label: 'Số lượng nhân viên nghỉ việc',
                data: [5, 7, 3],  // Dữ liệu cho quý 1
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
            {
                label: 'Số lượng nhân viên đang làm việc',
                data: [30, 35, 40],  // Dữ liệu cho quý 1
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
            {
                label: 'Số lượng nhân viên mới nhận việc',
                data: [2, 3, 4],  // Dữ liệu cho quý 1
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };

    const columns = [
        { title: 'Tên nhân viên', dataIndex: 'name', key: 'name' },
        { title: 'Phòng ban', dataIndex: 'department', key: 'department' },
        { title: 'Trạng thái hợp đồng', dataIndex: 'status', key: 'status' },
        { title: 'Ngày hết hạn hợp đồng', dataIndex: 'contractEnd', key: 'contractEnd' },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_, record) => (
                <Space>
                    <Button type="link" onClick={() => handleEdit(record)}>
                        Chỉnh sửa
                    </Button>
                    <Button type="link" danger onClick={() => handleDelete(record.key)}>
                        Xóa
                    </Button>
                </Space>
            ),
        },
    ];

    const handleEdit = (record) => {
        form.setFieldsValue({ name: record.name, department: record.department, status: record.status, contractEnd: record.contractEnd });
        setIsModalVisible(true);
    };

    const handleDelete = (key) => {
        setEmployees(employees.filter((item) => item.key !== key));
        message.success('Xóa thành công');
    };

    const handleAddEmployee = (values) => {
        setEmployees([
            ...employees,
            { key: Date.now(), ...values }
        ]);
        message.success('Thêm nhân viên thành công');
        setIsModalVisible(false);
    };

    const handleStatClick = (type) => {
        setSelectedStat(type);  // Cập nhật trạng thái khi nhấn vào một ô thống kê
    };

    const handleQuarterChange = (quarter) => {
        setCurrentQuarter(quarter);  // Cập nhật quý khi nhấn vào một quý
        // Cập nhật lại dữ liệu trong chartData tương ứng với quý
        const quarterlyData = {
            1: { labels: ['Jan', 'Feb', 'Mar'], data: [5, 7, 3], data2: [30, 35, 40], data3: [2, 3, 4] },
            2: { labels: ['Apr', 'May', 'Jun'], data: [6, 4, 5], data2: [32, 37, 43], data3: [1, 2, 3] },
            3: { labels: ['Jul', 'Aug', 'Sep'], data: [7, 6, 4], data2: [33, 38, 42], data3: [3, 4, 5] },
            4: { labels: ['Oct', 'Nov', 'Dec'], data: [4, 5, 6], data2: [35, 39, 44], data3: [2, 3, 6] },
        };
        chartData.labels = quarterlyData[quarter].labels;
        chartData.datasets[0].data = quarterlyData[quarter].data;
        chartData.datasets[1].data = quarterlyData[quarter].data2;
        chartData.datasets[2].data = quarterlyData[quarter].data3;
    };

    // Lọc nhân viên theo trạng thái
    const filteredEmployees = selectedStat === 'active'
        ? employees.filter(e => e.status === 'Đang làm việc')
        : selectedStat === 'inactive'
        ? employees.filter(e => e.status === 'Nghỉ việc')
        : selectedStat === 'new'
        ? employees.filter(e => e.status === 'Mới nhận việc')
        : employees; // Hiển thị tất cả nếu không có trạng thái nào được chọn

    return (
        <div style={{ padding: '30px', backgroundColor: '#f5f5f5' }}>
            <h2 style={{ textAlign: 'center', fontWeight: 'bold' }}>Báo Cáo và Thống Kê Nhân Viên</h2>

            {/* Thống kê tổng quan */}
            <Row gutter={[16, 16]} style={{ marginBottom: '40px' }}>
                <Col span={8}>
                    <Card
                        title="Tổng số nhân viên"
                        bordered={false}
                        style={{ backgroundColor: '#1890ff', color: '#fff' }}
                        onClick={() => handleStatClick('total')}
                    >
                        <Statistic value={employees.length} />
                    </Card>
                </Col>

                <Col span={8}>
                    <Card
                        title="Nhân viên nghỉ việc"
                        bordered={false}
                        style={{ backgroundColor: '#f5222d', color: '#fff' }}
                        onClick={() => handleStatClick('inactive')}
                    >
                        <Statistic value={employees.filter(e => e.status === 'Nghỉ việc').length} />
                    </Card>
                </Col>

                <Col span={8}>
                    <Card
                        title="Nhân viên mới nhận việc"
                        bordered={false}
                        style={{ backgroundColor: '#52c41a', color: '#fff' }}
                        onClick={() => handleStatClick('new')}
                    >
                        <Statistic value={employees.filter(e => e.status === 'Mới nhận việc').length} />
                    </Card>
                </Col>
            </Row>

            {/* Hiển thị danh sách nhân viên tương ứng */}
            {selectedStat && (
                <Row gutter={[16, 16]} style={{ marginBottom: '40px' }}>
                    <Col span={24}>
                        <Card title={`Danh sách nhân viên ${selectedStat === 'inactive' ? 'nghỉ việc' : selectedStat === 'new' ? 'mới nhận việc' : 'tổng số'}`} bordered={false}>
                            <Table
                                columns={columns}
                                dataSource={filteredEmployees}
                                rowKey="key"
                                pagination={{ pageSize: 5 }}
                                bordered
                                size="middle"
                            />
                        </Card>
                    </Col>
                </Row>
            )}

            {/* Biểu đồ thống kê */}
            <Row gutter={[16, 16]} style={{ marginBottom: '40px' }}>
                <Col span={24}>
                    <Card title="Biểu đồ số lượng nhân viên theo quý" bordered={false}>
                        <Button onClick={() => handleQuarterChange(1)}>Quý 1</Button>
                        <Button onClick={() => handleQuarterChange(2)}>Quý 2</Button>
                        <Button onClick={() => handleQuarterChange(3)}>Quý 3</Button>
                        <Button onClick={() => handleQuarterChange(4)}>Quý 4</Button>
                        <Bar data={chartData} options={{ responsive: true, scales: { x: { title: { display: true, text: 'Quý' } }, y: { title: { display: true, text: 'Số lượng' } } } }} />
                    </Card>
                </Col>
            </Row>

            {/* Modal thêm / sửa nhân viên */}
            <Modal
                title="Thêm / Chỉnh sửa nhân viên"
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                centered
                width={600}
            >
                <Form form={form} layout="vertical" onFinish={handleAddEmployee}>
                    <Form.Item name="name" label="Tên nhân viên" rules={[{ required: true, message: 'Vui lòng nhập tên nhân viên' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="department" label="Phòng ban" rules={[{ required: true, message: 'Vui lòng nhập phòng ban' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="status" label="Trạng thái" rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}>
                        <Select>
                            <Option value="Đang làm việc">Đang làm việc</Option>
                            <Option value="Nghỉ việc">Nghỉ việc</Option>
                            <Option value="Mới nhận việc">Mới nhận việc</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="contractEnd" label="Ngày hết hạn hợp đồng" rules={[{ required: true, message: 'Vui lòng chọn ngày hết hạn hợp đồng' }]}>
                        <Input type="date" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                            Lưu
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ReportManagement;
