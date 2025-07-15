import { AxiosError } from 'axios'
import { LucideProps } from 'lucide-react'
import { ForwardRefExoticComponent, RefAttributes } from 'react'

import { FilterOption } from '../modules/admin/blogs/constants/filters'
import { pathnames } from '../navigation'

export type CommunType = {
  id: number
  name: string
}

type Error = {
  code: string
  detail: string
  attr: string
}
export type ReturnType<T> = {
  data: T
  message: string
  success: boolean
}

export type RequestError = {
  type: string
  errors: Error[]
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

export type FilterConfig<T = any> = {
  key: string
  value?: string
  type?: 'buttons' | 'select' | 'dropdown' | 'date' | 'dateRange'
  options: FilterOption[]
  title?: string
  handleSearchChange?: (value: string) => Promise<void>
  handleSelect?: (item: T) => void
  suggestions?: T[]
  onSelectSuggestion?: (item: T) => void
  dataType?: T
  getDisplayValue?: (item: T) => string
  defaultData?: T[]
  placeholder?: string
  Icon?: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >
  handleRest?: () => void
  handleChangeDate?: (date: string) => void
  handleChangeDateRange?: (startDate: Date | null, endDate: Date | null) => void
}

export function getNestedValue<T>(obj: T, keyPath: string): any {
  const keys = keyPath.split('.')
  return keys.reduce((acc: any, key) => (acc ? acc[key] : undefined), obj)
}
