import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const selfMotivationApi = createApi({
  reducerPath: 'selfMotivationApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://192.168.8.157:5001' }),
  endpoints: (builder) => ({
    fetchSelfMotivationBooks: builder.query({
      query: () => '/selfmotivationbooks',
    }),
  }),
});

export const { useFetchSelfMotivationBooksQuery } = selfMotivationApi;
