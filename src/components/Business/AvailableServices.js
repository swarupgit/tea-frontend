import classes from "./AvailableServices.module.css";
import Card from "../UI/Card";
import PartsItem from "./PartsItem/PartsItem";
import { useEffect, useState } from "react";
import SearchFrom from "./SearchForm";
import { useDispatch, useSelector } from "react-redux";
import { getAllItems, itemsActions } from "../../store/items-slice";
import { getAllCartItems } from "../../store/cart-slice";

const AvailableServices = () => {
  const items = useSelector(getAllItems);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState();
  const cartItems = useSelector(getAllCartItems);

  const searchHandler = (string) => {
    dispatch(itemsActions.searchItems(string));
  };

  useEffect(() => {
    console.log("all items", items);
  }, []);

  if (isLoading) {
    return (
      <section className={classes.mealLoading}>
        <h1>Loading...</h1>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.mealLoadingError}>
        <h1>{httpError}</h1>
      </section>
    );
  }
  const findInCart = (meal) => {
    return (
      cartItems.find((find) => {
        return find.id === meal.id;
      }) || { amount: 0 }
    );
  };

  const availableStock = (item) => {
    const cart = cartItems.find((find) => find.id === item.id);
    return cart ? item.stock > cart.amount : true;
  };
  const mealsList = items.map((meal) => (
    <PartsItem
      key={meal.id}
      id={meal.id}
      code={meal.code}
      name={meal.name}
      stock={meal.stock}
      partNo={meal.part_no}
      price={meal.price}
      location={meal.location}
      canSell={meal.canSell && availableStock(meal)}
      inCart={findInCart(meal)}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <SearchFrom search={searchHandler} />
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableServices;
