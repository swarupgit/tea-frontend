import { Fragment, useRef } from "react";
import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import classes from "./Table.module.css";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";

export default function Table(props) {
  const [products, setProducts] = useState([]);
  const dt = useRef(null);
  useEffect(() => {
    setProducts(props.data);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const deleteIcon = (rowData, options) => {
    return (
      <button
        className={`p-button p-button-rounded p-button-danger p-button-icon-only`}
        type="button"
        onClick={() => deleteItem(rowData, options.frozenRow, options.rowIndex)}
      >
        <i className="pi pi-trash"></i>
      </button>
    );
  };

  const viewIcon = (rowData, options) => {
    return (
      <button
        className={`p-button p-button-rounded p-button-success p-button-icon-only`}
        type="button"
        onClick={() => openDetails(rowData, options.frozenRow, options.rowIndex)}
      >
        <i className="pi pi-eye"></i>
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

  const openDetails = (data, frozen, index) => {
    props.viewDetails(data, index);
  }

  const header = () => {
    if(!props.buttons || !props.buttons.length) {
      return;
    }
    return (
      <div className={`flex justify-content-end gap-2 ${classes['button-options']}`}>
        {props.buttons.map((bValue, bKey) => (
          <Fragment key={bKey}>
            {bValue.button === "csv" && bValue.option && (
              <Button
                type="button"
                icon="pi pi-file"
                rounded
                onClick={() => exportCSV(false)}
                data-pr-tooltip="CSV"
              />
            )}
            {bValue.button === "xlsx" && bValue.option && (
              <Button
                type="button"
                icon="pi pi-file-excel"
                severity="success"
                rounded
                onClick={exportExcel}
                data-pr-tooltip="XLS"
              />
            )}
            {bValue.button === "pdf" && bValue.option && (
              <Button
                type="button"
                icon="pi pi-file-pdf"
                severity="warning"
                rounded
                onClick={exportPdf}
                data-pr-tooltip="PDF"
              />
            )}
          </Fragment>
        ))}
      </div>
    );
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
    } else if (col.view) {
      return <Column key={i} header={col.header} body={viewIcon}></Column>;
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

  const exportColumns = columns.map((col) => ({
    title: col.header,
    dataKey: col.field,
  }));
  const exportCSV = (selectionOnly) => {
    dt.current.exportCSV({ selectionOnly });
  };

  const exportPdf = () => {
    import("jspdf").then((jsPDF) => {
      import("jspdf-autotable").then(() => {
        const doc = new jsPDF.default(0, 0);

        doc.autoTable(exportColumns, props.data);
        doc.save("invoices.pdf");
      });
    });
  };

  const exportExcel = () => {
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(props.data);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      saveAsExcelFile(excelBuffer, "invoices");
    });
  };

  const saveAsExcelFile = (buffer, fileName) => {
    import("file-saver").then((module) => {
      if (module && module.default) {
        let EXCEL_TYPE =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        let EXCEL_EXTENSION = ".xlsx";
        const data = new Blob([buffer], {
          type: EXCEL_TYPE,
        });

        module.default.saveAs(
          data,
          fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
        );
      }
    });
  };
  return (
    <Fragment>
      <DataTable
        value={props.data}
        header={header() ?? false}
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
