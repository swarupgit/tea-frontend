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
  putOrder,
} from "../store/order-slice";
import PrintPreview from "../components/Business/PrintPreview";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { allCustomers } from "../store/quote-slice";
import moment from "moment";
import BillPreview from "../components/Business/BillPreview";
import { isLoggedIn } from "../store/auth-slice";
import Stock from "../components/Business/Stock";
import { Button } from "primereact/button";
import { ToWords } from "to-words";

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
  const [addStock, setAddStock] = useState(false);
  const isUserLoggedIn = useSelector(isLoggedIn);
  const [editingItem, setEditingItem] = useState({});
  const [isStatement, setIsStatement] = useState(false);

  const dispatch = useDispatch();

  const loadTable = async () => {};
  useEffect(() => {
    loadTable();
    dispatch(fetchOrder());
  }, []);

  const toWords = new ToWords({
    localeCode: 'en-IN',
    converterOptions: {
      currency: true,
      ignoreDecimal: false,
      ignoreZeroCurrency: false,
      doNotAddOnly: false,
      currencyOptions: { // can be used to override defaults for the selected locale
        name: 'Rupee',
        plural: 'Rupees',
        symbol: '₹',
        fractionalUnit: {
          name: 'Paisa',
          plural: 'Paise',
          symbol: '',
        },
      }
    }
  });

  const viewDetails = (data, index) => {
    console.log(data);
    setPreview(true);
    setPreviewData(data);
    document.body.classList.add("hidden-overflow");
  };

  const editItem = (data, index) => {
    console.log(data, index);
    setAddStock(true);
    setEditingItem(data);
    document.body.classList.add("hidden-overflow");
  };

  const hideAddStockHandler = () => {
    setAddStock(false);
    document.body.classList.remove("hidden-overflow");
  };

  const updateOrder = async (updatingItem) => {
    await dispatch(putOrder(updatingItem));
    setAddStock(false);
    document.body.classList.remove("hidden-overflow");
    dispatch(fetchOrder());
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
    setIsStatement(false);
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
    setTitle(
      selectedCustomer
        ? `${moment(fromDate).format("YYYY-MM-DD")} - ${moment(toDate).format(
            "YYYY-MM-DD"
          )} | ${selectedCustomer.name}`
        : `${moment(fromDate).format("YYYY-MM-DD")} - ${moment(toDate).format(
            "YYYY-MM-DD"
          )}`
    );
    if (orders.length) {
      setRecordSearched(true);
      dispatch(orderActions.getBillingItems());
    }
    console.log(selectedCustomer)
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
          const doc = new jsPDF.default({ orientation: "l" }, 0, 0);
          doc.setFont('Times New Roman');
          doc.text("STATEMENT", 150, 10, {align:"center"});
          doc.text(`Party Name: ${selectedCustomer?.name}`, 150, 20, {align: "center"});
          doc.text(`Period: ${moment(fromDate).format("DD-MM-YYYY")} To ${moment(toDate).format(
            "DD-MM-YYYY"
          )}`, 150, 30, {align:"center"});
          let position = 0;
          const outstanding = totalCreditAmount > totalDebitAmount ? (totalCreditAmount - totalDebitAmount).toFixed(2) : 0;
          // const outstanding = parseFloat(selectedCustomer?.outStandingAmount).toFixed(2); 
          // console.log(customers, selectedCustomer?.outStandingAmount, parseFloat(selectedCustomer?.outStandingAmount), parseFloat(currentOutstanding))
          const otherCol = [
            {
              title: "VCH No",
              dataKey: "vchNo",
            }
          ];
          const pdfColumn = [...exportColumns].filter((i) => (i.title !== 'Invoice No')).filter((i) => (i.title !== 'Customer Name'));
          pdfColumn.splice(1, 0, ...otherCol);
          const final = [
            {
              transactionDate: "",
              invoiceNo: "",
              type: "",
              netLeafKgs: "",
              rateKg: "",
              "customerId.name": "",
              debitAmount: "",
              creditAmount: "",
              vchNo: "",
              clNo: "",
              qlty: "",
              note: ``,
            },
            {
              transactionDate: "",
              invoiceNo: "",
              type: "",
              netLeafKgs: totalNetLeaf,
              rateKg: "",
              "customerId.name": "",
              debitAmount: totalDebitAmount,
              creditAmount: totalCreditAmount,
              vchNo: "",
              clNo: "Total",
              qlty: "",
              note: `Closing: ${outstanding}`,
            },
          ];
  
          const pdfData = orders
            .map((d) => ({
              transactionDate: moment(d.transactionDate).utc().format("DD/MM/YYYY"),
              invoiceNo: d.invoiceNo,
              type: d.type,
              netLeafKgs: d.netLeafKgs,
              rateKg: d.rateKg > 0 ? parseFloat(d.rateKg).toFixed(2) : d.rateKg,
              "customerId.name": d.customerId.name,
              debitAmount:
                d.debitAmount > 0
                  ? parseFloat(d.debitAmount).toFixed(2)
                  : d.debitAmount,
              creditAmount:
                d.creditAmount > 0
                  ? parseFloat(d.creditAmount).toFixed(2)
                  : d.creditAmount,
              vchNo: d.vchNo,
              clNo: d.clNo,
              qlty: d.qlty,
              note: d.note,
            }))
            .filter((i) => i);
          doc.autoTable(
            [
              ...pdfColumn,
              {
                title: "Note",
                dataKey: "note",
              },
            ],
            [...pdfData, ...final],
            {
              margin: { top: 35 },
              theme: 'grid',
              didDrawPage: (d) =>  {
                console.log('possition',d.cursor.y)
                position = d.cursor.y + 7;
                d.settings.margin.top = 10;
              }
            }
          );
          doc.setFont('Paradroid', 'normal', 'bold');
          doc.setTextColor('#3B82F6');
          const textBreak = 280;
          const tct = doc.splitTextToSize(`Total Credit Amount in Words: ${totalCreditAmount > 0 ? toWords.convert(totalCreditAmount) : 'No Credit Amount'}.`, textBreak);
          doc.text(10, position, tct);
          position = getPosition(position, doc);
          const tdt = doc.splitTextToSize(`Total Debit Amount in Words: ${totalDebitAmount > 0 ? toWords.convert(totalDebitAmount): 'No Debit Amount'}.`, textBreak);
          doc.text(10, position, tdt);
          position = getPosition(position, doc);
          const tot = doc.splitTextToSize(`Total Outstanding Amount in Words: ${outstanding > 0 ? toWords.convert(outstanding) : 'No Outstanding Amount'}.`, textBreak);
          doc.text(10, position, tot);
          //doc height is 205
          doc.save(`${title || "invoices"}.pdf`);
        });
      });
  };

  const paymentHistory = () => {
    import("jspdf").then((jsPDF) => {
      import("jspdf-autotable").then(() => {
        const exportColumns = [
          {
            field: "transactionDate",
            header: "Date",
          },
          {
            field: "debitAmount",
            header: "Debit Amount",
          },
          {
            field: "creditAmount",
            header: "Credit Amount",
          },
        ]
        .map((col) => ({
          title: col.header,
          dataKey: col.field,
        }))
        .filter((i) => i.dataKey);
        const doc = new jsPDF.default({ orientation: "l" }, 0, 0);
        doc.setFont('Times New Roman');
        doc.text("PAYMENT HISTORY", 150, 10, {align:"center"});
        doc.text(`Party Name: ${selectedCustomer?.name}`, 150, 20, {align: "center"});
        doc.text(`Period: ${moment(fromDate).format("DD-MM-YYYY")} To ${moment(toDate).format(
          "DD-MM-YYYY"
        )}`, 150, 30, {align:"center"});
        let position = 0;
        const outstanding = totalCreditAmount > totalDebitAmount ? (totalCreditAmount - totalDebitAmount).toFixed(2) : 0;
        // const outstanding = parseFloat(selectedCustomer?.outStandingAmount).toFixed(2); 
        const pdfColumn = [...exportColumns];
        const final = [
          {
            transactionDate: "",
            debitAmount: "",
            creditAmount: "",
            note: ``,
          },
          {
            transactionDate: "",
            debitAmount: totalDebitAmount,
            creditAmount: totalCreditAmount,
            note: `Closing: ${outstanding}`,
          },
        ];

        const pdfData = orders
          .map((d) => ({
            transactionDate: moment(d.transactionDate).utc().format("DD/MM/YYYY"),
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
            ...pdfColumn,
            {
              title: "Note",
              dataKey: "note",
            },
          ],
          [...pdfData, ...final],
          {
            margin: { top: 35 },
            theme: 'grid',
            didDrawPage: (d) =>  {
              console.log('possition',d.cursor.y)
              position = d.cursor.y + 7;
              d.settings.margin.top = 10;
            }
          }
        );
        doc.setFont('Paradroid', 'normal', 'bold');
        doc.setTextColor('#3B82F6');
        const textBreak = 280;
        const tct = doc.splitTextToSize(`Total Credit Amount in Words: ${totalCreditAmount > 0 ? toWords.convert(totalCreditAmount) : 'No Credit Amount'}.`, textBreak);
        doc.text(10, position, tct);
        position = getPosition(position, doc);
        const tdt = doc.splitTextToSize(`Total Debit Amount in Words: ${totalDebitAmount > 0 ? toWords.convert(totalDebitAmount): 'No Debit Amount'}.`, textBreak);
        doc.text(10, position, tdt);
        position = getPosition(position, doc);
        const tot = doc.splitTextToSize(`Total Outstanding Amount in Words: ${outstanding > 0 ? toWords.convert(outstanding) : 'No Outstanding Amount'}.`, textBreak);
        doc.text(10, position, tot);
        //doc height is 205
        doc.save(`${title || "invoices"}.pdf`);
      });
    });
};

  const getPosition = (pos, doc) => {
    if(pos > 190) {
      doc.addPage();
      return 20;
    }
    pos += 10;
    return pos;
  }

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
          {recordSearched && (
            <Button
              type="button"
              label="Create Bill"
              className="p-button p-button-rounded"
              onClick={creatingBill}
            />
          )}
          {isStatement && (
            <Button
              type="button"
              label="Statement"
              className="p-button p-button-rounded ms-2"
              onClick={pdfStatement}
              severity="help"
            />
          )}
          {isStatement && (
            <Button
              type="button"
              label="Payment History"
              className="p-button p-button-rounded ms-2"
              onClick={paymentHistory}
              severity="help"
            />
          )}
        </div>
      </div>
    </div>
  );

  return (
    <Fragment>
      {addStock && isUserLoggedIn && (
        <Stock
          onClose={hideAddStockHandler}
          editingItem={editingItem}
          updateOrder={updateOrder}
        />
      )}
      <div className={`card overlay`}>
        <div className="card-header text-white">Sales List</div>
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
              <td>Total Net Leaf: {totalNetLeaf}</td>
              <td>Total Debit Amount: {totalDebitAmount}</td>
              <td>Total Credit Amount: {totalCreditAmount}</td>
            </tr>
          </table>
        </div>
      </div>
    </Fragment>
  );
}
