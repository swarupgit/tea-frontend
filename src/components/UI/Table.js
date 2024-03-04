import { Fragment, useRef } from "react";
import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import classes from "./Table.module.css";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";
import moment from "moment";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';

export default function Table(props) {
  const [products, setProducts] = useState([]);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const dt = useRef(null);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const toast = useRef(null);
  const sData = {};
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

  const editIcon = (rowData, options) => {
    return (
      <button
        className={`p-button p-button-rounded p-button-danger p-button-icon-only`}
        type="button"
        onClick={() => editItem(rowData, options.frozenRow, options.rowIndex)}
      >
        <i className="pi pi-pencil"></i>
      </button>
    );
  };

  const viewIcon = (rowData, options) => {
    return (
      <>
        {props.show && (
          <button
            className={`p-button p-button-rounded p-button-success p-button-icon-only ms-1`}
            type="button"
            onClick={() =>
              openDetails(rowData, options.frozenRow, options.rowIndex)
            }
          >
            <i className="pi pi-eye"></i>
          </button>
        )}
        {props.edit && (
          <button
            className={`p-button p-button-rounded p-button-info p-button-icon-only ms-1`}
            type="button"
            onClick={() =>
              editItem(rowData, options.frozenRow, options.rowIndex)
            }
          >
            <i className="pi pi-pencil"></i>
          </button>
        )}
        {props.delete && (
          <button
            className={`p-button p-button-rounded p-button-danger p-button-icon-only ms-1`}
            type="button"
            onClick={() =>
              deleteItem(rowData, options.frozenRow, options.rowIndex)
            }
          >
            <i className="pi pi-trash"></i>
          </button>
        )}
      </>
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
  const formattedDate = (rowData, options) => {
    return (
      rowData ? (
      <span>
        <span className="d-none">
          {moment(rowData.transactionDate ?? rowData.createdAt).format(
            "YYYYMMDD"
          )}
        </span>
        {moment(rowData.transactionDate ?? rowData.createdAt).format(
          "DD/MM/YYYY"
        )}
      </span>
      ) : ''
    );
  };

  const accept = () => {
    console.log(sData, "print");
    props.deleteItem(sData);  
    toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
  }

  const reject = () => {
    toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
  }


  const deleteItem = (data, frozen, index) => {
    sData = {...data};
    confirmDialog({
        message: 'Do you want to delete this record?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        defaultFocus: 'reject',
        acceptClassName: 'p-button-danger',
        accept,
        reject
    });
  };

  const editItem = (data, frozen, index) => {
    console.log(frozen);
    props.editItem(data, index);
  };

  const openDetails = (data, frozen, index) => {
    props.viewDetails(data, index);
  };

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const header = () => {
    if (!props.buttons || !props.buttons.length) {
      return;
    }
    return (
      <div
        className={`flex justify-content-end gap-2 ${classes["button-options"]}`}
      >
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          {props.buttons.map((bValue, bKey) => (
            <div key={bKey}>
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
            </div>
          ))}
        </div>
        <span className="p-input-icon-left" style={{ marginTop: "10px" }}>
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Keyword Search"
          />
        </span>
      </div>
    );
  };

  const exportColumns = [...props.columns]
    .map((col) => ({
      title: col.header,
      dataKey: col.field,
    }))
    .filter((i) => i.dataKey);
  const columns = props.columns.map((col, i) => {
    if (col.sortable && col.filter) {
      if (col.dateParse) {
        return (
          <Column
            key={col.field}
            field={col.field}
            header={col.header}
            style={{ width: `${col.width}` }}
            // filter
            sortable
            filterPlaceholder={`Search by ${col.header}`}
            body={formattedDate}
          />
        );
      } else {
        return (
          <Column
            key={col.field}
            field={col.field}
            header={col.header}
            style={{ width: `${col.width}` }}
            sortable
            // filter
            filterPlaceholder={`Search by ${col.header}`}
          />
        );
      }
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
            // filter
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
            // filter
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
            // filter
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
          // filter
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
          // filter
          filterPlaceholder={`Search by ${col.header}`}
          body={mailSend}
        />
      );
    } else if (col.dateParse) {
      return (
        <Column
          key={col.field}
          field={col.field}
          header={col.header}
          style={{ width: `${col.width}` }}
          // filter
          filterPlaceholder={`Search by ${col.header}`}
          body={formattedDate}
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

  const exportCSV = (selectionOnly) => {
    dt.current.exportCSV({ selectionOnly });
  };

  const exportPdf = () => {
    import("jspdf").then((jsPDF) => {
      import("jspdf-autotable").then(() => {
        const doc = new jsPDF.default({ orientation: "l" }, 0, 0);
        const otherCol = [
          {
            title: "VCH No",
            dataKey: "vchNo",
          },
          {
            title: "CL No",
            dataKey: "clNo",
          },
        ];
        const pdfColumn = [...exportColumns];
        pdfColumn.splice(6, 0, ...otherCol);
        const totalNetLeaf = props.data.reduce((carry, item) => {
          return item.netLeafKgs ? carry + parseFloat(item.netLeafKgs) : carry + 0;
        }, 0).toFixed(2);
        const totalDebitAmount = props.data
          .reduce((carry, item) => {
            return item.debitAmount > 0 ? carry + parseFloat(item.debitAmount) : carry + 0;
          }, 0)
          .toFixed(2);
        const totalCreditAmount = props.data
          .reduce((carry, item) => {
            return item.creditAmount > 0 ? carry + parseFloat(item.creditAmount) : carry + 0;
          }, 0)
          .toFixed(2);
        const final = {
          transactionDate: '',
          invoiceNo: 'Total',
          type: '',
          netLeafKgs: totalNetLeaf,
          rateKg: '',
          "customerId.name": '',
          debitAmount: totalDebitAmount,
          creditAmount: totalCreditAmount,
          vchNo: '',
          clNo: '',
          qlty: '',
          note: `Outstanding: ${totalCreditAmount - totalDebitAmount}`,          
        };

        const pdfData = props.data
          .map((d) => ({
            transactionDate: moment(d.transactionDate).format("DD/MM/YYYY"),
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
          [...pdfData, ...final]
        );
        doc.save("invoices.pdf");
      });
    });
  };

  const exportExcel = () => {
    import("xlsx").then((xlsx) => {
      const totalNetLeaf = props.data.reduce((carry, item) => {
          return item.netLeafKgs ? carry + parseFloat(item.netLeafKgs) : carry + 0;
        }, 0).toFixed(2);
        const totalDebitAmount = props.data
          .reduce((carry, item) => {
            return item.debitAmount > 0 ? carry + parseFloat(item.debitAmount) : carry + 0;
          }, 0)
          .toFixed(2);
        const totalCreditAmount = props.data
          .reduce((carry, item) => {
            return item.creditAmount > 0 ? carry + parseFloat(item.creditAmount) : carry + 0;
          }, 0)
          .toFixed(2);
        const final = {
          transactionDate: '',
          invoiceNo: 'Total',
          type: '',
          netLeafKgs: totalNetLeaf,
          rateKg: '',
          "customerId.name": '',
          debitAmount: totalDebitAmount,
          creditAmount: totalCreditAmount,
          vchNo: '',
          clNo: '',
          qlty: '',
          note: `Outstanding: ${totalCreditAmount - totalDebitAmount}`,          
        };
      const xlData = props.data.map((d) => ({
          Date: moment(d.transactionDate).format("DD/MM/YYYY"),
          "Invoice No": d.invoiceNo,
          Type: d.type,
          "Customer Name": d.customerId.name,
          "Vch no": d.vchNo,
          "Cl no": d.clNo,
          "Qlty(%)": d.qlty,
          "Net Leaf KGS": d.netLeafKgs,
          "Rate/KG": d.rateKg > 0 ? parseFloat(d.rateKg).toFixed(2) : d.rateKg,
          "Debit Amount":
            d.debitAmount > 0
              ? parseFloat(d.debitAmount).toFixed(2)
              : d.debitAmount,
          "Credit Amount":
            d.creditAmount > 0
              ? parseFloat(d.creditAmount).toFixed(2)
              : deleteIcon.creditAmount,
          Note: d.note,
        }));
      const worksheet = xlsx.utils.json_to_sheet(
        [...xlData, ...final]
      );
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
      <Toast ref={toast} />
      <ConfirmDialog />
      <DataTable
        ref={dt}
        value={props.data}
        header={header() ?? false}
        paginator={props.paginator ?? true}
        rows={props.rows ?? 10}
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        tableStyle={{ minWidth: "50rem" }}
        sortMode="multiple"
        // filterDisplay={props.filter}
        filters={filters}
      >
        {columns.map((col, i) => {
          return col;
        })}
      </DataTable>
    </Fragment>
  );
}
