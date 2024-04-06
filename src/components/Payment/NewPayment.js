import { Fragment, useState } from "react";
import classes from "./NewPayment.module.css";
import Modal from "../UI/Modal";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown } from "primereact/dropdown";
import { allCustomers } from "../../store/quote-slice";
import { Calendar } from "primereact/calendar";
import moment from "moment";
import { addPayment, fetchPayment, invNo } from "../../store/payment-slice";

const NewPayment = (props) => {
  const itemCode = useSelector(invNo);
  const ptype = [
    {
      name: 'Credit',
      value: 'Credit'
    },
    {
      name: 'Debit',
      value: 'Debit'
    },
    {
      name: 'Opening Balance',
      value: 'Opening Balance'
    }
  ];
  const pmode = [
    {
      name: 'Bank',
      value: 'Bank'
    },
    {
      name: 'Cheque',
      value: 'Cheque'
    },              
    {
      name: 'Cash',
      value: 'Cash'
    },
    {
      name: 'Online',
      value: 'Online'
    },
    {
      name: 'Net Banking',
      value: 'Net Banking'
    }
  ];
  const [invoiceNoIsValid, setInvoiceNoIsValid] = useState(
    props.editingItem && props.editingItem._id ? true : false
  );
  const [validating, setValidating] = useState(false);
  const [formIsValid, setFormIsValid] = useState(
    props.editingItem && props.editingItem._id ? true : false
  );
  const [enteredInvoiceNo, setEnteredInvoiceNo] = useState(
    props.editingItem && props.editingItem._id ? props.editingItem.payNo : itemCode
  );
  const [enteredName, setEnteredName] = useState(
    props.editingItem && props.editingItem._id ? props.editingItem.name : ""
  );
  const [enteredOpeningBal, setEnteredOpeningBal] = useState(
    props.editingItem && props.editingItem._id ? props.editingItem.openingBalance : ""
  );
  const [enteredPaymentNote, setEnteredPaymentNote] = useState(
    props.editingItem && props.editingItem._id ? props.editingItem.payNote : ""
  );
  const [enteredPrice, setEnteredPrice] = useState(
    props.editingItem && props.editingItem._id
      ? props.editingItem.payType === "Debit"
        ? props.editingItem.debitAmount
        : props.editingItem.creditAmount
      : ""
  );
  const [enteredNote, setEnteredNote] = useState(
    props.editingItem && props.editingItem._id ? props.editingItem.note : ""
  );
  // const customers = useSelector(allCustomers);
  // const [selectedCustomer, setSelectedCustomer] = useState(
  //   props.editingItem && props.editingItem._id
  //     ? customers.find((i) => i.id === props.editingItem.customerId._id) || false
  //     : false
  // );
  const [selectedPaymentType, setSelectedPaymentType] = useState(
    props.editingItem && props.editingItem._id
      ? ptype.find((i) => i.value === props.editingItem.payType).value || false
      : false
  );
  const [selectedPaymentMode, setSelectedPaymentMode] = useState(
    props.editingItem && props.editingItem._id
      ? pmode.find((i) => i.value === props.editingItem.payBy).value || false
      : false
  );
  const [selectedDate, setSelectedDate] = useState(
    props.editingItem && props.editingItem._id ? new Date(props.editingItem.transactionDate) : new Date()
  );
  const [openNote, setOpenNote] = useState(props.editingItem && props.editingItem._id && props.editingItem && props.editingItem.payBy ? true : false);

  const dispatch = useDispatch();

  const invoiceNoChangeHandler = (event) => {
    setEnteredInvoiceNo(event.target.value);
    setInvoiceNoIsValid(event.target.value.length > 3);

    setFormIsValid(
      event.target.value.length > 3 && enteredName.length > 3
    );
  };

  const customerChangeHandler = (e) => {
    // setSelectedCustomer(e.value);
    setEnteredName(e.target.value);
    setFormIsValid(
      e.target.value && enteredInvoiceNo.length > 3
    );
  };

  const paymentTypeChangeHandler = (event) => {
    setSelectedPaymentType(event.value);
  };
  const paymentModeChangeHandler = (event) => {
    setSelectedPaymentMode(event.value);
    setOpenNote(false);
    if(event.value) {
      setOpenNote(true);
    }
  };
  const priceChangeHandler = (event) => {
    setEnteredPrice(event.target.value);
  };

  const openingBalChangeHandler = (event) => {
    setEnteredOpeningBal(event.target.value);
  };

  const paymentNoteChangeHandler = (event) => {
    setEnteredPaymentNote(event.target.value);
  };

  const noteChangeHandler = (event) => {
    setEnteredNote(event.target.value);
    console.log(props.editingItem, 'items ed')
  };

  // const item = useSelector((state) => findItem(state, {}));
  const payload = {
    payNo: enteredInvoiceNo,
    payType: selectedPaymentType,
    name: enteredName,
    openingBalance: enteredOpeningBal,
    payBy: selectedPaymentMode,
    payNote: enteredPaymentNote,
    creditAmount:
    selectedPaymentType === "Credit"
        ? parseFloat(enteredPrice)
        : 0,
    debitAmount:
    selectedPaymentType === "Debit"
        ? parseFloat(enteredPrice)
        : 0,
    note: enteredNote,
    transactionDate: moment(selectedDate).format('YYYY-MM-DD'),
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setValidating(true);
    if (formIsValid) {
      await dispatch(addPayment(payload));
      await dispatch(fetchPayment());
      props.onClose();
    }
  };

  const updateOrder = () => {
    props.updatePayment({...payload, _id: props.editingItem._id});
  }

  const modalAction = (
    <div className={classes.actions}>
      <button
        className={classes.default_button}
        type="button"
        onClick={props.onClose}
      >
        Cancel
      </button>
      {!validating && !props.editingItem && (
        <button
          className={classes.button}
          type="submit"
          disabled={!formIsValid}
        >
          Save
        </button>
      )}
      {!validating && props.editingItem && props.editingItem._id && (
        <button
          className={classes.button}
          type="button"
          disabled={!formIsValid}
          onClick={updateOrder}
        >
          Update
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
      <h3 className={classes.heading}>Add New Payment</h3>
      <form onSubmit={submitHandler}>
        <div className={`${classes.control}`}>
          <label htmlFor="date">Date</label>
          <Calendar
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.value)}
            dateFormat="yy-mm-dd"
            placeholder="Select a Date"
            readOnlyInput
            showIcon
            style={{ flex: "3.1 1" }}
            touchUI
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
          <label htmlFor="invoiceNo">Ref No</label>
          <input
            type="text"
            id="invoiceNo"
            value={enteredInvoiceNo}
            autoComplete="off"
            readOnly
            onChange={invoiceNoChangeHandler}
          />
        </div>
        <div className={`${classes.control}`}>
          <label htmlFor="customer">Opening Balance</label>
          <input
            type="text"
            id="customer"
            value={enteredOpeningBal}
            onChange={openingBalChangeHandler}
          />
        </div>
        <div className={`${classes.control}`}>
          <label htmlFor="customer">Name</label>
          <input
            type="text"
            id="customer"
            value={enteredName}
            onChange={customerChangeHandler}
          />
        </div>
        <div className={`${classes.control}`}>
          <label htmlFor="type">Payment Type</label>
          <Dropdown
            placeholder="Select Payment Type"
            showClear
            className="w-full md:w-14rem"
            optionLabel="name"
            value={selectedPaymentType}
            onChange={paymentTypeChangeHandler}
            options={ptype}
            style={{ flex: "3.1 1" }}
          />
        </div>
        <div className={`${classes.control}`}>
          <label htmlFor="vchNo">Payment Mode</label>
          {/* <input
            type="text"
            id="vchNo"
            value={enteredVch}
            autoComplete="off"
            onChange={vchChangeHandler}
          /> */}          
          <Dropdown
            placeholder="Select Payment Mode"
            showClear
            className="w-full md:w-14rem"
            optionLabel="name"
            value={selectedPaymentMode}
            onChange={paymentModeChangeHandler}
            options={pmode}
            style={{ flex: "3.1 1" }}
          />
        </div>
        {openNote && <div className={`${classes.control}`}>
          <label htmlFor="customer">Payment Note</label>
          <input
            type="text"
            id="customer"
            value={enteredPaymentNote}
            onChange={paymentNoteChangeHandler}
          />
        </div>}
        <div className={`${classes.control}`}>
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

export default NewPayment;
