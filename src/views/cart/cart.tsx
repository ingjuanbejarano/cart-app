import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext } from "react";
import { ProductsContext } from "../../config/productsProvider";

export const Cart: React.FC = () => {
  const { cart, updateProductQuantity, deleteProduct } =
    useContext(ProductsContext);

  return (
    <Box
      sx={{
        paddingTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 2,
      }}
    >
      <Typography variant="h4" component="div" sx={{ marginBottom: 2 }}>
        Your Cart
      </Typography>
      {cart && cart.resources.length ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 2,
            width: "100%",
            maxWidth: "1280px",
          }}
        >
          {cart.resources.map((item) => (
            <Card key={item.id} sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
              <CardMedia
                component="img"
                height="200"
                image={item.image}
                alt={item.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="div">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Quantity: {item.quantity}
                </Typography>
                <Typography variant="h6" color="primary">
                  ${item.price}
                </Typography>
              </CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: 2,
                }}
              >
                <Box>
                  <IconButton
                    aria-label="decrease quantity"
                    onClick={() =>
                      updateProductQuantity &&
                      updateProductQuantity(item.id, item.quantity - 1)
                    }
                    disabled={item.quantity === 1}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <IconButton
                    aria-label="increase quantity"
                    onClick={() =>
                      updateProductQuantity &&
                      updateProductQuantity(item.id, item.quantity + 1)
                    }
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
                <IconButton
                  aria-label="remove item"
                  onClick={() => deleteProduct && deleteProduct(item.id)}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Card>
          ))}
        </Box>
      ) : (
        <Typography variant="body1">Your cart is empty.</Typography>
      )}
    </Box>
  );
};
