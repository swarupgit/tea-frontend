import { Fragment } from "react";
import React, { useState, useEffect } from "react";
import Table from "../components/UI/Table";
import { useDispatch, useSelector } from "react-redux";
import { isLoggedIn } from "../store/auth-slice";
import { allOrders, fetchOrder } from "../store/order-slice";
import classes from "../components/Business/BillPreview.module.css";
import Modal from "../components/UI/Modal";
import { redirect, useNavigate } from "react-router";

export default function MonthWise() {
  const isUserLoggedIn = useSelector(isLoggedIn);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const orders = useSelector(allOrders);
  const monthList = {
    0: "Jan",
    1: "Feb",
    2: "Mar",
    3: "Apr",
    4: "May",
    5: "Jun",
    6: "Jul",
    7: "Aug",
    8: "Sep",
    9: "Oct",
    10: "Nov",
    11: "Dec",
  };
  const [selectedMonth, setSelectedMonth] = useState(
    localStorage.getItem("month")
  );
  const [yearList, setYearList] = useState([new Date().getFullYear()]);
  const [year, setYear] = useState(localStorage.getItem("year"));
  const [table, setTable] = useState([]);
  const monthYearNetLeaf = orders
    .reduce((carry, item) => {
      const tmonth = `${new Date(item.transactionDate).getMonth()}${new Date(
        item.transactionDate
      ).getFullYear()}`;
      const month = `${selectedMonth}${year}`;
      return tmonth === month && item.netLeafKgs
        ? carry + parseFloat(item.netLeafKgs)
        : carry + 0;
    }, 0)
    .toFixed(2);
  const monthYearDebitAmount = orders
    .reduce((carry, item) => {
      const tmonth = `${new Date(item.transactionDate).getMonth()}${new Date(
        item.transactionDate
      ).getFullYear()}`;
      const month = `${selectedMonth}${year}`;
      return tmonth === month && item.debitAmount > 0
        ? carry + parseFloat(item.debitAmount)
        : carry + 0;
    }, 0)
    .toFixed(2);
  const monthYearCreditAmount = orders
    .reduce((carry, item) => {
      const tmonth = `${new Date(item.transactionDate).getMonth()}${new Date(
        item.transactionDate
      ).getFullYear()}`;
      const month = `${selectedMonth}${year}`;
      return tmonth === month && item.creditAmount > 0
        ? carry + parseFloat(item.creditAmount)
        : carry + 0;
    }, 0)
    .toFixed(2);
  useEffect(() => {
    dispatch(fetchOrder());
    const list = [...yearList];
    console.log("from redux", orders);
    orders.forEach((order) => {
      if (!yearList.includes(new Date(order.transactionDate).getFullYear())) {
        list.push(new Date(order.transactionDate).getFullYear());
      }
    });
    setYearList(list);
    //   setTable([{
    //       month_year: `${monthList[selectedMonth]}/${year}`,
    //       tgl: monthYearNetLeaf,
    //       tca: monthYearCreditAmount,
    //       tda: monthYearDebitAmount,
    //       toa: (monthYearCreditAmount-monthYearDebitAmount).toFixed(2)
    //   }])
  }, []);

  const addAnother = () => {
    const tableData = [...table];
    const nextSet = {
      month_year: `${monthList[selectedMonth]}/${year}`,
      tgl: monthYearNetLeaf,
      tca: monthYearCreditAmount,
      tda: monthYearDebitAmount,
      toa: (monthYearCreditAmount - monthYearDebitAmount).toFixed(2),
    };
    tableData.push(nextSet);
    console.log(nextSet, " next set", orders);
    setTable(tableData);
  };

  const removeThis = (index) => {
    const tableData = [...table];
    if (index > -1) {
      // only splice array when item is found
      tableData.splice(index, 1); // 2nd parameter means remove one item only
    }
    setTable(tableData);
  };

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
    docprint.document.write(`<head><title>Month/Year Wise Data</title>`);
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
          .hide {
            display: none;
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
      <button
        className={classes.default}
        type="Link"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
      <button className={classes.button} type="button" onClick={printPage}>
        Print
      </button>
    </div>
  );

  const monthWiseContent = (
    <Fragment>
      <h3 className={classes.heading}>Month Wise Data</h3>
      <div className={`${classes["control"]} ${classes["w-50"]}`}>
        <label className={`${classes["control-label"]}`}>Select Month</label>
        <select
          onChange={(e) => setSelectedMonth(e.target.value)}
          value={selectedMonth}
        >
          {Object.values(monthList).map((i, k) => (
            <option value={k} key={k}>
              {i}
            </option>
          ))}
        </select>
      </div>
      <div className={`${classes["control"]} ${classes["w-50"]}`}>
        <label className={`${classes["control-label"]}`}>Select Year</label>
        <select onChange={(e) => setYear(e.target.value)} value={year}>
          {yearList.map((i, k) => (
            <option value={i} key={k}>
              {i}
            </option>
          ))}
        </select>
      </div>
      <div className={`${classes.actions}`}>
        <button className={classes.button} type="button" onClick={addAnother}>
          Add this Set
        </button>
      </div>
      <div className={`card ${classes["m-t-1"]}`} id="printable">
        {/* <div className="card-header">Customer Details</div> */}
        <div className={` ${classes["p-1"]} card-body`}>
          <div
            className={`print-value col text-center bar-after down-space ${classes["down-space"]} ${classes["print-value"]}`}
          >
            Month/Year Wise Statements
          </div>
          <div className={`${classes["bar-after"]} bar-after row`}>
            <table className={`${classes["custom-table"]} custom-table`}>
              <thead>
                <tr className={`${classes["table-row"]} table-row`}>
                  <th>Month/Year</th>
                  <th>Grean Leaf</th>
                  <th>Credit Amount</th>
                  <th>Debit Amount</th>
                  <th>Outstanding</th>
                  <th className="hide">Remove</th>
                </tr>
              </thead>
              <tbody>
                {table &&
                  table.length > 0 &&
                  table.map((item, ind) => {
                    return (
                      <tr
                        key={ind}
                        className={`${classes["table-row"]} table-row`}
                      >
                        <td>{item.month_year}</td>
                        <td>{item.tgl}</td>
                        <td>{item.tca}</td>
                        <td>{item.tda}</td>
                        <td>{item.toa}</td>
                        <td className="hide">
                          <button
                            className={`p-button p-button-rounded p-button-danger p-button-icon-only`}
                            type="button"
                            onClick={() => removeThis(ind)}
                          >
                            <i className="pi pi-trash"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                {/* <tr className={`${classes["table-row"]} table-row`}>
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
                  <th colSpan={2}>
                    For: {process.env[`REACT_APP_COMPANY_NAME${seller}`]}
                  </th>
                </tr> */}
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
    <Modal onClose={() => redirect("/")} big>
      {monthWiseContent}
    </Modal>
  );
}