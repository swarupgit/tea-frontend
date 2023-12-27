import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import backend from "../axios";
import { Slide, toast } from "react-toastify";

const fetchUrl = `${process.env.REACT_APP_BACKEND_URL}/order`;

const initState = {
  headers: [
    {
      field: "createdAt",
      header: "Date",
      width: "15%",
      sortable: true,
      filter: true,
    },
    {
      field: "invoiceNo",
      header: "Invoice No",
      width: "15%",
      sortable: false,
      filter: true,
    },
    {
      field: "netLeafKgs",
      header: "Net Leaf Kgs",
      width: "10%",
      sortable: false,
    },
    {
      field: "rateKg",
      header: "Rate/KG",
      width: "10%",
      sortable: false,
    },
    {
      field: "customer.name",
      header: "Customer Name",
      width: "15%",
      sortable: true,
      filter: true,
    },
    {
      field: "debitAmount",
      header: "Debit Amount",
      width: "12%",
      sortable: false,
    },
    {
      field: "creditAmount",
      header: "Credit Amount",
      width: "12%",
      sortable: false,
    },
    {
      field: "",
      header: "Action",
      width: "11%",
      sortable: false,
    },
  ],
  orders: [],
  copyOrders: [],
};

export const addOrder = createAsyncThunk("order/addUpdate", async (payload) => {
  try {
    console.log("pay", payload);
    return await backend.post(fetchUrl, payload);
  } catch (err) {
    return err.message;
  }
});

export const fetchOrder = createAsyncThunk(
  "order/all",
  async (payload) => {
    try {
      console.log("pay", payload);

      const res = await backend.get(fetchUrl);
      if (res.status !== 200) {
        throw new Error("Something went wrong");
      }

      console.log("fetch", res, res.data.data);
      return res;
    } catch (err) {
      return err;
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: { ...initState },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOrder.fulfilled, (state, action) => {
        let items = [];
        console.log("reducer response", action);
        if (action.payload.status === 200) {
          const data = action.payload.data.data.result;
          for (const key in data) {
            items.push({
              ...data[key]
            });
          }
          state.orders = items;
          state.copyOrders = items;
          console.log(state.orders);
        }
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        console.log("calling");
        console.log(action.payload);
        if (action.payload.status !== 201) {
          toast.error(typeof action.payload === 'string' ? action.payload : "Something went wrong", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Slide,
          });
          throw new Error(typeof action.payload === 'string' ? action.payload : "Something went wrong");
        }
        toast.success(action.payload.data.message, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Slide,
        });
      });
  },
});

export const orderHeaders = (state) => state.order.headers;
export const allOrders = (state) => state.order.orders;

export const orderActions = orderSlice.actions;

export default orderSlice;
