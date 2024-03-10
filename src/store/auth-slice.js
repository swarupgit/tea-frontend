import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Slide, toast } from "react-toastify";
import backend from "../axios";

const authUrl = `${process.env.REACT_APP_BACKEND_URL}/auth/login`;
const authorize = `${process.env.REACT_APP_BACKEND_URL}/auth/is-authorize`;
const updateProfileUrl = `${process.env.REACT_APP_BACKEND_URL}/users/update-profile`;
const updatePasswordUrl = `${process.env.REACT_APP_BACKEND_URL}/users/change-password`;
const addUserUrl = `${process.env.REACT_APP_BACKEND_URL}/users`;

export const login = createAsyncThunk("auth/login", async (payload) => {
  try {
    const response = await axios.post(authUrl, payload);
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
      const response = await axios.get(authorize, {
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

export const addUser = createAsyncThunk(
  "auth/add-user",
  async (payload) => {
    try {
      const response = await backend.post(addUserUrl, payload);
      if (response.status !== 201) {
        throw new Error("Something went wrong");
      }

      return response;
    } catch (err) {
      throw err.message;
    }
  }
);

export const updateProfile = createAsyncThunk(
  "auth/update-profile",
  async (payload) => {
    try {
      const response = await backend.post(updateProfileUrl, payload);
      if (response.status !== 200) {
        throw new Error("Something went wrong");
      }

      return response;
    } catch (err) {
      throw err.message;
    }
  }
);

export const updatePassword = createAsyncThunk(
  "auth/update-password",
  async (payload) => {
    try {
      const response = await backend.post(updatePasswordUrl, payload);
      if (response.status !== 200) {
        throw new Error("Something went wrong");
      }

      return response;
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
  loggedUser: {},
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
    setLoggedUser(state, action) {
      state.loggedUser = action.payload;
      localStorage.setItem("loggedUser", state.loggedUser);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.isAdmin = action.payload.data.result.role === "admin";
        state.canManage = state.manage.includes(
          action.payload.data.result.role
        );
        localStorage.setItem("loggedIn", state.isLoggedIn);
        localStorage.setItem("isAdmin", state.isAdmin);
        localStorage.setItem("canManage", state.canManage);
        state.loggedUser = JSON.stringify(
          action.payload.data.result?.user || []
        );
        localStorage.setItem(
          "loggedUser",
          JSON.stringify(action.payload.data.result?.user || [])
        );
        console.log("you are logged in");
      })
      .addCase(addUser.fulfilled, (state, action) => {
        console.log("after add", action.payload, action.payload.status);
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
        if (action.payload.data.data.result === null) {
          toast.error(action.payload.data.message, {
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
        } else {
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
        }
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        console.log("after update", action.payload, action.payload.status);
        state.loggedUser = JSON.stringify(
          action.payload.data.data.result || []
        );
        localStorage.setItem(
          "loggedUser",
          JSON.stringify(action.payload.data.data.result || [])
        );
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
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        console.log("after update", action.payload, action.payload.status);
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
        if (action.payload.data.data.result?.error === true) {
          toast.error(action.payload.data.message, {
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
        } else {
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
        }
      });
  },
});

export const isLoggedIn = (state) => state.auth.isLoggedIn;
export const token = (state) => state.auth.token;
export const type = (state) => state.auth.type;
export const isAdmin = (state) => state.auth.isAdmin;
export const canManage = (state) => state.auth.canManage;
export const loggedInUser = (state) => state.auth.loggedUser;

export const authActions = authSlice.actions;

export default authSlice;
