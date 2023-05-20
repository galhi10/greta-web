import "./App.css";
import {
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/Login";
import useToken from "./hooks/useToken";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import MainPage from "./pages/MainPage";
import ConfigPage from "./pages/ConfigPage";
import RegisterPage from "./pages/Register";
import AppLayout from "./components/AppLayout";
import ProfilePage from "./pages/Profile";

function App() {
  const { token, setToken } = useToken();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login setToken={setToken} token={token} />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
    {
      element: <AppLayout />,
      children: [
        {
          path: "/MainPage",
          element: (
            <AuthenticatedRoute>
              <MainPage />
            </AuthenticatedRoute>
          ),
        },
        {
          path: "/ConfigPage",
          element: (
            <AuthenticatedRoute>
              <ConfigPage />
            </AuthenticatedRoute>
          ),
        },
        {
          path: "/profile",
          element: (
            <AuthenticatedRoute>
              <ProfilePage />
            </AuthenticatedRoute>
          ),
        },
      ],
    },
  ]);

  return (
    <div className="App">
      {/* <header className="App-header"> */}
      <RouterProvider router={router} />
      {/* </header> */}
    </div>
  );
}

export default App;
