import React from 'react';
import { Box, Button, Typography, Container } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: 'url(https://source.unsplash.com/1600x900/?cinema,movie)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Container maxWidth="sm" sx={{ textAlign: 'center', bgcolor: 'rgba(0,0,0,0.5)', p: 4, borderRadius: 2 }}>
        <Typography variant="h3" gutterBottom>Movie App</Typography>
        <Typography variant="h6" gutterBottom>ระบบดูหนังออนไลน์ ค้นหาหนังใหม่ และหนังยอดนิยม</Typography>
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button component={Link} to="/login" variant="contained" color="primary">เข้าสู่ระบบ</Button>
          <Button component={Link} to="/register" variant="outlined" color="inherit">สมัครสมาชิก</Button>
        </Box>
      </Container>
    </Box>
  );
}
