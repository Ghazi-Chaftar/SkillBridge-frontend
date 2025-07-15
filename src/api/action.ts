import { AxiosResponse } from 'axios'
import Cookies from 'js-cookie'

import { useRouter } from '@/src/navigation'

import { TokenRequest } from '../types'
import axiosInstance, { getTokenFromCookies } from './axiosConfig'

export type User = {
  id?: number
  username?: string
  email: string
  firstName?: string
  lastName?: string
  phoneNumber?: string
  userType?: string
  image?: string
  isDeleted?: boolean
  isSuspended?: boolean
  suspensionStartDate?: string | null
  suspensionEndDate?: string | null
  deviceId?: number
}
export const getBackEndBaseURL = (): string => {
  return process.env.NEXT_PUBLIC_BACKEND_URL || ''
}

export const fetchData = async (endpoint: string): Promise<AxiosResponse> => {
  return await axiosInstance.get(endpoint)
}

export const postData = async (
  endpoint: string,
  data: any
): Promise<AxiosResponse> => {
  return axiosInstance.post(endpoint, data)
}

export const useLogout = (loginUrl: string): (() => void) => {
  const router = useRouter()
  const logout = (): void => {
    Cookies.remove('accessToken')
    Cookies.remove('refreshToken')
    Cookies.remove('userType')
    Cookies.remove('userEmail')
    router.push('/admin')
    router.replace(loginUrl as any)
  }

  return logout
}

export const useRemoveCookies = (): (() => void) => {
  const removeCookies = (): void => {
    Cookies.remove('accessToken')
    Cookies.remove('refreshToken')
    Cookies.remove('userType')
    Cookies.remove('userEmail')
  }

  return removeCookies
}

export const putData = async (
  endpoint: string,
  data: any
): Promise<AxiosResponse> => {
  return axiosInstance.put(endpoint, data)
}

export const deleteData = async (endpoint: string): Promise<AxiosResponse> => {
  return axiosInstance.delete(endpoint)
}

export const getTokens = async (
  tokenData: TokenRequest
): Promise<AxiosResponse<{ access: string; refresh: string; user: User }>> => {
  const response = await axiosInstance.post<{
    access: string
    refresh: string
    user: User
  }>('/api/users/login-email/', tokenData)
  Cookies.set('accessToken', response.data.access)
  Cookies.set('refreshToken', response.data.refresh)
  Cookies.set('user', JSON.stringify(response.data.user))
  Cookies.set('userType', response.data.user.userType as string)
  return response
}

export const getArchitectTokens = async (
  tokenData: TokenRequest
): Promise<AxiosResponse<{ access: string; refresh: string; user: User }>> => {
  const response = await axiosInstance.post<{
    access: string
    refresh: string
    user: User
  }>('/api/users/login-email/', tokenData)
  if (response.data.user.userType === 'Architect') {
    Cookies.set('accessToken', response.data.access)
    Cookies.set('refreshToken', response.data.refresh)
    Cookies.set('user', JSON.stringify(response.data.user))
    Cookies.set('userType', response.data.user.userType as string)
  }

  return response
}

export const putFilesData = async (
  endpoint: string,
  data: any
): Promise<AxiosResponse> => {
  return axiosInstance.put(endpoint, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const putImagesData = async (
  endpoint: string,
  data: any
): Promise<AxiosResponse> => {
  return axiosInstance.put(endpoint, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

const token = getTokenFromCookies()?.token
export async function fetchDataWithHeaders<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`)
  }

  return response.json()
}
