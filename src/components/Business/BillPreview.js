import { Fragment, useEffect, useState } from "react";
import classes from "./BillPreview.module.css";
import Modal from "../UI/Modal";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../store/items-slice";
import Table from "../UI/Table";
import { validateEmail } from "customize-string-operations";
import { addCustomer, fetchCustomer } from "../../store/quote-slice";
import moment from "moment";
import { ToWords } from "to-words";

const BillPreview = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {}, []);
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
  const [seller, setSeller] = useState(0);
  const [sendTo, setSendTo] = useState("");

  const printPage = () => {
    var disp_setting = "toolbar=yes,location=no,";
    disp_setting += "directories=yes,menubar=yes,";
    disp_setting += "scrollbars=yes,width=650, height=600, left=100, top=25";
    var content_vlue = document.getElementById("printable").innerHTML;
    var docprint = window.open("", "", disp_setting);
    docprint.document.open();
    docprint.document.write(
      '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"'
    );
    docprint.document.write(
      '"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">'
    );
    docprint.document.write(
      '<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">'
    );
    docprint.document.write(`<head><title>${props.title}</title>`);
    docprint.document.write(
      '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">'
    );
    docprint.document.write('<style type="text/css">body{ margin:0px;');
    docprint.document.write("font-family:verdana,Arial;color:#000;");
    docprint.document.write(
      `font-family:Verdana, Geneva, sans-serif; font-size:12px;}
      .table-row {
          td,th {
          border: 1px solid #adacac;
        }
      }
      .table-row:nth-last-child(1) {
        td {
          border: none;
        }
      }
      .custom-table tr{
        td, th {
          padding: 1rem 1rem;
        }
      }
      .print-value {
        font-weight: 600;
        font-family: Arial, Helvetica, sans-serif;
      }
      .bar {
        border-bottom: 1px solid #000;
        padding: 0.75rem 0;
      }
      .bar-after {
        padding-top: 0.75rem;
      }
      .down-space {
        margin-bottom: 0.5rem;
      }
      .col, .col-6 {
        text-align: left;
      }
      .card-body {
        padding: 2rem;
      }      
      .border-right {
        border-right: 2px solid;
      }
      .size-12 {
        font-size: 12px;
      }
      .pd-10 {
        padding: 10px !important;
      }
      .box {
        border: 1px solid;
        border-radius: 5px;
      }
      
`
    );
    docprint.document.write("a{color:#000;text-decoration:none;} </style>");
    docprint.document.write('</head><body onLoad="self.print()"><center>');
    docprint.document.write(content_vlue);
    docprint.document.write("</center></body></html>");
    docprint.document.close();
    docprint.focus();
  };

  const modalAction = (
    <div className={`${classes.actions} ${classes["m-t-1"]}`}>
      <button className={classes.default} type="button" onClick={props.onClose}>
        Close
      </button>
      <button className={classes.button} type="button" onClick={printPage}>
        Print
      </button>
    </div>
  );

  const totalAmount = props.billingData.reduce((carry, item) => {
    return item.creditAmount > 0 ? parseFloat(item.creditAmount) + carry : carry + 0;
  }, 0).toFixed(2);

  const sellerChangeHandler = (e) => {
    setSeller(e.target.value);
  };

  const billPreviewModalContent = (
    <Fragment>
      <h3 className={classes.heading}>Bill Details</h3>
      <div className={`${classes["control"]} ${classes["w-50"]}`}>
        <label className={`${classes["control-label"]}`}>Select Seller</label>
        <select onChange={sellerChangeHandler}>
          <option value={0}>{process.env.REACT_APP_COMPANY_NAME0}</option>
          <option value={1}>{process.env.REACT_APP_COMPANY_NAME1}</option>
        </select>
      </div>
      <div className={`${classes["control"]} ${classes["w-50"]}`}>
        <label className={`${classes["control-label"]}`}>
          Send To (Optional)
        </label>
        <input
          type="text"
          id="sendTo"
          value={sendTo}
          autoComplete="off"
          onChange={(e) => setSendTo(e.target.value)}
        />
      </div>
      <div className={`card ${classes["m-t-1"]}`} id="printable">
        {/* <div className="card-header">Customer Details</div> */}
        <div className={` ${classes["p-1"]} card-body`}>
          <div className={`print-value col text-center bar-after down-space ${classes["down-space"]} ${classes["print-value"]}`}>
            Bill
          </div>
          <div className="row box">
            <div
              className={`col-6 ${classes["border-right"]} border-right pd-10`}
            >
              <label className={`${classes["control-label"]}`}>
                Seller Details
              </label>
              <div className="print-value">
                {process.env[`REACT_APP_COMPANY_NAME${seller}`]}
              </div>
              <div className="print-value">
                {process.env[`REACT_APP_COMPANY_SUPP${seller}`]}
              </div>
              <div className="print-value">
                {process.env[`REACT_APP_COMPANY_ADDRESS${seller}`]}
              </div>
              <div className="print-value">
                {process.env[`REACT_APP_COMPANY_EMAIL${seller}`]}
              </div>
              <div className="print-value">
                {process.env[`REACT_APP_COMPANY_MOBILE${seller}`]}
              </div>
              <label className={`${classes["control-label"]}`}>Bill No</label>
              <div className="print-value">
                {moment().format("M/YY")}-{Date.now()}
              </div>
              <label className={`${classes["control-label"]}`}>Bill Date</label>
              <div className="print-value">
                {moment().format("DD-MM-YYYY hh:mm A")}
              </div>
            </div>
            <div className={`col-6 pd-10`}>
              <label className={`${classes["control-label"]}`}>
                Customer Details
              </label>
              {typeof props.customer === "string" && (
                <div className="print-value">{props.customer}</div>
              )}
              {props.customer?.id && (
                <>
                  {sendTo && <div className="print-value">{sendTo},</div>}
                  <div className="print-value">{props.customer.name}</div>
                  <div className="print-value">{props.customer.address}</div>
                  <div className="print-value">{props.customer.mobile}</div>
                  <div className="print-value">{props.customer.email}</div>
                </>
              )}
            </div>
          </div>
          <div className={`${classes["bar-after"]} bar-after row`}>
            <table className={`${classes["custom-table"]} custom-table`}>
              <thead>
                <tr className={`${classes["table-row"]} table-row`}>
                  <th>DATE</th>
                  <th>CL NO</th>
                  <th>%</th>
                  <th>QUANTITY</th>
                  <th>RATE</th>
                  <th>Amount</th>
                  <th>P</th>
                </tr>
              </thead>
              <tbody>
                {props.billingData &&
                  props.billingData.length &&
                  props.billingData.map((item, ind) => {
                    if (item.creditAmount > 0) {
                      const amt = parseInt(item.creditAmount);
                      const pa = item.creditAmount.split('.')[1];
                      return (
                        <tr
                          key={ind}
                          className={`${classes["table-row"]} table-row`}
                        >
                          <td>
                            {moment(item.transactionDate).utc().format("DD/MM/YYYY")}
                          </td>
                          <td>{item.clNo}</td>
                          <td>{item.qlty}</td>
                          <td>{item.netLeafKgs}</td>
                          <td>{item.rateKg}</td>
                          <td>{amt}</td>
                          <td>{pa}</td>
                        </tr>
                      );
                    }
                  })}
                <tr className={`${classes["table-row"]} table-row`}>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th>Total Amount</th>
                  <th>{totalAmount}</th>
                  <th></th>
                </tr>
                <tr>
                  <th colSpan={7}>
                    Amount in words: {toWords.convert(totalAmount)}.
                  </th>
                </tr>
                <tr>
                  <th colSpan={5}></th>
                  <th colSpan={2}>For: {process.env[`REACT_APP_COMPANY_NAME${seller}`]}</th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* <div className={`card-footer ${classes["text-right"]}`}>
          Total: {totalAmount}
        </div> */}
      </div>

      {modalAction}
    </Fragment>
  );

  return (
    <Modal onClose={props.onClose} big>
      {billPreviewModalContent}
    </Modal>
  );
};

export default BillPreview;
