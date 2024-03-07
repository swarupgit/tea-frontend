import { Fragment, useEffect, useState } from "react";
import classes from "./PrintPreview.module.css";
import Modal from "../UI/Modal";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../store/items-slice";
import Table from "../UI/Table";
import { validateEmail } from "customize-string-operations";
import { addCustomer, fetchCustomer } from "../../store/quote-slice";
import moment from "moment";

const PrintPreview = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {}, []);

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
    docprint.document.write(
      `<head><title>${props.previewData.invoiceNo}</title>`
    );
    docprint.document.write(
      '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">'
    );
    docprint.document.write('<style type="text/css">body{ margin:0px;');
    docprint.document.write("font-family:verdana,Arial;color:#000;");
    docprint.document.write(
      `font-family:Verdana, Geneva, sans-serif; font-size:12px;}.table-row {
        border-bottom: 1px solid #adacac;
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
      .row {
        padding: 2rem;
      }`
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

  const printPreviewModalContent = (
    <Fragment>
      <h3 className={classes.heading}>Invoice Details</h3>
      <div className={`card ${classes["m-t-1"]}`} id="printable">
        {/* <div className="card-header">Customer Details</div> */}
        <div className={` ${classes["p-1"]} card-body`}>
          <div className="row">
            <div className={`col-6 ${classes["down-space"]} down-space`}>
              <label className={`${classes["control-label"]}`}>
                Invoice Number
              </label>
              <div className="print-value">{props.previewData.invoiceNo}</div>
            </div>
            <div className={`col-6 ${classes["down-space"]} down-space`}>
              <label className={`${classes["control-label"]}`}>
                Invoice Date
              </label>
              <div className="print-value">
                {moment(props.previewData.transactionDate).format("DD/MM/YYYY")}
              </div>
            </div>
            <div className={`col-6 ${classes["down-space"]} down-space`}>
              <label className={`${classes["control-label"]}`}>Type</label>
              <div className="print-value">{props.previewData.type}</div>
            </div>
            {props.previewData.qlty && (
              <div className={`col-6 ${classes["down-space"]} down-space`}>
                <label className={`${classes["control-label"]}`}>Qlty(%)</label>
                <div className="print-value">{props.previewData.qlty}</div>
              </div>
            )}
            {props.previewData.clNo && (
              <div className={`col-6 ${classes["down-space"]} down-space`}>
                <label className={`${classes["control-label"]}`}>CL No</label>
                <div className="print-value">{props.previewData.clNo}</div>
              </div>
            )}
            {props.previewData.vchNo && (
              <div className={`col-6 ${classes["down-space"]} down-space`}>
                <label className={`${classes["control-label"]}`}>VCH No</label>
                <div className="print-value">{props.previewData.vchNo}</div>
              </div>
            )}
            {props.previewData.netLeafKgs && (
              <div className={`col-6 ${classes["down-space"]} down-space`}>
                <label className={`${classes["control-label"]}`}>
                  Net Leaf KGs
                </label>
                <div className="print-value">
                  {props.previewData.netLeafKgs}
                </div>
              </div>
            )}
            {props.previewData.rateKg && (
              <div className={`col-6 ${classes["down-space"]} down-space`}>
                <label className={`${classes["control-label"]}`}>Rate/KG</label>
                <div className="print-value">{props.previewData.rateKg}</div>
              </div>
            )}
            {props.previewData.debitAmount && (
              <div className={`col-6 ${classes["down-space"]} down-space`}>
                <label className={`${classes["control-label"]}`}>
                  Debit Amount
                </label>
                <div className="print-value">
                  {props.previewData.debitAmount}
                </div>
              </div>
            )}
            {props.previewData.creditAmount && (
              <div className={`col-6 ${classes["down-space"]} down-space`}>
                <label className={`${classes["control-label"]}`}>
                  Credit Amount
                </label>
                <div className="print-value">
                  {props.previewData.creditAmount}
                </div>
              </div>
            )}
            {props.previewData.note && (
              <div className={`col-6 ${classes["down-space"]} down-space`}>
                <label className={`${classes["control-label"]}`}>Note</label>
                <div className="print-value">{props.previewData.note}</div>
              </div>
            )}
          </div>
          <div className={`${classes.bar} bar`}></div>
          <div className={`${classes["bar-after"]} bar-after row`}>
            <div className={`col-6 ${classes["down-space"]} down-space`}>
              <label className={`${classes["control-label"]}`}>
                Customer Name
              </label>
              <div className="print-value">
                {props.previewData.customerId.name}
              </div>
            </div>
            <div className={`col-6 ${classes["down-space"]} down-space`}>
              <label className={`${classes["control-label"]}`}>
                Customer Mobile
              </label>
              <div className="print-value">
                {props.previewData.customerId.mobile}
              </div>
            </div>
            <div className={`col-6 ${classes["down-space"]} down-space`}>
              <label className={`${classes["control-label"]}`}>
                Customer Address
              </label>
              <div className="print-value">
                {props.previewData.customerId.address}
              </div>
            </div>
          </div>
        </div>
      </div>

      {modalAction}
    </Fragment>
  );

  return (
    <Modal onClose={props.onClose} big>
      {printPreviewModalContent}
    </Modal>
  );
};

export default PrintPreview;
