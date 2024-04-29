import { createBrowserRouter } from "react-router-dom";
import { NotFound } from "./components/NotFound";
import App from "./App";
import { Confirmation } from "./components/Confirmation";
import { AdminWrapper } from "./components/AdminWrapper";


export const Router = createBrowserRouter([{
    path: "/",
    errorElement: <NotFound />,
    children: [
        {
            path: "/",
            element: <App />,
            errorElement: <NotFound />,
        },
        {
            path: "/confirmation",
            element: <Confirmation />,
            errorElement: <NotFound />,
        },
        {
            path: "/admin",
            element: <AdminWrapper />,
            errorElement: <NotFound />,
        }
    ]
}]);