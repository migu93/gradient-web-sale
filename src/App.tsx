import React from 'react';
import {Button, ThemeProvider, Typography} from "@mui/material";
import darkTheme from "./design/darkTheme";
import '@fontsource/roboto'; // Импортируем шрифт Roboto

function App() {
  return (
    <div className="App">
        <ThemeProvider theme={darkTheme}>
            <Button type={'submit'} variant={'contained'}>Кнопка</Button>
            <Typography>Какой-то текст</Typography>
        </ThemeProvider>
    </div>
  );
}

export default App;
