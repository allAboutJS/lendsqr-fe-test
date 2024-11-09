import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import "./styles/App.scss";

const router = createBrowserRouter([
  {
    index: true,
    element: <Login />,
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
