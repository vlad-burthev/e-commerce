import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface I_GetAllDevices {
  limit?: number;
  page?: number;
}

export const deviceApi = createApi({
  reducerPath: "deviceApi",
  tagTypes: ["Devices", "Device"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL + "api/",
  }),
  endpoints: (builder) => ({
    getAllDevices: builder.query({
      query: () => "device",
      providesTags: (result) =>
        result
          ? [
              ...result.rows.map(
                ({ id }: any) => ({ type: "Devices", id } as const)
              ),
              { type: "Devices", id: "LIST" },
            ]
          : [{ type: "Devices", id: "LIST" }],
    }),
    getDeviceBySlug: builder.query({
      query: (slug) => `device/${slug}`,
      providesTags: (result) => [{ type: "Device", id: result?.id }],
    }),
    addRate: builder.mutation({
      query: ({ deviceId, mark, token }) => ({
        url: "rating",
        method: "POST",
        body: { deviceId, mark },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Device", "Devices"],
    }),
    createDevice: builder.mutation({
      query: (device) => ({
        url: "device",
        method: "POST",
        body: device,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    }),
    deleteDevice: builder.mutation({
      query: (slug: string) => ({
        url: `device/${slug}`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    }),
  }),
});

export const {
  useGetDeviceBySlugQuery,
  useGetAllDevicesQuery,
  useAddRateMutation,
  useCreateDeviceMutation,
  useDeleteDeviceMutation,
} = deviceApi;
