import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

export const NotFound: React.FC = () => {
  return (
    <Box
      sx={{
        paddingTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
        textAlign: "center",
        padding: 2,
      }}
    >
      <Typography variant="h2" component="div">
        404
      </Typography>
      <Typography variant="h5" component="div" sx={{ marginBottom: 2 }}>
        Not Found
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 2 }}>
        The page you're looking for doesn't exist.
      </Typography>
      <Button component={Link} to="/products" variant="text" color="primary">
        Go back to the main page
      </Button>
    </Box>
  );
};
