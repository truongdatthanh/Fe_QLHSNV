import React from 'react';
import { useForm } from 'react-hook-form';
import { api } from '../services/callAPI.service';
import { useNavigate } from 'react-router-dom';
import { Card, Input, Button, Typography, Form } from 'antd';

const { Title, Text } = Typography;

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const res = await api.postSignup(data);
        if (res.status !== 200) {
            alert("Đăng ký thất bại");
            return;
        }
        navigate("/auth/login", { replace: true });
        alert("Đăng ký thành công");
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f0f2f5',
        }}>
            <Card
                style={{
                    width: 500,
                    padding: 24,
                    borderRadius: 12,
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                }}
            >
                <div style={{ textAlign: 'center', marginBottom: 20 }}>
                    <img src="/logo.png" alt="logo" style={{ height: 60, marginBottom: 10 }} />
                    <Title level={3}>Đăng ký tài khoản</Title>
                </div>

                <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
                    <Form.Item label="Tên tài khoản" required>
                        <Input
                            placeholder="Nhập tên tài khoản"
                            {...register("username", { required: "Vui lòng nhập tên tài khoản" })}
                        />
                        {errors.username && <Text type="danger">{errors.username.message}</Text>}
                    </Form.Item>

                    <Form.Item label="Mật khẩu" required>
                        <Input.Password
                            placeholder="Nhập mật khẩu"
                            {...register("password", {
                                required: "Vui lòng nhập mật khẩu",
                                minLength: {
                                    value: 8,
                                    message: "Mật khẩu phải ít nhất 8 ký tự"
                                }
                            })}
                        />
                        {errors.password && <Text type="danger">{errors.password.message}</Text>}
                    </Form.Item>

                    <Form.Item label="Email" required>
                        <Input
                            type="email"
                            placeholder="Nhập email"
                            {...register("email", { required: "Vui lòng nhập email" })}
                        />
                        {errors.email && <Text type="danger">{errors.email.message}</Text>}
                    </Form.Item>

                    <Form.Item label="Họ tên đầy đủ" required>
                        <Input
                            placeholder="Nhập họ tên"
                            {...register("fullname", { required: "Vui lòng nhập họ tên" })}
                        />
                        {errors.fullname && <Text type="danger">{errors.fullname.message}</Text>}
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Đăng ký
                        </Button>
                    </Form.Item>

                    <Text>
                        Đã có tài khoản? <a href="/auth/login">Đăng nhập</a>
                    </Text>
                </Form>
            </Card>
        </div>
    );
};

export default Register;
