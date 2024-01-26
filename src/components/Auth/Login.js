import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { authActions, login } from "../../store/auth-slice";
import { fetchItems } from "../../store/items-slice";
import { toastActions } from "../../store/toast-slice";
import Modal from "../UI/Modal";
import classes from "./Login.module.css";
import { capitalizeFirst, capitalizeWordFirst } from "customize-string-operations";

const Login = (props) => {
  const [enteredMobile, setEnteredMobile] = useState("");
  const [mobileIsValid, setMobileIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredType, setEnteredType] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  const [matchedCredential, setMatchedCredential] = useState(false);
  const [validated, setValidated] = useState(false);
  const [validating, setValidating] = useState(false);
  const dispatch = useDispatch();

  const mobileChangeHandler = (event) => {
    setEnteredMobile(event.target.value);

    setFormIsValid(
      event.target.value.length === 10 &&
        enteredPassword.trim().length >= 6 &&
        enteredType.length
    );
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

  const validateMobileHandler = () => {
    setMobileIsValid(enteredMobile.length === 10);
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
        username: enteredMobile,
        password: enteredPassword,
        role: JSON.stringify(role),
      };
      await dispatch(login(payload))
        .unwrap()
        .then(async (res) => {
          console.log('red',res, res.data.result.token);
          await dispatch(authActions.setToken(res.data.result.token));
          await dispatch(fetchItems({ token: res.data.result.token }));
          setMatchedCredential(true);
          await dispatch(authActions.setType(enteredType));
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
      {!validating && (
        <button
          className={classes.button}
          type="submit"
          disabled={!formIsValid}
        >
          Login
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
      <h3 className={classes.heading}>Login</h3>
      <form onSubmit={submitHandler}>
        <div className={`${classes.control} ${classes["row-direction"]}`}>
          <label htmlFor="type">Login For</label>
          <label htmlFor="business" className={classes.cursor}>
            <input
              type="radio"
              id="business"
              name="type"
              value="business"
              className={classes["login-for"]}
              onChange={typeChangeHandler}
            />
            Business
          </label>
          <label htmlFor="stock" className={classes.cursor}>
            <input
              type="radio"
              name="type"
              id="stock"
              value="stock"
              className={classes["login-for"]}
              onChange={typeChangeHandler}
            />
            Stock
          </label>
        </div>
        <div
          className={`${classes.control} ${classes["column-direction"]} ${
            mobileIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="mobile">Username</label>
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

export default Login;
