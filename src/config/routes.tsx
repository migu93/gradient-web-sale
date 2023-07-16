import MainPage from "../pages/MainPage";
import {RouteObject} from "react-router-dom";

const headerLinks = [
    { name: "Главная", path: "/" },
    { name: "О нас", path: "/about-us" },
    { name: "Проекты", path: "/projects" },
    { name: "Контакты", path: "/contacts" },
    { name: "Лицензии", path: "/license" },
    { name: "Вакансии", path: "/vacancies" },
];

const routes: RouteObject[] = [
    {
        path: '/',
        element: <MainPage/>
    },
];
export default routes;