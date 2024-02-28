import { Fragment } from "react";
import React, { useState, useEffect } from "react";
import Table from "../components/UI/Table";
import { useDispatch, useSelector } from "react-redux";
import {
  allOrders,
  billingOrders,
  fetchOrder,
  orderActions,
  orderHeaders,
} from "../store/order-slice";
import PrintPreview from "../components/Business/PrintPreview";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { allCustomers } from "../store/quote-slice";
import moment from "moment";
import BillPreview from "../components/Business/BillPreview";

export default function Order() {
  const columns = useSelector(orderHeaders);
  const [tableData, setTableData] = useState([]);
  const orders = useSelector(allOrders);
  const [preview, setPreview] = useState(false);
  const [recordSearched, setRecordSearched] = useState(false);
  const [previewData, setPreviewData] = useState({});
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [selectedCustomer, setSelectedCustomer] = useState();
  const customers = useSelector(allCustomers);
  const billingOrderItems = useSelector(billingOrders);
  const [previewBill, setPreviewBill] = useState(false);
  const [title, setTitle] = useState("");

  const dispatch = useDispatch();

  const loadTable = async () => {};
  useEffect(() => {
    loadTable();
    dispatch(fetchOrder());
  }, []);

  const viewDetails = (data, index) => {
    console.log(data);
    setPreview(true);
    setPreviewData(data);
    document.body.classList.add("hidden-overflow");
  };

  const editItem = (data, index) => {
    console.log(data, index)
  }

  const closePreview = () => {
    setPreview(false);
    setPreviewData({});
    document.body.classList.remove("hidden-overflow");
  };

  const customerChangeHandler = (e) => {
    setSelectedCustomer(e.value);
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

  const resetSearch = async () => {
    setFromDate();
    setToDate();
    // setSelectedCustomer();
    setRecordSearched(false);
    await dispatch(fetchOrder());
  };

  const filterRecord = async () => {
    await dispatch(
      fetchOrder({
        from: fromDate ? moment(fromDate).format("YYYY-MM-DD") : "",
        to: toDate ? moment(toDate).format("YYYY-MM-DD") : "",
        customer: selectedCustomer,
      })
    );
    if (orders.length) {
      setRecordSearched(true);
      dispatch(orderActions.getBillingItems());
    }
  };

  const creatingBill = () => {
    document.body.classList.add("hidden-overflow");
    setPreviewBill(true);
    setTitle(
      selectedCustomer
        ? `${moment(fromDate).format("YYYY-MM-DD")} - ${moment(toDate).format(
            "YYYY-MM-DD"
          )} | ${selectedCustomer.name}`
        : `${moment(fromDate).format("YYYY-MM-DD")} - ${moment(toDate).format(
            "YYYY-MM-DD"
          )}`
    );
    resetSearch();
  };

  const closePreviewBill = () => {
    setPreviewBill(false);
    document.body.classList.remove("hidden-overflow");
  };

  const dateSelect = (
    <div className={`card-body search-body`}>
      <div className="row">
        <div className="col-md-5">
          <Calendar
            value={fromDate}
            onChange={(e) => setFromDate(e.value)}
            dateFormat="dd/mm/yy"
            placeholder="Select a Date"
            showIcon
          />
          <label className="space-both">To</label>
          <Calendar
            value={toDate}
            onChange={(e) => setToDate(e.value)}
            minDate={fromDate}
            dateFormat="dd/mm/yy"
            placeholder="Select a Date"
            showIcon
            disabled={!fromDate}
          />
        </div>
        <div className="col-md-3">
          <label htmlFor="customer">Customer</label>
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
            style={{ flex: "3.1 1" }}
          />
        </div>
        <div className="col-md-3" style={{ float: "left" }}>
          <button
            type="button"
            className="p-button p-button-danger p-button-rounded"
            onClick={filterRecord}
          >
            Search Record
          </button>
          <i
            className="pi pi-replay"
            onClick={resetSearch}
            style={{ fontSize: "2rem", margin: "8px", cursor: "pointer" }}
          ></i>
          {recordSearched && (
            <button
              type="button"
              className="p-button p-button-rounded"
              onClick={creatingBill}
            >
              Create Bill
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <Fragment>
      <div className={`card overlay`}>
        <div className="card-header text-white">Order List</div>
        {preview && (
          <PrintPreview onClose={closePreview} previewData={previewData} />
        )}
        {dateSelect}
        {previewBill && (
          <BillPreview
            onClose={closePreviewBill}
            billingData={billingOrderItems}
            customer={
              selectedCustomer ?? "Customer not Selected when bill created"
            }
            title={title}
          />
        )}
        <Table
          data={orders}
          columns={columns}
          buttons={[
            { button: "xlsx", option: true },
            { button: "pdf", option: true },
          ]}
          filter="row"
          viewDetails={viewDetails}
          editItem={editItem}
          show={true}
          edit={true}
        />
      </div>
    </Fragment>
  );
}
