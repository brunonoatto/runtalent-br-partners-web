import { Suspense, lazy } from "react";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { RoutesPathEnum } from "./types";

const Home = lazy(() => import("@modules/home"));
const Client = lazy(() => import("@modules/client"));

const router = createBrowserRouter([
  {
    path: RoutesPathEnum.Home,
    element: (
      <Suspense fallback={<>Spinner...</>}>
        <Home />
      </Suspense>
    ),
  },
  {
    path: `${RoutesPathEnum.Cliente}/:cpf?`,
    element: (
      <Suspense fallback={<>Spinner...</>}>
        <Client />
      </Suspense>
    ),
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
