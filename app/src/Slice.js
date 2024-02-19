import { createSlice } from '@reduxjs/toolkit';

const stateSlice = createSlice({
  name: 'state',
  initialState: {
    // backendurl: 'http://localhost:5000',
    backendurl: '/JOB_SERVICES',
  },
  reducers: {
    setBackendUrl:(state,action)=>{
        state.backendurl=action.payload;
    }
  },
});

export const { setBackendUrl } = stateSlice.actions;
export default stateSlice.reducer;