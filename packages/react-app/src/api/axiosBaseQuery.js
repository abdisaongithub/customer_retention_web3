import axios from 'axios'
const debug = import.meta.env.VITE_DEBUG
const baseUrl = import.meta.env.VITE_LOCAL_API

const axiosBaseQuery =
    ({baseUrl, headers}
         = {baseUrl: '', headers: {'Accept': 'application/json', 'Content-Type': 'multipart/form-data'}}) =>
        async ({url, method, data, params}) => {
    try {
        if (debug) console.log('data: ', data ?? 'no data')
        const result = await axios({url: baseUrl + url, method, data, params, headers: headers})
        if (debug) console.log('Debug Result Message: ', result.data)
        return {data: result.data}
    } catch (axiosError) {
        let err = axiosError
        if (debug) console.log('Debug Message', err.response)
        return {
            error: {
                status: err.response?.status, data: err.response?.data || err.message,
            },
        }
    }
}

export default axiosBaseQuery