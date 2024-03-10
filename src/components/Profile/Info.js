import { Fragment, useState } from "react";
import classes from "./Info.module.css";
import Modal from "../UI/Modal";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../store/items-slice";
import Table from "../UI/Table";
import { validateEmail } from "customize-string-operations";
import { loggedInUser, updatePassword, updateProfile } from "../../store/auth-slice";

const Info = (props) => {
  const loggedUser = useSelector(loggedInUser);
  const parsedLoggedUser =
    typeof loggedUser === "string" ? JSON.parse(loggedUser) : loggedUser;
  const [emailIsValid, setEmailIsValid] = useState();
  const [nameIsValid, setNameIsValid] = useState();
  const [mobileIsValid, setMobileIsValid] = useState();
  const [addressIsValid, setAddressIsValid] = useState();
  const [validating, setValidating] = useState(false);
  const [formIsValid, setFormIsValid] = useState(
    parsedLoggedUser ? true : false
  );
  
  const [enteredEmail, setEnteredEmail] = useState(
    parsedLoggedUser ? parsedLoggedUser.email : ""
  );
  const [enteredName, setEnteredName] = useState(
    parsedLoggedUser ? parsedLoggedUser.name : ""
  );
  const [enteredMobile, setEnteredMobile] = useState(
    parsedLoggedUser ? parsedLoggedUser.mobile : ""
  );
  const [enteredAddress, setEnteredAddress] = useState(
    parsedLoggedUser ? parsedLoggedUser.address : ""
  );

  const [validatingPassword, setValidatingPassword] = useState(false);
  const [passwordFormIsValid, setPasswordFormIsValid] = useState(false);

  const [passwordIsValid, setPasswordIsValid] = useState();
  const [confirmPasswordIsValid, setConfirmPasswordIsValid] = useState();
  const [enteredCurrentPassword, setEnteredCurrentPassword] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");

  const dispatch = useDispatch();

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

  const clearPasswordForm = () => {
    setEnteredCurrentPassword("");
    setEnteredPassword("");
    setEnteredConfirmPassword("");
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

  const currentPasswordChangeHandler = (event) => {
    setEnteredCurrentPassword(event.target.value);

    setPasswordFormIsValid(
      event.target.value.length >= 6 && enteredPassword.length >= 8 &&
        enteredConfirmPassword === enteredPassword
    );
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);

    setPasswordFormIsValid(
      event.target.value.length >= 8 && enteredCurrentPassword.length >= 6 &&
        enteredConfirmPassword === event.target.value
    );
  };

  const confirmPasswordChangeHandler = (event) => {
    setEnteredConfirmPassword(event.target.value);

    setPasswordFormIsValid(
      event.target.value.length >= 8 && enteredCurrentPassword.length >= 6 && enteredPassword === event.target.value
    );
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.length >= 8);
  };
  const validateConfirmPasswordHandler = () => {
    setConfirmPasswordIsValid(enteredConfirmPassword.length >= 8);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setValidating(true);
    if (formIsValid) {
      const profilePayload = {
        name: enteredName,
        email: enteredEmail,
        address: enteredAddress,
      }
      dispatch(updateProfile(profilePayload))
        .then(async () => {
          setValidating(false);
        })
    }
  };

  const modalAction = (
    <div className={`${classes.actions} ${classes["m-t-1"]}`}>
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

  const updatePasswordAction = async () => {
    setValidatingPassword(true);
    if (passwordFormIsValid) {
      const passwordPayload = {
        currentPassword: enteredCurrentPassword,
        password: enteredPassword,
        confirmPassword: enteredConfirmPassword
      }

      dispatch(updatePassword(passwordPayload))
        .then(async () => {
          clearPasswordForm();
          setValidatingPassword(false);
          setPasswordFormIsValid(false);
        })
    }
  };

  const passwordAction = (
    <div className={`${classes.actions} ${classes["m-t-1"]}`}>
      {!validatingPassword && (
        <button
          className={classes.button}
          type="button"
          disabled={!passwordFormIsValid}
          onClick={updatePasswordAction}
        >
          Update
        </button>
      )}
      {validatingPassword && (
        <button className={classes.button} type="button" disabled={validatingPassword}>
          Updating...
        </button>
      )}
    </div>
  );

  const profileContent = (
    <Fragment>
      <h3 className={classes.heading}>Profile Details</h3>
      <form onSubmit={submitHandler}>
        <div className={`card ${classes["m-t-1"]}`}>
          <div className="card-header"> Profile Information</div>
          <div className={` ${classes["p-1"]} card-body`}>
            <div className="row">
              <div className="col-sm-12">
                <div
                  className={`${classes.control} ${
                    nameIsValid === false
                      ? classes.invalid
                      : nameIsValid === true
                      ? classes.valid
                      : ""
                  } ${nameIsValid === false ? classes.bump : ""}`}
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
              </div>
              <div className="col-sm-12">
                <div
                  className={`${classes.control} ${
                    mobileIsValid === false
                      ? classes.invalid
                      : mobileIsValid === true
                      ? classes.valid
                      : ""
                  } ${mobileIsValid === false ? classes.bump : ""}`}
                >
                  <label htmlFor="Mobile"> Mobile</label>
                  <input
                    type="text"
                    id="Mobile"
                    value={enteredMobile}
                    autoComplete="off"
                    readOnly
                  />
                </div>
              </div>
              <div className="col-sm-12">
                <div
                  className={`${classes.control} ${
                    emailIsValid === false
                      ? classes.invalid
                      : emailIsValid === true
                      ? classes.valid
                      : ""
                  } ${emailIsValid === false ? classes.bump : ""}`}
                >
                  <label htmlFor="Email"> Email</label>
                  <input
                    type="text"
                    id="Email"
                    value={enteredEmail}
                    autoComplete="off"
                    onChange={emailChangeHandler}
                    onBlur={validateEmailHandler}
                  />
                </div>
              </div>
              <div className="col-sm-12">
                <div
                  className={`${classes.control} ${
                    addressIsValid === false
                      ? classes.invalid
                      : addressIsValid === true
                      ? classes.valid
                      : ""
                  } ${addressIsValid === false ? classes.bump : ""}`}
                >
                  <label htmlFor="Address"> Address</label>
                  <input
                    type="text"
                    id="Address"
                    value={enteredAddress}
                    autoComplete="off"
                    onChange={addressChangeHandler}
                    onBlur={validateAddressHandler}
                  />
                </div>
              </div>
            </div>
            {modalAction}
          </div>
        </div>
      </form>
      <form>
        <div className={`card ${classes["m-t-1"]}`}>
          <div className="card-header"> Update Password</div>
          <div className={` ${classes["p-1"]} card-body`}>
            <div className="row">
            <div className="col-sm-12">
                <div
                  className={`${classes.control}`}
                >
                  <label htmlFor="password">Current Password</label>
                  <input
                    type="password"
                    id="password"
                    value={enteredCurrentPassword}
                    autoComplete="off"
                    onChange={currentPasswordChangeHandler}
                    placeholder="Enter your Password"
                  />
                </div>
              </div>
              <div className="col-sm-12">
                <div
                  className={`${classes.control} ${
                    passwordIsValid === false
                      ? classes.invalid
                      : passwordIsValid === true
                      ? classes.valid
                      : ""
                  } ${passwordIsValid === false ? classes.bump : ""}`}
                >
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    value={enteredPassword}
                    autoComplete="off"
                    onChange={passwordChangeHandler}
                    onBlur={validatePasswordHandler}
                    placeholder="Enter your new Password"
                  />
                </div>
                {passwordIsValid === false && <span className={`${classes.invalid} text-danger`}>Password should be minimum 8 character.</span>}
              </div>
              <div className="col-sm-12">
                <div
                  className={`${classes.control} ${
                    confirmPasswordIsValid === false
                      ? classes.invalid
                      : confirmPasswordIsValid === true
                      ? classes.valid
                      : ""
                  } ${confirmPasswordIsValid === false ? classes.bump : ""}`}
                >
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={enteredConfirmPassword}
                    autoComplete="off"
                    onChange={confirmPasswordChangeHandler}
                    onBlur={validateConfirmPasswordHandler}
                    placeholder="Retype your new Password"
                  />
                </div>
                  {confirmPasswordIsValid === false && <span className={`${classes.invalid} text-danger`}>Password and Confirm Password should match.</span>}
              </div>
            </div>
            {passwordAction}
          </div>
        </div>
      </form>
    </Fragment>
  );

  return <Modal onClose={props.onClose}>{profileContent}</Modal>;
};

export default Info;
