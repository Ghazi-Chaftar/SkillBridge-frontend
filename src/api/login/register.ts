import { AxiosResponse } from 'axios'

import { RegisterFormData } from '@/src/modules/login/schemas/RegisterSchema'
import { FetchResponse } from '@/src/types'

import axiosInstance from '../axiosConfig'

export const registerUser = async (
  data: RegisterFormData
): Promise<AxiosResponse<FetchResponse<never>>> => {
  //   return axiosInstance.post('auth/', {
  //     first_name: data.firstName,
  //     last_name: data.lastName,
  //     email: data.email,
  //     password: data.password,
  //     confirm_password: data.confirmPassword,
  //     phone_number: '29238380'
  //   })
  return axiosInstance.post('auth/', data)
}
