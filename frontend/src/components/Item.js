/*
    104005025 Adrian Chiera
    103800614 Ravish Randev Kulathanthilage
    103989458 Sabri Bayanta
    
    Item
    Shows an item on the Store page
*/
import React from 'react';
import { styled, Paper, Link, Button, Typography } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const ItemStyle = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    "&:hover": {
       scale: "110%"
    }
}));

const Item = ({name, price, img, url}) => {
    return (
        <ItemStyle>
            <Link href={"item/" + url} sx={{ textDecoration: 'none', textAlign: 'left' }}>
                <img src={img} alt={name} width='100%' />
                <Typography sx={{ color: 'white', fontSize: '1.4em' }}>{name}</Typography>
                <Typography sx={{ color: 'white', fontSize: '1em' }}>{price}</Typography>
                <Button variant='contained' startIcon={<AddShoppingCartIcon />} href='#' color="secondary">
                    Add to Cart
                </Button>
            </Link>
        </ItemStyle>
    );
}

export default Item;