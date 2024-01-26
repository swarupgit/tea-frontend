import { Fragment, useState } from "react";
import classes from "./NewQuote.module.css";
import Modal from "../UI/Modal";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../store/items-slice";
import Table from "../UI/Table";
import { validateEmail } from "customize-string-operations";
import { addCustomer, fetchCustomer } from "../../store/quote-slice";

const NewQuote = (props) => {
  const [customerEmailIsValid, setCustomerEmailIsValid] = useState();
  const [customerNameIsValid, setCustomerNameIsValid] = useState();
  const [customerMobileIsValid, setCustomerMobileIsValid] = useState();
  const [customerAddressIsValid, setCustomerAddressIsValid] = useState();
  const [validating, setValidating] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const [enteredCustomerEmail, setEnteredCustomerEmail] = useState("");
  const [enteredCustomerName, setEnteredCustomerName] = useState("");
  const [enteredCustomerMobile, setEnteredCustomerMobile] = useState("");
  const [enteredCustomerAddress, setEnteredCustomerAddress] = useState("");

  const dispatch = useDispatch();

  const customerEmailChangeHandler = (event) => {
    setEnteredCustomerEmail(event.target.value.toUpperCase());

    setFormIsValid(
      validateEmail(event.target.value) &&
        enteredCustomerName.length >= 3 &&
        enteredCustomerMobile.length === 10 &&
        enteredCustomerAddress.length > 3
    );
  };

  const customerNameChangeHandler = (event) => {
    setEnteredCustomerName(event.target.value.toUpperCase());

    setFormIsValid(
      event.target.value.length >= 3 &&
        enteredCustomerMobile.length === 10 &&
        enteredCustomerAddress.length > 3
    );
  };
  const customerMobileChangeHandler = (event) => {
    setEnteredCustomerMobile(event.target.value);

    setFormIsValid(
      enteredCustomerName.length >= 3 &&
        event.target.value.length === 10 &&
        enteredCustomerAddress.length > 3
    );
  };
  const customerAddressChangeHandler = (event) => {
    setEnteredCustomerAddress(event.target.value);

    setFormIsValid(
      enteredCustomerName.length >= 3 &&
        enteredCustomerMobile.length === 10 &&
        event.target.value.length > 3
    );
  };

  const clearForm = () => {
    setEnteredCustomerAddress("");
    setEnteredCustomerEmail("");
    setEnteredCustomerName("");
    setEnteredCustomerMobile("");
  };

  const validateCustomerEmailHandler = () => {
    setCustomerEmailIsValid(validateEmail(enteredCustomerEmail));
  };
  const validateCustomerNameHandler = () => {
    setCustomerNameIsValid(enteredCustomerName.length >= 3);
  };
  const validateCustomerMobileHandler = () => {
    setCustomerMobileIsValid(enteredCustomerMobile.length === 10);
  };
  const validateCustomerAddressHandler = () => {
    setCustomerAddressIsValid(enteredCustomerAddress.length > 3);
  };

  // const item = useSelector((state) => findItem(state, {}));

  const submitHandler = async (event) => {
    event.preventDefault();
    setValidating(true);
    if (formIsValid) {
      const payload = {
        email: enteredCustomerEmail,
        name: enteredCustomerName,
        mobile: enteredCustomerMobile,
        address: enteredCustomerAddress,
      };

      dispatch(addCustomer(payload))
        .then(async () => {
          await dispatch(fetchCustomer());
          clearForm();
          props.onClose();
        })
        .error(() => {
          console.log('error')
          setValidating(false);
        });
    }
  };

  const modalAction = (
    <div className={`${classes.actions} ${classes["m-t-1"]}`}>
      <button className={classes.default} type="button" onClick={props.onClose}>
        Close
      </button>
      {!validating && (
        <button
          className={classes.button}
          type="submit"
          disabled={!formIsValid}
        >
          Save
        </button>
      )}
      {validating && (
        <button className={classes.button} type="button" disabled={validating}>
          Saving...
        </button>
      )}
    </div>
  );

  const newQuoteModalContent = (
    <Fragment>
      <h3 className={classes.heading}>Add New Customer</h3>
      <form onSubmit={submitHandler}>
        <div className={`card ${classes["m-t-1"]}`}>
          <div className="card-header">Customer Details</div>
          <div className={` ${classes["p-1"]} card-body`}>
            <div className="row">
              <div className="col-sm-12">
                <div
                  className={`${classes.control} ${
                    customerNameIsValid === false
                      ? classes.invalid
                      : customerNameIsValid === true
                      ? classes.valid
                      : ""
                  } ${customerNameIsValid === false ? classes.bump : ""}`}
                >
                  <label htmlFor="customerName">Customer Name</label>
                  <input
                    type="text"
                    id="customerName"
                    value={enteredCustomerName}
                    autoComplete="off"
                    onChange={customerNameChangeHandler}
                    onBlur={validateCustomerNameHandler}
                  />
                </div>
              </div>
              <div className="col-sm-12">
                <div
                  className={`${classes.control} ${
                    customerMobileIsValid === false
                      ? classes.invalid
                      : customerMobileIsValid === true
                      ? classes.valid
                      : ""
                  } ${customerMobileIsValid === false ? classes.bump : ""}`}
                >
                  <label htmlFor="customerMobile">Customer Mobile</label>
                  <input
                    type="text"
                    id="customerMobile"
                    value={enteredCustomerMobile}
                    autoComplete="off"
                    onChange={customerMobileChangeHandler}
                    onBlur={validateCustomerMobileHandler}
                  />
                </div>
              </div>
              <div className="col-sm-12">
                <div
                  className={`${classes.control} ${
                    customerEmailIsValid === false
                      ? classes.invalid
                      : customerEmailIsValid === true
                      ? classes.valid
                      : ""
                  } ${customerEmailIsValid === false ? classes.bump : ""}`}
                >
                  <label htmlFor="customerEmail">Customer Email</label>
                  <input
                    type="text"
                    id="customerEmail"
                    value={enteredCustomerEmail}
                    autoComplete="off"
                    onChange={customerEmailChangeHandler}
                    onBlur={validateCustomerEmailHandler}
                  />
                </div>
              </div>
              <div className="col-sm-12">
                <div
                  className={`${classes.control} ${
                    customerAddressIsValid === false
                      ? classes.invalid
                      : customerAddressIsValid === true
                      ? classes.valid
                      : ""
                  } ${customerAddressIsValid === false ? classes.bump : ""}`}
                >
                  <label htmlFor="customerAddress">Customer Address</label>
                  <input
                    type="text"
                    id="customerAddress"
                    value={enteredCustomerAddress}
                    autoComplete="off"
                    onChange={customerAddressChangeHandler}
                    onBlur={validateCustomerAddressHandler}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {modalAction}
      </form>
    </Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {newQuoteModalContent}
    </Modal>
  );
};

export default NewQuote;
