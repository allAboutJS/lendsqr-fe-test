import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
  import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import './styles/App.scss'

const router = createBrowserRouter([
  {
    index: true,
    element: <Login />,
  },
]);

const App = () => {
  return <>
    <RouterProvider router={router} />
    <ToastContainer  position="top-right" />
  </>;
};

export default App;
