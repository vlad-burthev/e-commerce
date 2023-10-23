import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL + "api/user/",
  }),
  endpoints: (build) => ({
    login: build.mutation({
      query: ({ email, password }) => ({
        url: "login",
        method: "POST",
        body: { email, password },
      }),
    }),
    signUp: build.mutation({
      query: ({ email, password }) => ({
        url: "signup",
        method: "POST",
        body: { email, password },
      }),
    }),
    check: build.query({
      query: (token) => ({
        url: "auth",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const { useLoginMutation, useCheckQuery, useSignUpMutation } = userApi;
