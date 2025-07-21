import {
  useMutation,
  UseMutationResult,
  useQueryClient
} from '@tanstack/react-query'
import { toast } from 'sonner'

import { registerUser } from '@/src/api/login/register'
import { ExtendedAxiosError } from '@/src/types'

import { RegisterFormData } from '../schemas/RegisterSchema'

export const useRegisterUser = (
  key: string
): UseMutationResult<
  unknown,
  ExtendedAxiosError,
  RegisterFormData,
  unknown
> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: RegisterFormData) => registerUser(data),
    onError: (error: ExtendedAxiosError) => {
      toast.error(error?.response?.data?.detail)
    },
    onSuccess: async () => {
      toast.success('Account created successfully')
      await queryClient.invalidateQueries({ queryKey: [key] })
    }
  })
}
