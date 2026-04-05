import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import AboutUs from "../pages/AboutUs";
import Profile from "../pages/Profile";
import Homepage from "../pages/HomePage";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";

export const router = createBrowserRouter([
    {
        path:'/',
        element:<MainLayout />,
        children:[
            {
                index:true,
                element:<Homepage />
            },
            {
                path:'/about-us',
                element:<AboutUs></AboutUs>
            },
            {
                path:"/profile",
                Component:Profile
            },
            {
                path:"signin",
                element:<Signin></Signin>
            },
            {
                path:'signup',
                element:<Signup />
            }
        ]
    }
])
