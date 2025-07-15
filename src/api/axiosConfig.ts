import axios, { AxiosInstance } from 'axios'
import Cookies from 'js-cookie'

import { PaginationHeaders } from '../app/shared/constants/enums'
import { PaginationResult } from '../entities/paginationResult'

type AuthToken = {
  token: string
}

export const getTokenFromCookies = (): AuthToken | null => {
  const tokenString = Cookies.get('accessToken')
  if (!tokenString) {
    return null
  }
  return { token: tokenString }
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL
})

axiosInstance.interceptors.request.use(
  config => {
    const token = getTokenFromCookies()?.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  response => {
    const isPaginated =
      response.headers[PaginationHeaders.pagination] === 'true'

    if (isPaginated && response.data) {
      response.data = {
        ...response.data
      } as PaginationResult<(typeof response.data.results)[0]>
    }

    return response
  },
  error => {
    return Promise.reject(error)
  }
)

export default axiosInstance
