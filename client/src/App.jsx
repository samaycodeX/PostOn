import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Accounts from "./pages/Accounts";
import Scheduler from "./pages/Scheduler";
import AIComposer from "./pages/AIComposer";

export default function App() {

    const appRouter = createBrowserRouter([
        { path: "/", element: <Home /> },
        { path: "/login", element: <Login /> },
        {
            element: <Layout />,
            children: [
                { path: "/dashboard", element: <Dashboard /> },
                { path: "/accounts", element: <Accounts /> },
                { path: "/scheduler", element: <Scheduler /> },
                { path: "/ai-composer", element: <AIComposer /> },
            ]
        },

    ])
    return (
        <div>
            <RouterProvider router={appRouter} />
        </div>
    );
}
