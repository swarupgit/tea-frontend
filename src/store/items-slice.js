import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import backend from "../axios";
import { Slide, toast } from "react-toastify";

const URL = "https://carworld-eb9a6-default-rtdb.firebaseio.com/products";

const fetchUrl = `${process.env.REACT_APP_BACKEND_URL}/products`;
// const addProduct = `${process.env.REACT_APP_BACKEND_URL}/products/`;

export const fetchItems = createAsyncThunk(
  "items/fetchItems",
  async (payload) => {
    try {
      // const response = await fetch(URL + '.json');
      // if(!response.ok) {
      //     throw new Error('Something went wrong');
      // }
      //     const responseData = await response.json();
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

export const addItem = createAsyncThunk("items/addItem", async (payload) => {
  try {
    // const response = await fetch(URL + ".json", {
    //   method: "POST",
    //   body: JSON.stringify(payload),
    // });
    // if (!response.ok) {
    //   throw new Error("Something went wrong");
    // }
    // const responseData = await response.json();

    // return responseData;
    console.log("pay", payload);

    return await backend.post(fetchUrl, payload);
  } catch (err) {
    return err.message;
  }
});

const itemsSlice = createSlice({
  name: "items",
  initialState: {
    items: [],
    copyItems: [],
    status: "idle",
    totalItems: 0,
    itemCode: 0,
  },
  reducers: {
    searchItems(state, action) {
      const string = action.payload;
      console.log("searching", string);
      state.items = state.copyItems.filter((item) => {
        return (
          item.name.toUpperCase().includes(string.toUpperCase()) ||
          item.part_no.toUpperCase().includes(string.toUpperCase())
        );
      });
    },
    findExistsItem(state, action) {
      const { code, price, part_no } = action.payload;
      return state.items.find(
        (i) => i.part_no === part_no && i.price === price && i.code === code
      );
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchItems.fulfilled, (state, action) => {
        let items = [];
        console.log("reducer response", action);
        if (action.payload.status === 200) {
          const data = action.payload.data.data.result;
          for (const key in data) {
            items.push({
              id: data[key]._id,
              code: data[key].code,
              name: data[key].name,
              stock: data[key].stock,
              part_no: data[key].part_no,
              price: parseFloat(data[key].price),
              location: data[key].location,
              canSell: data[key].stock >= 1,
            });
          }
          state.items = items;
          state.copyItems = items;
          console.log(state.items);
          state.totalItems = state.items.length;
          state.itemCode = "CS" + ++state.totalItems;
          console.log(state.itemCode);
          state.status = "succeed";
        }
      })
      .addCase(addItem.fulfilled, (state, action) => {
        console.log("calling");
        console.log(action.payload);
        if (action.payload.status !== 201) {
          toast.error("Something went wrong", {
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
          throw new Error("Something went wrong");
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

export const getAllItems = (state) => state.items.items;
export const totalItems = (state) => state.items.totalItems;
export const code = (state) => state.items.itemCode;
export const status = (state) => state.items.status;

export const findItem = (state, payload) =>
  state.items.find(
    (i) =>
      i.part_no === payload.part_no &&
      i.price === payload.price &&
      i.code === payload.code
  );

export const itemsActions = itemsSlice.actions;

export default itemsSlice;
