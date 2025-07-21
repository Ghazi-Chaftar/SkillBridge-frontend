import { AxiosError } from 'axios'

import { pathnames } from '../navigation'

export type CommunType = {
  id: number
  name: string
}

export type ReturnType<T> = {
  data: T
  message: string
  success: boolean
}

export type RequestError = {
  type: string
  detail: string
}
export interface ExtendedAxiosError extends AxiosError<RequestError> {
  requestError?: RequestError
}

export interface ExtendedAxiosError extends AxiosError<RequestError> {
  requestError?: RequestError
}

export type FetchResponse<T> = {
  data: T
  message?: string
  success: boolean
}

export type LabeledIconType = {
  id: number
  label: string
  icon: string
}

export type LinkItem = {
  href: string
  label: string
}

export type pathnameType = keyof typeof pathnames
