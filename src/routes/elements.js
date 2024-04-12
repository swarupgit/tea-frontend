import { Suspense, lazy } from "react";
// components

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) =>
  (
    <Suspense>
      <Component {...props} />
    </Suspense>
  );

// ----------------------------------------------------------------------

export const Page404 = Loadable(lazy(() => import("../pages/Page404")));
export const Sell = Loadable(lazy(() => import("../pages/Sell")));

export const Orders = Loadable(lazy(() => import("../pages/Order")));
export const Payments = Loadable(lazy(() => import("../pages/Payment")));
export const Stocks = Loadable(lazy(() => import("../pages/Stock")));
export const CustomerList = Loadable(
  lazy(() => import("../pages/CustomerList"))
);
export const MonthWise = Loadable(
  lazy(() => import("../pages/MonthWise"))
);
export const NewCustomer = Loadable(
  lazy(() => import("../pages/NewCustomer"))
);
export const Profile = Loadable(
  lazy(() => import("../pages/Profile"))
);
