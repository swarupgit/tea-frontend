import { Fragment, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartContext from "../../store/cart-centext";
import {
  cartActions,
  getAllCartItems,
  getCartTotalAmount,
} from "../../store/cart-slice";
import { getAllItems } from "../../store/items-slice";
import { toastActions } from "../../store/toast-slice";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);
  const items = useSelector(getAllCartItems);
  const allItems = useSelector(getAllItems);

  const cartTotalAmount = useSelector(getCartTotalAmount);
  const totalAmount = `₹${parseFloat(cartTotalAmount).toFixed(2)}`;
  const hasItems = items.length > 0;
  const dispatch = useDispatch();

  const cartItemRemoveHandler = async (id) => {
    // cartCtx.removeItem(id);
    const findItem = allItems.find((i) => i.id === id);
    const item = {
      id: findItem.id,
      name: findItem.name,
      amount: 1,
      price: findItem.price,
    };
    await dispatch(cartActions.updateCart({ item }));
  };

  const cartItemAddHandler = async (addItem) => {
    const findItem = allItems.find((i) => i.id === addItem.id);
    const item = {
      id: findItem.id,
      name: findItem.name,
      amount: 1,
      price: findItem.price,
    };
    const sellingQty = addItem.amount + 1;
    const remainingStock = findItem.stock - sellingQty;
    if (sellingQty <= findItem.stock) {
      await dispatch(cartActions.addToCart({ item }));
      if (remainingStock === 1) {
        await dispatch(
          toastActions.toastWarning({
            message: `You have only 1 stock left to add ${addItem.name}.`,
            time: 3000,
            theme: "light",
          })
        );
      } else if (remainingStock === 0) {
        await dispatch(
          toastActions.toastWarning({
            message: `Your ${addItem.name} stock is empty`,
            time: 3000,
            theme: "light",
          })
        );
      }
    } else {
      await dispatch(
        toastActions.toastError({
          message: `You don't have enough stock to add ${addItem.name}.`,
          time: 3000,
        })
      );
    }
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    const currentDate = new Date();
    const split = currentDate.toISOString().split("T");
    await fetch(
      `https://carworld-eb9a6-default-rtdb.firebaseio.com/orders/${split[0]}/${
        userData.phone
      }-${currentDate.getTime()}.json`,
      {
        method: "PUT",
        body: JSON.stringify({
          name: userData.name,
          phone: userData.phone,
          city: userData.city,
          address: userData.address,
          postal: userData.postal,
          orderItems: cartCtx.items,
        }),
      }
    );
    await fetch(
      `https://carworld-eb9a6-default-rtdb.firebaseio.com/products.json`
    )
      .then((response) => response.json())
      .then((actualData) => {
        cartCtx.items.map(async (item) => {
          await fetch(
            `https://carworld-eb9a6-default-rtdb.firebaseio.com/products/${item.id}.json`,
            {
              method: "PATCH",
              body: JSON.stringify({
                stock: actualData[item.id].stock - item.amount,
              }),
            }
          );

          return item;
        });
      });

    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
    window.location.reload(false);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalAction = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Proceed
        </button>
      )}
    </div>
  );

  const noCartItems = (
    <Fragment>
      <p>Your cart is empty.</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </Fragment>
  );

  const cartModalContent = (
    <Fragment>
      <h3 className={classes.heading}>Order Details</h3>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && hasItems && (
        <Checkout onCancel={props.onClose} onConfirm={submitOrderHandler} />
      )}

      {!isCheckout && modalAction}
    </Fragment>
  );

  const isSubmittingContent = <p>Sending Order Data...</p>;

  const didSubmitContent = (
    <Fragment>
      <p>Successfully placed the Order</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!hasItems && !didSubmit && noCartItems}
      {hasItems && !isSubmitting && !didSubmit && cartModalContent}
      {hasItems && isSubmitting && !didSubmit && isSubmittingContent}
      {!hasItems && !isSubmitting && didSubmit && didSubmitContent}
    </Modal>
  );
};

export default Cart;
