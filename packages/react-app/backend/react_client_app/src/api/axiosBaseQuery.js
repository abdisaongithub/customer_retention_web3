import axios from 'axios'

const axiosBaseQuery = ({baseUrl, headers} = {baseUrl: '', headers: {'Accept': 'application/json'}}) =>
    async ({url, method, data, params}) => {
        try {
            console.log('Axios Call: ', url, method, data, params)
            const result = await axios({url: baseUrl + url, method, data, params, headers: headers})
            console.log('Axios Success: ', url, method, result.data)
            return {data: result.data}
        } catch (axiosError) {
            let err = axiosError
            console.log('Axios Error: ', url, err)
            return {
                error: {
                    status: err.response?.status, data: err.response?.data || err.message,
                },
            }
        }
    }

export default axiosBaseQuery