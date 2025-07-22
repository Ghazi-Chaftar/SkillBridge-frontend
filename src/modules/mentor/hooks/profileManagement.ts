import {
  useMutation,
  UseMutationResult,
  useQueryClient
} from '@tanstack/react-query'
import { toast } from 'sonner'

import {
  updatePicture,
  updateProfile,
  updateUser
} from '@/src/api/mentor/updateProfile'
import { ExtendedAxiosError } from '@/src/types'

import { ProfileUpdateData, UserUpdate } from '../types/updateTypes'

export const useUpdateUser = (
  key: string
): UseMutationResult<unknown, ExtendedAxiosError, UserUpdate, unknown> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: UserUpdate) => updateUser(data),
    onError: (error: ExtendedAxiosError) => {
      toast.error(error?.response?.data?.detail)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [key] })
    }
  })
}

export const useUpdateProfile = (
  key: string
): UseMutationResult<
  unknown,
  ExtendedAxiosError,
  ProfileUpdateData,
  unknown
> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: ProfileUpdateData) => updateProfile(data),
    onError: (error: ExtendedAxiosError) => {
      toast.error(error?.response?.data?.detail)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [key] })
    }
  })
}

export const useUpdatePicture = (
  key: string
): UseMutationResult<unknown, ExtendedAxiosError, FormData, unknown> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: FormData) => updatePicture(data),
    onError: (error: ExtendedAxiosError) => {
      toast.error(error?.response?.data?.detail || 'Failed to upload image')
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [key] })
    }
  })
}
