import React from 'react';
import {ThemeProvider} from "@mui/material";
import darkTheme from "./design/darkTheme";
import '@fontsource/roboto'; // Импортируем шрифт Roboto
import {Routes, Route, Navigate, RouteObject} from 'react-router-dom'
import routes from "./config/routes";

function App() {
  return (
    <div className="App">
        <ThemeProvider theme={darkTheme}>
            <Routes>
                {routes.map((route: RouteObject, index: number) => ( // Add explicit type annotation
                    <Route
                        key={index}
                        path={route.path}
                        element={route.element}
                    />
                ))}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </ThemeProvider>
    </div>
  );
}

export default App;
