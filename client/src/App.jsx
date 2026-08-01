import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Accounts from "./pages/Accounts";
import Scheduler from "./pages/Scheduler";
import AIComposer from "./pages/AIComposer";
import { Toaster } from "react-hot-toast"
import useGetCurrentUser from "./utils/useGetCurrentUser";
import ProtectedRoute from "./components/ProtectedRoute";

const appRouter = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    {
        element: <ProtectedRoute />,
        children: [
            {
                element: <Layout />,
                children: [
                    { path: "/dashboard", element: <Dashboard /> },
                    { path: "/accounts", element: <Accounts /> },
                    { path: "/scheduler", element: <Scheduler /> },
                    { path: "/ai-composer", element: <AIComposer /> },
                ]
            },
        ]

    }

]);

export default function App() {
    useGetCurrentUser()
    return (
        <div>
            <Toaster position="top-right" />
            <RouterProvider router={appRouter} />
        </div>
    );
}
