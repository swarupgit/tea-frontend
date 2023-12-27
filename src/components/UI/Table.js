import { Fragment } from "react";
import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import classes from "./Table.module.css";

export default function Table(props) {
  const deleteIcon = (rowData, options) => {
    return (
      <button
        className={`${classes["small-button"]}`}
        type="button"
        onClick={() => deleteItem(rowData, options.frozenRow, options.rowIndex)}
      >
        Delete
      </button>
    );
  };

  const teleNo = (rowData, options) => {
    return (
      <a href={`tel:${rowData.mobile}`} className="tele-decoration-none">
        <i className="pi pi-mobile m-r-1-h"></i>
        {rowData.mobile}
      </a>
    );
  };

  const mailSend = (rowData, options) => {
    return (
      <a href={`mailto:${rowData.email}`}>
        {rowData.email && <i className="pi pi-envelope m-r-1-h"></i>}
        {rowData.email}
      </a>
    );
  };

  const deleteItem = (data, frozen, index) => {
    console.log(frozen);
    props.deleteItem(data, index);
  };
  const columns = props.columns.map((col, i) => {
    if (col.sortable && col.filter) {
      return (
        <Column
          key={col.field}
          field={col.field}
          header={col.header}
          style={{ width: `${col.width}` }}
          sortable
          filter
          filterPlaceholder={`Search by ${col.header}`}
        />
      );
    } else if (col.sortable) {
      return (
        <Column
          key={col.field}
          field={col.field}
          header={col.header}
          style={{ width: `${col.width}` }}
          sortable
        />
      );
    } else if (col.filter) {
      if (col.mobile) {
        return (
          <Column
            key={col.field}
            field={col.field}
            header={col.header}
            style={{ width: `${col.width}` }}
            filter
            filterPlaceholder={`Search by ${col.header}`}
            body={teleNo}
          />
        );
      } else if (col.email) {
        return (
          <Column
            key={col.field}
            field={col.field}
            header={col.header}
            style={{ width: `${col.width}` }}
            filter
            filterPlaceholder={`Search by ${col.header}`}
            body={mailSend}
          />
        );
      } else {
        return (
          <Column
            key={col.field}
            field={col.field}
            header={col.header}
            style={{ width: `${col.width}` }}
            filter
            filterPlaceholder={`Search by ${col.header}`}
          />
        );
      }
    } else if (col.delBody) {
      return <Column key={i} header={col.header} body={deleteIcon}></Column>;
    } else if (col.mobile) {
      return (
        <Column
          key={col.field}
          field={col.field}
          header={col.header}
          style={{ width: `${col.width}` }}
          filter
          filterPlaceholder={`Search by ${col.header}`}
          body={teleNo}
        />
      );
    } else if (col.email) {
      return (
        <Column
          key={col.field}
          field={col.field}
          header={col.header}
          style={{ width: `${col.width}` }}
          filter
          filterPlaceholder={`Search by ${col.header}`}
          body={mailSend}
        />
      );
    } else {
      return (
        <Column
          key={col.field}
          field={col.field}
          header={col.header}
          style={{ width: `${col.width}` }}
        />
      );
    }
  });
  return (
    <Fragment>
      <DataTable
        value={props.data}
        paginator={props.paginator ?? true}
        rows={props.rows ?? 5}
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        tableStyle={{ minWidth: "50rem" }}
        sortMode="multiple"
        filterDisplay={props.filter}
      >
        {columns.map((col, i) => {
          return col;
        })}
      </DataTable>
    </Fragment>
  );
}
