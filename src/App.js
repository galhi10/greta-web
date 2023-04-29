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


function App() {
  const { token, setToken } = useToken();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login setToken={setToken} token={token} />,
    },
    {
      path: "/MainPage",
      element: (
        <AuthenticatedRoute>
          <MainPage/>
        </AuthenticatedRoute>
      ),
    },
    {
      path: "/ConfigPage",
      element: (
        <AuthenticatedRoute>
          <ConfigPage/>
        </AuthenticatedRoute>

      ),
    },
  ]);

  return (
    <div className="App">
      <header className="App-header">
        <RouterProvider router={router} />
      </header>
    </div>
  );
}

export default App;
