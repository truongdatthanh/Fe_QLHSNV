// import React, { useEffect, useState } from 'react';
// import { Table, Button, Space, Modal, Form, Input, message } from 'antd';
// import { PlusOutlined } from '@ant-design/icons';
// import { api } from '../services/callAPI.service';

// const DepartmentManagement = () => {
//     const [departments, setDepartments] = useState([]);
//     const [isModalVisible, setIsModalVisible] = useState(false);
//     const [currentDepartment, setCurrentDepartment] = useState(null);
//     const [form] = Form.useForm();

//     const fetchDepartments = async () => {
//         const response = await api.getAllDepartments();
//         if (response.status === 200) {
//             setDepartments(response.data.data);
//         } else {
//             message.error('Lỗi khi tải danh sách phòng ban!');
//         }
//     };

//     useEffect(() => {
//         fetchDepartments();
//     }, []);


//     const handleAddDepartment = async (values) => {
//         const newDepartment = await api.postCreateDepartment(values);

//         if (newDepartment.status === 200) {
//             setDepartments([...departments, newDepartment]);
//         }
//         else {
//             message.error('Lỗi khi thêm phòng ban!');
//         }
//     }
//     setIsModalVisible(false);
//     form.resetFields();


//     const handleEdit = (record) => {
//         setCurrentDepartment(record);
//         setIsEditing(true);
//         setIsModalVisible(true);
//         form.setFieldsValue({ name: record.name });
//     };

//     const handleDelete = (id) => {
//         setDepartments(departments.filter((dept) => dept.id !== id));
//         message.success('Xóa phòng ban thành công!');
//     };

//     const columns = [
//         { title: 'Tên phòng ban', dataIndex: 'name', key: 'name' },
//         {
//             title: 'Thao tác',
//             key: 'action',
//             render: (_, record) => (
//                 <Space>
//                     <Button
//                         type="primary"
//                         onClick={() => handleEdit(record)}
//                         style={{ borderRadius: '4px', backgroundColor: '#1890ff', borderColor: '#1890ff' }}
//                     >
//                         Sửa
//                     </Button>
//                     <Button
//                         type="primary"
//                         danger
//                         onClick={() => handleDelete(record.id)}
//                         style={{ borderRadius: '4px', backgroundColor: '#f5222d', borderColor: '#f5222d' }}
//                     >
//                         Xóa
//                     </Button>
//                 </Space>
//             ),
//         },
//     ];

//     return (
//         <div style={{ padding: '24px', backgroundColor: '#f0f2f5', borderRadius: '8px' }}>
//             <h1 style={{ textAlign: 'center', color: '#001529', marginBottom: '24px', fontWeight: 'bold' }}>Quản lý phòng ban</h1>

//             <div style={{ marginBottom: '16px', textAlign: 'right' }}>
//                 <Button
//                     type="primary"
//                     icon={<PlusOutlined />}
//                     onClick={() => { setIsEditing(false); setIsModalVisible(true); }}
//                     style={{ borderRadius: '4px', backgroundColor: '#1890ff', borderColor: '#1890ff' }}
//                 >
//                     Thêm phòng ban
//                 </Button>
//             </div>

//             <Table
//                 columns={columns}
//                 dataSource={departments}
//                 rowKey="id"
//                 style={{ marginTop: '16px', backgroundColor: 'white', borderRadius: '8px' }}
//                 pagination={{ pageSize: 5 }}
//                 bordered
//                 rowClassName="hover-row"
//                 size="middle"
//             />

//             {/* Modal thêm / sửa phòng ban */}
//             <Modal
//                 title={isEditing ? 'Chỉnh sửa phòng ban' : 'Thêm phòng ban'}
//                 visible={isModalVisible}
//                 onCancel={() => setIsModalVisible(false)}
//                 footer={null}
//                 destroyOnClose
//                 centered
//             >
//                 <Form form={form} layout="vertical" >
//                     <Form.Item name="name" label="Tên phòng ban" rules={[{ required: true, message: 'Vui lòng nhập tên phòng ban' }]}>
//                         <Input placeholder="Nhập tên phòng ban" />
//                     </Form.Item>
//                     <Form.Item>
//                         <Button type="primary" onClick={() => handleAddDepartment} htmlType="submit" style={{ width: '100%' }}>
//                             Thêm
//                         </Button>
//                     </Form.Item>
//                 </Form>
//             </Modal>
//         </div>
//     );
// };


// export default DepartmentManagement;


import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, message, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { api } from '../services/callAPI.service';
import { isVisible } from '@testing-library/user-event/dist/utils';

const DepartmentManagement = () => {
    const [departments, setDepartments] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    // Fetch the list of departments from the server
    const fetchDepartments = async () => {
        try {
            const response = await api.getAllDepartments();
            if (response.status === 200) {
                setDepartments(response.data.data);
            } else {
                message.error('Lỗi khi tải danh sách phòng ban!');
            }
        } catch (error) {
            message.error('Đã xảy ra lỗi khi tải danh sách phòng ban!');
        }
    };


    useEffect(() => {
        fetchDepartments();
    }, []);


    const handleAddDepartment = async (values) => {
        try {
            const response = await api.postCreateDepartment(values);
            if (response.status === 200 || response.status === 201) {

                setDepartments((prevDepartments) => [...prevDepartments, response.data.data]);
                message.success('Thêm phòng ban thành công!');
                setIsModalVisible(false);
                form.resetFields();
            } else {
                message.error('Lỗi khi thêm phòng ban!');
            }
        } catch (error) {
            message.error('Đã xảy ra lỗi khi thêm phòng ban!');
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await api.deleteDepartment(id);
            if (response.status === 200) {
                setDepartments((prevDepartments) => prevDepartments.filter((dept) => dept._id !== id));
                message.success('Xóa phòng ban thành công!');
            } else {
                message.error('Lỗi khi xóa phòng ban!');
            }
         
        } catch (error) {
            message.error('Đã xảy ra lỗi khi xóa phòng ban!');
        }
    }


 
    const columns = [
        { title: 'MaPB', dataIndex: '_id', key: 'id' , isVisible: false},
        { title: 'Tên phòng ban', dataIndex: 'name', key: 'name', isVisible: true },
        {
            title: 'Thao tác',
            isVisible: true,
            key: 'action',
            render: (_, record) => (
                <Space>
                    <Button
                        type="primary"
                        danger
                        onClick={() => handleDelete(record._id)}
                        style={{ borderRadius: '4px', backgroundColor: '#f5222d', borderColor: '#f5222d' }}
                    >
                        Xóa
                    </Button>
                </Space>
            ),
        },
    ];

    const visibleColumns = columns.filter(column => column.isVisible);

    return (
        <div style={{ padding: '24px', backgroundColor: '#f0f2f5', borderRadius: '8px' }}>
            <h1 style={{ textAlign: 'center', color: '#001529', marginBottom: '24px', fontWeight: 'bold' }}>Quản lý phòng ban</h1>

            <div style={{ marginBottom: '16px', textAlign: 'right' }}>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setIsModalVisible(true)}
                    style={{ borderRadius: '4px', backgroundColor: '#1890ff', borderColor: '#1890ff' }}
                >
                    Thêm phòng ban
                </Button>
            </div>

            <Table
                columns={visibleColumns}
                dataSource={departments}
                rowKey="id"
                style={{ marginTop: '16px', backgroundColor: 'white', borderRadius: '8px' }}
                pagination={{ pageSize: 5 }}
                bordered
                size="middle"
            />

            {/* Modal for adding a new department */}
            <Modal
                title="Thêm phòng ban"
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                destroyOnClose
                centered
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleAddDepartment}
                >
                    <Form.Item
                        name="name"
                        label="Tên phòng ban"
                        rules={[{ required: true, message: 'Vui lòng nhập tên phòng ban' }]}
                    >
                        <Input placeholder="Nhập tên phòng ban" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                            Thêm
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default DepartmentManagement;
