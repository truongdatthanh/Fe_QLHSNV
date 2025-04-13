import React, { useEffect, useState } from 'react';
import { Row, Col, Typography, Spin, Empty } from 'antd';
import ProductCard from '../components/Card';
import { api } from '../services/callAPI.service';

const { Title } = Typography;

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.getAllProducts();
        if (res.status !== 200) {
          throw new Error('Failed to fetch products');
          }
          console.log('Danh sách sản phẩm:', res.data.data);
        setProducts(res.data.data);
      } catch (err) {
        console.error('Lỗi khi lấy danh sách sản phẩm:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div style={{ padding: '30px' }}>
      <Title level={2}>Danh sách sản phẩm cà phê</Title>

      {loading ? (
        <Spin tip="Đang tải sản phẩm..." />
      ) : products.length === 0 ? (
        <Empty description="Không có sản phẩm nào" />
      ) : (
        <Row gutter={[24, 24]}>
          {products.map((product) => (
            <Col xs={24} sm={12} md={8} lg={6} key={product._id}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default Home;
