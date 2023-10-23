import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const brandApi = createApi({
  reducerPath: "brandApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL + "api/brand",
  }),
  endpoints: (builder) => ({
    getBrands: builder.query({
      query: () => "",
    }),
    addBrand: builder.mutation({
      query: ({ name }) => ({
        url: "",
        method: "POST",
        body: { name },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    }),
    deleteBrand: builder.mutation({
      query: ({ id }) => ({
        url: `/${id}`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    }),
  }),
});

export const {
  useGetBrandsQuery,
  useAddBrandMutation,
  useDeleteBrandMutation,
} = brandApi;
