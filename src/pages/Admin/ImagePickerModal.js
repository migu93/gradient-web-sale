import React from 'react';
import {Dialog, DialogTitle, Grid, Card, CardMedia, Typography, IconButton} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const ImagePickerModal = ({ open, images, onClose, onSelect }) => {
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
                        <Card sx={{margin: 2}} onClick={() => onSelect(img.url)}>
                            <CardMedia
                                component="img"
                                alt={img.filename}
                                height="140"
                                image={`${BASE_URL}${img.url}`}
                            />
                            <Typography variant="caption">{img.filename}</Typography>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Dialog>
    );
};

export default ImagePickerModal;
