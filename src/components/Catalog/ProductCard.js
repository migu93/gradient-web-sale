import {Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {

    const navigate = useNavigate();

    const handleCardClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    return (
        <Card onClick={() => handleCardClick(product._id)} style={{ width: '240px', cursor: 'pointer' }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={`${process.env.REACT_APP_BASE_URL}${product.mainImage}`}
                    alt={product.title}
                />
                <CardContent>
                    <Typography component="div">
                        {product.title}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};
export default ProductCard;