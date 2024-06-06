import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  token:
    localStorage.getItem("token") || sessionStorage.getItem("token") || null,
  email: localStorage.getItem("email") || "",
  status: "idle",
  error: null,
  rememberMe: false,
};

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password, rememberMe }, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/user/login",
        { email, password }
      );
      if (rememberMe) {
        localStorage.setItem("token", response.data.body.token);
        localStorage.setItem("email", email);
        localStorage.setItem("user", JSON.stringify(response.data.body.user));
      } else {
        sessionStorage.setItem("token", response.data.body.token);
        sessionStorage.setItem("user", JSON.stringify(response.data.body.user));
      }
      return {
        token: response.data.body.token,
        user: response.data.body.user,
        email,
        rememberMe,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchProfile = createAsyncThunk(
  "user/fetchProfile",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/user/profile",
        {},
        {
          headers: {
            Authorization: `Bearer ${state.user.token}`,
          },
        }
      );
      return response.data.body;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser(state) {
      state.user = null;
      state.token = null;
      state.email = "";
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("user");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.email = action.payload.email;
        state.rememberMe = action.payload.rememberMe;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      })
      .addCase(fetchProfile.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      });
  },
});

export const { clearUser } = userSlice.actions;

export default userSlice.reducer;
