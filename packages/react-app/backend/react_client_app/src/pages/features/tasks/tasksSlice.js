import apiSlice from "../../../api/apiSlice";

const tasksApiWithTag = apiSlice.enhanceEndpoints({
    addTagTypes: ['Tasks']
})

const tasksApiWithTaggedEndpoint = tasksApiWithTag.injectEndpoints({

    endpoints: builder => ({

        createTask: builder.mutation({
            query: (payload) => ({
                url: '/tasks',
                method: 'POST',
                data: payload,
            }),
            invalidatesTags: ['Tasks'],
        }),

        getTasks: builder.query({
            query: () => ({
                url: '/tasks'
            }),
            providesTags: ['Tasks'],
            transformResponse: responseData => {
                return responseData.data
            },
        }, ),

        getTask: builder.query({
            query: (id) => ({
                url: `/tasks/${id}`
            }),
            providesTags: ['Tasks'],
            transformResponse: responseData => {
                // console.log(responseData['data'])
                return responseData.data
            },
        }, ),

        updateTask: builder.mutation({
            query: ({
                id,
                ...payload
            }) => ({
                url: `/tasks/${id}`,
                method: 'PUT',
                data: payload,
            }),
            invalidatesTags: ['Tasks'],
        }),

        destroyTask: builder.mutation({
            query: ({
                id
            }) => ({
                url: `/tasks/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Tasks'],
        }),

    })
})

export const {
    useCreateTaskMutation,
    useLazyCreateTaskMutation,
    useGetTasksQuery,
    useLazyGetTasksQuery,
    useGetTaskQuery,
    useLazyGetTaskQuery,
    useUpdateTaskMutation,
    useLazyUpdateTaskMutation,
    useDestroyTaskMutation,
    useLazyDestroyTaskMutation,

} = tasksApiWithTaggedEndpoint