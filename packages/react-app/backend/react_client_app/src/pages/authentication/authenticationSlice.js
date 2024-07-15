import '@reduxjs/toolkit'
import apiSlice from "../../api/apiSlice";

const authApiWithTag = apiSlice.enhanceEndpoints({addTagTypes: ['Authentication']})

const authApiWithTaggedEndpoint = authApiWithTag.injectEndpoints({
    endpoints: builder => ({
        signIn: builder.mutation({
            query(payload) {
                return {
                    url: '/auth/login',
                    method: 'POST',
                    data: payload,
                    invalidatesTags: ['Authentication'],
                }
            },
            transformResponse(baseQueryReturnValue, meta, arg) {
                localStorage.setItem('token', baseQueryReturnValue.token)
                location.href = import.meta.env.BASE_URL
                return baseQueryReturnValue
            },
            invalidatesTags: ['Authentication']
        }),
        signUp: builder.mutation({
            query: (payload) => ({
                url: '/auth/register',
                method: 'POST',
                body: payload,
                invalidatesTags: ['Authentication'],
            }),
        }),
        signOut: builder.mutation({
            query: (payload) => ({
                url: '/auth/logout',
                method: 'POST',
                invalidatesTags: ['Authentication'],
            }),
        }),
        forgotPassword: builder.mutation({
            query: (payload) => ({
                url: '/auth/reset_password',
                method: 'POST',
                body: payload,
                invalidatesTags: ['Authentication'],
            }),
        }),
        // getAllUsers: builder.query({
        //     query: () => ({url: '/users',}),
        //     transformResponse: (response, meta, arg) => response.users,
        //     transformErrorResponse: (response, metadata, arg) => response.status,
        //     prepareHandlers: ()=>{},
        //     overrideExisting: true,
        // }),
    })
})

export const {
    useSignUpMutation,
    useSignInMutation,
    useSignOutMutation,
    useForgotPasswordMutation
} = authApiWithTaggedEndpoint
