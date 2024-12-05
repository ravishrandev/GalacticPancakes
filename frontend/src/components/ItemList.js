/*
    104005025 Adrian Chiera
    103800614 Ravish Randev Kulathanthilage
    103989458 Sabri Bayanta
    
    Item List
    Displays all items that the user can buy
*/

import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Item from '../components/Item';
import images from '../images';

const ItemList = ({ filteredItems }) => {
    return (
        <Box paddingRight={'10px'}>
            <Grid container spacing={2} columnSpacing={{xs: 0, sm: 8}} columns={4} alignItems="center" justifyContent="center">
                {Array.from(filteredItems).map((item) => ( // Looping through all elements in items array below
                    <Grid item xs={4} sm={1} maxWidth={300}>
                        <Item name={item.name} price={item.cost.toString() + " ETH"} img={images[item.imageReference]} url={item.itemID} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default ItemList;