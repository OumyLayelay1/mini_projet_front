import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import NavbarMenu from "../Layouts/NavbarMenu";
import Footer from "../Layouts/Footer";
import Accueil from "../Pages/Accueil";
import DetailProduit from "../Pages/DetailProduit";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import AjoutProduit from "../Pages/AjoutProduit";
import ModifationProduit from "../Pages/ModifationProduit";
import DetailUser from "../Pages/DetailUser";
import ModifationUser from "../Pages/ModifationUser";
import ScrollToTop from "../components/ScrollToTop";

function Router() {
  const Layout = () => {
    return (
      <>
        <NavbarMenu />
        <ScrollToTop/>
        <Outlet />
        <Footer />
      </>
    );
  };

  const BrowserRoutes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Accueil />,
        },
        {
          path: ":id/detailProduit",
          element: <DetailProduit />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/ajoutProduit",
          element: <AjoutProduit />,
        },
        {
          path: ":id/modificationProduit",
          element: <ModifationProduit />,
        },
        {
          path: ":id/detailUser",
          element: <DetailUser />,
        },
         {
          path: ":id/modificationUser",
          element: <ModifationUser />,
        }
      ],
    },
  ]);

  return <RouterProvider router={BrowserRoutes} />;
}

export default Router;
