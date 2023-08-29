import MainPage from "../pages/MainPage";
import {RouteObject} from "react-router-dom";
import ContactPage from '../pages/ContactPage';
import CatalogPage from "../pages/CatalogPage";
import AboutCompanyPage from "../pages/AboutCompanyPage";
import ServicePage from "../pages/ServicePage";
import AdminPanel from "../pages/Admin/AdminPanel";
import CategoryProducts from "../components/Catalog/CategoryProducts";
import ProductDetails from "../components/Catalog/ProductDetails";

const routes: RouteObject[] = [
    { path: '/', element: <MainPage/>},
    { path: 'contacts', element: <ContactPage/>},
    { path: 'catalog', element: <CatalogPage/>},
    { path: '/catalog/:categoryUrl', element: <CategoryProducts /> },
    { path: '/product/:id', element: <ProductDetails /> },
    { path: 'about-us', element: <AboutCompanyPage/>},
    { path: 'services', element: <ServicePage/>},
    { path: 'admin', element: <AdminPanel/>},
];
export default routes;