import { AxiosResponse } from 'axios'

import { EmailPhoneType, FetchResponse, PhoneOnlyType } from '@/src/types'

import axiosInstance from '../axiosConfig'

export const isUserFoundAsync = async (
  emailPhoneData: EmailPhoneType
): Promise<AxiosResponse<FetchResponse<never>>> => {
  return axiosInstance.post(
    'api/users/archimatch-user/verify-credentials/',
    emailPhoneData
  )
}

export const verifyPhoneAsync = async (
  phoneData: PhoneOnlyType
): Promise<AxiosResponse<FetchResponse<never>>> => {
  return axiosInstance.post(
    'api/users/archimatch-user/verify-phone/',
    phoneData
  )
}
