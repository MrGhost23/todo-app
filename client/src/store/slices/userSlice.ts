import { LoginData } from '@/types/Login';
import { RegisterData } from '@/types/Register';
import { User } from '@/types/User';
import api from '@/utils/api';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  user: User | null;
  error: string | null;
  loading: boolean;
}

const initialState: UserState = { user: null, error: null, loading: false };

export const loginUser = createAsyncThunk(
    'user/login',
    async (loginData: LoginData, thunkAPI) => {
      try {
        const response = await api.post('/auth/login', loginData);
        const { access_token, user } = response.data;
        localStorage.setItem('userToken',access_token)
        return { access_token, user };
      } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );

export const registerUser = createAsyncThunk(
    'user/register',
    async (registerData: RegisterData, thunkAPI) => {
        try {
            const response = await api.post('/auth/register', registerData);
            const { access_token, user } = response.data;
            localStorage.setItem('userToken',access_token)
            return { access_token, user };
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload;
        },
        logout: (state) => {
          state.user = null;
          localStorage.removeItem('userToken');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
              console.log(action.payload)
                state.user = action.payload.user;
                state.loading = false;
                state.error = null;
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.user = null;
                state.error = action.payload as string;
                state.loading = false;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.error = null;
            })
            .addCase(registerUser.pending, (state) => {
              state.loading = true;
          })
            .addCase(registerUser.rejected, (state, action) => {
                state.user = null;
                state.error = action.payload as string;
            });
    },
});

export const { setUser, logout } = userSlice.actions;


export const selectUser = (state: { user: UserState }) => state.user.user;

export default userSlice.reducer;