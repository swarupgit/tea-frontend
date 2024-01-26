import { Fragment } from "react";
import Services from "../components/Business/Services";
import { useDispatch, useSelector } from "react-redux";
import { authActions, isLoggedIn } from "../store/auth-slice";
import { cartActions } from "../store/cart-slice";

function Sell() {
  const isUserLoggedIn = useSelector(isLoggedIn);
  const dispatch = useDispatch();

  const removeLocalStorage = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("token");
    localStorage.removeItem("type");
    localStorage.clear();
  };

  const resetRedux = async () => {
    await dispatch(authActions.resetAuth());
    await dispatch(cartActions.resetCart());
  };

  const logoutHandler = async () => {
    await removeLocalStorage();
    await resetRedux();
  };
  return (
    <Fragment>
      {isUserLoggedIn && <Services onLogout={logoutHandler} />}
    </Fragment>
  );
}

export default Sell;
