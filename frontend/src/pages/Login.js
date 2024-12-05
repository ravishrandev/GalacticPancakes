/*
    104005025 Adrian Chiera
    103800614 Ravish Randev Kulathanthilage
    103989458 Sabri Bayanta

    Login Page
    Will be used to log into users.
*/
import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from '@mui/material/Box';
import { Button, Typography, Stack } from "@mui/material";

export default function Login({ setUser }) {
    const [userData, setUserData] = useState(null);

    const handleChangeUser = e => {
        const { value } = e.target;
        setUser(value);
        sessionStorage.setItem('user', value);
    };

    // GETting all the users
    useEffect(() => {
        axios.get('http://localhost:8000/users')
            .then((response) => {
                setUserData(response.data.content);
            })
            .catch((error) => {
                console.log("Error fetching data: ", error);
            })
    }, []);
    
    return (
        <Box sx={{ paddingBottom: '20px' }} textAlign={"center"}>
            <Typography variant="h4" textAlign="center" fontWeight={"bold"}>Log In</Typography>
            <Typography variant="p" textAlign="center">Temporary login page. Click a button to simulate a user.</Typography>
            <Stack spacing={2} direction="column" sx={{ paddingTop: '20px', mb: 1, width: '90%', margin: 'auto', fontSize: '0.8em' }} alignItems="center">
                {userData ? (
                    Array.from(userData).map((userD) => ( /* Rendering a button for each user */
                        <Button
                            value={userD.userID}
                            onClick={handleChangeUser}
                            variant="contained"
                        >
                            Log in as {userD.username}
                        </Button>
                    ))
                ) : (
                    <p>Loading..</p>
                )}
            </Stack>
        </Box>
    );
};