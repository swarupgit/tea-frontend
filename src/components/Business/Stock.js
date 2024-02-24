import { Fragment, useState } from "react";
import classes from "./Stock.module.css";
import Modal from "../UI/Modal";
import { useDispatch, useSelector } from "react-redux";
import { addItem, code, fetchItems } from "../../store/items-slice";
import { Dropdown } from "primereact/dropdown";
import { allCustomers } from "../../store/quote-slice";
import { addOrder, fetchOrder, invNo } from "../../store/order-slice";
import { Calendar } from "primereact/calendar";

const Stock = (props) => {
  const itemCode = useSelector(invNo);
  const [invoiceNoIsValid, setInvoiceNoIsValid] = useState();
  const [validating, setValidating] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const [enteredInvoiceNo, setEnteredInvoiceNo] = useState(itemCode);
  const [enteredType, setEnteredType] = useState("");
  const [enteredVch, setEnteredVch] = useState("");
  const [enteredCl, setEnteredCl] = useState("");
  const [enteredQlty, setEnteredQlty] = useState("");
  const [enteredPrice, setEnteredPrice] = useState("");
  const [enteredNote, setEnteredNote] = useState("");
  const [enteredNetLeaf, setEnteredNetLeaf] = useState("");
  const [enteredRate, setEnteredRate] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState();
  const customers = useSelector(allCustomers);
  const [selectedDate, setSelectedDate] = useState(new Date())

  const dispatch = useDispatch();

  const invoiceNoChangeHandler = (event) => {
    setEnteredInvoiceNo(event.target.value);
    setInvoiceNoIsValid(event.target.value.length > 3);

    setFormIsValid(
      event.target.value.length > 3 && selectedCustomer.id &&
        enteredPrice > 0
    );
  };

  const customerChangeHandler = (e) => {
    setSelectedCustomer(e.value)
    setFormIsValid(
      e.value.id && enteredInvoiceNo.length > 3 &&
        enteredPrice > 0
    );
  }

  const typeChangeHandler = (event) => {
    setEnteredType(event.target.value);
  };
  const vchChangeHandler = (event) => {
    setEnteredVch(event.target.value);
  };
  const clChangeHandler = (event) => {
    setEnteredCl(event.target.value);
  };
  const qltyChangeHandler = (event) => {
    setEnteredQlty(event.target.value);
  };
  const priceChangeHandler = (event) => {
    setEnteredPrice(event.target.value);

    setFormIsValid(
      enteredInvoiceNo.length > 3 && selectedCustomer.id &&
        event.target.value > 0
    );
  };

  const noteChangeHandler = (event) => {
    setEnteredNote(event.target.value);
  };

  const netLeafChangeHandler = (event) => {
    setEnteredNetLeaf(event.target.value);
    setEnteredPrice(0)
    if(enteredRate && event.target.value) {
      setEnteredPrice(parseFloat(enteredRate) * parseFloat(event.target.value))
      setFormIsValid(
        enteredInvoiceNo.length > 3 && selectedCustomer.id &&
        enteredPrice > 0 && event.target.value > 0
        );
    }
  };

  const rateChangeHandler = (event) => {
    setEnteredRate(event.target.value);
    setEnteredPrice(0)
    if(enteredNetLeaf && event.target.value) {
      setEnteredPrice(parseFloat(enteredNetLeaf) * parseFloat(event.target.value))
      setFormIsValid(
        enteredInvoiceNo.length > 3 && selectedCustomer.id &&
        enteredPrice > 0 && event.target.value > 0
        );
    }
  };

  // const item = useSelector((state) => findItem(state, {}));

  const submitHandler = async (event) => {
    event.preventDefault();
    setValidating(true);
    if (formIsValid) {
      const payload = {
        invoiceNo: enteredInvoiceNo,
        type: enteredType,
        vchNo: enteredVch,
        clNo: enteredCl,
        netLeafKgs: parseFloat(enteredNetLeaf),
        rateKg: enteredRate,
        qlty: enteredQlty,
        creditAmount: enteredType.toLowerCase() !== 'payment' ? parseFloat(enteredPrice) : 0,
        debitAmount: enteredType.toLowerCase() === 'payment' ? parseFloat(enteredPrice) : 0,
        note: enteredNote,
        customerId: selectedCustomer.id,
        transactionDate: selectedDate,
      };

      await dispatch(addOrder(payload));
      await dispatch(fetchOrder());
      props.onClose();
    }
  };

  const selectedCustomerTemplate = (option, props) => {
    if (option) {
      return (
        <div>
          {option.name} ({option.mobile})
        </div>
      );
    }

    return <span>{props.placeholder}</span>;
  };

  const customerOptionTemplate = (option) => {
    return (
      <div>
        {option.name} ({option.mobile})
      </div>
    );
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
      <div
          className={`${classes.control}`}
        >
          <label htmlFor="date">Date</label>
          <Calendar
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.value)}
            dateFormat="yy-mm-dd"
            placeholder="Select a Date"
            readOnlyInput
            showIcon
            style={{flex:"3.1 1"}}
          />
        </div>
        <div className={`${classes.control}`}>
          <label htmlFor="customer">Customer</label>
          {/* <input
            type="text"
            id="customer"
            value={enteredLocation}
            onChange={locationChangeHandler}
          /> */}
          <Dropdown
            placeholder="Select a Customer"
            filter
            showClear
            className="w-full md:w-14rem"
            optionLabel="name"
            value={selectedCustomer}
            onChange={customerChangeHandler}
            valueTemplate={selectedCustomerTemplate}
            itemTemplate={customerOptionTemplate}
            options={customers}
            style={{flex:"3.1 1"}}
          />
        </div>
        <div
          className={`${classes.control} ${
            invoiceNoIsValid === false
              ? classes.invalid
              : invoiceNoIsValid === true
              ? classes.valid
              : ""
          } ${invoiceNoIsValid === false ? classes.bump : ""}`}
        >
          <label htmlFor="invoiceNo">Invoice No</label>
          <input
            type="text"
            id="invoiceNo"
            value={enteredInvoiceNo}
            autoComplete="off"
            readOnly
            onChange={invoiceNoChangeHandler}
          />
        </div>
        <div
          className={`${classes.control}`}
        >
          <label htmlFor="type">Type</label>
          <input
            type="text"
            id="type"
            value={enteredType}
            autoComplete="off"
            onChange={typeChangeHandler}
          />
        </div>
        <div
          className={`${classes.control}`}
        >
          <label htmlFor="vchNo">VCH No</label>
          <input
            type="text"
            id="vchNo"
            value={enteredVch}
            autoComplete="off"
            onChange={vchChangeHandler}
          />
        </div>
        <div
          className={`${classes.control}`}
        >
          <label htmlFor="clNo">CL No</label>
          <input
            type="text"
            id="clNo"
            value={enteredCl}
            autoComplete="off"
            onChange={clChangeHandler}
          />
        </div>
        <div
          className={`${classes.control}`}
        >
          <label htmlFor="partNo">Net Leaf Kgs</label>
          <input
            type="text"
            id="partNo"
            value={enteredNetLeaf}
            autoComplete="off"
            onChange={netLeafChangeHandler}
          />
        </div>
        <div
          className={`${classes.control}`}
        >
          <label htmlFor="qlty">Qlty (%)</label>
          <input
            type="text"
            id="qlty"
            value={enteredQlty}
            autoComplete="off"
            onChange={qltyChangeHandler}
          />
        </div>
        <div
          className={`${classes.control}`}
        >
          <label htmlFor="rateKg">Rate/KG</label>
          <input
            type="text"
            id="rateKg"
            value={enteredRate}
            autoComplete="off"
            onChange={rateChangeHandler}
          />
        </div>
        <div
          className={`${classes.control}`}
        >
          <label htmlFor="price">Amount</label>
          <input
            type="text"
            id="price"
            value={enteredPrice}
            autoComplete="off"
            onChange={priceChangeHandler}
          />
        </div>
        <div className={`${classes.control}`}>
          <label htmlFor="note">Note</label>
          <input
            type="text"
            id="note"
            value={enteredNote}
            onChange={noteChangeHandler}
          />
        </div>
        {modalAction}
      </form>
    </Fragment>
  );

  return <Modal onClose={props.onClose}>{addStockModalContent}</Modal>;
};

export default Stock;
