import { Fragment } from "react";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  allPayments,
  billingPayments,
  fetchPayment,
  paymentActions,
  paymentHeaders,
  persons,
  putPayment,
} from "../store/payment-slice";
import PrintPreview from "../components/Payment/PrintPreview";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import moment from "moment";
import BillPreview from "../components/Business/BillPreview";
import { isLoggedIn } from "../store/auth-slice";
import { Button } from "primereact/button";
import { ToWords } from "to-words";
import NewPayment from "../components/Payment/NewPayment";
import TablePayment from "../components/UI/TablePayment";

export default function Payment() {
  const columns = useSelector(paymentHeaders);
  const [tableData, setTableData] = useState([]);
  const orders = useSelector(allPayments);
  const customers = useSelector(persons);
  const [preview, setPreview] = useState(false);
  const [recordSearched, setRecordSearched] = useState(false);
  const [previewData, setPreviewData] = useState({});
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [selectedCustomer, setSelectedCustomer] = useState();
  const billingPaymentItems = useSelector(billingPayments);
  const [previewBill, setPreviewBill] = useState(false);
  const [title, setTitle] = useState("");
  const [addStock, setAddStock] = useState(false);
  const isUserLoggedIn = useSelector(isLoggedIn);
  const [editingItem, setEditingItem] = useState('');
  const [isStatement, setIsStatement] = useState(false);
  const [addPayment, setAddPayment] = useState(false);

  const dispatch = useDispatch();

  const loadTable = async () => {    
  };
  useEffect(() => {
    dispatch(fetchPayment())
    loadTable();
  }, []);

  const toWords = new ToWords({
    localeCode: "en-IN",
    converterOptions: {
      currency: true,
      ignoreDecimal: false,
      ignoreZeroCurrency: false,
      doNotAddOnly: false,
      currencyOptions: {
        // can be used to override defaults for the selected locale
        name: "Rupee",
        plural: "Rupees",
        symbol: "₹",
        fractionalUnit: {
          name: "Paisa",
          plural: "Paise",
          symbol: "",
        },
      },
    },
  });

  const viewDetails = (data, index) => {
    console.log(data);
    setPreview(true);
    setPreviewData(data);
    document.body.classList.add("hidden-overflow");
  };

  const editItem = (data, index) => {
    console.log(data, index);
    setAddPayment(true);
    setEditingItem(data);
    document.body.classList.add("hidden-overflow");
  };

  const hideAddStockHandler = () => {
    setAddStock(false);
    document.body.classList.remove("hidden-overflow");
  };

  const updateOrder = async (updatingItem) => {
    await dispatch(putPayment(updatingItem));
    setAddStock(false);
    document.body.classList.remove("hidden-overflow");
    dispatch(fetchPayment());
  };

  const totalNetLeaf = orders
    .reduce((carry, item) => {
      return item.netLeafKgs ? carry + parseFloat(item.netLeafKgs) : carry + 0;
    }, 0)
    .toFixed(2);
  const totalDebitAmount = orders
    .reduce((carry, item) => {
      return item.debitAmount > 0
        ? carry + parseFloat(item.debitAmount)
        : carry + 0;
    }, 0)
    .toFixed(2);
  const totalCreditAmount = orders
    .reduce((carry, item) => {
      return item.creditAmount > 0
        ? carry + parseFloat(item.creditAmount)
        : carry + 0;
    }, 0)
    .toFixed(2);

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
      return <div>{option.name}</div>;
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
    setIsStatement(false);
    // setSelectedCustomer();
    setRecordSearched(false);
    await dispatch(fetchPayment());
  };

  const filterRecord = async () => {
    await dispatch(
      fetchPayment({
        from: fromDate ? moment(fromDate).format("YYYY-MM-DD") : "",
        to: toDate ? moment(toDate).format("YYYY-MM-DD") : "",
        name: selectedCustomer,
      })
    );
    setTitle(
      selectedCustomer
        ? `${moment(fromDate).format("YYYY-MM-DD")} - ${moment(toDate).format(
            "YYYY-MM-DD"
          )} | ${selectedCustomer}`
        : `${moment(fromDate).format("YYYY-MM-DD")} - ${moment(toDate).format(
            "YYYY-MM-DD"
          )}`
    );
    if (orders.length) {
      setRecordSearched(true);
      dispatch(paymentActions.getBillingItems());
    }
    console.log(selectedCustomer);
    setIsStatement(selectedCustomer ? true : false);
  };

  const creatingBill = () => {
    document.body.classList.add("hidden-overflow");
    setPreviewBill(true);
    resetSearch();
  };

  const pdfStatement = () => {
    import("jspdf").then((jsPDF) => {
      import("jspdf-autotable").then(() => {
        const exportColumns = [...columns]
          .map((col) => ({
            title: col.header,
            dataKey: col.field,
          }))
          .filter((i) => i.dataKey);
        const doc = new jsPDF.default({ orientation: "p" }, 0, 0);
        doc.setFont("Times New Roman");
        doc.text("STATEMENT", 105, 10, { align: "center" });
        doc.text(`Party Name: ${selectedCustomer}`, 105, 20, {
          align: "center",
        });
        doc.text(
          `Period: ${moment(fromDate).format("DD-MM-YYYY")} To ${moment(
            toDate
          ).format("DD-MM-YYYY")}`,
          105,
          30,
          { align: "center" }
        );
        let position = 0;
        const currentOutstanding =
          totalCreditAmount > totalDebitAmount
            ? (totalCreditAmount - totalDebitAmount).toFixed(2)
            : 0;
        const outstanding = parseFloat(
          totalCreditAmount - totalDebitAmount
        ).toFixed(2);
        // console.log(customers, selectedCustomer?.outStandingAmount, parseFloat(selectedCustomer?.outStandingAmount), parseFloat(currentOutstanding))
        const pdfColumn = [...exportColumns]
          .filter((i) => i.dataKey !== "payNo")
        const final = [
          {
            transactionDate: "",
            payNo: "",
            payType: "",
            payBy: "",
            name: "",
            openingBalance: "",
            debitAmount: "",
            creditAmount: "",
            note: ``,
          },
          {
            transactionDate: "",
            payNo: "",
            payType: "",
            payBy: "",
            name: "",
            openingBalance: "",
            debitAmount: totalDebitAmount,
            creditAmount: totalCreditAmount,
            note: `Closing: ${outstanding}`,
          },
        ];

        const pdfData = orders
          .map((d) => ({
            transactionDate: moment(d.transactionDate)
              .utc()
              .format("DD/MM/YYYY"),
            payNo: d.payNo,
            payType: d.payType,
            payBy: `${d.payBy}\n${d.payNote}`,
            name: d.name,
            openingBalance: d.openingBalance,
            debitAmount:
              d.debitAmount > 0
                ? parseFloat(d.debitAmount).toFixed(2)
                : d.debitAmount,
            creditAmount:
              d.creditAmount > 0
                ? parseFloat(d.creditAmount).toFixed(2)
                : d.creditAmount,
            note: d.note,
          }))
          .filter((i) => i);
        doc.autoTable(
          [
            ...pdfColumn
          ],
          [...pdfData, ...final],
          {
            margin: { top: 35 },
            theme: "grid",
            didDrawPage: (d) => {
              console.log("possition", d.cursor.y);
              position = d.cursor.y + 7;
              d.settings.margin.top = 10;
            },
          }
        );
        doc.setFont("Paradroid", "normal", "bold");
        doc.setTextColor("#3B82F6");
        const textBreak = 280;
        const tct = doc.splitTextToSize(
          `Total Credit Amount in Words: ${
            totalCreditAmount > 0
              ? toWords.convert(totalCreditAmount)
              : "No Credit Amount"
          }.`,
          textBreak
        );
        // doc.text(10, position, tct);
        // position = getPosition(position, doc);
        // const tdt = doc.splitTextToSize(
        //   `Total Debit Amount in Words: ${
        //     totalDebitAmount > 0
        //       ? toWords.convert(totalDebitAmount)
        //       : "No Debit Amount"
        //   }.`,
        //   textBreak
        // );
        // doc.text(10, position, tdt);
        // position = getPosition(position, doc);
        // const tot = doc.splitTextToSize(
        //   `Total Outstanding Amount in Words: ${
        //     outstanding > 0
        //       ? toWords.convert(outstanding)
        //       : "No Outstanding Amount"
        //   }.`,
        //   textBreak
        // );
        // doc.text(10, position, tot);
        //doc height is 205
        doc.save(`${title || "invoices"}.pdf`);
      });
    });
  };


  const getPosition = (pos, doc) => {
    if (pos > 190) {
      doc.addPage();
      return 20;
    }
    pos += 10;
    return pos;
  };

  const closePreviewBill = () => {
    setPreviewBill(false);
    document.body.classList.remove("hidden-overflow");
  };

  const dateSelect = (
    <div className={`card-body search-body`}>
      <div className="row">
        <div className="col-md-4">
          <Calendar
            value={fromDate}
            onChange={(e) => setFromDate(e.value)}
            dateFormat="dd/mm/yy"
            placeholder="Select a Date"
            showIcon
            touchUI
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
            touchUI
          />
        </div>
        <div className="col-md-3">
          <label htmlFor="customer">Name</label>
          <Dropdown
            placeholder="Select a Customer"
            filter
            showClear
            className="w-full md:w-14rem"
            value={selectedCustomer}
            onChange={customerChangeHandler}
            options={customers}
            style={{ flex: "3.1 1" }}
          />
        </div>
        <div
          className="col-md-5"
          style={{ display: "flex", justifyContent: "flex-start" }}
        >
          <Button
            label="Search"
            type="button"
            className="p-button p-button-danger p-button-rounded"
            onClick={filterRecord}
          />
          <i
            className="pi pi-replay"
            onClick={resetSearch}
            style={{ fontSize: "2rem", margin: "8px", cursor: "pointer" }}
          ></i>
          {/* {recordSearched && (
            <Button
              type="button"
              label="Create Bill"
              className="p-button p-button-rounded"
              onClick={creatingBill}
            />
          )} */}
          {isStatement && (
            <Button
              type="button"
              label="Statement"
              className="p-button p-button-rounded ms-2"
              onClick={pdfStatement}
              severity="help"
            />
          )}
        </div>
      </div>
    </div>
  );

  const showAddPaymentHandler = () => {
    setAddPayment(true);
  };
  const hideNewPaymentHandler = () => {
    setAddPayment(false);
    setEditingItem('');
    document.body.classList.remove('hidden-overflow');
  };

  const updatePayment = async (updatingItem) => {
    await dispatch(putPayment(updatingItem));
    setAddPayment(false);
    document.body.classList.remove('hidden-overflow');
    dispatch(fetchPayment());
    setEditingItem('');
  }

  const deleteItem = async (data, index) => {
    console.log(data, index, 'item');
    // await dispatch(delCustomer(data.id));
    dispatch(fetchPayment());
  };

  return (
    <Fragment>
      {addPayment && isUserLoggedIn && <NewPayment onClose={hideNewPaymentHandler} editingItem={editingItem} updatePayment={updatePayment}/>}
      <div className={`card overlay`}>
        <div className="card-header text-white">
          In-Out Payments
          <button
            className="theme-button"
            type="button"
            onClick={showAddPaymentHandler}
            style={{ backgroundColor: "#8000F8" }}
          >
            Add a Payment
          </button>
        </div>
        {preview && (
          <PrintPreview onClose={closePreview} previewData={previewData} />
        )}
        {dateSelect}
        {/* {previewBill && (
          <BillPreview
            onClose={closePreviewBill}
            billingData={billingPaymentItems}
            customer={
              selectedCustomer ?? "Customer not Selected when bill created"
            }
            title={title}
          />
        )} */}
        <TablePayment
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
          inOut={true}
          filetext={
            selectedCustomer
              ? `${moment(fromDate).format("YYYY-MM-DD")} - ${moment(
                  toDate
                ).format("YYYY-MM-DD")} | ${selectedCustomer.name}`
              : `${moment(fromDate).format("YYYY-MM-DD")} - ${moment(
                  toDate
                ).format("YYYY-MM-DD")}`
          }
        />
        <div className="text-white">
          <table style={{ width: "100%" }}>
            <tr>
              <td>Total Debit Amount: {totalDebitAmount}</td>
              <td>Total Credit Amount: {totalCreditAmount}</td>
            </tr>
          </table>
        </div>
      </div>
    </Fragment>
  );
}
