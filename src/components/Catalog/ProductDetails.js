// ProductDetails.js
import React, {useEffect, useState} from 'react';
import {Box, Button, Card, CardContent, CardMedia, Container, Grid, Paper, Typography} from "@mui/material";
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
        <Container maxWidth="lg" sx={{ p: 3 }}>
            <Grid container spacing={3}  display={'flex'}>
                <Grid item xs={12} md={6}>
                    <Box display="flex" justifyContent="center">
                        <Card sx={{ width: 400 }}>
                            <CardMedia
                                component="img"
                                width={200}
                                image={`${process.env.REACT_APP_BASE_URL}${product.mainImage}`}
                                alt={product.title}
                            />
                        </Card>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h5" gutterBottom>
                        {product.title}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        {product.shortDescription}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        {product.detailedDescription}
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                        Применение:
                    </Typography>
                    <ul>
                        {product.application.map((app, index) => (
                            <li key={index}>{app}</li>
                        ))}
                    </ul>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                        Документы и файлы:
                    </Typography>
                    <ul>
                        {product.documentsAndFiles.map((doc, index) => (
                            <li key={index}>
                                <a href={doc} target="_blank" rel="noopener noreferrer">
                                    Документ {index + 1}
                                </a>
                            </li>
                        ))}
                    </ul>
                </Grid>

                <Grid item xs={12} sx={{ mt: 2, textAlign: 'center' }}>
                    <Button component={RouterLink} to="/catalog" variant="contained" color="primary">
                        Вернуться к каталогу
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ProductDetails;
