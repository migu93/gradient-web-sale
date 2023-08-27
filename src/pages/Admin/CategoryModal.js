import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid, IconButton, Typography
} from "@mui/material";
import ImagePickerModal from "./ImagePickerModal";
import CloseIcon from "@mui/icons-material/Close";
import ImageIcon from '@mui/icons-material/Image';


const CategoryModal = ({ open, mode, category, images, onClose, onSave }) => {
    const [selectedImage, setSelectedImage] = React.useState(category?.imageUrl || "");
    const [name, setName] = React.useState(category?.name || "");
    const [categoryUrl, setCategoryUrl] = React.useState(category?.categoryUrl || "");
    const [isImageSelected, setImageSelected] = React.useState(false);

    const [imagePickerOpen, setImagePickerOpen] = React.useState(false);

    const handleImageSelect = (imageUrl) => {
        setSelectedImage(imageUrl);
        setImagePickerOpen(false);
    };

    React.useEffect(() => {
        setSelectedImage(category?.imageUrl || "");
        setName(category?.name || "");
        setCategoryUrl(category?.categoryUrl || "");
    }, [category]);

    const handleSave = () => {
        onSave({
            name,
            imageUrl: selectedImage,
            categoryUrl
        });
    };


    return (


        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{mode === 'edit' ? 'Редактировать категорию' : 'Добавить категорию'}</DialogTitle>
            <IconButton
                edge="end"
                color="inherit"
                onClick={onClose}
                aria-label="close"
                sx={{ position: 'absolute', right: 8, top: 8, marginRight: 0.01 }}
            >
                <CloseIcon />
            </IconButton>

            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Название"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="URL категории"
                            value={categoryUrl}
                            onChange={(e) => setCategoryUrl(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Grid item xs={12}>
                            <Button variant={'contained'} onClick={() => setImagePickerOpen(true)}>
                                Выбрать изображение
                                <ImageIcon sx={{marginLeft: 1}}/>
                            </Button>
                            {isImageSelected && <Typography variant="body2" color="textSecondary" sx={{ marginLeft: 2 }}>изображение выбрано</Typography>}
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" onClick={handleSave}>
                            Сохранить
                        </Button>
                    </Grid>
                </Grid>
            </DialogContent>

            <ImagePickerModal
                open={imagePickerOpen}
                images={images}
                onClose={() => setImagePickerOpen(false)}
                onSelect={handleImageSelect}
                onImageSelect={() => setImageSelected(true)}
            />
        </Dialog>
    );
};

export default CategoryModal;
