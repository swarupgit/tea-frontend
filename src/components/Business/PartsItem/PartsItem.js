import { useDispatch, useSelector } from "react-redux";
import { cartActions, getAllCartItems } from "../../../store/cart-slice";
import classes from "./PartsItem.module.css";
import PartsItemFrom from "./PartsItemFrom";

const PartsItem = (props) => {
  const price = `₹${props.price.toFixed(2)}`;
  const dispatch = useDispatch();
  const cartItems = useSelector(getAllCartItems);

  const addToCartHandler = async (amount) => {
    let canAdd = false;
    const item = cartItems.find((item) => {
      return item.id === props.id;
    });
    if (item) {
      if (item.amount + amount <= props.stock) {
        canAdd = true;
      }
    } else {
      canAdd = true;
    }

    if (canAdd) {
      const item = {
        id: props.id,
        name: props.name,
        amount: amount,
        price: props.price,
      };
      await dispatch(cartActions.addToCart({ item }));
    }
  };
  const mealClasses = `${classes.meal} ${
    props.inCart.amount > 0 ? classes["meal--highlight"] : ""
  } ${props.stock < 1 ? classes["item--lowstock"] : ""}`;
  console.log("props", props);
  return (
    <li className={mealClasses} key={props.id}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>Code: {props.code}</div>
        <div className={classes.description}>Part No: {props.partNo}</div>
        <div className={classes.description}>Available: {props.stock}</div>
        {props.location && (
          <div className={classes.highlight}>Find Area: {props.location}</div>
        )}
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <PartsItemFrom
          stock={props.stock}
          onAddToCart={addToCartHandler}
          canSell={props.canSell}
        />
        {props.inCart.amount > 0 && (
          <span className={classes.inCart}>x {props.inCart.amount}</span>
        )}
      </div>
    </li>
  );
};

export default PartsItem;
