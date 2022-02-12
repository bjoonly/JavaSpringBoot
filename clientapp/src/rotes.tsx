import type { RouteObject } from "react-router-dom"
import DefaultLayout from "./components/containers/DefaultLayout";
import Home from "./components/Home";
import Users from "./components/Users";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "/users",
                element: <Users />
            },
            {
                path: "*",
                element: <span>Other page</span>
            }
        ]
    }
];

export default routes;