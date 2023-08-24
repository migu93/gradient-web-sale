import React, { useState } from 'react';
import axios from 'axios';
import {Button, LinearProgress} from "@mui/material";

function ImageUploader() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleImageChange = (e) => {
        setSelectedImage(e.target.files[0]);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('image', selectedImage);

        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5001/images/upload', formData);
            console.log('Image URL:', response.data.imageUrl);
            setLoading(false);
        } catch (error) {
            console.error("Error uploading image:", error);
            setLoading(false);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleImageChange} />
            <Button variant="contained" color="primary" onClick={handleUpload}>
                Загрузить
            </Button>
            {loading && <LinearProgress />}
        </div>
    );
}

export default ImageUploader;
