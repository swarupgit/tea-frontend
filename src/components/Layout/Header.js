import { Fragment } from "react";
import gardenImage from "../../assets/tea-garden.png";
import classes from "./Header.module.css";
import Navigation from "./Navigation";

const Header = (props) => {

  return (
    <Fragment>
      <header>
        <Navigation
          showStock={props.showStock}
          addStock={props.addStock}
          newQuote={props.newQuote}
          onShowCart={props.onShowCart}
          onLogout={props.onLogout}
        />
      </header>
      <div className={classes["main-image"]}>
        <img src={gardenImage} alt="Tea Garden" />
      </div>
    </Fragment>
  );
};

export default Header;
