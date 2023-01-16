import axios from "axios";
import {processEnv} from "@next/env";

const client_url = 'http://localhost:3001/api/v1/'
const client = axios.create({
    baseURL: client_url
})
if(typeof window !== "undefined"){
    client.interceptors.request.use(function (config){
        const token = localStorage.getItem('token')
        // @ts-ignore
        config.headers.Authorization =  token ? `Bearer ${token}` : '';
        return config;
    })
}
export default client;