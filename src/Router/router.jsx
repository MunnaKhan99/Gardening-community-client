import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home";
import BrowseTips from "../Pages/BrowseTips";
import ExploreGardener from "../Pages/ExploreGardener";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import ErrorPage from "../Pages/ErrorPage";
import TipsDetails from "../Component/TipsDetails/TipsDetails";
import ShareTip from "../Pages/ShareTip";
import MyTips from "../Pages/MyTips";
import UpdateTips from "../Component/UpdateTips/UpdateTips";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
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
                path: "/share-tips",
                element:
                    <PrivateRoute>
                        <ShareTip />
                    </PrivateRoute>
            },
            {
                path: "/my-tips",
                element:
                    <PrivateRoute>
                        <MyTips />
                    </PrivateRoute>
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
                element:
                    <PrivateRoute>
                        <TipsDetails />
                    </PrivateRoute>
            },
            {
                path: "/update-tip/:id",
                element:
                    <PrivateRoute>
                        <UpdateTips />
                    </PrivateRoute>
            },
            {
                path: "/*",
                element: <ErrorPage />
            },
        ]
    }
])
export default router