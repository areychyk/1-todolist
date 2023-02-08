import React from 'react';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createRoot } from 'react-dom/client';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import {blue, lightBlue, lightGreen, pink} from "@mui/material/colors";
import {CssBaseline} from "@mui/material";
import {Provider} from 'react-redux'
import {store} from "./Lessons/Lesson_8/store/store";


const theme = createTheme({
    palette:{
        primary:blue,
        secondary:lightGreen,
        mode:'dark'

    },
    typography: {
        fontFamily: [
            '"Segoe UI Symbol"',
        ].join(','),
    },


})

theme.transitions.create(['background-color', 'transform']);

const container  = document.getElementById('root') as HTMLElement
const root = createRoot(container);
root.render(
    <Provider store={store}>
    <ThemeProvider theme={theme}>
        <CssBaseline/>
    <App />
    </ThemeProvider>
    </Provider>);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

