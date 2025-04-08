
import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { api } from '../services/callAPI.service';
import { useNavigate } from 'react-router-dom';
import { Card, Input, Button, Typography, Form } from 'antd';

const { Title, Text } = Typography;

const Login = () => {
    const navigate = useNavigate();
    const { control, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/", { replace: true });
        }
    }, [navigate]);

    const onSubmit = async (data) => {
        try {
            const user = await api.postLogin(data);
            if (user.status === 200) {
                localStorage.setItem("token", user.data.data);
                navigate("/", { replace: true });
                alert("Đăng nhập thành công");
            } else {
                alert("Đăng nhập thất bại");
            }
        } catch (err) {
            console.error("Login error:", err);
            alert("Đăng nhập thất bại");
        }
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
                    width: 400,
                    padding: 24,
                    borderRadius: 12,
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                }}
            >
                <div style={{ textAlign: 'center', marginBottom: 20 }}>
                    <img src="/logo.png" alt="logo" style={{ height: 60, marginBottom: 10 }} />
                    <Title level={3}>Đăng nhập hệ thống</Title>
                </div>

                <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
                    <Form.Item label="Tên tài khoản" required>
                        <Controller
                            name="username"
                            control={control}
                            rules={{ required: "Vui lòng nhập tên tài khoản" }}
                            render={({ field }) => <Input {...field} placeholder="Nhập tên tài khoản" />}
                        />
                        {errors.username && (
                            <Text type="danger">{errors.username.message}</Text>
                        )}
                    </Form.Item>

                    <Form.Item label="Mật khẩu" required>
                        <Controller
                            name="password"
                            control={control}
                            rules={{
                                required: "Vui lòng nhập mật khẩu",
                                minLength: {
                                    value: 8,
                                    message: "Mật khẩu phải ít nhất 8 ký tự"
                                }
                            }}
                            render={({ field }) => <Input.Password {...field} placeholder="Nhập mật khẩu" />}
                        />
                        {errors.password && (
                            <Text type="danger">{errors.password.message}</Text>
                        )}
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Đăng nhập
                        </Button>
                    </Form.Item>

                    <Text>
                        Bạn chưa có tài khoản? <a href="/auth/register">Đăng ký ngay</a>
                    </Text>
                </Form>
            </Card>
        </div>
    );
};

export default Login;
