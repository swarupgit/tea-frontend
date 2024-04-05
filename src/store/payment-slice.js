import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import backend from "../axios";
import { Slide, toast } from "react-toastify";

const fetchUrl = `${process.env.REACT_APP_BACKEND_URL}/payments`;

const initState = {
  headers: [
    {
      field: "transactionDate",
      header: "Date",
      width: "10%",
      sortable: true,
      filter: true,
      dateParse: true,
    },
    {
      field: "payNo",
      header: "Ref No",
      width: "10%",
      sortable: true,
      filter: true,
    },
    {
      field: "name",
      header: "Name",
      width: "10%",
      sortable: true,
      filter: true,
    },
    {
      field: "payType",
      header: "Payment Type",
      width: "10%",
      sortable: false,
      filter: true,
    },
    {
      field: "payBy",
      header: "Mode",
      width: "10%",
      sortable: false,
      filter: false,
    },
    {
      field: "debitAmount",
      header: "Debit Amount",
      width: "15%",
      sortable: true,
    },
    {
      field: "creditAmount",
      header: "Credit Amount",
      width: "15%",
      sortable: true,
    },
    {
      field: "note",
      header: "Note",
      width: "15%",
      sortable: false,
    },
    {
      field: "",
      header: "Action",
      width: "10%",
      sortable: false,
      view: true,
    },
  ],
  payments: [],
  copyPayments: [],
  persons: [],
  invNo: `ATG${Date.now()}`,
};

export const addPayment = createAsyncThunk("payment/addUpdate", async (payload) => {
  try {
    console.log("pay", payload);
    return await backend.post(fetchUrl, payload);
  } catch (err) {
    return err.message;
  }
});

export const putPayment = createAsyncThunk("payment/Update", async (payload) => {
  try {
    console.log("pay", payload);
    const id = payload._id;
    delete payload._id;
    return await backend.patch(`${fetchUrl}/${id}`, payload);
  } catch (err) {
    return err.message;
  }
});

export const fetchPayment = createAsyncThunk("payment/all", async (payload) => {
  try {
    console.log("pay", JSON.stringify(payload));
    let param = "";
    if (payload) {
      if (payload.from) {
        param += `from=${payload.from}`;
      }
      if (payload.to) {
        param += `&to=${payload.to}`;
      }
      if (payload.name) {
        param += `&name=${payload.name}`;
      }
    }

    let res;
    if (payload) {
      res = await backend.get(`${fetchUrl}?${param}`);
    } else {
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
});

const paymentSlice = createSlice({
  name: "payment",
  initialState: { ...initState },
  reducers: {
    getBillingItems(state, action) {
      state.billingPayments = [...state.payments].filter((i) => i);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPayment.fulfilled, (state, action) => {
        let items = [];
        let persons = [];
        console.log("reducer response", action);
        if (action.payload.status === 200) {
          const data = action.payload.data.data.result;
          for (const key in data) {
            items.push({
              ...data[key],
              debitAmount: data[key].debitAmount > 0 ? parseFloat(data[key].debitAmount).toFixed(2) : '',
              creditAmount: data[key].creditAmount > 0 ? parseFloat(data[key].creditAmount).toFixed(2) : '',
            });
            if (!persons.includes(data[key].name)) {
              persons.push(data[key].name);
            }
          }
          state.payments = items;
          state.copyPayments = items;
          state.persons = persons;
          console.log(state.payments, 'payment fetched');
          state.invNo = `ATG${Date.now()}`;
        }
      })
      .addCase(addPayment.fulfilled, (state, action) => {
        console.log("calling");
        console.log(action.payload);
        if (action.payload.status !== 201) {
          toast.error(
            typeof action.payload === "string"
              ? action.payload
              : "Something went wrong",
            {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Slide,
            }
          );
          throw new Error(
            typeof action.payload === "string"
              ? action.payload
              : "Something went wrong"
          );
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
      })
      .addCase(putPayment.fulfilled, (state, action) => {
        console.log("calling");
        console.log(action.payload);
        if (action.payload.status !== 200) {
          toast.error(
            typeof action.payload === "string"
              ? action.payload
              : "Something went wrong",
            {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Slide,
            }
          );
          throw new Error(
            typeof action.payload === "string"
              ? action.payload
              : "Something went wrong"
          );
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

export const paymentHeaders = (state) => state.payment.headers;
export const allPayments = (state) => state.payment.payments;
export const invNo = (state) => state.payment.invNo;
export const billingPayments = (state) => state.payment.billingPayments;
export const persons = (state) => state.payment.persons;

export const paymentActions = paymentSlice.actions;

export default paymentSlice;
