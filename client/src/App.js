import "./App.css";
import Home from "./components/home/Home";
import Cart from "./components/Cart/Cart";
import RootLayout from "./components/RootLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/authentication/Login";
import Orders from "./components/orders/Orders";
import productsData from "./api/api";
import Register from "./components/authentication/Register";
import Success from "./components/checkout/Success";
import Cancel from "./components/checkout/Cancel";
import SearchProduct from "./components/searchProduct/SearchProduct";
import ErrorPage from "./components/error/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: productsData,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/orders",
        element: <Orders></Orders>,
      },
      {
        path: "/fakepolicy",
        element: (
          <>
            <h1>Fake Policy Page</h1>
          </>
        ),
      },
      {
        path: "/searchproduct",
        element: <SearchProduct></SearchProduct>,
        loader: productsData,
      },
      {
        path: "/checkout/success",
        element: <Success />,
      },
      {
        path: "/checkout/cancel",
        element: <Cancel />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

function App() {
  // const [{}, dispatch] = useStateValue();

  // useEffect(() => {
  //   auth.onAuthStateChanged((authUser) => {
  //     if (authUser) {
  //       dispatch({
  //         type: "SET_USER",
  //         user: authUser,
  //       });
  //     } else {
  //       dispatch({
  //         type: "SET_USER",
  //         user: null,
  //       });
  //     }
  //   });
  // }, [dispatch]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
