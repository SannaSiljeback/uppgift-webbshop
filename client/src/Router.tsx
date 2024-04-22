import { createBrowserRouter } from "react-router-dom";
import { Confirmation } from "./pages/Confirmation";
import { Home } from "./pages/Home";
import { Layout } from "./pages/Layout";
import { NotFound } from "./pages/NotFound";
import { Cart } from "./components/Cart";

export const Router = createBrowserRouter([{
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
        {
            path: "/",
            element: <Home />,
            errorElement: <NotFound />,
        },
        {
            path: "/confirmation",
            element: <Confirmation />,
            errorElement: <NotFound />,
        },
        {
            path: "/cart",
            element: <Cart />,
            errorElement: <NotFound />,
        }
    ]
}]);