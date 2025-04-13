import React, { useEffect, useState } from 'react';
import { Row, Col, Spin, Empty, Typography } from 'antd';
import { api } from '../services/callAPI.service';
import ProductCard from '../components/Card';

const { Title } = Typography;

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
          const res = await api.getAllProducts();
          console.log('Danh sách sản phẩm:', res.data);
        const productList = res.data.data || [];
        setProducts(productList);
      } catch (error) {
        console.error("Lỗi khi tải sản phẩm:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <div style={{ padding: '40px' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '30px' }}>
        Sản phẩm cà phê
      </Title>

      {loading ? (
        <Spin size="large" style={{ display: 'flex', justifyContent: 'center' }} />
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

export default ProductPage;
