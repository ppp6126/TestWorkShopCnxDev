import React, { useState, useEffect, Fragment, useMemo } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button, Paper } from '@mui/material';
import { useNavigate } from "react-router-dom";
import Menu from '@mui/material/Menu';
import { useSelector, useDispatch } from 'react-redux';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Draggable from 'react-draggable';
import { changemode } from '../Slice/modeSlice';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { checkLogin } from '../Slice/checkLoginSlice';

const pages = ['Home', 'Popular'];

export default function Appbar() {
  const history = useNavigate();
  const dispatch = useDispatch();
  const mode2 = useSelector((state) => state.mode.color);
  const [mode, setMode] = useState(mode2);
  const ckLoginStore = useSelector((state) => state.ckLogin.isLoggedIn ?? false);
  const [ckLogin, setckLogin] = useState(ckLoginStore);
  useEffect(() => {
    dispatch(changemode(mode));
    dispatch(checkLogin(false));
  }, [mode]);

  const ChangeColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  }
  const handlePopular = () => {
    history('/Popular', { replace: true });

  };
  const handlelanding = () => {
    history('/', { replace: true });

  };
  const handleLogout = () => {
    dispatch(checkLogin(false));
    setckLogin(false);
    history('/login', { replace: true });
  };
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (value) => {
    const type = value.target.value;
    if (type === "Popular") {
      handlePopular();
    } else {
      handlelanding();
    }
    console.log(value.target.value);
    setAnchorElNav(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography variant="h6" owrap="true" component="div" sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }} >
              {'Movies'}
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true"
                onClick={handleOpenNavMenu} color="inherit" >
                <MenuIcon />
              </IconButton>
              <Menu id="menu-appbar" anchorEl={anchorElNav} anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
                keepMounted transformOrigin={{ vertical: 'top', horizontal: 'left', }}
                open={Boolean(anchorElNav)} onClose={handleCloseNavMenu} sx={{ display: { xs: 'block', md: 'none' }, }} >
                {pages.map((page) => (
                  <MenuItem key={page} >
                    <Button key={page} value={page} onClick={handleCloseNavMenu} sx={{ my: 1, color: 'blue', display: 'inline-block', backgroundColor: '#FAF0E6' }} >
                      {page}
                    </Button>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }} >
              Movies
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button key={page} value={page} onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }} >
                  {page}
                </Button>
              ))}
            </Box>
            <IconButton sx={{ ml: 1 }} onClick={ChangeColorMode} value={mode} color="inherit">
              {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            {ckLogin ? (
              <Button  onClick={handleLogout} sx={{ my: 2, color: 'white', display: 'block' }}>
                {'ออกจากระบบ'}
              </Button>
            ) : ''}
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'} >
      <Paper {...props} />
    </Draggable>
  );
}


