import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./layout/header";
import {createTheme, ThemeProvider} from "@mui/material";
import SpreadsheetPage from "./routes/spreadsheet";

const muiTheme = createTheme({
    palette: {
        primary: {
            main: '#43a047'
        },
        secondary: {
            main: '#ffd54f'
        }
    }
})

function App() {
  return (
    <div className="App">
        <ThemeProvider theme={muiTheme}>
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path={'/spreadsheet/:spreadsheetKey'} element={<SpreadsheetPage/>}/>
                    <Route path={'/'}/>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    </div>
  );
}

export default App;
