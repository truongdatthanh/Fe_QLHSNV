import React from 'react';
import { Typography, Row, Col, Card } from 'antd';

const { Title, Paragraph } = Typography;

const About = () => {
  return (
    <div style={{ padding: '40px 20px', maxWidth: 1000, margin: '0 auto' }}>
      <Title level={2} style={{ textAlign: 'center' }}>Giới thiệu về chúng tôi</Title>

      <Paragraph style={{ fontSize: '16px', marginTop: 20 }}>
        Chào mừng bạn đến với cửa hàng cà phê của chúng tôi! Chúng tôi tự hào mang đến cho bạn những hạt cà phê
        chất lượng cao, được chọn lọc kỹ càng từ các vùng nguyên liệu nổi tiếng.
      </Paragraph>

      <Paragraph style={{ fontSize: '16px' }}>
        Với niềm đam mê dành cho cà phê, chúng tôi không ngừng cải tiến, tạo ra những sản phẩm phù hợp với mọi
        gu thưởng thức – từ cà phê truyền thống đến các dòng Specialty hiện đại.
      </Paragraph>

      <Row gutter={[24, 24]} style={{ marginTop: 40 }}>
        <Col xs={24} md={12}>
          <Card title="Sứ mệnh" bordered={false}>
            <Paragraph>
              Mang đến trải nghiệm cà phê tuyệt vời nhất cho khách hàng – từ hương vị đến dịch vụ.
            </Paragraph>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="Tầm nhìn" bordered={false}>
            <Paragraph>
              Trở thành thương hiệu cà phê được yêu thích nhất tại Việt Nam và vươn ra thế giới.
            </Paragraph>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default About;
