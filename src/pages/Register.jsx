import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { api } from '../services/callAPI.service';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Typography, Card } from 'antd';

const { Title } = Typography;

const Register = () => {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const res = await api.postSignup(data);
            if (res.status !== 200) {
                alert("Đăng ký thất bại");
                return;
            }
            alert("Đăng ký thành công");
            navigate("/auth/login", { replace: true });
        } catch (error) {
           alert("Có lỗi xảy ra khi đăng ký");
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 50 }}>
            <Card style={{ width: 400 }}>
                <Title level={3} style={{ textAlign: 'center' }}>Đăng ký</Title>
                <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
                    <Form.Item
                        label="Tên tài khoản"
                        validateStatus={errors.username ? 'error' : ''}
                        help={errors.username?.message}
                    >
                        <Controller
                            name="username"
                            control={control}
                            rules={{ required: "Vui lòng nhập tên tài khoản" }}
                            render={({ field }) => <Input {...field} />}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Mật khẩu"
                        validateStatus={errors.password ? 'error' : ''}
                        help={errors.password?.message}
                    >
                        <Controller
                            name="password"
                            control={control}
                            rules={{
                                required: "Vui lòng nhập mật khẩu",
                                minLength: { value: 8, message: "Mật khẩu phải ít nhất 8 ký tự" }
                            }}
                            render={({ field }) => <Input.Password {...field} />}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        validateStatus={errors.email ? 'error' : ''}
                        help={errors.email?.message}
                    >
                        <Controller
                            name="email"
                            control={control}
                            rules={{ required: "Vui lòng nhập email" }}
                            render={({ field }) => <Input {...field} />}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Đăng ký
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default Register;
