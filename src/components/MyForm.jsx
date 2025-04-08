import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Form, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const MyForm = () => {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    // Xử lý dữ liệu biểu mẫu, bao gồm cả tệp đã tải lên
    console.log(data);
  };

  return (
    <Form onFinish={handleSubmit(onSubmit)}>
      <Form.Item label="Tải lên CV">
        <Controller
          name="cvFile"
          control={control}
          defaultValue={[]}
          render={({ field: { onChange, value } }) => (
            <Upload
              beforeUpload={() => false} // Ngăn chặn upload tự động
              fileList={value}
              onChange={(info) => onChange(info.fileList)}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Chọn file</Button>
            </Upload>
          )}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Gửi
        </Button>
      </Form.Item>
    </Form>
  );
};

export default MyForm;
