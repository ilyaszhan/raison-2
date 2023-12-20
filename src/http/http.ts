import axios from "axios"

export const APIBaseURL = '/api/'

const API = axios.create({
    withCredentials: true,
    baseURL: APIBaseURL,
})

export default API