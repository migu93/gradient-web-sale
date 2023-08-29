import React, { useEffect, useState } from 'react';
import {Collapse, List, ListItem, ListItemText, ListSubheader} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:5001/categories/get-all')
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error("Error fetching categories:", error));
    }, []);

    function handleClick(categoryUrl) {
        navigate(`/catalog${categoryUrl}`);
    }

    return (
        <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    Nested List Items
                </ListSubheader>
            }
        >
            {categories.map(category => (
                <ListItem
                    button
                    key={category._id}
                    onClick={() => handleClick(category.categoryUrl)}
                >
                    <ListItemText sx={{color: 'white'}} primary={category.name} />
                </ListItem>
            ))}
        </List>
    );
};

export default CategoryList;
