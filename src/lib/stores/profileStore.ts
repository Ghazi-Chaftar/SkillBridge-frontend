import { create } from 'zustand'

import { User as BaseUser } from '@/src/api/action'
import { Profile } from '@/src/entities/profile'

// Extended User type with gender field
interface User extends BaseUser {
  gender?: string
}

interface ProfileState {
  profileData: Profile | null
  userData: User | null
  isEditing: boolean
  setProfileData: (profileData: Profile) => void
  setUserData: (userData: User) => void
  setIsEditing: (isEditing: boolean) => void
  updateProfileField: (field: keyof Profile, value: any) => void
  updateUserField: (field: keyof User, value: any) => void
}

export const useProfileStore = create<ProfileState>(set => ({
  profileData: null,
  userData: null,
  isEditing: false,
  setProfileData: profileData => set({ profileData }),
  setUserData: userData => set({ userData }),
  setIsEditing: isEditing => set({ isEditing }),
  updateProfileField: (field, value) =>
    set(state => ({
      profileData: state.profileData
        ? { ...state.profileData, [field]: value }
        : null
    })),
  updateUserField: (field, value) =>
    set(state => ({
      userData: state.userData ? { ...state.userData, [field]: value } : null
    }))
}))
