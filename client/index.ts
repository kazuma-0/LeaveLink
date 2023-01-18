/*
 * // Copyright (c) 2023 Anuj S and The Wired
 * //
 * // This program is free software: you can redistribute it and/or modify
 * // it under the terms of the GNU General Public License as published by
 * // the Free Software Foundation, either version 3 of the License, or
 * // (at your option) any later version.
 * //
 * // This program is distributed in the hope that it will be useful,
 * // but WITHOUT ANY WARRANTY; without even the implied warranty of
 * // MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * // GNU General Public License for more details.
 * //
 * // You should have received a copy of the GNU General Public License
 * // along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 */

import axios from "axios";
import {processEnv} from "@next/env";

export const client_url = process.env.NODE_ENV === 'development' ? 'http://localhost:3001/' : ''
const client = axios.create({
    baseURL: client_url + 'api/v1/'
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