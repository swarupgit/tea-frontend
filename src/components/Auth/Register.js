import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { addUser, authActions, login } from "../../store/auth-slice";
import { fetchItems } from "../../store/items-slice";
import { toastActions } from "../../store/toast-slice";
import Modal from "../UI/Modal";
import classes from "./Register.module.css";
import { capitalizeFirst, capitalizeWordFirst, validateEmail } from "customize-string-operations";

const Register = (props) => {
  const [enteredMobile, setEnteredMobile] = useState("");
  const [mobileIsValid, setMobileIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredType, setEnteredType] = useState("stock");
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  const [matchedCredential, setMatchedCredential] = useState(false);
  const [validated, setValidated] = useState(false);
  const [validating, setValidating] = useState(false);
  const dispatch = useDispatch();
  const [emailIsValid, setEmailIsValid] = useState();
  const [nameIsValid, setNameIsValid] = useState();
  const [addressIsValid, setAddressIsValid] = useState();
  const [enteredEmail, setEnteredEmail] = useState(
    ""
  );
  const [enteredName, setEnteredName] = useState(
    ""
  );
  const [enteredAddress, setEnteredAddress] = useState(
    ""
  );

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value.toUpperCase());

    setFormIsValid(
      validateEmail(event.target.value) &&
        enteredName.length >= 3 &&
        enteredMobile.length === 10 &&
        enteredAddress.length > 3
    );
  };

  const nameChangeHandler = (event) => {
    setEnteredName(event.target.value.toUpperCase());

    setFormIsValid(
      event.target.value.length >= 3 &&
        enteredMobile.length === 10 &&
        enteredAddress.length > 3
    );
  };
  const mobileChangeHandler = (event) => {
    setEnteredMobile(event.target.value);

    setFormIsValid(
      enteredName.length >= 3 &&
        event.target.value.length === 10 &&
        enteredAddress.length > 3
    );
  };
  const addressChangeHandler = (event) => {
    setEnteredAddress(event.target.value);

    setFormIsValid(
      enteredName.length >= 3 &&
        enteredMobile.length === 10 &&
        event.target.value.length > 3
    );
  };

  const clearForm = () => {
    setEnteredName("");
    setEnteredEmail("");
    setEnteredAddress("");
    setEnteredMobile("");
    setEnteredPassword("");
  };

  const validateEmailHandler = () => {
    setEmailIsValid(validateEmail(enteredEmail));
  };
  const validateNameHandler = () => {
    setNameIsValid(enteredName.length >= 3);
  };
  const validateMobileHandler = () => {
    setMobileIsValid(enteredMobile.length === 10);
  };
  const validateAddressHandler = () => {
    setAddressIsValid(enteredAddress.length > 3);
  };

  const typeChangeHandler = (event) => {
    setEnteredType(event.target.value);

    setFormIsValid(
      event.target.value.length &&
        enteredPassword.trim().length >= 6 &&
        enteredMobile.length === 10
    );
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);

    setFormIsValid(
      enteredMobile.length === 10 &&
        event.target.value.trim().length >= 6 &&
        enteredType.length
    );
  };
  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length >= 6);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setValidating(true);
    if (formIsValid) {
      const role =
        enteredType === "stock"
          ? ["admin", "manager"]
          : ["admin", "manager", "sales"];
      const payload = {
        name: enteredName,
        email: enteredEmail,
        address: enteredAddress,
        mobile: enteredMobile,
        password: enteredPassword,
        role: "manager",
      };
      await dispatch(addUser(payload))
        .unwrap()
        .then(async (res) => {
          props.onCancel();
        }).catch(async (err) =>{
          await dispatch(toastActions.toastError({
            message: err.message 
          }));
        });
      setValidated(true);
    }
    setValidating(false);
  };

  const modalAction = (
    <div className={classes.actions}>
        <button className={classes.default_button} type="button" onClick={props.onCancel}>
          Close
        </button>
      {!validating && (
        <button
          className={classes.button}
          type="submit"
          disabled={!formIsValid}
        >
          Register
        </button>
      )}
      {validating && (
        <button className={classes.button} type="button" disabled={validating}>
          Checking...
        </button>
      )}
    </div>
  );
  const loginModalContent = (
    <Fragment>
      <h3 className={classes.heading}>Register a User</h3>
      <form onSubmit={submitHandler}>
      <div
          className={`${classes.control} ${classes["column-direction"]} ${
            nameIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={enteredName}
            autoComplete="off"
            onChange={nameChangeHandler}
            onBlur={validateNameHandler}
          />
        </div>
        <div
          className={`${classes.control} ${classes["column-direction"]} ${
            mobileIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="mobile">Mobile</label>
          <input
            type="text"
            id="mobile"
            value={enteredMobile}
            autoComplete="off"
            onChange={mobileChangeHandler}
            onBlur={validateMobileHandler}
          />
        </div>
        <div
          className={`${classes.control} ${classes["column-direction"]} ${
            emailIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            value={enteredEmail}
            autoComplete="off"
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${classes["column-direction"]} ${
            addressIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            value={enteredAddress}
            autoComplete="off"
            onChange={addressChangeHandler}
            onBlur={validateAddressHandler}
          />
        </div>
        <div
          className={`${classes.control} ${classes["column-direction"]} ${
            passwordIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">{capitalizeFirst('password')}</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            autoComplete="off"
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
            placeholder="*****"
          />
        </div>
        {validated && !matchedCredential && (
          <p className={classes.error}>{capitalizeWordFirst('invalid login credentials.')}</p>
        )}
        {modalAction}
      </form>
    </Fragment>
  );

  return <Modal onClose={props.onClose}>{loginModalContent}</Modal>;
};

export default Register;
