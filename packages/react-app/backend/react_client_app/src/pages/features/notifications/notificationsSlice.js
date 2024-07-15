import apiSlice from "../../../api/apiSlice";

const notificationsApiWithTag = apiSlice.enhanceEndpoints({
    addTagTypes: ['Notifications']
})

const notificationsApiWithTaggedEndpoint = notificationsApiWithTag.injectEndpoints({

    endpoints: builder => ({

        createNotification: builder.mutation({
            query: (payload) => ({
                url: '/notifications',
                method: 'POST',
                data: payload,
            }),
            invalidatesTags: ['Notifications'],
        }),

        getNotifications: builder.query({
            query: () => ({
                url: '/notifications'
            }),
            providesTags: ['Notifications'],
            transformResponse: responseData => {
                return responseData.data
            },
        }, ),

        getNotification: builder.query({
            query: (id) => ({
                url: `/notifications/${id}`
            }),
            providesTags: ['Notifications'],
            transformResponse: responseData => {
                // console.log(responseData['data'])
                return responseData.data
            },
        }, ),

        destroyNotification: builder.mutation({
            query: ({
                id
            }) => ({
                url: `/notifications/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Notifications'],
        }),

        turnToTrueRead: builder.mutation({
            query: ({
                id
            }) => ({
                url: `/notifications/${id}/turnToTrueRead`,
                method: 'POST',
            }),
            invalidatesTags: ['Notifications'],
        }),

    })
})

export const {
    useCreateNotificationMutation,
    useLazyCreateNotificationMutation,
    useGetNotificationsQuery,
    useLazyGetNotificationsQuery,
    useGetNotificationQuery,
    useLazyGetNotificationQuery,
    useDestroyNotificationMutation,
    useLazyDestroyNotificationMutation,
    useTurnToTrueReadMutation,
    useLazyTurnToTrueReadMutation,

} = notificationsApiWithTaggedEndpoint