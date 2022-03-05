import type { RouteObject } from "react-router-dom"
import DefaultLayout from "./components/containers/DefaultLayout";
import Home from "./components/Home";
import CreateHotel from "./components/Hotels/Create";
import EditHotel from "./components/Hotels/Edit";
import ListHotel from "./components/Hotels/List";
import CreateRegion from "./components/Regions/Create";
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
                path: "/regions/create",
                element: <CreateRegion />
            },
            {
                path: "/hotels",
                element: <ListHotel />
            },
            {
                path: "/hotels/edit/:id",
                element: <EditHotel />
            },
            {
                path: "/hotels/create",
                element: <CreateHotel />
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