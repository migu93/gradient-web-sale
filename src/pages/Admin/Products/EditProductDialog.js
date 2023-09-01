import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField, Box, IconButton, Grid, Typography,
} from '@mui/material';
import axios from "axios";
import {toast} from "react-toastify";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ProductImagePicker from "./ProductImagePicker";
import EditIcon from '@mui/icons-material/Edit';
import UploadIcon from '@mui/icons-material/Upload';
const BASE_URL = process.env.REACT_APP_BASE_URL;

const EditProductDialog = ({ open, onClose, onSave, product }) => {
    const [localProduct, setLocalProduct] = useState(product);
    const [imagePickerOpen, setImagePickerOpen] = useState(false);

    const handleOpenImagePicker = () => {
        setImagePickerOpen(true);
    };

    const handleCloseImagePicker = () => {
        setImagePickerOpen(false);
    };

    const handleImageSelect = (imageUrl) => {
        setLocalProduct({
            ...localProduct,
            mainImage: imageUrl
        });
        setImagePickerOpen(false);
    };


    useEffect(() => {
        setLocalProduct(product);
    }, [product]);

    const handleChange = (field) => (event) => {
        let value = event.target.value;

        // Если поле является "application", преобразуем строку обратно в массив
        if (field === 'application') {
            value = value.split(',').map(item => item.trim());
        }

        setLocalProduct({
            ...localProduct,
            [field]: value,
        });
    };

    const handleSave = () => {
        axios.put(`${BASE_URL}/api/products/update/${localProduct._id}`, localProduct)
            .then(response => {
                onSave(localProduct);
                toast.success("Товар успешно обновлен!");  // Уведомление об успехе
            })
            .catch(error => {
                console.error('There was an error updating the product!', error);
                toast.error("Ошибка при обновлении товара.");  // Уведомление об ошибке
            });
        onClose();
    };

    const handleAddApplication = () => {
        setLocalProduct({
            ...localProduct,
            application: [...localProduct.application, '']
        });
    };

    const handleRemoveApplication = (index) => {
        const newApplications = [...localProduct.application];
        newApplications.splice(index, 1);
        setLocalProduct({
            ...localProduct,
            application: newApplications
        });
    };

    const handleChangeApplication = (index, value) => {
        const newApplications = [...localProduct.application];
        newApplications[index] = value;
        setLocalProduct({
            ...localProduct,
            application: newApplications
        });
    };

    return (
        <>
            <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
                <DialogTitle>Редактировать товар</DialogTitle>
                <DialogContent>
                    <Box mb={2}>
                        <TextField
                            label="Название"
                            value={localProduct?.title || ''}
                            onChange={handleChange('title')}
                            fullWidth
                            margin="normal"
                            multiline
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            label="Краткое описание"
                            value={localProduct?.shortDescription || ''}
                            onChange={handleChange('shortDescription')}
                            fullWidth
                            margin="normal"
                            multiline
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            label="Подробное описание"
                            value={localProduct?.detailedDescription || ''}
                            onChange={handleChange('detailedDescription')}
                            fullWidth
                            margin="normal"
                            multiline
                        />
                    </Box>

                    <Box mb={2} display={'flex'}>
                        <Button variant="contained" color="primary" onClick={handleAddApplication}>
                             Добавить применение <AddIcon sx={{marginLeft: 1, width: 20}} />
                        </Button>

                    </Box>

                    {localProduct?.application?.map((app, index) => (
                        <Box mb={2} key={index} display={'flex'}>
                            <TextField
                                label={`Применение ${index + 1}`}
                                value={app}
                                onChange={(e) => handleChangeApplication(index, e.target.value)}
                                fullWidth
                            />
                            <Button variant={'contained'}  onClick={() => handleRemoveApplication(index)}>
                                <RemoveIcon />
                            </Button>
                        </Box>
                    ))}
                    <Typography>Текущее изображение:</Typography>
                    <Box mb={2} display={'flex'}>

                        <img src={`${BASE_URL}${localProduct?.mainImage}`} alt="Current Image" width="130" />

                        <Box margin={2}>
                            <Button variant="contained" color="primary" onClick={handleOpenImagePicker}>
                                Редактировать
                                 <EditIcon sx={{marginLeft: 1, width: 20}}/>
                            </Button>
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} variant={'contained'} color="primary">
                        Отмена
                    </Button>
                    <Button onClick={handleSave} variant={'contained'} color="success">
                        Сохранить
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
};

export default EditProductDialog;
