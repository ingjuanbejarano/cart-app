import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Product } from "../interfaces/product";
import { AddToCartItem, CartInterface } from "../interfaces/cart";
import {
  addToCartAPIRequest,
  deleteCatItemAPIRequest,
  getCartAPIRequest,
  getProductByIdAPIRequest,
  getProductsAPIRequest,
  updateCartAPIRequest,
} from "./api";
import { AuthContext } from "./authProvider";

interface ProductsStateProps {
  allProducts?: Product[];
  product?: Product | null;
  resetProduct?: () => void;
  cart?: CartInterface | null;
  getProducst?: () => Promise<Product[] | undefined>;
  getProduct?: (id: string) => void;
  updateProductQuantity?: (id: number, quantity: number) => void;
  deleteProduct?: (id: number) => void;
  handleAddToCart?: (id: number) => void;
  isAddingToCart?: boolean;
}

export const ProductsContext = createContext<ProductsStateProps>({});

export const ProductsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartInterface | null>(null);
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
  const { user } = useContext(AuthContext);

  const getProducst = async () => {
    const { data } = await getProductsAPIRequest(1, 20);
    setAllProducts(data.resources);
    return data.resources;
  };

  const getProduct = async (id: string) => {
    const { data } = await getProductByIdAPIRequest(id);
    setProduct(data);
  };

  const resetProduct = () => {
    setProduct(null);
  };

  const getCart = async () => {
    const { data } = await getCartAPIRequest();
    setCart(data);
  };

  const updateProductQuantity = async (id: number, quantity: number) => {
    const { data } = await updateCartAPIRequest({ id, quantity });
    setCart(data);
  };

  const deleteProduct = async (id: number) => {
    const { data } = await deleteCatItemAPIRequest(id);
    setCart(data);
  };

  const handleAddToCart = async (productId: number) => {
    setIsAddingToCart(true);
    const requestPayload: AddToCartItem = {
      id: productId,
      quantity: 1,
    };
    const { data } = await addToCartAPIRequest(requestPayload);
    setCart(data);
    setIsAddingToCart(false);
  };

  useEffect(() => {
    if (user && user.token) {
      getCart();
    }
  }, [user]);

  const contextValues = {
    allProducts,
    product,
    resetProduct,
    cart,
    getProducst,
    getProduct,
    updateProductQuantity,
    deleteProduct,
    handleAddToCart,
    isAddingToCart,
  };

  return (
    <ProductsContext.Provider value={contextValues}>
      {children}
    </ProductsContext.Provider>
  );
};
