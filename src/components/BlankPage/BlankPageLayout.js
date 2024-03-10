import { useEffect, useState } from "react";
import Header from "../Layout/Header";
import Cart from "../Cart/Cart";
import CartProvider from "../../store/CartProvider";
import Login from "../Auth/Login";
import Stock from "../Business/Stock";
import { useDispatch, useSelector } from "react-redux";
import {
  authActions,
  isAuthorize,
  isLoggedIn,
  type,
} from "../../store/auth-slice";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { cartActions } from "../../store/cart-slice";
import { Outlet } from "react-router-dom";
import NewQuote from "../Business/NewQuote";
import { fetchCustomer } from "../../store/quote-slice";
import Register from "../Auth/Register";

function BlankPageLayout() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const [addStock, setAddStock] = useState(false);
  const isUserLoggedIn = useSelector(isLoggedIn);
  const userType = useSelector(type);
  const dispatch = useDispatch();
  const [newUser, setNewUser] = useState(false);
  const [logging, setLogging] = useState(true);

  const showCartHandler = () => {
    setCartIsShown(true);
  };
  const hideCartHandler = () => {
    setCartIsShown(false);
  };
  const showAddStockHandler = () => {
    setAddStock(true);
    document.body.classList.add('hidden-overflow')
  };
  const hideAddStockHandler = () => {
    setAddStock(false);
    document.body.classList.remove('hidden-overflow')
  };

  const loadPage = async () => {
    const localToken = JSON.parse(localStorage.getItem("token"));
    if (localStorage.getItem("loggedIn")) {
      await dispatch(
        authActions.setLoggedIn(localStorage.getItem("loggedIn") === "true")
      );
    }
    if (localStorage.getItem("token")) {
      await dispatch(authActions.setToken(localToken));
    }
    if (localStorage.getItem("type")) {
      await dispatch(authActions.setType(localStorage.getItem("type")));
    }
    if (localStorage.getItem("ci")) {
      await dispatch(cartActions.reloadCart());
    }
    if (localStorage.getItem("isAdmin")) {
      await dispatch(authActions.setIsAdmin(localStorage.getItem("isAdmin")));
    }
    if (localStorage.getItem("canManage")) {
      await dispatch(
        authActions.setCanManage(localStorage.getItem("canManage"))
      );
    }
    if (localStorage.getItem("loggedUser")) {
      await dispatch(authActions.setLoggedUser(localStorage.getItem("loggedUser")));
    }
    const isAuthentic = await dispatch(
      await isAuthorize({ token: localToken?.accessToken })
    );
    if (isAuthentic.error) {
      await logoutHandler();
    }
  };
  useEffect(() => {
    loadPage();
    dispatch(fetchCustomer());
  }, []);

  const removeLocalStorage = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("token");
    localStorage.removeItem("type");
    localStorage.removeItem("loggedUser");
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
  const createUser = () => {
    setNewUser(true);
    setLogging(false);
  };
  const cancelRegister = () => {
    setNewUser(false);
    setLogging(true);
  }
  return (
    <CartProvider>
      {cartIsShown && isUserLoggedIn && <Cart onClose={hideCartHandler} />}
      {addStock && isUserLoggedIn && <Stock onClose={hideAddStockHandler} />}
      <Header
        onShowCart={showCartHandler}
        showStock={userType === "stock"}
        addStock={showAddStockHandler}
        onLogout={logoutHandler}
      />
      <main>
        {!isUserLoggedIn && logging && !newUser && <Login onClose={logoutHandler} createUser={createUser}/>}
        {newUser && !logging && <Register onCancel={cancelRegister}/>}
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          transition={Slide}
        />
        <Outlet />
      </main>
    </CartProvider>
  );
}

export default BlankPageLayout;
