import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import Appbar from './component/Appbar';
import Popular from './component/popular';
import Landing from './component/Landing';
import Register from './component/Register';
import Login from './component/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider, styled, alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { amber, deepOrange, grey } from '@mui/material/colors';
import { useSelector, useDispatch } from 'react-redux';

function App() {
  const mode = useSelector((state) => state.mode.color);
  const themefonts = createTheme({
    typography: {
      fontFamily: 'Raleway, Courier New',
      fontSize: 16,
    },
    button: {
      fontStyle: 'italic',
    },
    palette: {
      mode,
      ...(mode === 'light'
        ? {
          // palette values for light mode
          primary: amber,
          divider: amber[200],
          text: {
            primary: grey[900],
            secondary: grey[800],
          },
        }
        : {
          // palette values for dark mode
          primary: deepOrange,
          divider: deepOrange[700],
          background: {
            default: deepOrange[900],
            paper: deepOrange[900],
          },
          text: {
            primary: '#fff',
            secondary: grey[500],
          },
        }),
    },

  });
  return (
    <ThemeProvider theme={themefonts}>
      <div className="App">
        <div style={{ width: 'auto', backgroundColor: 'black' }}>
          <Router>
            <CssBaseline />
            <Appbar />
            <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
              <Route path="/Popular" element={<Popular />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </Router>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
