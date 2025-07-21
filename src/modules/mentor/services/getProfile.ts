import { getBackEndBaseURL } from '@/src/api/action'
import axiosInstance from '@/src/api/axiosConfig'
import { Profile } from '@/src/entities/profile'
import { FetchResponse } from '@/src/types'

export async function getProfile(): Promise<FetchResponse<Profile>> {
  const BackEndBaseURL: string = getBackEndBaseURL()
  const response = await axiosInstance.get<FetchResponse<Profile>>(
    `${BackEndBaseURL}profiles/current`
  )

  const data: FetchResponse<Profile> = response.data

  return data
}
