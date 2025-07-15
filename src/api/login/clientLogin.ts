import { AxiosResponse } from 'axios'

import { ClientLoginRequest } from '@/src/types'

import axiosInstance from '../axiosConfig'

export const clientLoginRequestAsync = async (
  clientLoginData: ClientLoginRequest
): Promise<AxiosResponse> => {
  if (
    clientLoginData.emailOrphone &&
    clientLoginData.emailOrphone.includes('@')
  ) {
    const newData = {
      ...clientLoginData,
      email: clientLoginData.emailOrphone
    }
    delete newData.emailOrphone
    return axiosInstance.post('api/users/login-email/', newData)
  } else {
    const newData = {
      ...clientLoginData,
      phoneNumber: clientLoginData.emailOrphone
    }
    delete newData.emailOrphone
    return axiosInstance.post('api/users/login-phone/', newData)
  }
}
