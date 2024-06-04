import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { API } from '../../API/API';
import { IGetMeResponse, IGetMeResponseData } from '../../Interfaces/responseTypes';

interface IinitialState {
  currentUser: IGetMeResponseData;
  isLoading: boolean;
}

const initialState: IinitialState = {
  currentUser: {},
  isLoading: false,
};

export const getMe = createAsyncThunk('currentUser', async () => {
  const response: IGetMeResponse = await API.get('/users/me', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('mm_access_token')}`,
    },
  });
  return response.data;
});

const authSlice = createSlice({
  name: 'calculate',
  initialState,
  reducers: {},
  extraReducers(builder: any) {
    builder.addCase(
      getMe.fulfilled,
      (state: any, action: PayloadAction<any>) => {
        state.currentUser = action.payload;
        state.isLoading = false;
      }
    );
    builder.addCase(getMe.pending, (state: any) => {
      state.isLoading = true;
    });
  },
});

export default authSlice.reducer;
