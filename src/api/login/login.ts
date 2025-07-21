import { AxiosResponse } from 'axios'

import { FetchResponse, LoginRequest, TokenResponse } from '@/src/types'

import axiosInstance from '../axiosConfig'

export const loginUser = async (
  data: LoginRequest
): Promise<AxiosResponse<FetchResponse<TokenResponse>>> => {
  return axiosInstance.post('auth/token', data)
}
