import apiSlice from "../../../api/apiSlice";

const campaignsApiWithTag = apiSlice.enhanceEndpoints({
    addTagTypes: ['Campaigns']
})

const campaignsApiWithTaggedEndpoint = campaignsApiWithTag.injectEndpoints({

    endpoints: builder => ({

        createCampaign: builder.mutation({
            query: (payload) => ({
                url: '/campaigns',
                method: 'POST',
                data: payload,
            }),
            invalidatesTags: ['Campaigns'],
        }),

        getCampaigns: builder.query({
            query: () => ({
                url: '/campaigns'
            }),
            providesTags: ['Campaigns'],
            transformResponse: responseData => {
                return responseData.data
            },
        }, ),

        getCampaign: builder.query({
            query: (id) => ({
                url: `/campaigns/${id}`
            }),
            providesTags: ['Campaigns'],
            transformResponse: responseData => {
                // console.log(responseData['data'])
                return responseData.data
            },
        }, ),

        updateCampaign: builder.mutation({
            query: ({
                id,
                ...payload
            }) => ({
                url: `/campaigns/${id}`,
                method: 'PUT',
                data: payload,
            }),
            invalidatesTags: ['Campaigns'],
        }),

        destroyCampaign: builder.mutation({
            query: ({
                id
            }) => ({
                url: `/campaigns/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Campaigns'],
        }),

        toggleVerified: builder.mutation({
            query: ({
                id
            }) => ({
                url: `/campaigns/${id}/toggleVerified`,
                method: 'POST',
            }),
            invalidatesTags: ['Campaigns'],
        }),

    })
})

export const {
    useCreateCampaignMutation,
    useLazyCreateCampaignMutation,
    useGetCampaignsQuery,
    useLazyGetCampaignsQuery,
    useGetCampaignQuery,
    useLazyGetCampaignQuery,
    useUpdateCampaignMutation,
    useLazyUpdateCampaignMutation,
    useDestroyCampaignMutation,
    useLazyDestroyCampaignMutation,
    useToggleVerifiedMutation,
    useLazyToggleVerifiedMutation,

} = campaignsApiWithTaggedEndpoint