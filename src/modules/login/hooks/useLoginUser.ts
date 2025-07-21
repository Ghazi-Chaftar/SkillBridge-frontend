import {
  useMutation,
  UseMutationResult,
  useQueryClient
} from '@tanstack/react-query'
import Cookies from 'js-cookie'
import { toast } from 'sonner'

import { loginUser } from '@/src/api/login/login'
import { useLocalizedUrl } from '@/src/app/shared/hooks/initUrlWithLang'
import {
  ExtendedAxiosError,
  FetchResponse,
  LoginRequest,
  TokenResponse
} from '@/src/types'
export const useLoginUser = (
  key: string
): UseMutationResult<unknown, ExtendedAxiosError, LoginRequest, unknown> => {
  const queryClient = useQueryClient()
  const getLocalizedUrl = useLocalizedUrl()
  return useMutation({
    mutationFn: async (data: LoginRequest) => {
      const response = await loginUser(data)
      return response.data
    },
    onError: (error: ExtendedAxiosError) => {
      if (error?.response?.status === 409 || error?.response?.status === 404) {
        toast.error(error?.response?.data?.detail)
      }
    },
    onSuccess: async (result: FetchResponse<TokenResponse>) => {
      Cookies.set('accessToken', result.data.accessToken)

      const loginUri = getLocalizedUrl('/mentor/profile')

      window.location.href = loginUri.toString()
      toast.success('Login successful')
      await queryClient.invalidateQueries({ queryKey: [key] })
    }
  })
}
