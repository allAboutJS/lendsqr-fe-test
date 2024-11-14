import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import "./styles/App.scss";
import "./styles/NotificationsSystem.scss";
import RootLayout from "./pages/Dashboard/Layout";
import IndexPage from "./pages/Dashboard/Users/Index";
import UserDetails from "./pages/Dashboard/Users/UserDetails";
import userDetailsLoader from "./utils/userDetailsLoader";
import NotFound from "./pages/404";

const router = createBrowserRouter([
  {
    index: true,
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <RootLayout />,
    children: [
      {
        path: "/dashboard/users",
        element: <IndexPage />,
      },
      {
        path: "/dashboard/users/:id",
        element: <UserDetails />,
        loader: userDetailsLoader,
      },
      {
        path: "/dashboard/*",
        element: <NotFound />,
      },
    ],
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
