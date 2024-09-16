import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Products } from "./views/products/Products";
import { ProductDetail } from "./views/productDetail/ProductDetail";
import { BadRequest } from "./views/badRequest/BadRequest";
import { Layout } from "./components/layout";
import { Cart } from "./views/cart/cart";
import { NotFound } from "./views/notFound/notFound";
import { Register } from "./views/register/register";
import { Login } from "./views/login/login";
import { UnprivateRoute } from "./components/unprivateRoute";
import { PrivateRoute } from "./components/privateRoute";
import { axiosUrl, errorInterface } from "./config/api";
import { AxiosError, AxiosResponse } from "axios";
import { useContext } from "react";
import { AuthContext } from "./config/authProvider";
import { getUserFromLocalStorage } from "./config/localstorage";

function App() {
  const { logout } = useContext(AuthContext);
  
  axiosUrl.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error: AxiosError) => {
      const { message } = error.response?.data as errorInterface;
      if (error.response?.status === 400) {
        window.location.replace("/bad-request");
        return;
      }
      if (error.response?.status === 401) {
        logout && logout()
        window.location.replace("/login");
        return;
      }
      if (error.response?.status === 404) {
        window.location.replace("/not-found");
        return;
      }
      alert(`Error: ${message}`);
    }
  );

  axiosUrl.interceptors.request.use((config) => {
    const token = getUserFromLocalStorage()?.token;
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  });

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<UnprivateRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Layout />}>
              <Route index element={<Navigate to="/products" replace />} />
              <Route path="/bad-request" element={<BadRequest />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
            </Route>
          </Route>
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate to={"/not-found"} replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
