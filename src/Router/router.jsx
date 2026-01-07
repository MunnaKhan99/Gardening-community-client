import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home";
import BrowseTips from "../Pages/BrowseTips";
import ExploreGardener from "../Pages/ExploreGardener";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import ErrorPage from "../Pages/ErrorPage";
import TipsDetails from "../Component/TipsDetails/TipsDetails";
const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/explore-gardener",
                element: <ExploreGardener />
            },
            {
                path: "/browse-tips",
                element: <BrowseTips />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/tips/:id",
                element: <TipsDetails />
            },
            {
                path: "/*",
                element: <ErrorPage />
            },
        ]
    }
])
export default router