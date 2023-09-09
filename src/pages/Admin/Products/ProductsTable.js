import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Tooltip, Checkbox, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText
} from '@mui/material';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import EditProductDialog from "./EditProductDialog";
import {toast, ToastContainer} from "react-toastify";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import AddProductModal from "./AddProductModal";
import CircularProgress from "@mui/material/CircularProgress";
import CategoryFilter from "./CategoryFilter";

const ProductsTable = ({onCategoryUpdate}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [selected, setSelected] = useState([]);
    const [products, setProducts] = useState([]);
    const [open, setOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [editingProduct, setEditingProduct] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [openEdit, setOpenEdit] = useState(false); // для диалога редактирования
    const [openDelete, setOpenDelete] = useState(false); // для диалога удаления
    const [modalOpen, setModalOpen] = useState(false);
    const [categories, setCategories] = useState([]);

    const handleCategoryChange = (newCategory) => {
        setSelectedCategory(newCategory);
    };

    const handleClose = () => {
        setModalOpen(false);
    };

    const handleAddNew = () => {
        setModalOpen(true);
    };

    const addProduct = async ({ title, shortDescription, detailedDescription, mainImage, category }) => {
        if (!title || !shortDescription || !detailedDescription || !mainImage || !category) {
            toast.error('Все поля должны быть заполнены');
            return;
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/products/create`, { title, shortDescription, detailedDescription, mainImage, category });

            if (response.status === 200 || response.status === 201) {
                toast.success('Товар успешно добавлен');
                setProducts(prevProducts => [...prevProducts, response.data]);
            } else {
                toast.error('Что-то пошло не так');
            }
        } catch (error) {
            toast.error(`Ошибка: ${error.message}`);
        }
    };

    useEffect(() => {
        fetchAllData();
    }, []);

    const fetchAllData = async () => {
        setIsLoading(true);
        try {
            const [productsResponse, categoriesResponse] = await Promise.all([
                axios.get(`${process.env.REACT_APP_BASE_URL}/api/products/get-all`),
                axios.get(`${process.env.REACT_APP_BASE_URL}/categories/get-all`)
            ]);

            setProducts(productsResponse.data);
            setCategories(categoriesResponse.data);
        } catch (error) {
            console.error('Ошибка загрузки данных:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (product) => {
        console.log("Editing product:", product);
        setEditingProduct(product);
        setOpenEdit(true);
        setIsEditing(true);  // Устанавливаем isEditing в true, так как это редактирование существующего товара
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
    };


    const handleSave = (updatedOrNewProduct) => {
        if (editingProduct) {
            // Обновляем локальное состояние для редактирования
            setProducts(prevProducts => {
                return prevProducts.map(product =>
                    product._id === updatedOrNewProduct._id ? updatedOrNewProduct : product
                );
            });
        } else {
            // Добавляем новый товар в локальное состояние
            setProducts(prevProducts => [...prevProducts, updatedOrNewProduct]);
        }
        // Закрываем диалоговое окно
        setOpenEdit(false);
    };

    const handleSelect = (event, id) => {
        setSelected(prevSelected => ({
            ...prevSelected,
            [id]: !prevSelected[id]
        }));
    };


    const handleCloseDialog = () => {
        setOpen(false);
    };

    const handleDeleteSelected = () => {
        const idsToDelete = Object.keys(selected).filter(id => selected[id]);
        if (idsToDelete.length > 0) {
            // Открываем диалоговое окно для подтверждения
            setOpen(true);
        }
    };

    const handleConfirmDelete = async () => {
        const idsToDelete = Object.keys(selected).filter(id => selected[id]);

        if (idsToDelete.length > 0) {
            try {
                await Promise.all(idsToDelete.map(id => axios.delete(`${process.env.REACT_APP_BASE_URL}/api/products/del/${id}`)));

                setProducts(prevProducts => prevProducts.filter(product => !idsToDelete.includes(product._id)));
                setSelected(prevSelected => {
                    const newSelected = { ...prevSelected };
                    idsToDelete.forEach(id => delete newSelected[id]);
                    return newSelected;
                });
            } catch (error) {
                console.error('There was an error deleting the products!', error);
            }
        }

        setOpen(false);
    };
    const truncate = (str, n) => {
        return (str.length > n) ? str.substr(0, n - 1) + '...' : str;
    };

    console.log("Selected Category:", selectedCategory);
    console.log("Products:", products);
    const filteredProducts = selectedCategory === 'all'
        ? products
        : products.filter(product => product.category && product.category._id === selectedCategory);

    return (
        <>
            {isLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <TableContainer component={Paper} sx={{padding: 3, width: '100%'}} >
                    <Typography variant="h6" gutterBottom>
                        Список товаров
                    </Typography>

                    <Box sx={{gap: 2}} display={'flex'}>
                        <Button variant="contained" color="secondary" onClick={handleDeleteSelected}>
                            Удалить выбранные <DeleteIcon sx={{width: 20, marginLeft: 1}}/>
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleAddNew}>
                            Добавить товар <AddIcon sx={{width: 20, marginLeft: 1}}/>
                        </Button>

                        <Box>
                            <CategoryFilter
                                categories={categories}
                                selectedCategory={selectedCategory}
                                onCategoryChange={handleCategoryChange}
                            />
                        </Box>
                    </Box>

                    <Box sx={{ overflowX: 'auto' }}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell padding="checkbox">
                                        <Checkbox />
                                    </TableCell>
                                    <TableCell>Название</TableCell>
                                    <TableCell>Краткое описание</TableCell>
                                    <TableCell>Подробное описание</TableCell>
                                    <TableCell>Применение</TableCell>
                                    <TableCell>Основное изображение</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredProducts.map((product) => (
                                    <TableRow key={product._id}>
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={!!selected[product._id]}
                                                onChange={(event) => handleSelect(event, product._id)}
                                                color="default"  // Добавьте эту строку
                                            />
                                        </TableCell>
                                        <TableCell>{product.title}</TableCell>
                                        <TableCell>
                                            <Tooltip title={product.shortDescription}>
                                                <span>{truncate(product.shortDescription, 20)}</span>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell>
                                            <Tooltip title={product.detailedDescription}>
                                                <span>{truncate(product.detailedDescription, 20)}</span>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell>{product.application.join(', ')}</TableCell>
                                        <TableCell align="center">
                                            <img src={`${process.env.REACT_APP_BASE_URL}${product.mainImage}`} alt={product.title} width={120} />
                                        </TableCell>
                                        <TableCell align="center">
                                            <Button variant="contained" color="primary" onClick={() => handleEdit(product)}>
                                                <EditIcon />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                </TableContainer>
            )}

            <Dialog
                open={open}
                onClose={handleCloseDialog}
            >
                <DialogTitle>Удаление товара</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Вы точно хотите удалить выбранные товары?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Отмена
                    </Button>
                    <Button onClick={handleConfirmDelete} color="secondary">
                        Удалить
                    </Button>
                </DialogActions>
            </Dialog>

            <EditProductDialog
                open={openEdit}
                onClose={handleCloseEdit}
                onSave={handleSave}
                product={editingProduct}
                isEditing={true}
            />
            <ToastContainer />
            <AddProductModal open={modalOpen} handleClose={handleClose} categories={categories} addProduct={addProduct} />
        </>
    );
};

export default ProductsTable;
