import { Fragment } from "react";
import React, { useState, useEffect } from "react";
import Table from "../components/UI/Table";
import { useSelector } from "react-redux";
import { stockHeaders } from "../store/stock-slice";

export default function Stock() {
  const columns = useSelector(stockHeaders);
  const [customers, setCustomers] = useState([]);

  return (
    <Fragment>
      <div className={`card overlay`}>
        <div className="card-header">Stock Entry List</div>
        <Table data={customers} columns={columns} filter="row"/>
      </div>
    </Fragment>
  );
}
