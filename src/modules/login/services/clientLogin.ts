'use client'
import {
  useMutation,
  UseMutationResult,
  useQueryClient
} from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import Cookies from 'js-cookie'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import {
  ForgetPasswordClientAsync,
  regenerateVerificationCode,
  VerifyClientFirstLoginAsync,
  VerifyEmailClientAsync,
  VerifyEmailFirstLoginClientAsync
} from '@/src/api/firstLogin/clientFirstLogin'
import { clientLoginRequestAsync } from '@/src/api/login/clientLogin'
import { useRouter } from '@/src/navigation'
import { ExtendedAxiosError, FetchResponse, LoginResult } from '@/src/types'
import { ClientLoginRequest } from '@/src/types'

export const useClientLogin = (
  key: string,
  setIsOpen: (isOpen: boolean) => void
): UseMutationResult<
  unknown,
  ExtendedAxiosError,
  ClientLoginRequest,
  unknown
> => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations('login')

  return useMutation({
    mutationFn: (clientLoginData: ClientLoginRequest) =>
      clientLoginRequestAsync(clientLoginData),
    onError: () => {
      toast.error(t('loginTosts.invalidCredentials'))
    },
    onSuccess: async (result: LoginResult) => {
      if (result.data.isVerified) {
        Cookies.set('accessToken', result.data.access)
        Cookies.set('refreshToken', result.data.refresh)
        Cookies.set('user', JSON.stringify(result.data.user))
        Cookies.set('userType', result.data.user.userType as string)
        router.replace('/client-space')
        toast.success(t('loginTosts.successfulLogin'))
        if (Cookies.get('email') && Cookies.get('password')) {
          Cookies.remove('email')
          Cookies.remove('password')
        }
      } else {
        setIsOpen(true)
      }

      await queryClient.invalidateQueries({ queryKey: [key] })
    }
  })
}

export const useVerifyClientFirstLogin = (
  key: string
): UseMutationResult<LoginResult, Error, { token: string }> => {
  const queryClient = useQueryClient()
  const t = useTranslations('login')
  return useMutation({
    mutationFn: (token: { token: string }) =>
      VerifyClientFirstLoginAsync(token),
    onError: () => {
      toast.error(t('loginTosts.accessDenied'))
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [key] })
    }
  })
}

export const useVerifyEmailClient = (
  key: string
): UseMutationResult<LoginResult, Error, { token: string }> => {
  const queryClient = useQueryClient()
  const t = useTranslations('login')
  const router = useRouter()
  return useMutation({
    mutationFn: (token: { token: string }) => VerifyEmailClientAsync(token),
    onError: () => {
      toast.error(t('loginTosts.accessDenied'))
    },
    onSuccess: async () => {
      router.replace('/client/login')
      await queryClient.invalidateQueries({ queryKey: [key] })
    }
  })
}
export const useForgetPasswordClient = (
  key: string
): UseMutationResult<
  unknown,
  ExtendedAxiosError,
  { email: string; currentLanguage: string },
  unknown
> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: { email: string; currentLanguage: string }) =>
      ForgetPasswordClientAsync(data),
    onError: (error: ExtendedAxiosError) => {
      toast.error(error?.response?.data?.errors[0]?.detail)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [key] })
    }
  })
}

export const useNotVerifiedClientLogin = (
  key: string
): UseMutationResult<
  unknown,
  ExtendedAxiosError,
  ClientLoginRequest,
  unknown
> => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations('login')

  return useMutation({
    mutationFn: (clientLoginData: ClientLoginRequest) =>
      clientLoginRequestAsync(clientLoginData),
    onError: () => {
      toast.error(t('loginTosts.invalidCredentials'))
    },
    onSuccess: async (result: LoginResult) => {
      Cookies.set('accessToken', result.data.access)
      Cookies.set('refreshToken', result.data.refresh)
      Cookies.set('user', JSON.stringify(result.data.user))
      Cookies.set('userType', result.data.user.userType as string)
      router.replace('/client-space')

      toast.success(t('loginTosts.successfulLogin'))
      if (Cookies.get('email') && Cookies.get('password')) {
        Cookies.remove('email')
        Cookies.remove('password')
      }

      await queryClient.invalidateQueries({ queryKey: [key] })
      location.reload()
    }
  })
}

export const useVerifyEmailFirstLoginClient = (
  key: string,
  handleOpen: () => void
): UseMutationResult<
  unknown,
  ExtendedAxiosError,
  { code: string },
  unknown
> => {
  const queryClient = useQueryClient()
  const router = useRouter()
  return useMutation({
    mutationFn: (verificationCode: { code: string }) =>
      VerifyEmailFirstLoginClientAsync(verificationCode),
    onError: (error: ExtendedAxiosError) => {
      toast.error(error?.response?.data?.errors[0]?.detail)
    },
    onSuccess: async () => {
      handleOpen()
      router.push('/client-space/projects')
      await queryClient.invalidateQueries({ queryKey: [key] })
    }
  })
}

export const useRegenerateVerificationCode = (
  key: string
): UseMutationResult<
  AxiosResponse<FetchResponse<never>, any>,
  ExtendedAxiosError,
  void,
  unknown
> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => regenerateVerificationCode(),
    onError: (error: ExtendedAxiosError) => {
      toast.error(error?.response?.data?.errors[0]?.detail)
    },
    onSuccess: async (result: AxiosResponse<FetchResponse<never>>) => {
      toast.success(result?.data?.message)

      await queryClient.invalidateQueries({ queryKey: [key] })
    }
  })
}
