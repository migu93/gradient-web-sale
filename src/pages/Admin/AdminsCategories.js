import React, {useEffect, useState} from 'react';
import List from "@mui/material/List";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
    Avatar,
    IconButton,
    ListItem,
    Tooltip,
    ListItemAvatar,
    Button, CardMedia, Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Typography
} from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import EditIcon from '@mui/icons-material/Edit';
import axios from "axios";
import CategoryModal from "./CategoryModal";
import DeleteIcon from '@mui/icons-material/Delete';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const AdminsCategories = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState(null); // 'edit' или 'add'
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [availableImages, setAvailableImages] = useState([]);
    const [hoveredCategory, setHoveredCategory] = useState(null);
    const [categories, setCategories] = useState([]);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    const handleDeleteClick = (category) => {
        setSelectedCategory(category);
        setDeleteModalOpen(true);
    };

    const handleDeleteCategory = () => {
        axios.delete(`${BASE_URL}/categories/del/${selectedCategory._id}`)
            .then(response => {
                toast.success('Категория успешно удалена!');
                setDeleteModalOpen(false);
                fetchCategories();
            })
            .catch(error => {
                toast.error('Произошла ошибка при удалении категории.');
            });
    };



    const handleSaveCategory = (categoryData) => {
        if (modalMode === 'edit' && selectedCategory) {
            // Отправьте запрос на сервер для обновления категории
            axios.put(`http://localhost:5001/categories/update/${selectedCategory._id}`, categoryData)
                .then(response => {
                    // Обновите список категорий или выполните другие действия после успешного обновления
                    toast.success('Категория успешно обновлена!');
                    // Закройте модальное окно
                    setModalOpen(false);
                    // Обновите список категорий
                    fetchCategories();
                })
                .catch(error => {
                    toast.error('Произошла ошибка при обновлении категории.');
                });
        } else {
            // Отправьте запрос на сервер для добавления новой категории
            axios.post('http://localhost:5001/categories/create', categoryData)
                .then(response => {
                    // Добавьте новую категорию в список или выполните другие действия после успешного добавления
                    toast.success('Категория успешно добавлена!');
                    // Закройте модальное окно
                    setModalOpen(false);
                    // Обновите список категорий
                    fetchCategories();
                })
                .catch(error => {
                    toast.error('Произошла ошибка при добавлении категории.');
                });
        }
    };



    const handleMouseEnter = (id) => {
        setTimeout(() => {
            setHoveredCategory(id);
        }, 1000); // Увеличенный вариант будет показан через 1 секунду
    };
    const fetchCategories = () => {
        fetch('http://localhost:5001/categories/get-all')
            .then((res) => res.json())
            .then((data) => setCategories(data))
            .catch((error) => console.error('An error occurred:', error));
    };;


    const handleMouseLeave = () => {
        setHoveredCategory(null);
    };

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


    useEffect(() => {
        // Здесь замените URL на URL вашего сервера
        fetch('http://localhost:5001/categories/get-all')
            .then((res) => res.json())
            .then((data) => setCategories(data))
            .catch((error) => console.error('An error occurred:', error));
    }, []);

    useEffect(() => {
        fetch(`${BASE_URL}/images/get-all/categories`) // Используйте правильный URL, если он отличается
            .then((res) => res.json())
            .then((data) => {
                setAvailableImages(data);
            })
            .catch((error) => console.error('An error occurred:', error));
    }, []);

    return (
        <>
            <Typography>
                Категории товаров
            </Typography>

            <Box sx={{marginTop: 2}}>
                <Button variant="contained" color="primary" onClick={handleAddClick}  style={{ marginBottom: '20px', position: 'relative' }}>
                    Добавить категорию
                </Button>
            </Box>

            <List dense={false}>
                {categories.map((category) => (
                    <ListItem
                        key={category._id}
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
                                    <CardMedia
                                        component="img"
                                        alt={category.name}
                                        height="140"
                                        image={`${BASE_URL}${category.imageUrl}`}
                                        title={category.name}
                                    />

                                </Avatar>
                            </Tooltip>
                        </ListItemAvatar>
                        <ListItemText
                            primary={category.name}
                            secondary={category.categoryUrl} // Можно добавить вторичный текст, если это необходимо
                        />
                        <Box sx={{gap: 1}}>
                            <IconButton edge="end" aria-label="edit" onClick={() => handleEditClick(category)}>
                                <EditIcon />
                            </IconButton>
                            <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteClick(category)}>
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    </ListItem>
                ))}
            </List>

            {availableImages.length > 0 && (
                <CategoryModal
                    open={modalOpen}
                    mode={modalMode}
                    category={selectedCategory}
                    images={availableImages}
                    onClose={() => setModalOpen(false)}
                    onSave={handleSaveCategory}
                />
            )}

            <Dialog
                open={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
            >
                <DialogTitle>Подтверждение</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Вы точно хотите удалить категорию {selectedCategory?.name}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteCategory} color="success" variant={'contained'} autoFocus>
                        Да
                    </Button>
                    <Button onClick={() => setDeleteModalOpen(false)} color="primary" variant={'contained'}>
                        Нет
                    </Button>
                </DialogActions>
            </Dialog>

            <ToastContainer />
        </>
    );
};

export default AdminsCategories;