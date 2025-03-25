import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Products, { loader as productsLoader, action as updateAvailabilityAction } from "./views/Products";
import NewProduct, {action as NewPructAction} from "./views/NewProduct";
import EditProduct, {loader as editProductLoader, action as editProductAction } from "./views/EditProduct";
import { action as deleteproductAction } from "./components/ProductDetails"; 

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Products />,
        loader: productsLoader,
        action: updateAvailabilityAction
      },
      {
        path: "productos/nuevo",
        element: <NewProduct />,
        action: NewPructAction
      },
      {
        path: 'productos/:id/editar', //ROA Parttern - Resource-oriented desing
        element: <EditProduct/>,
        loader: editProductLoader,
        action: editProductAction
      },
      {
        path:'productos/:id/eliminar',
        action: deleteproductAction
      }
    ],
  },
]);
