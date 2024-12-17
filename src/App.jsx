import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "flowbite/dist/flowbite";
import Layout from "./Components/Layout/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Components/Home/Home";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Cart from "./Components/Cart/Cart";
import WishList from "./Components/WishList/WishList";
import Products from "./Components/Products/Products";
import Brands from "./Components/Brands/Brands";
import Categories from "./Components/Categories/Categories";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import CounterContextProvider from "./Components/Context/CounterContext";
import UserContextProvider from "./Components/Context/UserContext";
import { Toaster } from "react-hot-toast";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CheckOut from "./Components/CheckOut/CheckOut";
import AllOrders from "./Components/AllOrders/AllOrders";
import NotFound from "./Components/NotFound/NotFound";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import VerifyCode from "./Components/VerifyCode/VerifyCode";
import ResetPassword from "./Components/ResetPassword/ResetPassword";

function App() {
    const router = createBrowserRouter([
        {
            path: "",
            element: <Layout />,
            children: [
                { index: true, element: <Login /> },
                { path: "register", element: <Register /> },
                {
                    path: "home",
                    element: (
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "cart",
                    element: (
                        <ProtectedRoute>
                            <Cart />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "wishList",
                    element: (
                        <ProtectedRoute>
                            <WishList />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "products",
                    element: (
                        <ProtectedRoute>
                            <Products />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "brands",
                    element: (
                        <ProtectedRoute>
                            <Brands />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "categories",
                    element: (
                        <ProtectedRoute>
                            <Categories />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "productDetails/:id",
                    element: (
                        <ProtectedRoute>
                            <ProductDetails />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "checkOut/:id",
                    element: (
                        <ProtectedRoute>
                            <CheckOut />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "allOrders",
                    element: (
                        <ProtectedRoute>
                            <AllOrders />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "forgetPassword",
                    element: <ForgetPassword />,
                },
                {
                    path: "verifyCode",
                    element: <VerifyCode />,
                },
                {
                    path: "resetPassword",
                    element: <ResetPassword />,
                },
            ],
        },
        {
            path: "*",
            element: <NotFound />,
        },
    ]);

    return (
        <>
            <UserContextProvider>
                <CounterContextProvider>
                    <RouterProvider router={router} />
                    <Toaster />
                </CounterContextProvider>
            </UserContextProvider>
        </>
    );
}

export default App;
