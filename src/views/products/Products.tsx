import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  TextField,
  CircularProgress,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Chip,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Product } from "../../interfaces/product";
import { Link } from "react-router-dom";
import { ProductsContext } from "../../config/productsProvider";
import Loader from "../../components/loader";
import { blue } from "@mui/material/colors";

export const Products: React.FC = () => {
  const { allProducts, getProducst, handleAddToCart, isAddingToCart } =
    useContext(ProductsContext);
  const [productsToShow, setProductsToShow] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const handleGetProducst = async () => {
    if (getProducst) {
      const data = await getProducst();
      setProductsToShow(data || []);
    }
  };

  useEffect(() => {
    handleGetProducst();
  }, []);

  useEffect(() => {
    if (allProducts && allProducts.length) {
      const uniqueCategories = Array.from(
        new Set(allProducts.map((product) => product.category))
      );
      setCategories(uniqueCategories);
    }
  }, [allProducts]);

  useEffect(() => {
    if (allProducts && allProducts.length) {
      let filteredProducts = allProducts?.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (selectedCategory) {
        filteredProducts = filteredProducts.filter(
          (product) => product.category === selectedCategory
        );
      }

      setProductsToShow(filteredProducts);
    }
  }, [searchTerm, selectedCategory]);

  if (!allProducts?.length) return <Loader />;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        padding: { xs: 0, md: 2 },
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "1280px",
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            padding: 1,
            marginBottom: 2,
            display: "flex",
            justifyContent: { xs: "center", md: "space-between" },
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <TextField
            sx={{ width: { xs: "100%", md: "300px" } }}
            label="Buscar Producto"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FormControl sx={{ width: { xs: "100%", md: "200px" } }}>
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
              labelId="category-select-label"
              value={selectedCategory}
              label="Category"
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        {productsToShow.length ? (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 2,
            }}
          >
            {productsToShow.map((product) => (
              <Box key={product.id}>
                <Card
                  sx={{
                    height: "100%",
                    margin: { xs: 2 },
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    position: "relative",
                  }}
                >
                  {product.stock === 0 && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        backgroundColor: "#FF0000B3",
                        color: "white",
                        padding: "4px 8px",
                        borderRadius: "0 0 4px 0",
                        zIndex: 1,
                      }}
                    >
                      Unavailable
                    </Box>
                  )}
                  <Link
                    to={`/products/${product.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      width="200"
                      image={product.image}
                      alt={product.title}
                    />
                  </Link>
                  <CardContent>
                    <Link
                      to={`/products/${product.id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <Typography gutterBottom variant="h5" component="div">
                        {product.title}
                      </Typography>
                    </Link>
                    <Typography variant="body2" color="text.secondary">
                      {product.category}
                    </Typography>
                    <Typography variant="h6" color="primary">
                      ${product.price}
                    </Typography>
                  </CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      padding: 2,
                    }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={isAddingToCart || product.stock === 0}
                      onClick={() =>
                        handleAddToCart && handleAddToCart(product.id)
                      }
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
                </Card>
              </Box>
            ))}
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              padding: 2,
            }}
          >
            <Typography variant="h6" color="textSecondary" gutterBottom>
              No Products to show
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};
