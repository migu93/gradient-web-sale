import React from "react";
import {
    alpha,
    AppBar,
    Box,
    Button,
    CardMedia,
    Grid,
    IconButton,
    InputBase, Paper,
    styled,
    Toolbar,
    Typography
} from "@mui/material";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import SearchIcon from '@mui/icons-material/Search';
import EmailIcon from '@mui/icons-material/Email';
import logo from '../../images/logo/Gradient-logo.svg'
import darkTheme from "../../design/darkTheme";

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 1),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.black, 0.8),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
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
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const NadBar = () => {
    const theme = darkTheme;
    return (
        <Box sx={{ flexGrow: 1}}>
            <AppBar position="static" sx={{ width: '100% !important', height: 90, display: { xs: 'none', sm: 'block' }, backgroundColor: 'white'}}>
                <Grid container spacing={3} alignItems="center">
                    <Grid item xs={4}>
                        <Box display="flex" alignItems="center" marginY={2} marginX={5} height="100%">
                            <CardMedia component={'img'} sx={{ width: 150, display: { xs: 'none', sm: 'block' } }} src={logo} />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Box>
                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon/>
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Search…"
                                    inputProps={{ 'aria-label': 'search' }}
                                />

                            </Search>
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Box sx={{display: {xs: 'none', md: 'none', lg: 'flex', color: 'black'}}} display="flex" alignItems="center" justifyContent="right" height="100%">
                            <Box sx={{marginX: 2, display: {xs: 'none', sm: 'flex'}}}>
                                <LocalPhoneIcon sx={{width: 15, height: 15}}/>
                                <Typography sx={{fontSize: 14}}>(8442)43-50-50</Typography>
                            </Box>
                            <Box sx={{marginX: 2, display: {xs: 'none', sm: 'flex'}}}>
                                <EmailIcon sx={{width: 15, height: 15}}/>
                                <Typography sx={{fontSize: 14}}>info@ooogradient.ru</Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </AppBar>
        </Box>
    );
}
export default NadBar