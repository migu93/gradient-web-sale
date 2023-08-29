import {Box, Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {

    const navigate = useNavigate();

    const handleCardClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    return (
        <Card onClick={() => handleCardClick(product._id)} sx={{ minHeight: 250, cursor: 'pointer' }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    sx={{ height: 180 }} // фиксированная высота
                    image={`${process.env.REACT_APP_BASE_URL}${product.mainImage}`}
                    alt={product.title}
                />
                <CardContent>
                    <Box sx={{ height: 50, overflow: 'hidden', textOverflow: 'ellipsis' }}> {/* ограничение высоты и текста */}
                        <Typography sx={{ textAlign: 'center' }} component="div">
                            {product.title}
                        </Typography>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};
export default ProductCard;