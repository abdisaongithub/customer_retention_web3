import apiSlice from "../../../api/apiSlice";

const participatingcampaignsApiWithTag = apiSlice.enhanceEndpoints({
    addTagTypes: ['Participatingcampaigns']
})

const participatingcampaignsApiWithTaggedEndpoint = participatingcampaignsApiWithTag.injectEndpoints({

    endpoints: builder => ({

        createParticipatingcampaign: builder.mutation({
            query: (payload) => ({
                url: '/participatingcampaigns',
                method: 'POST',
                data: payload,
            }),
            invalidatesTags: ['Participatingcampaigns'],
        }),

        getParticipatingcampaigns: builder.query({
            query: () => ({
                url: '/participatingcampaigns'
            }),
            providesTags: ['Participatingcampaigns'],
            transformResponse: responseData => {
                return responseData.data
            },
        }, ),

        getParticipatingcampaign: builder.query({
            query: (id) => ({
                url: `/participatingcampaigns/${id}`
            }),
            providesTags: ['Participatingcampaigns'],
            transformResponse: responseData => {
                // console.log(responseData['data'])
                return responseData.data
            },
        }, ),

        updateParticipatingcampaign: builder.mutation({
            query: ({
                id,
                ...payload
            }) => ({
                url: `/participatingcampaigns/${id}`,
                method: 'PUT',
                data: payload,
            }),
            invalidatesTags: ['Participatingcampaigns'],
        }),

        destroyParticipatingcampaign: builder.mutation({
            query: ({
                id
            }) => ({
                url: `/participatingcampaigns/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Participatingcampaigns'],
        }),

    })
})

export const {
    useCreateParticipatingcampaignMutation,
    useLazyCreateParticipatingcampaignMutation,
    useGetParticipatingcampaignsQuery,
    useLazyGetParticipatingcampaignsQuery,
    useGetParticipatingcampaignQuery,
    useLazyGetParticipatingcampaignQuery,
    useUpdateParticipatingcampaignMutation,
    useLazyUpdateParticipatingcampaignMutation,
    useDestroyParticipatingcampaignMutation,
    useLazyDestroyParticipatingcampaignMutation,

} = participatingcampaignsApiWithTaggedEndpoint