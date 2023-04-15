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

function App() {
  const { token, setToken } = useToken();

  const router = createBrowserRouter([
    {
      path: "/dashboard",
      element: (
        <AuthenticatedRoute>
          <div>sdkjsakdjksajd</div>
        </AuthenticatedRoute>
      ),
    },
    {
      path: "/",
      element: <Login setToken={setToken} token={token} />,
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
