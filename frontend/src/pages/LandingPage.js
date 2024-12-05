/*
	104005025 Adrian Chiera
    103800614 Ravish Randev Kulathanthilage
    103989458 Sabri Bayanta
	
	Homepage/Landing Page
	This is the first page the user will see
*/
import React from 'react';
import Button from '@mui/material/Button';
import { Box, styled } from "@mui/material";

// Creating the Box
const LandingPageStyle = styled(Box)(({ theme }) => ({
	display: 'flex',
  	flexDirection: 'column',
  	alignItems: 'center',
  	justifyContent: 'center',
	width: '100%',
	height: '80vh',
	backgroundImage: `url('https://wallpaperaccess.com/full/6289697.jpg')`,
	backgroundAttachment: 'fixed',
	backgroundPosition: 'center',
	backgroundRepeat: 'no-repeat',
	backgroundSize: 'cover',
}));

// Setting the Styling for the main title
const TitleStyle = styled('h1')(({ theme }) => ({
	[theme.breakpoints.up("xs")]: {
		fontSize: '4em'
	},
	[theme.breakpoints.up("sm")]: {
		fontSize: '6em'
	},
	textShadow: '2px 2px 5px black',
	textAlign: 'center',
	fontFamily: '"ADLaM Display"'
}));

// 'Start Shopping' Button
const ShoppingButton = styled(Button)(({ theme }) => ({
	backgroundColor: '#121212',
	backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))',
	color: 'white',
	'&:hover': {
		backgroundColor: 'rgb(50, 50, 50)'
	}
}));

function LandingPage() {
  	return (
		<LandingPageStyle>
			<TitleStyle>Galactic Pancakes</TitleStyle>
			
			<ShoppingButton href="/store" variant="contained">Start Shopping!</ShoppingButton>
		</LandingPageStyle>
  	);
}

export default LandingPage;
