/*
    104005025 Adrian Chiera
    103800614 Ravish Randev Kulathanthilage
    103989458 Sabri Bayanta
    
    Store Page
    Displays all items that the user can buy, along with various filters
*/
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import FilterBar from '../components/FilterBar';
import FilteredItems from '../components/FilteredItems';
import axios from 'axios';

const getItems = async() => {
    return axios.get("http://localhost:8000/items/")
    .then(response => {
        return response.data.content;
    })
    .catch((error) => {
        console.error("Error with backend", error);
        return error;
    });
}

const items = await getItems();

function getMinimumCost(arr) {
    return Math.min.apply(null, arr.map(function(i) {
        return i.cost;
    }))
}

function getMaximumCost(arr) {
    return Math.max.apply(null, arr.map(function(i) {
        return i.cost;
    }))
}

const Store = () => {
    const clearFilter = {
        search: "",
        minCost: getMinimumCost(items),
        maxCost: getMaximumCost(items),
        fruit: false,
        vegetable: false,
        savoury: false,
        sweet: false,
        neutral: false
    };

    const [filter, setFilter] = useState(clearFilter);

    return (
        <Box sx={{ flexGrow: 1, padding: "10px 0" }}>
            <Grid container columnSpacing={2} columns={10} alignItems="stretch">
                <Grid item xs={0} sm={2} sx={{width: {xs: '100%', sm: 'auto'}}}> {/* Contains filters for the items */}
                    <FilterBar filter={filter} setFilter={setFilter} />
                </Grid>
                <Grid item xs={10} sm={8}> {/* Contains all items */}
                    <FilteredItems items={items} filter={filter} />
                </Grid>
            </Grid>
        </Box>
    );
}

export default Store;