import { Suspense } from "react";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { RoutesPathEnum } from "./types";

const router = createBrowserRouter([
  {
    path: RoutesPathEnum.Home,
    element: <Suspense fallback={<>Spinner...</>}>Home</Suspense>,
  },
  {
    path: `${RoutesPathEnum.cliente}/:cpf?`,
    element: <div>Cliente</div>,
  },
  {
    path: "*",
    element: <div>Opss...rota não encontrada!</div>,
  },
]);

const Router = () => {
  return <RouterProvider router={router} fallbackElement={<>Spinner...</>} />;
};

export default Router;
