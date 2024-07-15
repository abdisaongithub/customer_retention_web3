import {createApi} from '@reduxjs/toolkit/query/react'
import axiosBaseQuery from "./axiosBaseQuery";

const baseUrl = import.meta.env.VITE_LOCAL_API
const token = localStorage.getItem('token')
// console.log("token: ", token)
export const apiSlice = createApi({
    reducerPath: 'apiSlice',
    baseQuery: axiosBaseQuery({
        baseUrl: baseUrl + '/api',
        headers: {
            'x-auth-token': token ?? '',
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json'
        }
    },),
    tagTypes: ['Auth', 'User'],
    endpoints: (builder) => ({
        getCurrentUser: builder.query({
            query: () => ({'url': '/auth/me'}),
            transformResponse(baseQueryReturnValue, meta, arg) {
                return baseQueryReturnValue
            },
            providesTags: ['User']
        }),
        updateUserProfile: builder.mutation({
            query: (payload) => ({
                url: '/auth/me',
                method: 'PUT',
                data: payload,
                invalidatesTags: ['Authentication', 'User'],
            }),
        }),
    }),
})

export const {
    useGetCurrentUserQuery,
    useUpdateUserProfileMutation,
} = apiSlice

export default apiSlice