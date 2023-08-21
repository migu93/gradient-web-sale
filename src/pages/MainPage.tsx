import React from 'react';
import CarouselMp from "../components/Carousel";
import CategoriesCards from "../components/CategoriesCards";
import { Typography, Grid, Container } from '@mui/material';

const MainPage: React.FC = () => {
    return (
        <>
            <CarouselMp/>
                <Grid marginBottom={5 }>
                    <Typography variant="h4" align="center">
                        Геодезическое оборудование
                    </Typography>
                </Grid>
            <CategoriesCards/>
        </>
);
}

export default MainPage;
