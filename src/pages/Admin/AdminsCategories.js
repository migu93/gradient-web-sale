import React, {useEffect, useState} from 'react';
import List from "@mui/material/List";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CloseIcon from '@mui/icons-material/Close';

import {
    Avatar,
    IconButton,
    ListItem,
    Tooltip,
    ListItemAvatar,
    Modal,
    TextField,
    Button,
    Typography,
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Grid,
    DialogTitle,
    DialogContent,
    Dialog,
    ImageList,
    ImageListItem
} from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import EditIcon from '@mui/icons-material/Edit';
import axios from "axios";
import * as PropTypes from "prop-types";

function DeleteIcon() {
    return null;
}

const AdminsCategories = () => {

    const [hoveredCategory, setHoveredCategory] = useState(null);
    const [categories, setCategories] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('edit'); // 'edit' или 'add'
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [availableImages, setAvailableImages] = useState([]);
    const [isImageModalOpen, setImageModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);


    const handleMouseEnter = (id) => {
        setTimeout(() => {
            setHoveredCategory(id);
        }, 1000); // Увеличенный вариант будет показан через 1 секунду
    };
    useEffect(() => {
        fetch('http://localhost:5001/images/get-list-images')
            .then((res) => res.json())
            .then((data) => setAvailableImages(data))
            .catch((error) => console.error('An error occurred:', error));
    }, []);


    const handleMouseLeave = () => {
        setHoveredCategory(null);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);

        axios.post('http://localhost:5001/images/upload', formData)
            .then((response) => {
                const imageUrl = response.data.imageUrl;
                setSelectedCategory((prevCategory) => ({
                    ...prevCategory,
                    imageUrl
                }));
                // Добавьте новое изображение в список доступных изображений
                setAvailableImages((prevImages) => [...prevImages, imageUrl.split('/uploads/')[1]]);
            })
            .catch((error) => {
                console.error('Error uploading image:', error);
            });
    };


    // Открыть модальное окно
    const handleEditClick = (category) => {
        setSelectedCategory(category);
        setModalMode('edit');
        setModalOpen(true);
    };

    const handleAddClick = () => {
        setSelectedCategory(null);
        setModalMode('add');
        setModalOpen(true);
    };


    // Закрыть модальное окно
    const handleCloseModal = () => {
        setModalOpen(false);
    };
    useEffect(() => {
        // Здесь замените URL на URL вашего сервера
        fetch('http://localhost:5001/categories/get-all')
            .then((res) => res.json())
            .then((data) => setCategories(data))
            .catch((error) => console.error('An error occurred:', error));
    }, []);

    // Обработать отправку формы
    const handleSave = () => {
        const url = modalMode === 'edit'
            ? `http://localhost:5001/categories/update/${selectedCategory._id}`
            : 'http://localhost:5001/categories/create';
        const method = modalMode === 'edit' ? 'PUT' : 'POST';

        fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(selectedCategory),
        })
            .then((res) => res.json())
            .then((data) => {
                // Обновить список категорий
                setCategories((prevCategories) =>
                    prevCategories.map((cat) => (cat._id === data._id ? data : cat))
                );
                setModalOpen(false);

                // Уведомление об успешном сохранении
                toast.success('Категория успешно сохранена!');
            })
            .catch((error) => {
                console.error('An error occurred:', error);

                // Уведомление об ошибке
                toast.error('Произошла ошибка при сохранении изменений. Пожалуйста, попробуйте еще раз.');
            });
    };

    // Обновление выбранной категории в состоянии
    const handleInputChange = (e, field) => {
        setSelectedCategory((prevCategory) => ({
            ...prevCategory,
            [field]: e.target.value,
        }));
    };

    return (
        <>
            <List dense={false}>
                {categories.map((category) => (
                    <ListItem
                        key={category._id}
                        secondaryAction={
                            <IconButton edge="end" aria-label="delete">
                                <DeleteIcon />
                            </IconButton>
                        }
                    >
                        <ListItemAvatar>
                            <Tooltip
                                open={hoveredCategory === category._id}
                                title={<img src={category.imageUrl}  alt={category.name} style={{ maxWidth: '200px', objectFit: 'cover' }} />}
                                placement="right"
                            >
                                <Avatar
                                    onMouseEnter={() => handleMouseEnter(category._id)}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <img
                                        src={category.imageUrl}
                                        alt={category.name}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                        }}
                                    />
                                </Avatar>
                            </Tooltip>
                        </ListItemAvatar>
                        <ListItemText
                            primary={category.name}
                            secondary={category.categoryUrl} // Можно добавить вторичный текст, если это необходимо
                        />
                        <IconButton edge="end" aria-label="edit" onClick={() => handleEditClick(category)}>
                            <EditIcon />
                        </IconButton>
                        <Button variant="contained" color="primary" onClick={handleAddClick} style={{ marginBottom: '20px' }}>
                            Добавить категорию
                        </Button>
                    </ListItem>
                ))}
            </List>
            <Modal open={isModalOpen} onClose={handleCloseModal}>
                <Box
                    sx={{
                        padding: '20px',
                        backgroundColor: '#272727',
                        maxWidth: {
                            xs: '90%', // для очень маленьких экранов (телефоны)
                            sm: '80%', // для небольших экранов (планшеты)
                            md: 600,   // для средних и больших экранов
                        },
                        width: 'auto', // Позволяет контенту определять ширину
                        height: 'auto', // Позволяет контенту определять высоту
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        borderRadius: '10px',
                        overflow: 'auto', // Добавляет прокрутку, если контент не умещается
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        {modalMode === 'edit' ? 'Редактировать категорию' : 'Добавить категорию'}
                    </Typography>
                    <TextField sx={{marginY: 1}} label="Название" fullWidth value={selectedCategory?.name || ''} onChange={(e) => handleInputChange(e, 'name')} />
                    <TextField sx={{marginY: 1}} label="URL изображения" fullWidth value={selectedCategory?.imageUrl || ''} onChange={(e) => handleInputChange(e, 'imageUrl')} />
                    <TextField sx={{marginY: 1}} label="URL категории" fullWidth value={selectedCategory?.categoryUrl || ''} onChange={(e) => handleInputChange(e, 'categoryUrl')} />
                    <FormControl fullWidth variant="outlined" style={{ marginBottom: '20px' }}>
                        <InputLabel>Изображение</InputLabel>
                        <Select
                            value={selectedCategory?.imageUrl || ''}
                            onChange={(e) => handleInputChange(e, 'imageUrl')}
                            label="Изображение"
                        >
                            {availableImages.map((image) => (
                                <MenuItem key={image} value={`/uploads/${image}`}>
                                    {image}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button variant="contained" color="primary" onClick={() => setImageModalOpen(true)}>
                        Выбрать изображение
                    </Button>

                    <Button variant="contained" color="primary" onClick={handleSave}>
                        Сохранить
                    </Button>
                </Box>
            </Modal>


            <Dialog open={isImageModalOpen} onClose={() => setImageModalOpen(false)} fullWidth maxWidth="md">
                <DialogTitle>
                    Выберите изображение
                    <IconButton style={{ position: 'absolute', right: 10, top: 10 }} onClick={() => setImageModalOpen(false)}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <ImageList cellHeight={160} cols={3}>
                        {availableImages.map((image) => (
                            <ImageListItem key={image} cols={1}>
                                <img
                                    src={`/uploads/${image}`}
                                    alt={image}
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => {
                                        handleInputChange({ target: { value: `/uploads/${image}` } }, 'imageUrl');
                                        setImageModalOpen(false);
                                    }}
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                    <input type="file" onChange={handleImageUpload} style={{ display: 'none' }} id="upload-button-file" />
                    <label htmlFor="upload-button-file">
                        <Button variant="contained" color="primary" component="span" style={{ marginTop: '20px' }}>
                            Загрузить новое изображение
                        </Button>
                    </label>
                </DialogContent>
            </Dialog>
            <ToastContainer />
        </>
    );
};

export default AdminsCategories;