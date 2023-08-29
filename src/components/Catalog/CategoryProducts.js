import { useParams } from 'react-router-dom';
import {Container, Grid, Typography} from "@mui/material";
import subCategoriesMap from "../../utils/subCategoriesMap";
import React, { useState, useEffect } from 'react';
import ProductCard from "./ProductCard";
import CategoryList from "./CategoryList";

const CategoryProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const { categoryId } = useParams();
    const { categoryUrl } = useParams();
    const categoryName = subCategoriesMap[categoryUrl] || categoryUrl;

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BASE_URL}/api/products/get-by-category-url/${categoryUrl}`)
            .then(response => response.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching products:", error);
                setLoading(false);
            });
    }, [categoryId]);



    return (
        <Container maxWidth={'lg'}>
            <Typography variant={'h4'}>{categoryName}</Typography>
            {loading ? (
                <Typography>Loading...</Typography>
            ) : (
                <Grid container spacing={3}>
                    {/* Колонка для CategoryList */}
                    <Grid item xs={12} sm={4} md={3}>
                        <CategoryList />
                    </Grid>

                    {/* Колонка для продуктов */}
                    <Grid item xs={12} sm={8} md={9}>
                        <Grid container spacing={3}>
                            {products.map(product => (
                                <Grid item xs={12} sm={6} md={4} key={product._id}>
                                    <ProductCard product={product} />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            )}
        </Container>
    );
};

export default CategoryProducts;
