import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"
import { IFormData } from "../../App"
//@ts-ignore
const { VITE_API_URL } = import.meta.env

export interface IResponse {
  result: IFormData[]
  status: number
}

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `
    ${VITE_API_URL}/users`,
  }),
  endpoints: (builder) => ({
    getUsers: builder.query<IResponse, IFormData>({
      query: ({ email, number }) => ({
        url: `/find`,
        params: { email, number },
        method: "GET",
      }),
    }),
  }),
})

export const { useGetUsersQuery, useLazyGetUsersQuery } = userApi
