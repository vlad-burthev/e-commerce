import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const typeApi = createApi({
  reducerPath: "typeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL + "api/type",
  }),
  endpoints: (builder) => ({
    useGetTypes: builder.query({
      query: () => "",
    }),
  }),
});

export const { useUseGetTypesQuery } = typeApi;
