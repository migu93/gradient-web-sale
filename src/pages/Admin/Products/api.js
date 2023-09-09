import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const fetchCategories = () => {
    return axios.get(`${BASE_URL}/categories/get-all`);
};

export const updateProduct = (product, categoryData) => {
    return axios.put(`${BASE_URL}/api/products/update/${product._id}`, product, categoryData);
};

export const createProduct = (product) => {
    return axios.post(`${BASE_URL}/api/products/create`, product);
};
