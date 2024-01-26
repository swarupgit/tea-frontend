import { Fragment } from "react";
import React, { useState, useEffect } from "react";
import Table from "../components/UI/Table";
import { useDispatch, useSelector } from "react-redux";
import { allOrders, fetchOrder, orderHeaders } from "../store/order-slice";
import PrintPreview from "../components/Business/PrintPreview";

export default function Order() {
  const columns = useSelector(orderHeaders);
  const [tableData, setTableData] = useState([]);
  const orders = useSelector(allOrders);
  const [preview, setPreview] = useState(false);
  const [previewData, setPreviewData] = useState({});
  

  const dispatch = useDispatch();

  const loadTable = async () => {};
  useEffect(() => {
    loadTable();
    dispatch(fetchOrder());
  }, []);

  const viewDetails = (data, index) => {
    console.log(data)
    setPreview(true);
    setPreviewData(data);
  }

  const closePreview = () => {
    setPreview(false);
    setPreviewData({});
  }

  return (
    <Fragment>
      <div className={`card overlay`}>
        <div className="card-header">Order List</div>
        {preview && <PrintPreview onClose={closePreview} previewData={previewData}/>}
        <Table data={orders} columns={columns} buttons={[{button:'xlsx', option:true}]} filter="row" viewDetails={viewDetails}/>
      </div>
    </Fragment>
  );
}
