import React from 'react';
import NavMenu from "./NavMenu";
import {AppBar, Toolbar, Typography, InputBase, IconButton, Box} from '@mui/material';
const Header: React.FC = () => {
  return (
    <div>
      <NavMenu/>
        <AppBar position="static" sx={{ height: '130px' }}>

        </AppBar>
    </div>
  );
}

export default Header;
