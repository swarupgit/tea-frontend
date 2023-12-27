import { Fragment } from "react";
import React, { useState, useEffect } from "react";
import Table from "../components/UI/Table";
import { useSelector } from "react-redux";
import { orderHeaders } from "../store/order-slice";

export default function Order() {
  const columns = useSelector(orderHeaders);
  const [tableData, setTableData] = useState([]);

  const loadTable = async () => {};
  useEffect(() => {
    loadTable();
  });

  return (
    <Fragment>
      <div className={`card overlay`}>
        <div className="card-header">Order List</div>
        <Table data={tableData} columns={columns} filter="row"/>
      </div>
    </Fragment>
  );
}
