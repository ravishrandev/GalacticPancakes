/*
    104005025 Adrian Chiera
    103800614 Ravish Randev Kulathanthilage
    103989458 Sabri Bayanta

    App.js
*/
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import WebTheme from "./theme";
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Store from './pages/Store';
import ItemPage from './pages/Item';
import PurchaseHistory from './pages/PurchaseHistory';
import Login from './pages/Login';
import Footer from './components/FooterBar';
import ResponsiveAppBar from './components/ResponsiveAppBar';

function App() {
    const [user, setUser] = useState(null); // Set the user.

    return (
        <Box sx={{ overflowX: 'hidden' }}> {/* The whole website is in a Box element. Overflow X prevents the horizontal scroll bar from appearing */}
            <ThemeProvider theme={WebTheme}> {/* Declares the theme for the whole website */}
                <CssBaseline />
                <Grid container spacing={0}> {/* Separating website into sections using a Grid */}
                    <Grid item xs={12}> {/* Header */}
                        <ResponsiveAppBar user={user} setUser={setUser} />
                    </Grid>
                    <Grid item xs={12}> {/* Main Element */}
                        <Router> {/* Changes content in the Main element depending on the current link */}
                            <Routes>
                                <Route path='/' element={<LandingPage />} /> {/* Home Page */}
                                <Route path='/store' element={<Store />} />  {/* Store Page */}
                                <Route path='/item/:itemID' element={<ItemPage />} /> {/* Item Page (Soon to be implemented) */}
                                <Route path='/purchase-history' element={<PurchaseHistory user={user} />} /> {/* Purchase/Transaction History Page */}
                                <Route path='/login' element={<Login setUser={setUser} />} /> {/* Login Page */}
                            </Routes>
                        </Router>
                    </Grid>
                    <Grid item xs={12}> {/* Footer */}
                        <Footer />
                    </Grid>
                </Grid>
            </ThemeProvider>
        </Box>
    );
}

export default App;