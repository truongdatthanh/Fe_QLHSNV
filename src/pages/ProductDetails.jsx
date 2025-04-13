import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Typography, Button, Rate, Input, List, message, Card } from 'antd';
import { api } from '../services/callAPI.service';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);

  useEffect(() => {
    fetchProduct();
    fetchReviews();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await api.getProductById(id);
      setProduct(res.data.data);
    } catch (err) {
      console.error('Lỗi khi tải sản phẩm:', err);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await api.getReviewsByProductId(id);
      setReviews(res.data.data || []);
    } catch (err) {
      console.error('Lỗi khi tải đánh giá:', err);
    }
  };

  const handleAddToCart = async () => {
    try {
      console.log('Thêm sản phẩm vào giỏ hàng:', product);
      const res = await api.addToCart(product);
      if (res.status === 200) {
        message.success('Thêm sản phẩm vào giỏ hàng thành công!');
      } else {
        message.error('Không thể thêm sản phẩm vào giỏ hàng');
      }
    }catch (err) {
      console.error('Lỗi khi thêm sản phẩm vào giỏ hàng:', err);
      message.error('Không thể thêm sản phẩm vào giỏ hàng');
    }
  };

  const handleSubmitReview = async () => {
    if (!reviewText || rating === 0) {
      return message.warning('Vui lòng nhập nội dung và chọn số sao');
    }

    try {
      await api.addReview({
        productId: id,
        text: reviewText,
        rating,
      });
      message.success('Gửi đánh giá thành công');
      setReviewText('');
      setRating(0);
      fetchReviews(); // reload lại review
    } catch (err) {
      console.error('Lỗi khi gửi đánh giá:', err);
      message.error('Không thể gửi đánh giá');
    }
  };

  if (!product) return <p>Đang tải...</p>;

  return (
    <div style={{ padding: '40px' }}>
      <Row gutter={32}>
        <Col md={10}>
          <img
            src={product.imgURL}
            alt={product.name}
            style={{ width: '100%', borderRadius: 10 }}
          />
        </Col>
        <Col md={14}>
          <Title level={2}>{product.name}</Title>
          <Paragraph strong>Giá: {product.price.toLocaleString()}₫</Paragraph>
          <Paragraph>Số lượng: {product.quantity}</Paragraph>
          <Paragraph>Mô tả: {product.description}</Paragraph>
          <Button type="primary" size="large" onClick={handleAddToCart}>
            Thêm vào giỏ hàng
          </Button>
        </Col>
      </Row>

      <div style={{ marginTop: 60 }}>
        <Title level={3}>Đánh giá sản phẩm</Title>
        <List
          itemLayout="vertical"
          dataSource={reviews}
          renderItem={(item) => (
            <Card style={{ marginBottom: 16 }}>
              <Rate disabled value={item.rating} />
              <Paragraph>{item.text}</Paragraph>
            </Card>
          )}
        />

        <div style={{ marginTop: 40 }}>
          <Title level={4}>Viết đánh giá của bạn</Title>
          <Rate value={rating} onChange={setRating} />
          <TextArea
            rows={4}
            placeholder="Nhập đánh giá của bạn"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            style={{ marginTop: 16 }}
          />
          <Button type="primary" onClick={handleSubmitReview} style={{ marginTop: 16 }}>
            Gửi đánh giá
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
