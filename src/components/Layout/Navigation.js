import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import { canManage, isLoggedIn, loggedInUser } from "../../store/auth-slice";
import { getAllCartItems } from "../../store/cart-slice";
import Logout from "../UI/Logout";
import HeaderCartButton from "./HeaderCartButton";

import classes from "./Navigation.module.css";
import { capitalizeWordFirst } from "customize-string-operations";

const Navigation = (props) => {
  const cart = useSelector(getAllCartItems);
  const hasItems = cart.length > 0;
  const isUserLoggedIn = useSelector(isLoggedIn);
  const userCanManage = useSelector(canManage);
  const loggedUser = useSelector(loggedInUser);
  const parsedLoggedUser = typeof loggedUser === 'string' ? JSON.parse(loggedUser) : loggedUser;

  return (
    <Navbar fixed="top" variant="dark" expand="lg" className={classes.navbar}>
      <Container>
        <Navbar.Brand href="/">
          {capitalizeWordFirst(`${process.env.REACT_APP_TITLE}`)}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isUserLoggedIn && props.showStock && (
              <Nav.Link
                href="#"
                onClick={props.addStock}
                className={classes["top-10"]}
              >
                Generate Invoice
              </Nav.Link>
            )}
            {isUserLoggedIn && userCanManage && (
              <Nav.Link href="/business/orders" className={classes["top-10"]}>
                Sales
              </Nav.Link>
              // <NavDropdown
              //   title="Business"
              //   id="basic-nav-dropdown"
              //   className={`${classes["nav-dropdown"]} ${classes["top-10"]}`}
              // >
              //   <NavDropdown.Item
              //     href="/business/orders"
              //     className={classes["action"]}
              //   >
              //     Bills
              //   </NavDropdown.Item>
              //   {/* <NavDropdown.Item
              //     href="/business/stocks"
              //     className={classes["action"]}
              //   >
              //     Stocks
              //   </NavDropdown.Item> */}
              // </NavDropdown>
            )}
            {isUserLoggedIn && userCanManage && (
              <Nav.Link href="/customer/lists" className={classes["top-10"]}>
                Customers
              </Nav.Link>
              // <NavDropdown
              //   title="Customers"
              //   id="basic-nav-dropdown"
              //   className={`${classes["nav-dropdown"]} ${classes["top-10"]}`}
              // >
              //   <NavDropdown.Item
              //     href="/customer/lists"
              //     className={classes["action"]}
              //   >
              //     List
              //   </NavDropdown.Item>
              //   {/* <NavDropdown.Divider /> */}
              //   {/* <NavDropdown.Item
              //     href="/customer/new"
              //     className={classes["action"]}
              //   >
              //     New
              //   </NavDropdown.Item> */}
              // </NavDropdown>
            )}
            {isUserLoggedIn && userCanManage && (
              <Nav.Link href="/payments" className={classes["top-10"]}>
                In-Out Payment
              </Nav.Link>
            )}
            {isUserLoggedIn && hasItems && (
              <Nav.Link>
                <HeaderCartButton onClick={props.onShowCart} />
              </Nav.Link>
            )}
          </Nav>
          <Nav className="">
          {isUserLoggedIn && (
              <Nav.Link href="/profile" className={classes["top-10"]}>
                Welcome, {parsedLoggedUser.name}!
              </Nav.Link>
            )}
            
            {isUserLoggedIn && (
              <Nav.Link>
                <button onClick={props.onLogout}>
                  <span className={classes.icon}>
                    <Logout />
                  </span>
                  <span>Logout</span>
                </button>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
