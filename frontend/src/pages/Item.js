/*
    104005025 Adrian Chiera
    103800614 Ravish Randev Kulathanthilage
    103989458 Sabri Bayanta

    Item Page
    Will be used to display details of a specific item.
*/
import React from "react";
import Box from '@mui/material/Box';
import { useParams } from "react-router-dom";

export default function ItemPage() {
    const itemID = useParams().itemID;
    
    return (
        <Box>
            <p>{itemID}</p>
        </Box>
    );
};