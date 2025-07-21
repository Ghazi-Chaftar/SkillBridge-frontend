import { User as BaseUser } from '@/src/api/action'
import { Profile } from '@/src/entities/profile'

import { useProfileStore } from '../profileStore'

// Extended User type with gender field
interface User extends BaseUser {
  gender?: string
}

// Custom hooks for specific parts of the profile store
export const useProfileData = (): Profile | null => {
  const profileData = useProfileStore(state => state.profileData)
  return profileData
}

export const useUserData = (): User | null => {
  const userData = useProfileStore(state => state.userData)
  return userData
}

export const useProfileEditing = (): {
  isEditing: boolean
  setIsEditing: (isEditing: boolean) => void
} => {
  const isEditing = useProfileStore(state => state.isEditing)
  const setIsEditing = useProfileStore(state => state.setIsEditing)

  return {
    isEditing,
    setIsEditing
  }
}

export const useProfileActions = (): {
  updateProfileField: (field: keyof Profile, value: any) => void
  updateUserField: (field: keyof User, value: any) => void
  setProfileData: (profileData: Profile) => void
  setUserData: (userData: User) => void
} => {
  const updateProfileField = useProfileStore(state => state.updateProfileField)
  const updateUserField = useProfileStore(state => state.updateUserField)
  const setProfileData = useProfileStore(state => state.setProfileData)
  const setUserData = useProfileStore(state => state.setUserData)

  return {
    updateProfileField,
    updateUserField,
    setProfileData,
    setUserData
  }
}

// Export the main store hook for direct access
export { useProfileStore }
