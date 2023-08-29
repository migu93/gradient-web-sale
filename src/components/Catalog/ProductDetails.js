// ProductDetails.js
import React, {useEffect, useState} from 'react';
import {Button, Container, Typography} from "@mui/material";
import {Link as RouterLink, useParams} from 'react-router-dom';

const ProductDetails = () => {

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:5001/api/products/get/${id}`)
            .then(response => response.json())
            .then(data => {
                setProduct(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching product details:", error);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <Container maxWidth={'lg'}>
            <img src={`${process.env.REACT_APP_BASE_URL}${product.mainImage}`} alt={product.title} style={{ width: '200px', maxHeight: '200px', objectFit: 'cover' }} />
            <Typography variant="h4" gutterBottom>{product.title}</Typography>
            <Typography variant="subtitle1" gutterBottom>{product.shortDescription}</Typography>
            <Typography variant="body1" gutterBottom>{product.detailedDescription}</Typography>

            <Typography variant="h6" gutterBottom>Применение:</Typography>
            <ul>
                {product.application.map((app, index) => (
                    <li key={index}>{app}</li>
                ))}
            </ul>

            <Typography variant="h6" gutterBottom>Документы и файлы:</Typography>
            <ul>
                {product.documentsAndFiles.map((doc, index) => (
                    <li key={index}>
                        <a href={doc} target="_blank" rel="noopener noreferrer">Документ {index + 1}</a>
                    </li>
                ))}
            </ul>
            <Button component={RouterLink} to={'/catalog'} color="inherit" variant="text">
                <Typography textAlign="center">Вернуться к каталогу</Typography>
            </Button>
        </Container>
    );
};

export default ProductDetails;
