import { createRoot } from "react-dom/client";
import "./index.css";
import Todo from "./pages/Todo";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute, { PublicRoute } from "./pages/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PublicRoute>
        <Register />
      </PublicRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  
  {
    path: "/todo",
    element: (
      <ProtectedRoute>
        <Todo />
      </ProtectedRoute>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />,
);
