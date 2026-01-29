import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
    prepareHeaders: (headers, { getState }) => {
      // Access the Redux state to get the token
      const token = getState().auth.token;

      // If the token exists, add it to the Authorization header
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    // Login API
    login: builder.mutation({
      query: (body) => ({
        url: "/api/v1/auth/login",
        method: "POST",
        body,
      }),
    }),
    // Verify Email API
    verifyEmail: builder.mutation({
      query: (body) => ({
        url: "/api/v1/auth/verifyemail",
        method: "POST",
        body,
      }),
    }),
    // Verify OTP API
    verifyOtp: builder.mutation({
      query: (body) => ({
        url: "/api/v1/auth/verifyotp",
        method: "POST",
        body,
      }),
    }),
    // Create Password API
    createPassword: builder.mutation({
      query: (body) => ({
        url: "/api/v1/auth/createpassword",
        method: "POST",
        body,
      }),
    }),
    // Get Permissions by Role ID
    getPermissions: builder.query({
      query: () => ({
        url: `/api/v1/auth/role`,
        method: "GET",
      }),
    }),
  }),
});

// Export the hooks for usage in functional components
export const {
  useLoginMutation,
  useVerifyEmailMutation,
  useVerifyOtpMutation,
  useCreatePasswordMutation,
  useGetPermissionsQuery, // Use this hook for getPermissions
} = api;
