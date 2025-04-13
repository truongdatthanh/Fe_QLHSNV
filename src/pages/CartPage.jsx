import React, { useState, useEffect } from 'react';
import { Card, Button, Typography, InputNumber, message, Row, Col, Form, Input } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { api } from '../services/callAPI.service';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [discountCode, setDiscountCode] = useState("");
    const [discountedPrice, setDiscountedPrice] = useState(null);
    const [address, setAddress] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("COD");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const res = await api.getCart();
                const data = res.data.data;
                setCartItems(data.items || []);
                calculateTotal(data.items || []);
            } catch (error) {
                console.error('Lỗi khi tải giỏ hàng:', error);
            }
        };
        fetchCartItems();
    }, []);

    const handleQuantityChange = async (value, record) => {
        const updated = cartItems.map((item) =>
            item._id === record._id ? { ...item, quantity: value } : item
        );
        setCartItems(updated);
        calculateTotal(updated);
    };

    const handleRemove = (id) => {
        const updated = cartItems.filter((item) => item._id !== id);
        setCartItems(updated);
        localStorage.setItem('cart', JSON.stringify(updated));
        calculateTotal(updated);
        message.success('Đã xóa sản phẩm khỏi giỏ hàng');
    };

    const calculateTotal = (items) => {
        const total = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
        setTotalPrice(total);
    };


    const handleApplyDiscount = async () => {
        try {
            if (!discountCode) {
                message.error("Vui lòng nhập mã giảm giá!");
                return;
            }
            const res = await api.getVoucherByCode(discountCode);
            const voucher = res.data.data;
            let discountedPrice = 0;
            if (voucher) {
                if (voucher.discountType === "percentage") {
                    discountedPrice = totalPrice - (totalPrice * voucher.discountValue / 100);
                } else if (voucher.discountType === "fixed") {
                    discountedPrice = totalPrice - voucher.discountValue;
                }
                if (discountedPrice < 0) discountedPrice = 0;
                setDiscountedPrice(discountedPrice);
            } else {
                message.error("Mã giảm giá không hợp lệ!");
            }
        } catch (err) {
            message.error("Lỗi khi áp dụng mã giảm giá!");
            console.error('Lỗi khi áp dụng mã giảm giá:', err);
        }
    };

    const getFinalPrice = () => {
        return discountedPrice !== null ? discountedPrice : totalPrice;
    };

    const handleOrderSubmit = async () => {
        if (!address) {
            message.error("Vui lòng nhập địa chỉ giao hàng!");
            return;
        }
        setLoading(true);
        try {
            console.log('Đang cập nhật giỏ hàng...', cartItems);
            const updated = await api.updateCart(cartItems);
            console.log('Cập nhật giỏ hàng thành công:', updated.data.data);
            setCartItems(updated.data.data);
            const orderData = {
                cartItems,
                totalPrice: getFinalPrice(),
                discountCode,
                address,
                paymentMethod,
            };

            const res = await api.createOrder(orderData);
            message.success("Đặt hàng thành công!");
            navigate("/orders", { replace: true });
        } catch (err) {
            message.error("Đặt hàng thất bại. Vui lòng thử lại!");
            console.error('Lỗi khi tạo đơn hàng:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: 24 }}>
            <Title level={2}>Các sản phẩm đã chọn</Title>

            <Row gutter={[16, 16]}>
                {/* Cột bên trái - Sản phẩm */}
                <Col xs={24} sm={16} style={{ display: 'flex', flexDirection: 'column' }}>
                    {cartItems.length === 0 ? (
                        <p>Không có sản phẩm nào trong giỏ hàng</p>
                    ) : (
                        <div>
                            {cartItems.map((item) => (
                                <Card
                                    key={item._id}
                                    style={{
                                        marginBottom: 16,
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                    }}
                                    cover={<img alt={item.product.name} src={item.product.imgURL} style={{ height: 100, objectFit: 'cover', width: 100, marginRight: 16 }} />}
                                    actions={[
                                        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                                            <InputNumber
                                                min={1}
                                                value={item.quantity}
                                                onChange={(value) => handleQuantityChange(value, item)}
                                                style={{ marginRight: 8, width: '80px' }} // Dàn rộng phần số lượng
                                            />
                                        </div>,
                                        <Button
                                            type="danger"
                                            icon={<DeleteOutlined />}
                                            onClick={() => handleRemove(item._id)}
                                            style={{ flex: 0 }}
                                        />,
                                    ]}
                                >
                                    <div style={{ flex: 1 }}>
                                        <Title level={5}>{item.product.name}</Title>
                                        <p>Đơn giá: {(item.product.price).toLocaleString()}₫</p>
                                        <p>Tổng tiền: {(item.product.price * item.quantity).toLocaleString()}₫</p>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </Col>

                {/* Cột bên phải - Chi tiết đơn hàng */}
                <Col xs={24} sm={8}>
                    <Card title="Chi tiết đơn hàng">
                        <Form layout="vertical">
                            <Form.Item label="Địa chỉ giao hàng" required>
                                <Input
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="Nhập địa chỉ giao hàng"
                                />
                            </Form.Item>

                            <Form.Item label="Phương thức thanh toán" required>
                                <select
                                    value={paymentMethod}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    style={{ width: '100%' }}
                                >
                                    <option value="COD">Tiền mặt</option>
                                    <option value="Momo">Momo</option>
                                    <option value="VNpay">VNpay</option>
                                </select>
                            </Form.Item>

                            <div>
                                <p>
                                    Mã giảm giá:
                                    <Input
                                        style={{ width: '100%' }}
                                        value={discountCode}
                                        onChange={(e) => setDiscountCode(e.target.value)}
                                        placeholder="Nhập mã giảm giá"
                                    />
                                    <Button type="primary" onClick={handleApplyDiscount} style={{ marginTop: 8 }}>
                                        Áp dụng
                                    </Button>
                                </p>
                                <p style={{ fontWeight: 'bold', marginTop: 16, fontSize: 16 }}>
                                    Tổng: {getFinalPrice().toLocaleString()}₫
                                </p>
                            </div>

                            <Button
                                type="primary"
                                block
                                loading={loading}
                                onClick={handleOrderSubmit}
                            >
                                Đặt hàng
                            </Button>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Cart;





