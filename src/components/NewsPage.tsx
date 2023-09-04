import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Container } from '@mui/material';

const NewsPage: React.FC = () => {
    const { newsId } = useParams<{ newsId: string }>();
    const [news, setNews] = useState<any>(null);

    useEffect(() => {
        // Fetch news data for the specific newsId from the server and update the state
        fetchNewsData();
    }, [newsId]);

    const fetchNewsData = async () => {
        try {
            const response = await fetch(`http://localhost:5001/news/${newsId}`);
            const data = await response.json();
            setNews(data);
        } catch (error) {
            console.error('Error fetching news data:', error);
        }
    };

    if (!news) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <Typography variant="h4" component="h1">
                {news.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
                {news.author}
            </Typography>
            <Typography variant="body1" color="text.primary">
                {news.content}
            </Typography>
        </Container>
    );
};

export default NewsPage;
