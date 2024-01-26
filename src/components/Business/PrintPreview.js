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
  useEffect(() => {
  }, [])

  const modalAction = (
    <div className={`${classes.actions} ${classes["m-t-1"]}`}>
      <button className={classes.default} type="button" onClick={props.onClose}>
        Close
      </button>
        <button
          className={classes.button}
          type="button"
        >
          Print
        </button>
    </div>
  );

  const printPreviewModalContent = (
    <Fragment>
      <h3 className={classes.heading}>Invoice Details</h3>
        <div className={`card ${classes["m-t-1"]}`}>
          {/* <div className="card-header">Customer Details</div> */}
          <div className={` ${classes["p-1"]} card-body`}>
            <div className="row">
              <div className={`col-md-6 ${classes['down-space']}`}>
                <label className={`${classes['control-label']}`}>Invoice Number</label>
                <div className="print-value">{props.previewData.invoiceNo}</div>
              </div>
              <div className={`col-md-6 ${classes['down-space']}`}>
                <label className={`${classes['control-label']}`}>Invoice Date</label>
                <div className="print-value">{moment(props.previewData.createdAt).format('LLLL')}</div>
              </div>
              <div className={`col-md-6 ${classes['down-space']}`}>
                <label className={`${classes['control-label']}`}>Type</label>
                <div className="print-value">{props.previewData.type}</div>
              </div>
              <div className={`col-md-6 ${classes['down-space']}`}>
                <label className={`${classes['control-label']}`}>Net Leaf KGs</label>
                <div className="print-value">{props.previewData.netLeafKgs}</div>
              </div>
              <div className={`col-md-6 ${classes['down-space']}`}>
                <label className={`${classes['control-label']}`}>Rate/KG</label>
                <div className="print-value">{props.previewData.rateKg}</div>
              </div>
              <div className={`col-md-6 ${classes['down-space']}`}>
                <label className={`${classes['control-label']}`}>Qlty</label>
                <div className="print-value">{props.previewData.qlty}</div>
              </div>
              <div className={`col-md-6 ${classes['down-space']}`}>
                <label className={`${classes['control-label']}`}>CL No</label>
                <div className="print-value">{props.previewData.clNo}</div>
              </div>
              <div className={`col-md-6 ${classes['down-space']}`}>
                <label className={`${classes['control-label']}`}>VCH No</label>
                <div className="print-value">{props.previewData.vchNo}</div>
              </div>
              <div className={`col-md-6 ${classes['down-space']}`}>
                <label className={`${classes['control-label']}`}>Note</label>
                <div className="print-value">{props.previewData.note}</div>
              </div>
            </div>
            <div className={`${classes.bar}`}></div>
            <div className={`${classes['bar-after']} row`}>
              <div className={`col-md-6 ${classes['down-space']}`}>
                <label className={`${classes['control-label']}`}>Customer Name</label>
                <div className="print-value">{props.previewData.customerId.name}</div>
              </div>
              <div className={`col-md-6 ${classes['down-space']}`}>
                <label className={`${classes['control-label']}`}>Customer Mobile</label>
                <div className="print-value">{props.previewData.customerId.mobile}</div>
              </div>
              <div className={`col-md-6 ${classes['down-space']}`}>
                <label className={`${classes['control-label']}`}>Customer Address</label>
                <div className="print-value">{props.previewData.customerId.address}</div>
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
