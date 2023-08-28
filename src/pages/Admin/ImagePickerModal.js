import React, {useEffect, useState} from 'react';
import {Dialog, DialogTitle, Grid, Card, CardMedia, Typography, IconButton, Button, Box} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import { toast } from 'react-toastify';
import FileUploadIcon from '@mui/icons-material/FileUpload';

const BASE_URL = process.env.REACT_APP_BASE_URL;


const ImagePickerModal = ({ open, images, onClose, onSelect, onImageSelect  }) => {

    const [selectedFile, setSelectedFile] = React.useState(null);
    const [imageUrl, setImageUrl] = useState(null);


    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        handleUpload(event.target.files[0]);
    };

    const [localImages, setLocalImages] = React.useState([]);


    const handleUpload = async (file) => {
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await axios.post(`${BASE_URL}/images/upload/categories`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status === 200) {
                console.log('Image uploaded successfully');
                const newImage = {
                    filename: response.data.filename,
                    url: response.data.imageUrl
                };
                setLocalImages(prevImages => [...prevImages, newImage]);
                toast.success('Изображение успешно загружено!');
                onImageSelect();  // Вызовите функцию onImageSelect после успешной загрузки
                setImageUrl(response.data.imageUrl);

            }
        } catch (error) {
            console.error('Error uploading image:', error);
            toast.error('Ошибка при загрузке изображения.');
        }
    };


    return (
        <Dialog open={open} onClose={onClose}>
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

            <Grid container spacing={1}>
                {images.map(img => (
                    <Grid item xs={4} key={img.filename}>
                        <Card sx={{margin: 2, height: 200}} onClick={() => onSelect(img.url)}>
                            <CardMedia
                                component="img"
                                alt={img.filename}
                                height="140"
                                image={`${BASE_URL}${img.url}`}
                            />
                            <Typography variant="caption" sx={{textAlign: 'center', display: 'flex'}}>{img.filename}</Typography>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Grid container spacing={1} padding={2}>
                <Grid item xs={12}>
                    <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="raised-button-file"
                        type="file"
                        onChange={handleFileChange}
                    />
                    <Box sx={{display: 'flex', justifyContent: 'center', gap: 2}}>
                        <label htmlFor="raised-button-file">

                            <Button variant="contained" component="span">
                                Загрузить изображение
                                <FileUploadIcon sx={{width: 20, marginLeft: 1}}/>
                            </Button>
                        </label>
                    </Box>
                </Grid>
            </Grid>
        </Dialog>
    );
};

export default ImagePickerModal;
