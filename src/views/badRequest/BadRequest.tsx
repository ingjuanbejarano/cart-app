import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export const BadRequest: React.FC = () => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100vh',
        textAlign: 'center',
        padding: 2 
      }}
    >
      <Typography variant="h3" color="error" gutterBottom>
        Bad Request
      </Typography>
      <Typography variant="h6" color="textSecondary" gutterBottom>
        The performed request has something wrong
      </Typography>
      <Link 
        component={RouterLink} 
        to="/products" 
        variant="h6" 
        color="primary"
        underline="hover"
      >
        Go back to Products
      </Link>
    </Box>
  );
};
