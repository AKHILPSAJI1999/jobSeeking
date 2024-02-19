import { configureStore } from '@reduxjs/toolkit';
import Slice from './Slice';

const store = configureStore({
  reducer: {
    state: Slice,
  },
});

export default store;
