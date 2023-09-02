import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
    return (
        <FormControl fullWidth sx={{height: 40}}>
            <InputLabel sx={{marginBottom: 1}}>Категория</InputLabel>
            <Select sx={{height: 40}} value={selectedCategory} onChange={e => onCategoryChange(e.target.value)}>
                <MenuItem value="all">Все товары</MenuItem>
                {categories.map((category, index) => (
                    <MenuItem key={index} value={category._id}>
                        {category.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default CategoryFilter;
