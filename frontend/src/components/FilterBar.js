/*
    104005025 Adrian Chiera
    103800614 Ravish Randev Kulathanthilage
    103989458 Sabri Bayanta
    
    Filter Bar
    Shows all the possible sorting/filtering options on the Store page
*/
import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { Typography, Stack, TextField, InputAdornment, FormControlLabel, Checkbox, FormGroup } from '@mui/material';

// Search Bar Styling (Taken from Material UI App Bar Page https://mui.com/material-ui/react-app-bar/)
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
}));
  
const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

// Filter Bar Styling
const StyledFilterBar = styled('div')(({ theme }) => ({
    height: '100%',
    [theme.breakpoints.up('xs')]: {
        width: '100%',
        borderRight: 'none',
        paddingBottom: '10px',
    },
    [theme.breakpoints.up('sm')]: {
        width: 'auto',
        borderRight: '1px solid white',
        textAlign: 'left',
    },
}));

const FilterBar = ({ filter, setFilter }) => {
    const handleChange = e => {
        const { name, value } = e.target;
        setFilter({
            ...filter,
            [name]: value,
        });
    };
    
    const handleCategoryChange = e => {
        const { name, checked } = e.target;
        setFilter({
            ...filter,
            [name]: checked,
        });
    };

    return (
        <StyledFilterBar>
            <Typography variant='h2' sx={{ paddingLeft: '10px', fontSize: '1.5em', fontWeight: 'bold', display: {xs: 'none', sm: 'block'} }}>Filters</Typography>
            {/* Search Bar */}
            <Search xs={{ width: '90%', margin: 'auto' }} sm={{ width: '100%', margin: 'auto' }}>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    name="search"
                    value={filter.search}
                    onChange={handleChange}
                />
            </Search>
            {/* Price Filter */}
            <Typography variant='h3' sx={{ paddingLeft: '10px', fontSize: '1.3em', fontWeight: 'bold', display: {xs: 'none', sm: 'block'} }}>Price</Typography>
            <Stack spacing={2} direction="row" sx={{ mb: 1, width: '90%', margin: 'auto', fontSize: '0.8em' }} alignItems="center">
                <TextField 
                    label="Min"
                    type='number'
                    size='small'
                    name='minCost'
                    value={filter.minCost}
                    onChange={handleChange}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">ETH</InputAdornment>,
                    }}
                />
                <Typography variant='p'>to</Typography>
                <TextField
                    label="Max"
                    type='number'
                    size='small'
                    name="maxCost"
                    value={filter.maxCost}
                    onChange={handleChange}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">ETH</InputAdornment>,
                    }}
                />
            </Stack>
            {/* Category Filter */}
            <Typography variant='h3' sx={{ paddingLeft: '10px', fontSize: '1.3em', fontWeight: 'bold', display: {xs: 'none', sm: 'block'} }}>Category</Typography>
            <Stack spacing={2} direction="column" sx={{ mb: 1, width: '90%', margin: 'auto', fontSize: '0.8em' }}>
                <FormGroup>
                    <FormControlLabel control={<Checkbox name="fruit" checked={filter.fruit} onChange={handleCategoryChange} />} label="Fruit" />
                    <FormControlLabel control={<Checkbox name="vegetable" checked={filter.vegetable} onChange={handleCategoryChange} />} label="Vegetable" />
                    <FormControlLabel control={<Checkbox name="savoury" checked={filter.savoury} onChange={handleCategoryChange} />} label="Savoury" />
                    <FormControlLabel control={<Checkbox name="sweet" checked={filter.sweet} onChange={handleCategoryChange} />} label="Sweet" />
                    <FormControlLabel control={<Checkbox name="neutral" checked={filter.neutral} onChange={handleCategoryChange} />} label="Neutral" />
                </FormGroup>
            </Stack>
        </StyledFilterBar>
    );
}

export default FilterBar;
