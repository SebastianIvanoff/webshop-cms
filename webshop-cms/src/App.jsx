import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import Login from "./pages/Login";
import ProductDetails from "./pages/ProductDetails";
import { AuthProvider } from "./context/AuthContext";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "add",
          element: <AddProduct />,
        },
        {
          path: "products/:id",
          element: <ProductDetails />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "orders",
          element: <Orders />,
        },
        {
          path: "orders/:id",
          element: <OrderDetails />,
        },
      ],
    },
  ]);

  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
};

export default App;
