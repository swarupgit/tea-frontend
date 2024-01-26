import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import backend from "../axios";
import { Slide, toast } from "react-toastify";

const initState = {
  headers: [
    {
      field: "createdAt",
      header: "Entry Date",
      width: "10%",
      sortable: true,
      filter: true,
    },
    {
      field: "invoiceNo",
      header: "Invoice No",
      width: "10%",
      filter: true,
    },
    {
      field: "purchaseFrom",
      header: "Purchase From",
      width: "10%",
      filter: true,
    },
    {
      field: "productName",
      header: "Product Name",
      width: "15%",
      filter: true,
    },
    {
      field: "productQty",
      header: "Quantity",
      width: "5%",
    },
    {
      field: "productPrice",
      header: "Unit Price",
      width: "10%",
      filter: true,
    },
    {
      field: "productPartNo",
      header: "Part No",
      width: "10%",
      filter: true,
    },
    {
      field: "productCategory",
      header: "Category",
      width: "10%",
      filter: true,
    },
    {
      field: "description",
      header: "Description",
      width: "10%",
    },
    {
      field: "",
      header: "Action",
      width: "10%",
    },
  ],
};

const stockSlice = createSlice({
  name: "stock",
  initialState: { ...initState },
  reducers: {},
  extraReducers(builder) {},
});

export const stockHeaders = (state) => state.stock.headers;

export const stockActions = stockSlice.actions;

export default stockSlice;
