import { getBackEndBaseURL, User } from '@/src/api/action'
import axiosInstance from '@/src/api/axiosConfig'
import { FetchResponse } from '@/src/types'

export async function getUser(): Promise<FetchResponse<User>> {
  const BackEndBaseURL: string = getBackEndBaseURL()
  const response = await axiosInstance.get<FetchResponse<User>>(
    `${BackEndBaseURL}users/current`
  )

  const data: FetchResponse<User> = response.data

  return data
}
