// CategoryProducts.js
import React from 'react';
import { useParams } from 'react-router-dom';
import {Container, Typography} from "@mui/material";
import subCategoriesMap from "../../utils/subCategoriesMap";

const CategoryProducts = () => {
    const { categoryUrl } = useParams();
    const categoryName = subCategoriesMap[categoryUrl] || categoryUrl;

    // В реальном приложении вы бы получали список товаров из API на основе categoryUrl
    const products = [
        { id: 1, name: 'Рулетка 1' },
        { id: 2, name: 'Рулетка 2' },
        // ... другие товары
    ];

    return (
        <Container maxWidth={'lg'}>
            <Typography variant={'h4'}>{categoryName}</Typography>
            <ul>
                {products.map(product => (
                    <li key={product.id}>{product.name}</li>
                ))}
            </ul>
        </Container>
    );
};

export default CategoryProducts;
