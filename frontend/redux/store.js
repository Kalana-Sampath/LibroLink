import { configureStore } from '@reduxjs/toolkit';
import booksApi from './features/Books/booksApi'; // Adjust path
import {selfMotivationApi} from './features/Books/selfMotivationApi'; // Adjust path

const store = configureStore({
  reducer: {
    [booksApi.reducerPath]: booksApi.reducer,
    [selfMotivationApi.reducerPath]: selfMotivationApi.reducer, // Add this line
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApi.middleware, selfMotivationApi.middleware), // Add middleware for selfMotivationApi
});

export default store;
