import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          background: 'linear-gradient(90deg, #3f51b5, #2196f3)',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant={isMobile ? 'h6' : 'h5'}
            component="div"
            sx={{ flexGrow: 1, fontWeight: 'bold' }}
          >
            Advanced Interest Calculator
          </Typography>
          <IconButton color="inherit" sx={{ ml: 2 }}>
            <AccountCircle />
          </IconButton>
          <Button
            color="inherit"
            variant="outlined"
            sx={{ ml: 2, borderColor: 'white', color: 'white', ':hover': { borderColor: '#bbdefb' } }}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
