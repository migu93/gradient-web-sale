import React, { useEffect, useState } from 'react';
import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
    Grid,
    Container, Box
} from '@mui/material';

const Categories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BASE_URL}/categories/get-all`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok, status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => setCategories(data))
            .catch((error) => {
                console.error('Error fetching categories:', error);
                // Здесь вы можете добавить дополнительную обработку ошибок, например, установить состояние ошибки
            });
    }, []);

    return (
        <Container maxWidth={"lg"}>
            <Grid container spacing={10}>
                {categories.map((category) => (
                    <Grid item xs={12} sm={6} md={3}>
                        <Box>
                            <Card sx={{minWidth:250, maxHeight: 210, marginBottom: 5}}>
                                <CardActionArea href={`/catalog${category.categoryUrl}`}>
                                    <CardMedia sx={{minHeight: 150, }}
                                        component="img"
                                        height="140"
                                               image={`${process.env.REACT_APP_BASE_URL}${category.imageUrl}`}
                                        alt="green iguana"

                                    />
                                    <CardContent>
                                        <Typography gutterBottom sx={{fontSize: 16}} textAlign={'center'} component="div">
                                            {category.name}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Categories;
