import React from 'react';
import { Card, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

const { Meta } = Card;

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const handleTo = () => {
        navigate(`/products/${product._id}`);
    };
    return (
        <>
            <Card
                hoverable
                onClick={handleTo}
                style={{ width: 240, margin: '16px auto' }}
                cover={
                    <img
                        alt={product.name}
                        src={product.imgURL}
                        style={{ height: 200, objectFit: 'cover' }}
                    />
                }
            >
                <Meta
                    title={<Link to={`/product/${product._id}`}>{product.name}</Link>}
                    description={`${product.price.toLocaleString()}₫`}
                />
            </Card>
        </>

    );
};

export default ProductCard;
