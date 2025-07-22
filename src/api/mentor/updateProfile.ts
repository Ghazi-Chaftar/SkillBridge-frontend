import { AxiosResponse } from 'axios'

import {
  ProfileUpdateData,
  UserUpdate
} from '@/src/modules/mentor/types/updateTypes'
import { FetchResponse } from '@/src/types'

import axiosInstance from '../axiosConfig'

export const updateUser = async (
  data: UserUpdate
): Promise<AxiosResponse<FetchResponse<never>>> => {
  return axiosInstance.put('users/current', data)
}

export const updateProfile = async (
  data: ProfileUpdateData
): Promise<AxiosResponse<FetchResponse<never>>> => {
  return axiosInstance.put('profiles/current', data)
}

export const updatePicture = async (
  data: FormData
): Promise<AxiosResponse<FetchResponse<never>>> => {
  return axiosInstance.post('profiles/upload-picture', data, { headers: {} })
}
