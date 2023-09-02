import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box, Typography
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ProductImagePicker from "./ProductImagePicker";
import EditIcon from "@mui/icons-material/Edit";
import defoultImage from '../../../images/defoult-image.jpg'

export default function AddProductModal({ open, handleClose, categories, addProduct }) {
    const [product, setProduct] = useState({
        title: '',
        shortDescription: '',
        detailedDescription: '',
        application: [],
        // ... остальные поля
    });

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };
    const [imagePickerOpen, setImagePickerOpen] = useState(false);

    const handleOpenImagePicker = () => {
        setImagePickerOpen(true);
    };

    const handleCloseImagePicker = () => {
        setImagePickerOpen(false);
    };
    const handleImageSelect = (imageUrl) => {
        setProduct({
            ...product,
            mainImage: imageUrl
        });
        setImagePickerOpen(false);
    };

    const handleAddApplication = () => {
        setProduct(prevState => ({ ...prevState, application: [...prevState.application, ''] }));
    };

    const handleRemoveApplication = (index) => {
        setProduct(prevState => {
            const newApplication = [...prevState.application];
            newApplication.splice(index, 1);
            return { ...prevState, application: newApplication };
        });
    };

    const handleApplicationChange = (e, index) => {
        const newApplication = [...product.application];
        newApplication[index] = e.target.value;
        setProduct({ ...product, application: newApplication });
    };

    const handleSubmit = () => {
        addProduct(product);
        handleClose();
    };

    return (
        <>
            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle>Добавить товар</DialogTitle>
                <DialogContent>
                    <TextField name="title" label="Название" fullWidth onChange={handleChange} sx={{ marginBottom: 2 }} />
                    <TextField name="shortDescription" label="Краткое описание" fullWidth onChange={handleChange} sx={{ marginBottom: 2 }} />
                    <TextField name="detailedDescription" label="Подробное описание" fullWidth onChange={handleChange} sx={{ marginBottom: 2 }} />
                    {/* Для поля application и других массивов, вы можете добавить дополнительную логику */}
                    <FormControl fullWidth sx={{ marginBottom: 2 }}>
                        <InputLabel>Категория</InputLabel>
                        <Select name="category" value={product.category} onChange={handleChange} >
                            {categories.map((category, index) => (
                                <MenuItem key={index} value={category._id}>
                                    {category.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Box sx={{ marginBottom: 2 }}>
                        <Button variant="contained" color="primary" onClick={handleAddApplication}>
                            Добавить применение <AddIcon />
                        </Button>
                    </Box>

                    {product.application.map((app, index) => (
                        <Box key={index} display={'flex'}>
                            <TextField
                                sx={{width: '100%', marginBottom: 2}}
                                label={`Применение ${index + 1}`}
                                value={app}
                                onChange={(e) => handleApplicationChange(e, index)}
                            />
                            <Button variant={'contained'} onClick={() => handleRemoveApplication(index)}>
                                <RemoveIcon />
                            </Button>
                        </Box>
                    ))}
                    <Typography>Текущее изображение:</Typography>

                    <Box position="relative" width={190}>
                        <img
                            src={product?.mainImage ? `${process.env.REACT_APP_BASE_URL}${product.mainImage}` : defoultImage}
                            alt="Current Image"
                            width="190"
                        />
                        <Box sx={{ position: 'absolute', top: 0, right: 0 }}>
                            <Button variant="outlined" color="primary" onClick={handleOpenImagePicker}>
                                <EditIcon sx={{ width: 20 }} />
                            </Button>
                        </Box>
                    </Box>

                </DialogContent>
                <DialogActions>
                    <Button variant={'contained'} onClick={handleClose} color="primary">
                        Отмена
                    </Button>
                    <Button onClick={handleSubmit} variant={'contained'} color="success">
                        Добавить
                    </Button>
                </DialogActions>


            </Dialog>
            <ProductImagePicker
                open={imagePickerOpen}
                onClose={handleCloseImagePicker}
                onSelect={handleImageSelect}
            />
        </>
    );
}
