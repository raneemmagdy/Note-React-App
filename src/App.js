import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./Components/Layout/MainLayout";
import Home from "./Components/Home/Home";
import AuthLayout from "./Components/Layout/AuthLayout";
import Signup from "./Components/Signup/Signup";
import Signin from "./Components/Signin/Signin";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Notfound from "./Components/Notfound/Notfound";
import NoteContextProvider from "./Components/Context/NoteContext";



export default function App() {
  let routes = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [{ index:true, element:<ProtectedRoute> <Home /> </ProtectedRoute>},
        { path:'/home', element:<ProtectedRoute> <Home /> </ProtectedRoute>},
       
      ]
    },

    {
      path: "/",
      element: <AuthLayout />,
      children: [
        { path: "/signup", element: <Signup /> },
        { path: "/signin", element: <Signin /> },
      ],
    },{ path: "*", element: <Notfound /> }
  ]);
  return (
    <>
     
<NoteContextProvider>
<RouterProvider router={routes} />


</NoteContextProvider>
  
      
      
    </>
  );
}
