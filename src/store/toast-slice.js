import { createSlice } from "@reduxjs/toolkit";
import { Slide, toast } from "react-toastify";

const toastSlice = createSlice({
  name: "toast",
  initialState: {},
  reducers: {
    toastSuccess(state, action) {
      const payload = action.payload;
      toast.success(payload.message, {
        position: "top-center",
        autoClose: payload?.time || 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: payload?.theme || "colored",
        transition: Slide,
      });
    },
    toastError(state, action) {
      const payload = action.payload;
      toast.error(payload.message, {
        position: "top-center",
        autoClose: payload?.time || 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: payload?.theme || "colored",
        transition: Slide,
      });
    },
    toastWarning(state, action) {
      const payload = action.payload;
      toast.warning(payload.message, {
        position: "top-center",
        autoClose: payload?.time || 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: payload?.theme || "colored",
        transition: Slide,
      });
    },
    toastInfo(state, action) {
      const payload = action.payload;
      toast.info(payload.message, {
        position: "top-center",
        autoClose: payload?.time || 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: payload?.theme || "colored",
        transition: Slide,
      });
    },
  },
  extraReducers(builder) {},
});

export const toastActions = toastSlice.actions;

export default toastSlice;
