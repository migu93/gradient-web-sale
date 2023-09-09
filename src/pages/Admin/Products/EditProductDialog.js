import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField, Box, Typography, MenuItem, Select, Checkbox,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ProductImagePicker from "./ProductImagePicker";
import EditIcon from '@mui/icons-material/Edit';
import defoultImage from "../../../images/defoult-image.jpg";
import {useProduct} from "./useProduct";

const EditProductDialog = ({ open, onClose, onSave, product, isEditing }) => {
    const {
        localProduct, categories, selectedCategory, imagePickerOpen,
        handleOpenImagePicker, handleCloseImagePicker, handleImageSelect,
        handleChangeCategory, handleChange, handleSave,
        handleAddApplication, handleRemoveApplication, handleChangeApplication,
        handleAddCharacteristic, handleChangeCharacteristicKey, handleChangeCharacteristicValue,
        handleRemoveCharacteristic,
    } = useProduct(product, isEditing, onSave, onClose);

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

                    <Box mb={2}>
                        <TextField
                            label="Цена"
                            value={localProduct?.price || ''}
                            onChange={handleChange('price')}
                            fullWidth
                            margin="normal"
                            type="number"
                            sx={{ overflowY: "hidden" }}
                        />
                    </Box>

                    <Box mb={2}>
                        <label>Наличие на складе: </label>
                        <Checkbox
                            checked={localProduct?.inStock || false}
                            onChange={e => handleChange('inStock')(e)}
                            value={localProduct?.inStock || false}
                        />

                    </Box>


                    <Box mb={2} display={'flex'}>
                        <Button variant="contained" color="primary" onClick={handleAddCharacteristic}>
                            Добавить характеристику <AddIcon sx={{marginLeft: 1, width: 20}} />
                        </Button>
                    </Box>

                    {Object.entries(localProduct?.characteristics || {}).map(([key, value], index) => (
                        <Box mb={2} key={index} display={'flex'}>
                            <TextField
                                label="Ключ"
                                value={key}
                                onChange={(e) => handleChangeCharacteristicKey(index, e.target.value)}
                                fullWidth
                            />
                            <TextField
                                label="Значение"
                                value={value}
                                onChange={(e) => handleChangeCharacteristicValue(key, e.target.value)}
                                fullWidth
                            />
                            <Button variant={'contained'} onClick={() => handleRemoveCharacteristic(key)}>
                                <RemoveIcon />
                            </Button>
                        </Box>
                    ))}

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
