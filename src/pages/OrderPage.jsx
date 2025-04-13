import React from 'react';
import { Typography, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

// import React, { useState, useEffect } from 'react';
// import { Form, Input, Button, Row, Col, Typography, message } from 'antd';
// import { api } from '../services/callAPI.service';


// const { Title } = Typography;

// const Order = () => {
//     const [user, setUser] = useState(null);
//     const [cartItems, setCartItems] = useState([]);
//     const [loading, setLoading] = useState(false);

//     // Fetch user info
//     const fetchUser = async () => {
//         try {
//             const token = localStorage.getItem("token");
//             const res = await api.getMe(token);
//             setUser(res.data.data);
//         } catch (err) {
//             console.log('Lỗi lấy thông tin user:', err);
//         }
//     };

//     // Fetch cart items
//     const fetchCartItems = async () => {
//         try {
//             const res = await api.getCart();
//             setCartItems(res.data.data.items || []);
//         } catch (error) {
//             console.error('Lỗi khi tải giỏ hàng:', error);
//         }
//     };

//     useEffect(() => {
//         fetchUser();
//         fetchCartItems();
//     }, []);

//     // Handle order submit
//     const handleOrderSubmit = async (values) => {
//         if (!cartItems.length) {
//             message.error("Giỏ hàng của bạn không có sản phẩm.");
//             return;
//         }

//         setLoading(true);

//         try {
//             const orderData = {
//                 userId: user._id,
//                 cartItems,
//                 ...values,  // Include the order details from the form
//             };

//             const res = await api.createOrder(orderData);

//             message.success("Đặt hàng thành công!");
//             setCartItems([]);  // Clear the cart after successful order
//             localStorage.removeItem('cart');  // Remove cart from local storage
//         } catch (err) {
//             message.error("Đặt hàng thất bại. Vui lòng thử lại!");
//             console.log('Lỗi khi tạo đơn hàng:', err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const getTotal = () => {
//         return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
//     };

//     return (
//         <div style={{ padding: 24 }}>
//             <Title level={2}>Đặt hàng</Title>

//             <Row gutter={[16, 16]}>
//                 <Col span={24}>
//                     <Title level={4}>Thông tin giao hàng</Title>
//                     <Form onFinish={handleOrderSubmit} layout="vertical">
//                         <Form.Item label="Họ và tên" name="fullname" rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}>
//                             <Input defaultValue={user?.fullname} />
//                         </Form.Item>
//                         <Form.Item label="Địa chỉ" name="address" rules={[{ required: true, message: 'Vui lòng nhập địa chỉ giao hàng!' }]}>
//                             <Input />
//                         </Form.Item>
//                         <Form.Item label="Số điện thoại" name="phone" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}>
//                             <Input />
//                         </Form.Item>
//                         <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email', message: 'Vui lòng nhập email hợp lệ!' }]}>
//                             <Input defaultValue={user?.email} />
//                         </Form.Item>

//                         <Title level={4}>Thông tin giỏ hàng</Title>
//                         {cartItems.map((item) => (
//                             <div key={item._id}>
//                                 <p>{item.name} - {item.quantity} x {(item.product.price).toLocaleString()}₫</p>
//                             </div>
//                         ))}

//                         <div style={{ textAlign: 'right' }}>
//                             <Title level={4}>Tổng cộng: {getTotal().toLocaleString()}₫</Title>
//                         </div>

//                         <Form.Item>
//                             <Button  type="primary" htmlType="submit" loading={loading} disabled={loading}>
//                                 Đặt hàng
//                             </Button>
//                         </Form.Item>
//                     </Form>
//                 </Col>
//             </Row>
//         </div>
//     );
// };

// export default Order;
const { Title } = Typography;

const Order = () => {
    const navigate = useNavigate();

    return (
        <div style={{ 
            padding: 24,
            textAlign: 'center',
            marginTop: '100px'
        }}>
            <Title level={2}>Đặt hàng thành công!</Title>
            <Button 
                type="primary" 
                onClick={() => navigate('/')}
                style={{ marginTop: 20 }}
            >
                Quay lại trang chủ
            </Button>
        </div>
    );
};

export default Order;