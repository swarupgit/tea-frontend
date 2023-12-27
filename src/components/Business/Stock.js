import { Fragment, useState } from "react";
import classes from "./Stock.module.css";
import Modal from "../UI/Modal";
import { useDispatch, useSelector } from "react-redux";
import { addItem, code, fetchItems } from "../../store/items-slice";

const Stock = (props) => {
  const itemCode = useSelector(code);
  const [codeIsValid, setCodeIsValid] = useState();
  const [nameIsValid, setNameIsValid] = useState();
  const [partNoIsValid, setPartNoIsValid] = useState();
  const [unitIsValid, setUnitIsValid] = useState();
  const [qtyIsValid, setQtyIsValid] = useState();
  const [priceIsValid, setPriceIsValid] = useState();
  const [validating, setValidating] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const [enteredCode, setEnteredCode] = useState(itemCode);
  const [enteredName, setEnteredName] = useState("");
  const [enteredPartNo, setEnteredPartNo] = useState("");
  const [enteredUnit, setEnteredUnit] = useState("");
  const [enteredQty, setEnteredQty] = useState("");
  const [enteredPrice, setEnteredPrice] = useState("");
  const [enteredLocation, setEnteredLocation] = useState("");
  const [enteredCategory, setEnteredCategory] = useState("");

  const dispatch = useDispatch();

  const codeChangeHandler = (event) => {
    setEnteredCode(event.target.value);

    setFormIsValid(
      event.target.value.length > 1 &&
        enteredName.length > 3 &&
        enteredPartNo.length > 4 &&
        enteredUnit.length > 0 &&
        enteredQty.length > 0 &&
        enteredPrice.length > 0
    );
  };

  const nameChangeHandler = (event) => {
    setEnteredName(event.target.value);

    setFormIsValid(
      event.target.value.length >= 3 &&
        enteredCode.length >= 1 &&
        enteredPartNo.length >= 3 &&
        enteredUnit.length > 0 &&
        enteredQty.length > 0 &&
        enteredPrice.length > 0
    );
  };
  const partNoChangeHandler = (event) => {
    setEnteredPartNo(event.target.value);

    setFormIsValid(
      enteredName.length >= 3 &&
        enteredCode.length >= 1 &&
        event.target.value.length >= 3 &&
        enteredUnit.length > 0 &&
        enteredQty.length > 0 &&
        enteredPrice.length > 0
    );
  };
  const unitChangeHandler = (event) => {
    setEnteredUnit(event.target.value);

    setFormIsValid(
      enteredName.length >= 3 &&
        enteredCode.length >= 1 &&
        enteredPartNo.length >= 3 &&
        event.target.value.length > 0 &&
        enteredQty.length > 0 &&
        enteredPrice.length > 0
    );
  };
  const qtyChangeHandler = (event) => {
    setEnteredQty(event.target.value);

    setFormIsValid(
      enteredName.length >= 3 &&
        enteredCode.length >= 1 &&
        enteredPartNo.length >= 3 &&
        enteredUnit.length > 0 &&
        event.target.value.length > 0 &&
        enteredPrice.length > 0
    );
  };
  const priceChangeHandler = (event) => {
    setEnteredPrice(event.target.value);

    setFormIsValid(
      enteredCode.length >= 1 &&
        enteredName.length >= 3 &&
        enteredPartNo.length >= 3 &&
        enteredUnit.length > 0 &&
        enteredQty.length > 0 &&
        event.target.value.length > 0
    );
  };

  const locationChangeHandler = (event) => {
    setEnteredLocation(event.target.value);
  };

  const categoryChangeHandler = (event) => {
    setEnteredCategory(event.target.value);
  };

  const validateCodeHandler = () => {
    setCodeIsValid(enteredCode.length >= 1);
  };
  const validateNameHandler = () => {
    setNameIsValid(enteredName.length >= 3);
  };
  const validatePartNoHandler = () => {
    setPartNoIsValid(enteredPartNo.length >= 3);
  };
  const validateUnitHandler = () => {
    setUnitIsValid(enteredUnit.length > 0);
  };
  const validateQtyHandler = () => {
    setQtyIsValid(enteredQty.length > 0);
  };
  const validatePriceHandler = () => {
    setPriceIsValid(enteredPrice.length > 0);
  };

  // const item = useSelector((state) => findItem(state, {}));

  const submitHandler = async (event) => {
    event.preventDefault();
    setValidating(true);
    if (formIsValid) {
      const payload = {
        code: enteredCode,
        name: enteredName,
        part_no: enteredPartNo,
        price: parseFloat(enteredPrice),
        stock: parseInt(enteredQty),
        unit: enteredUnit,
        location: enteredLocation,
        category: enteredCategory,
      };

      await dispatch(addItem(payload));
      await dispatch(fetchItems());
      props.onClose();
    }
  };

  const modalAction = (
    <div className={classes.actions}>
      <button
        className={classes.default_button}
        type="button"
        onClick={props.onClose}
      >
        Cancel
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

  const addStockModalContent = (
    <Fragment>
      <h3 className={classes.heading}>Generate a new bill</h3>
      <form onSubmit={submitHandler}>        
      <div className={`${classes.control}`}>
          <label htmlFor="customer">Customer</label>
          <input
            type="text"
            id="customer"
            value={enteredLocation}
            onChange={locationChangeHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            codeIsValid === false
              ? classes.invalid
              : codeIsValid === true
              ? classes.valid
              : ""
          } ${codeIsValid === false ? classes.bump : ""}`}
        >
          <label htmlFor="invoiceNo">Invoice No</label>
          <input
            type="text"
            id="invoiceNo"
            value={enteredCode}
            autoComplete="off"
            onChange={codeChangeHandler}
            onBlur={validateCodeHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            nameIsValid === false
              ? classes.invalid
              : nameIsValid === true
              ? classes.valid
              : ""
          } ${nameIsValid === false ? classes.bump : ""}`}
        >
          <label htmlFor="type">Type</label>
          <input
            type="text"
            id="type"
            value={enteredName}
            autoComplete="off"
            onChange={nameChangeHandler}
            onBlur={validateNameHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            nameIsValid === false
              ? classes.invalid
              : nameIsValid === true
              ? classes.valid
              : ""
          } ${nameIsValid === false ? classes.bump : ""}`}
        >
          <label htmlFor="vchNo">VCH No</label>
          <input
            type="text"
            id="vchNo"
            value={enteredName}
            autoComplete="off"
            onChange={nameChangeHandler}
            onBlur={validateNameHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            nameIsValid === false
              ? classes.invalid
              : nameIsValid === true
              ? classes.valid
              : ""
          } ${nameIsValid === false ? classes.bump : ""}`}
        >
          <label htmlFor="clNo">CL No</label>
          <input
            type="text"
            id="clNo"
            value={enteredName}
            autoComplete="off"
            onChange={nameChangeHandler}
            onBlur={validateNameHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            partNoIsValid === false
              ? classes.invalid
              : partNoIsValid === true
              ? classes.valid
              : ""
          } ${partNoIsValid === false ? classes.bump : ""}`}
        >
          <label htmlFor="partNo">Net Leaf Kgs</label>
          <input
            type="text"
            id="partNo"
            value={enteredPartNo}
            autoComplete="off"
            onChange={partNoChangeHandler}
            onBlur={validatePartNoHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            unitIsValid === false
              ? classes.invalid
              : unitIsValid === true
              ? classes.valid
              : ""
          } ${unitIsValid === false ? classes.bump : ""}`}
        >
          <label htmlFor="qlty">Qlty</label>
          <input
            type="text"
            id="qlty"
            value={enteredUnit}
            autoComplete="off"
            onChange={unitChangeHandler}
            onBlur={validateUnitHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            unitIsValid === false
              ? classes.invalid
              : unitIsValid === true
              ? classes.valid
              : ""
          } ${unitIsValid === false ? classes.bump : ""}`}
        >
          <label htmlFor="rateKg">Rate/KG</label>
          <input
            type="text"
            id="rateKg"
            value={enteredUnit}
            autoComplete="off"
            onChange={unitChangeHandler}
            onBlur={validateUnitHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            priceIsValid === false
              ? classes.invalid
              : priceIsValid === true
              ? classes.valid
              : ""
          } ${priceIsValid === false ? classes.bump : ""}`}
        >
          <label htmlFor="price">Amount</label>
          <input
            type="text"
            id="price"
            value={enteredPrice}
            autoComplete="off"
            onChange={priceChangeHandler}
            onBlur={validatePriceHandler}
          />
        </div>
        <div className={`${classes.control}`}>
          <label htmlFor="note">Note</label>
          <input
            type="text"
            id="note"
            value={enteredCategory}
            onChange={categoryChangeHandler}
          />
        </div>
        {modalAction}
      </form>
    </Fragment>
  );

  return <Modal onClose={props.onClose}>{addStockModalContent}</Modal>;
};

export default Stock;
