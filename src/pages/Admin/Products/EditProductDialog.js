import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField, Box, Typography, MenuItem, Select,
} from '@mui/material';
import axios from "axios";
import {toast} from "react-toastify";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ProductImagePicker from "./ProductImagePicker";
import EditIcon from '@mui/icons-material/Edit';
import defoultImage from "../../../images/defoult-image.jpg";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const EditProductDialog = ({ open, onClose, onSave, product, isEditing }) => {
    const [localProduct, setLocalProduct] = useState(product);
    const [imagePickerOpen, setImagePickerOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);



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
    const handleChangeCategory = (e) => {
        setSelectedCategory(e.target.value);
        setLocalProduct({
            ...localProduct,
            category: e.target.value
        });
    };


    useEffect(() => {
        axios.get(`${BASE_URL}/categories/get-all`)
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Ошибка при получении категорий:', error);
                toast.error("Не удалось загрузить категории.");
            });

        if (product) {
            setLocalProduct(product);
            setSelectedCategory(product.category._id); // Используйте ._id здесь
        } else {
            // Инициализация по умолчанию
        }
    }, [product]);

    useEffect(() => {
        if (product) {
            setLocalProduct(product);
        } else {
            // Инициализация localProduct для нового продукта
            setLocalProduct({
                title: '',
                shortDescription: '',
                detailedDescription: '',
                application: [],
                mainImage: '',
            });
        }
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

    const handleSave = async (categoryData) => {
        if (!localProduct) {
            toast.error("Ошибка, товар не выбран или не создан");
            return;
        }

        const requiredFields = ['title', 'shortDescription', 'detailedDescription', 'application', 'mainImage'];
        for (const field of requiredFields) {
            if (!localProduct[field]) {
                toast.error(`Ошибка, вы не заполнили поле ${field}`);
                return;
            }
        }

        if (isEditing) {
            // Логика для обновления существующего товара
            axios.put(`${BASE_URL}/api/products/update/${localProduct._id}`, localProduct, categoryData)
                .then(response => {
                    onSave(localProduct);
                    toast.success("Товар успешно обновлен!");
                })
                .catch(error => {
                    console.error('There was an error updating the product!', error);
                    toast.error("Ошибка при обновлении товара.");
                });
        } else {
            // Логика для создания нового товара
            axios.post(`${BASE_URL}/api/products/create`, localProduct)
                .then(response => {
                    onSave(localProduct);
                    toast.success("Товар успешно создан!");
                })
                .catch(error => {
                    console.error('There was an error creating the product!', error);
                    toast.error("Ошибка при создании товара.");
                });
        }
        onClose();
    };


    const handleAddApplication = () => {
        if (!localProduct.application) {
            setLocalProduct({
                ...localProduct,
                application: ['']
            });
        } else {
            setLocalProduct({
                ...localProduct,
                application: [...localProduct.application, '']
            });
        }
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
                <DialogTitle>{isEditing ? "Редактировать товар" : "Добавить новый товар"}</DialogTitle>
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

                    <Box mb={2} mt={2}>
                        <Typography>Категория товара:</Typography>

                        <Select
                            value={selectedCategory}
                            onChange={handleChangeCategory}
                            fullWidth
                        >
                            {categories.map(category => (
                                <MenuItem key={category._id} value={category._id}>{category.name}</MenuItem>
                            ))}
                        </Select>
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
