/*
    104005025 Adrian Chiera
    103800614 Ravish Randev Kulathanthilage
    103989458 Sabri Bayanta
    
    Purchase/Transaction History Page
    Used to show the user what they have purchased and the transactions
*/
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';
import ImageListItem from '@mui/material/ImageListItem';
import images from '../images';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function PurchaseHistory({ user }) {
    const [transactions, setTransactions] = useState(null);
    const [purchases, setPurchases] = useState(null);

    // Get the transactions that involve the user (both to and from the user)
    useEffect(() => {
        if (user !== null) {
            axios.get('http://localhost:8000/transactions', {
                params: {
                    fromUserID: user,
                    fullDetails: true
                }
            })
                .then((response) => {
                    setTransactions(response.data.content);
                })
                .catch((error) => {
                    console.log("Error fetching data: ", error);
                })
            
            axios.get('http://localhost:8000/transactions', {
                params: {
                    toUserID: user,
                    fullDetails: true
                }
            })
                .then((response) => {
                    setPurchases(response.data.content);
                })
                .catch((error) => {
                    console.log("Error fetching data: ", error);
                })
        }
    }, [user]);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <div class="everything">
                <Grid container spacing={4}>
                    {user && transactions && purchases ? (
                    <>
                        <Grid item xs={12} sm={12}>
                            <div>
                                <br></br>
                                <h1 class="purchasetitle">Transaction History</h1>
                                <p>All transactions will be listed as below</p>
                                <br></br>
                            </div>
                        </Grid>
                        {Array.from(transactions).map((transaction) => (
                                <Grid item xs={12} sm={4}>
                                    <Item>
                                        <ImageListItem>
                                            <img src={images[transaction.imageReference]} className='asset' alt='asset1' />
                                        </ImageListItem>
                                        <p><b>{transaction.itemName}</b></p>
                                        <br></br>
                                        Transaction Date: {new Date(transaction.date).toLocaleDateString('en-GB')}
                                        <br></br>
                                        Price: {transaction.cost.toString()} ETH
                                        <br></br>
                                        To {transaction.toUsername}
                                        <br></br>
                                        <Button variant='contained'>View</Button>              
                                    </Item>
                                </Grid>
                        ))}
                        <Grid item xs={12} sm={12}>
                            <div>
                                <br></br>
                                <h1 class="purchasetitle">Purchase History</h1>
                                <p>All purchases will be listed as below</p>
                                <br></br>
                            </div>
                        </Grid>
                        {Array.from(purchases).map((purchase) => (
                                <Grid item xs={12} sm={4}>
                                    <Item>
                                        <ImageListItem>
                                            <img src={images[purchase.imageReference]} className='asset' alt='asset1' />
                                        </ImageListItem>
                                        <p><b>{purchase.itemName}</b></p>
                                        <br></br>
                                        Purchase Date: {new Date(purchase.date).toLocaleDateString('en-GB')}
                                        <br></br>
                                        Price: {purchase.cost.toString()} ETH
                                        <br></br>
                                        From {purchase.fromUsername}
                                        <br></br>
                                        <Button variant='contained'>View</Button>              
                                    </Item>
                                </Grid>
                        ))}
                    </>
                    ) : (
                        <>
                            <Grid item xs={12} sm={12}>
                                <p>Please log in to see this page.</p>
                            </Grid>
                        </>
                    )}
                </Grid>
            </div>
        </Box>
    );
}
