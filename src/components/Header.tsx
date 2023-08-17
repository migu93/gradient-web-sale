import React from 'react';
import NavMenu from "./NavMenu";
import {AppBar, Box, Grid, Typography} from '@mui/material';
import logo from '../images/logo/NPO-Logo for navMenu.svg';
import SearchBox from "./SearchBox"; // Путь к вашему логотипу

const Header: React.FC = () => {
  return (
    <div style={{marginLeft: 0}}>
        <AppBar position="static" sx={{ height: '130px'}}>
            <Box display="flex" justifyContent="space-between" alignItems="center" height="100%">
                <Box display="flex" justifyContent="left" alignItems="center" width="33%">
                    <img src={logo} alt="Логотип компании" width={200} height={50} />
                </Box>
                <Box display="flex" justifyContent="center" alignItems="center" width="33%">
                    <SearchBox/>
                </Box>
                <Grid container spacing={2} sx={{ width: '33%' }} justifyContent="flex-end">
                    <Grid item xs={6}>
                        <Grid container direction="column" alignItems="center">
                            <Grid item style={{textAlign: "left"}}>
                                <Box display={'flex'}>
                                    <Typography>(8442)43-50-50</Typography>
                                </Box>
                            </Grid>
                            <Grid item>
                                <Box display={'flex'} >
                                    <Typography>г. Волгоград Канунникова, 6/1</Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container direction="column">
                            <Grid item> {/* Здесь может быть содержимое ячейки 2,1 */} </Grid>
                            <Grid item> {/* Здесь может быть содержимое ячейки 2,2 */} </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </AppBar>
      <NavMenu/>
    </div>
  );
}

export default Header;

