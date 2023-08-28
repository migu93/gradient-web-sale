import React from 'react';
import {ThemeProvider} from "@mui/material";
import darkTheme from "./design/darkTheme";
import '@fontsource/roboto'; // Импортируем шрифт Roboto
import {Routes, Route, Navigate, RouteObject} from 'react-router-dom'
import routes from "./config/routes";
import Header from "./components/Header/Header";
import { useLocation } from 'react-router-dom';
import Breadcrumbs from "./components/Breadcrumbs";

function App() {
    const location = useLocation();

  return (
    <div className="App">
        <ThemeProvider theme={darkTheme}>
            <Header/>
            {location.pathname !== "/" && <Breadcrumbs />}
            <Routes>
                {routes.map((route, index) => (
                    <Route key={index} path={route.path} element={route.element} />
                ))}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </ThemeProvider>
    </div>
  );
}

export default App;
