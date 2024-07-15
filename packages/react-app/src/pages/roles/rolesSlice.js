import apiSlice from "../../../api/apiSlice";

const rolesApiWithTag = apiSlice.enhanceEndpoints({
    addTagTypes: ['Roles']
})

const rolesApiWithTaggedEndpoint = rolesApiWithTag.injectEndpoints({

    endpoints: builder => ({

        createRole: builder.mutation({
            query: (payload) => ({
                url: '/roles',
                method: 'POST',
                data: payload,
            }),
            invalidatesTags: ['Roles'],
        }),

        getRoles: builder.query({
            query: () => ({
                url: '/roles'
            }),
            providesTags: ['Roles'],
            transformResponse: responseData => {
                return responseData.data
            },
        }, ),

        getRole: builder.query({
            query: (id) => ({
                url: `/roles/${id}`
            }),
            providesTags: ['Roles'],
            transformResponse: responseData => {
                // console.log(responseData['data'])
                return responseData.data
            },
        }, ),

        updateRole: builder.mutation({
            query: ({
                id,
                ...payload
            }) => ({
                url: `/roles/${id}`,
                method: 'PUT',
                data: payload,
            }),
            invalidatesTags: ['Roles'],
        }),

        destroyRole: builder.mutation({
            query: ({
                id
            }) => ({
                url: `/roles/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Roles'],
        }),

    })
})

export const {
    useCreateRoleMutation,
    useLazyCreateRoleMutation,
    useGetRolesQuery,
    useLazyGetRolesQuery,
    useGetRoleQuery,
    useLazyGetRoleQuery,
    useUpdateRoleMutation,
    useLazyUpdateRoleMutation,
    useDestroyRoleMutation,
    useLazyDestroyRoleMutation,

} = rolesApiWithTaggedEndpoint