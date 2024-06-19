import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
  userName: "",
  firstName: "",
  lastName: "",
  status: "idle",
  error: null,
  rememberMe: false,
};

export const login = createAsyncThunk(
  "user/login",
  async ({ email, password, rememberMe }, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/user/login",
        { email, password }
      );
      const data = response.data;
      if (data.body.token) {
        localStorage.setItem("token", data.body.token);
        if (rememberMe) {
          localStorage.setItem("rememberMe", "true");
        } else {
          localStorage.removeItem("rememberMe");
        }
        return { ...data.body, rememberMe };
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchProfile = createAsyncThunk(
  "user/fetchProfile",
  async (_, thunkAPI) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return thunkAPI.rejectWithValue({ message: "No token" });
    }
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/user/profile",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.body;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateUserName = createAsyncThunk(
  "user/updateUserName",
  async (newUserName, thunkAPI) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return thunkAPI.rejectWithValue({ message: "No token" });
    }
    try {
      const response = await axios.put(
        "http://localhost:3001/api/v1/user/profile",
        { userName: newUserName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
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
      state.userName = "";
      state.firstName = "";
      state.lastName = "";
      state.status = "idle";
      state.error = null;
      state.rememberMe = false;
      const rememberMe = localStorage.getItem("rememberMe");
      if (!rememberMe) {
        localStorage.removeItem("token");
      }
    },
    setRememberMe(state, action) {
      state.rememberMe = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        state.rememberMe = action.payload.rememberMe;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      })
      .addCase(fetchProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.userName = action.payload.userName;
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
        state.error = null;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      })
      .addCase(updateUserName.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserName.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userName = action.payload.userName;
      })
      .addCase(updateUserName.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      });
  },
});

export const { clearUser, setRememberMe } = userSlice.actions;

export default userSlice.reducer;
