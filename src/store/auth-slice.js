import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import backend from "axios";

const authUrl = `${process.env.REACT_APP_BACKEND_URL}/auth/login`;
const authorize = `${process.env.REACT_APP_BACKEND_URL}/auth/is-authorize`;

export const login = createAsyncThunk("auth/login", async (payload) => {
  try {
    const response = await backend.post(authUrl, payload);
    if (response.status !== 200) {
      throw new Error("Something went wrong");
    }

    return response.data;
  } catch (err) {
    throw err.message;
  }
});

export const isAuthorize = createAsyncThunk(
  "auth/is-authorize",
  async (payload) => {
    try {
      const response = await backend.get(authorize, {
        headers: { Authorization: `Bearer ${payload.token}` },
      });
      if (response.status !== 200) {
        throw new Error("Something went wrong");
      }

      return true;
    } catch (err) {
      throw err.message;
    }
  }
);

const initState = {
  isLoggedIn: false,
  token: null,
  type: null,
  isAdmin: false,
  canManage: false,
  manage: ["admin", "manager"],
};

const authSlice = createSlice({
  name: "auth",
  initialState: { ...initState },
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      localStorage.setItem("token", JSON.stringify(state.token));
    },
    setType(state, action) {
      state.type = action.payload;
      localStorage.setItem("type", state.type);
    },
    setLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
      localStorage.setItem("loggedIn", state.isLoggedIn);
    },
    resetAuth(state, action) {
      state.token = initState.token;
      state.isLoggedIn = initState.isLoggedIn;
      state.type = initState.type;
      state.isAdmin = initState.isAdmin;
      state.canManage = initState.canManage;
    },
    setIsAdmin(state, action) {
      state.isAdmin = action.payload;
      localStorage.setItem("isAdmin", state.isAdmin);
    },
    setCanManage(state, action) {
      state.canManage = action.payload;
      localStorage.setItem("canManage", state.canManage);
    },
  },
  extraReducers(builder) {
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.isAdmin = action.payload.data.result.role === "admin";
      state.canManage = state.manage.includes(action.payload.data.result.role);
      localStorage.setItem("loggedIn", state.isLoggedIn);
      localStorage.setItem("isAdmin", state.isAdmin);
      localStorage.setItem("canManage", state.canManage);
      console.log("you are logged in");
    });
  },
});

export const isLoggedIn = (state) => state.auth.isLoggedIn;
export const token = (state) => state.auth.token;
export const type = (state) => state.auth.type;
export const isAdmin = (state) => state.auth.isAdmin;
export const canManage = (state) => state.auth.canManage;

export const authActions = authSlice.actions;

export default authSlice;
