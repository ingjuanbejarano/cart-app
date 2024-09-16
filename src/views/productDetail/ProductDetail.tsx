import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Rating,
  Button,
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useParams, Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { ProductsContext } from "../../config/productsProvider";
import Loader from "../../components/loader";
import { blue } from "@mui/material/colors";

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { product, resetProduct, getProduct, handleAddToCart, isAddingToCart } =
    useContext(ProductsContext);

  useEffect(() => {
    if (id && getProduct) {
      getProduct(id);
    }
  }, [id]);

  useEffect(() => {
    return resetProduct && resetProduct();
  }, []);

  if (!product) return <Loader />;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 2,
      }}
    >
      <Button
        component={Link}
        variant="text"
        to="/products"
        color="primary"
        startIcon={<ArrowBackIcon />}
        sx={{
          alignSelf: "flex-start",
          marginBottom: 2,
        }}
      >
        Go back to products
      </Button>

      <Card
        sx={{
          width: "100%",
          maxWidth: "1280px",
          padding: 2,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          gap: 2,
        }}
      >
        <CardMedia
          component="img"
          sx={{
            width: { xs: "100%", md: "50%" },
            height: "auto",
          }}
          image={product.image}
          alt={product.title}
        />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "center", md: "flex-start" },
            width: { xs: "100%", md: "50%" },
          }}
        >
          <Typography gutterBottom variant="h4" component="div">
            {product.title}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {product.category}
          </Typography>
          <Typography variant="h5" color="primary" sx={{ marginTop: 1 }}>
            ${product.price}
          </Typography>
          <Rating
            name="product-rating"
            value={product.rating.rate}
            precision={0.1}
            readOnly
            sx={{ marginTop: 1 }}
          />
          <Typography variant="body1" sx={{ marginTop: 2, marginBottom: 3 }}>
            {product.description}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleAddToCart && handleAddToCart(product.id)}
              disabled={isAddingToCart}
            >
              Add to Cart
            </Button>
            {isAddingToCart && (
              <CircularProgress
                size={24}
                sx={{
                  color: blue[500],
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: "-12px",
                  marginLeft: "-12px",
                }}
              />
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
