import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Container } from '@mui/material';
import {useNavigate} from "react-router-dom";

const NewsSection: React.FC = () => {
    const [newsData, setNewsData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch news data from the server and update the state
        fetchNewsData();
    }, []);

    const fetchNewsData = async () => {
        try {
            const response = await fetch('/news');
            const data = await response.json();
            setNewsData(data);
        } catch (error) {
            console.error('Error fetching news data:', error);
        }
    };

    const handleCardClick = (newsId: string) => {
        navigate(`${location.pathname}/${newsId}`);
    };

    return (
        <Container>
            <Grid container spacing={2}>
        {newsData.map((news: any) => (
                <Grid item xs={12} sm={6} md={4} key={news._id}>
            <Card onClick={() => handleCardClick(news._id)}>
    <CardContent>
        <Typography variant="h6" component="div">
        {news.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {news.content}
        </Typography>
        </CardContent>
        </Card>
        </Grid>
))}
    </Grid>
    </Container>
);
};

export default NewsSection;
