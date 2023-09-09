import { useState, useEffect } from 'react';
import { fetchCategories, updateProduct, createProduct } from './api';
import { toast } from "react-toastify";
import axios from "axios";

export const useProduct = (product, isEditing, onSave, onClose) => {

    const [localProduct, setLocalProduct] = useState(product);
    const [imagePickerOpen, setImagePickerOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    // Открывает выбор изображения для продукта
    const handleOpenImagePicker = () => {
        setImagePickerOpen(true);
    };

    // Закрывает выбор изображения для продукта
    const handleCloseImagePicker = () => {
        setImagePickerOpen(false);
    };

    // Устанавливает выбранное изображение как основное изображение продукта
    const handleImageSelect = (imageUrl) => {
        setLocalProduct({
            ...localProduct,
            mainImage: imageUrl
        });
        setImagePickerOpen(false);
    };

    // Изменяет текущую категорию продукта на выбранную
    const handleChangeCategory = (e) => {
        setSelectedCategory(e.target.value);
        setLocalProduct({
            ...localProduct,
            category: e.target.value
        });
    };

    // Запрос категорий при монтировании компонента или изменении `product`
    useEffect(() => {
        fetchCategories()
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Ошибка при получении категорий:', error);
                toast.error("Не удалось загрузить категории.");
            });

        if (product) {
            setLocalProduct(product);
            setSelectedCategory(product.category._id);
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
            updateProduct(localProduct, categoryData) // заменен вызов axios.put на updateProduct
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
            createProduct(localProduct) // заменен вызов axios.post на createProduct
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

    return {
        localProduct, categories, selectedCategory,
        handleOpenImagePicker, handleCloseImagePicker, handleImageSelect,
        handleChangeCategory, handleChange, handleSave,
        handleAddApplication, handleRemoveApplication, handleChangeApplication
    };
};
