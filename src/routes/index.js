import { Navigate, useRoutes } from "react-router-dom";
// layouts
//
import {
  NewCustomer,
  Orders,
  Page404,
  CustomerList,
  Sell,
  Stocks,
  Profile,
  Payments,
} from "./elements";
import Authenticate from "../components/middleware/Authenticate";
import CompactLayout from "../components/compact/CompactLayout";
import BlankPageLayout from "../components/BlankPage/BlankPageLayout";
import MonthWise from "../pages/MonthWise";

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      element: <Authenticate authCheck="" />,
      children: [
        {
          path: "/",
          // this element need to remove
          element: <BlankPageLayout />,
        },
      ],
    },
    {
      element: <Authenticate authCheck="true" />,
      children: [
        {
          path: "/",
          element: <BlankPageLayout />,
          children: [{ path: "/dashboard", element: <Sell /> }],
        },
        {
          path: "/business",
          element: <BlankPageLayout />,
          children: [
            { path: "/business/orders", element: <Orders /> },
            // { path: "/business/stocks", element: <Stocks /> },
          ],
        },
        {
          path: "/customer",
          element: <BlankPageLayout />,
          children: [
            { path: "/customer/Lists", element: <CustomerList /> },
            // { path: "/customer/new", element: <NewCustomer /> },
          ],
        },
        {
          path: "/payments",
          element: <BlankPageLayout />,
          children: [
            { path: "/payments", element: <Payments /> },
            // { path: "/business/stocks", element: <Stocks /> },
          ],
        },
        {
          path: "/profile",
          element: <BlankPageLayout />,
          children: [
            { path: "/profile", element: <Profile /> },
          ],
        },        
        {
          path: "/month-wise",
          element: <BlankPageLayout />,
          children: [
            { path: "/month-wise", element: <MonthWise /> },
          ],
        },
      ],
    },
    {
      element: <CompactLayout />,
      children: [{ path: "404", element: <Page404 /> }],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
