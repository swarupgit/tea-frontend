import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import backend from "../axios";
import { Slide, toast } from "react-toastify";

const fetchUrl = `${process.env.REACT_APP_BACKEND_URL}/customer`;

const initState = {
  headers: [
    {
      field: "createdAt",
      header: "Created Date",
      width: "25%",
      sortable: true,
      filter: true,
    },
    {
      field: "name",
      header: "Customer Name",
      width: "20%",
      filter: true,
    },
    {
      field: "mobile",
      header: "Mobile",
      width: "15%",
      filter: true,
      mobile: true,
    },
    {
      field: "email",
      header: "Email",
      width: "25%",
      filter: true,
      email: true
    },
    {
      field: "",
      header: "Action",
      width: "15%",
      view: true,
    },
  ],
  customers: [],
  copyCustomers: []
};

export const addCustomer = createAsyncThunk("customer/add", async (payload) => {
  try {
    console.log("pay", payload);

    return await backend.post(fetchUrl, payload);
  } catch (err) {
    return err.message;
  }
});

export const putCustomer = createAsyncThunk("customer/update", async (payload) => {
  try {
    console.log("pay", payload);
    const id = payload.id;
    delete payload.id;
    return await backend.patch(`${fetchUrl}/${id}`, payload);
  } catch (err) {
    return err.message;
  }
});

export const delCustomer = createAsyncThunk("customer/delete", async (payload) => {
  try {
    console.log("pay", payload);
    return await backend.delete(`${fetchUrl}/${payload}`);
  } catch (err) {
    return err.message;
  }
});

export const fetchCustomer = createAsyncThunk(
  "customer/all",
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

const quoteSlice = createSlice({
  name: "quote",
  initialState: { ...initState },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCustomer.fulfilled, (state, action) => {
        let items = [];
        console.log("reducer response", action);
        if (action.payload.status === 200) {
          const data = action.payload.data.data.result;
          for (const key in data) {
            items.push({
              id: data[key]._id,
              name: data[key].name,
              email: data[key].email,
              mobile: data[key].mobile,
              address: data[key].address,
              createdAt: data[key].createdAt,
            });
          }
          state.customers = items;
          state.copyCustomers = items;
          console.log(state.customers);
        }
      })
      .addCase(addCustomer.fulfilled, (state, action) => {
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
      })
      .addCase(putCustomer.fulfilled, (state, action) => {
        console.log("calling");
        console.log(action.payload);
        if (action.payload.status !== 200) {
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
      })
      .addCase(delCustomer.fulfilled, (state, action) => {
        console.log("calling");
        console.log(action.payload);
        if (action.payload.status !== 200) {
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

export const quoteHeaders = (state) => state.quote.headers;
export const allCustomers = (state) => state.quote.customers;

export const quoteActions = quoteSlice.actions;

export default quoteSlice;
