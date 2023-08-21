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
        fetch('http://localhost:5001/categories/get-all')
            .then((response) => response.json())
            .then((data) => setCategories(data));
    }, []);

    return (
        <Container maxWidth={"lg"}>
            <Grid container spacing={10}>
                {categories.map((category) => (
                    <Grid item xs={12} sm={6} md={3}>
                        <Box>
                            <Card sx={{minWidth:250, maxHeight: 210, marginBottom: 10}}>
                                <CardActionArea href={category.categoryUrl}>
                                    <CardMedia sx={{minHeight: 150, }}
                                        component="img"
                                        height="140"
                                        image={category.imageUrl}
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
