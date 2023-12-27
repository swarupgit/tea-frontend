import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllCartItems } from "../../store/cart-slice";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const cart = useSelector(getAllCartItems);

  const numberOfCartItems = cart.length;

  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ""
  }`;
  useEffect(() => {
    if (cart.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);
    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [cart]);
  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span className={classes.text}>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
