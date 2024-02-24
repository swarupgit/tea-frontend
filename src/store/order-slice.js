import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import backend from "../axios";
import { Slide, toast } from "react-toastify";

const fetchUrl = `${process.env.REACT_APP_BACKEND_URL}/orders`;

const initState = {
  headers: [
    {
      field: "createdAt",
      header: "Date",
      width: "15%",
      sortable: true,
      filter: true,
      dateParse: true
    },
    {
      field: "invoiceNo",
      header: "Invoice No",
      width: "10%",
      sortable: true,
      filter: true,
    },
    {
      field: "type",
      header: "Type",
      width: "10%",
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
      field: "customerId.name",
      header: "Customer Name",
      width: "13%",
      sortable: true,
      filter: true,
    },
    {
      field: "debitAmount",
      header: "Debit Amount",
      width: "10%",
      sortable: true,
    },
    {
      field: "creditAmount",
      header: "Credit Amount",
      width: "10%",
      sortable: true,
    },
    {
      field: "",
      header: "Action",
      width: "11%",
      sortable: false,
      view: true,
    },
  ],
  orders: [],
  copyOrders: [],
  billingOrders: [],
  invNo: `ATG${new Date().toLocaleDateString().replaceAll('/', '').replaceAll('-', '')}-1`,
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
      console.log("pay", JSON.stringify(payload));
      let param = '';
      if(payload) {
        if(payload.from) {
          param += `from=${payload.from}`;
        }
        if(payload.to) {
          param += `&to=${payload.to}`;
        }
        if(payload.customer) {
          param += `&customer=${payload.customer.id}`;
        }
      }
     
      let res;
      if(payload) {
        res = await backend.get(`${fetchUrl}?${param}`)
      }
      else {
        res = await backend.get(fetchUrl);
      }

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
  reducers: {
    getBillingItems(state, action) {
      state.billingOrders = [...state.orders].filter(i => i);
    }
  },
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
          state.invNo = `ATG${new Date().toLocaleDateString().replaceAll('/', '').replaceAll('-', '')}-${++items.length}`
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
export const invNo = (state) => state.order.invNo;
export const billingOrders = (state) => state.order.billingOrders;

export const orderActions = orderSlice.actions;

export default orderSlice;
