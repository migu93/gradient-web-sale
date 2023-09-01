import React, { useEffect, useState } from 'react';
import {Dialog, DialogTitle, Grid, Card, CardMedia, IconButton, Button, Box} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import UploadIcon from '@mui/icons-material/Upload';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const ProductImagePicker = ({ open, onClose, onSelect }) => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        if (open) {
            axios.get(`${BASE_URL}/images/get-all/productImages`)
                .then(response => {
                    setImages(response.data);  // Предполагается, что сервер возвращает массив изображений
                })
                .catch(error => {
                    console.error('Error fetching images:', error);
                });
        }
    }, [open]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('image', file);

        axios.post(`${BASE_URL}/images/upload/productImages`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(response => {
                const newImage = response.data;
                setImages(prevImages => [...prevImages, newImage]);
            })
            .catch(error => {
                console.error('Error uploading image:', error);
            });
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Выберите изображение</DialogTitle>
            <IconButton
                edge="end"
                color="inherit"
                onClick={onClose}
                aria-label="close"
                sx={{ position: 'absolute', right: 8, top: 8, marginRight: 0.01 }}
            >
                <CloseIcon />
            </IconButton>
            <Grid container justifyContent="left" minHeight={200}>
                {images.map((img, index) => (
                    <Grid item key={index}>
                        <Card
                            sx={{
                                maxWidth: 130,
                                marginLeft: 1,
                                marginRight: 1,
                                cursor: 'pointer',
                                '&:hover': {
                                    boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)'
                                }
                            }}
                            onClick={() => onSelect(img.url)}
                        >
                            <CardMedia
                                component="img"
                                alt={img.filename}
                                height="140"
                                image={`${BASE_URL}${img.url}`}
                            />
                        </Card>
                    </Grid>
                ))}

            </Grid>
            <Box sx={{padding: 2}}>
                <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="upload-button-file"
                    type="file"
                    onChange={handleFileChange}
                />
                <label htmlFor="upload-button-file">
                    <Button variant="contained" component="span">
                        Загрузить изображение <UploadIcon sx={{width: 20, marginLeft: 1}}/>
                    </Button>
                </label>
            </Box>
        </Dialog>
    );
};

export default ProductImagePicker;
