import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DetaiProduct from "./components/DetailProduct";
import Layout from "./components/Layout";
import Collection from "./components/Collection";
import CollectionProduct from "./components/CollectionProduct";
import Checkout from "./components/checkout";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { Provider } from "react-redux";
import store from "./redux/store";
import PublishedRoute from "./components/utils/PublishedRoute";
import Cart from "./components/Cart";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Drink from "./components/Categories/Drink";
import Snacks from "./components/Categories/Snacks";
import Fastfood from "./components/Categories/Fastfood";
import Deal from "./components/Categories/Deal";
import Blog from "./components/Categories/Blog";

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#1976d2',
      },
    },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route
                        path="/product/:id"
                        element={
                            <Layout>
                                <DetaiProduct />
                            </Layout>
                        }
                    />
                    <Route
                      path="/cart"  
                      element={
                        <Layout>
                          <Cart/>
                        </Layout>
                      }                  
                    />
                    <Route
                        path="/collection"
                        element={
                            <Layout>
                                <Collection />
                            </Layout>
                        }
                    />
                    <Route
                        path="/collection/:id"
                        element={
                            <Layout>
                                <CollectionProduct />
                            </Layout>
                        }
                    />
                    <Route
                        path="/drinks"
                        element={
                            <Layout>
                                <Drink />
                            </Layout>
                        }
                    />
                    <Route
                        path="/snacks"
                        element={
                            <Layout>
                                <Snacks />
                            </Layout>
                        }
                    />
                    <Route
                        path="/fastfood"
                        element={
                            <Layout>
                                <Fastfood />
                            </Layout>
                        }
                    />
                    <Route
                        path="/flashsale"
                        element={
                            <Layout>
                                <Deal />
                            </Layout>
                        }
                    />
                    <Route
                        path="/blog"
                        element={
                            <Layout>
                                <Blog />
                            </Layout>
                        }
                    />
                    <Route
                        path="/checkout"
                        element={
                            <Layout>
                                <Checkout />
                            </Layout>
                        }
                    />
                    <Route path="/login" element={<PublishedRoute><Login/></PublishedRoute>} />
                    <Route path="/register" element={<PublishedRoute><Register/></PublishedRoute>} />
                </Routes>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);
