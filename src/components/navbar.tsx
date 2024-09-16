import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Badge,
  Box,
  Button,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ProductsContext } from "../config/productsProvider";
import { AuthContext } from "../config/authProvider";

const Navbar: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { cart } = useContext(ProductsContext);
  const { userInfo, logout } = useContext(AuthContext);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  return (
    <>
      <AppBar position="sticky">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingX: 2,
          }}
        >
          <Box>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          <Link to="/cart">
            <IconButton color="inherit">
              <Badge badgeContent={cart?.count ? cart.count : 0} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: 250,
            padding: 2,
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "space-between",
          }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <Box>
            {userInfo && (
              <Box sx={{ padding: 2 }}>
                <Typography variant="subtitle1">{userInfo.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {userInfo.email}
                </Typography>
              </Box>
            )}
            <Divider />
            <List>
              <ListItem component={Link} to="/products">
                <ListItemText primary="Products" />
              </ListItem>
            </List>
          </Box>
          <Button
            variant="text"
            color="inherit"
            sx={{ alignSelf: "flex-start", margin: 2 }}
            onClick={() => {
              logout && logout();
            }}
          >
            Logout
          </Button>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
