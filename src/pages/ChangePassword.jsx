import React, { useState } from 'react';
import { Form, Input, Button, message, Card } from 'antd';

import { api } from '../services/callAPI.service';
import { useNavigate } from 'react-router-dom';


const ChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await api.postChangePassword(values);
      console.log("res", res.data);
      alert(res.data?.data);
      localStorage.removeItem('token');
      navigate('/auth/login', { replace: true });
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Đã xảy ra lỗi khi đổi mật khẩu';
      message.error(errorMsg);
      // alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      title="Đổi mật khẩu"
      style={{ maxWidth: 500, margin: 'auto', marginTop: 50, borderRadius: 10 }}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Mật khẩu cũ"
          name="oldpassword"
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu cũ!' }]}
        >
          <Input.Password placeholder="Nhập mật khẩu cũ" />
        </Form.Item>

        <Form.Item
          label="Mật khẩu mới"
          name="newpassword"
          rules={[
            { required: true, message: 'Vui lòng nhập mật khẩu mới!' },
            { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' },
            {  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{6,}$/, message: 'Mật khẩu phải chứa ít nhất một chữ cái viết hoa, một chữ cái viết thường, một số và một ký tự đặc biệt!' },
          ]}
        >
          <Input.Password placeholder="Nhập mật khẩu mới" />
        </Form.Item>

        <Form.Item
          label="Xác nhận mật khẩu mới"
          name="confirmpassword"
          dependencies={['newpassword']}
          rules={[
            { required: true, message: 'Vui lòng xác nhận mật khẩu mới!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newpassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Xác nhận mật khẩu mới" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
            style={{ borderRadius: 5 }}
          >
            Đổi mật khẩu
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ChangePassword;
