'use client'

import { useQuery } from '@tanstack/react-query'
import { useEffect, useMemo } from 'react'

import { getFileUrl } from '@/lib/utils'
import {
  useProfileActions,
  useProfileData,
  useUserData
} from '@/src/lib/stores'
import AboutSection from '@/src/modules/mentor/components/AboutSection'
import EducationSection from '@/src/modules/mentor/components/EducationSection'
import LanguagesSection from '@/src/modules/mentor/components/LanguagesSection'
import LevelsSection from '@/src/modules/mentor/components/LevelsSection'
import ProfileHeader from '@/src/modules/mentor/components/ProfileHeader'
import StatsCards from '@/src/modules/mentor/components/StatsCards'
import SubjectsSection from '@/src/modules/mentor/components/SubjectsSection'
import TeachingMethodsSection from '@/src/modules/mentor/components/TeachingMethodsSection'
import { getProfile } from '@/src/modules/mentor/services/getProfile'
import { getUser } from '@/src/modules/mentor/services/getUser'
import ProfilePageSkeleton from '@/src/modules/mentor/skeletons/ProfilePageSkeleton'

const ProfilePage: React.FC = () => {
  const profileData = useProfileData()
  const userData = useUserData()

  const {
    data: profile,
    isLoading: ProfileLoading,
    isSuccess: ProfileSuccess
  } = useQuery({
    queryKey: ['profile'],
    queryFn: () => getProfile()
  })
  const {
    data: user,
    isLoading: UserLoading,
    isSuccess: UserSuccess
  } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUser()
  })
  const { updateProfileField, updateUserField, setProfileData, setUserData } =
    useProfileActions()
  const processedUserData = useMemo(() => {
    if (!user?.data) return null

    return {
      id: user.data.id,
      firstName: user.data.firstName || '',
      lastName: user.data.lastName || '',
      email: user.data.email || '',
      phoneNumber: user.data.phoneNumber || ''
    }
  }, [user])
  const processedProfileData = useMemo(() => {
    if (!profile?.data) return null

    return {
      id: profile.data.id || '',
      user_id: profile.data.user_id || '',
      bio: profile.data.bio || '',
      profilePicture:
        getFileUrl(profile.data.profilePicture) || '/images/default-avatar.svg',
      location: profile.data.location || '',
      hourlyRate: profile.data.hourlyRate,
      subjects: profile.data.subjects || [],
      languages: profile.data.languages || [],
      yearsOfExperience: profile.data.yearsOfExperience,
      teachingMethod: profile.data.teachingMethod || 'online',
      levels: profile.data.levels || [],
      degrees: profile.data.degrees || [],
      currency: profile.data.currency || 'TND',
      gender: profile.data.gender || 'male'
    }
  }, [profile, user])

  // Update store when API data is available
  useEffect(() => {
    if (
      processedUserData &&
      (!userData?.id || userData.id !== processedUserData.id)
    ) {
      setUserData(processedUserData)
    }
  }, [processedUserData, setUserData, userData?.id])

  useEffect(() => {
    if (
      processedProfileData &&
      (!profileData?.id || profileData.id !== processedProfileData.id)
    ) {
      setProfileData(processedProfileData)
    }
  }, [processedProfileData, setProfileData, profileData?.id])

  // Helper functions for array updates
  const updateLanguages = (languages: string[]): void => {
    updateProfileField('languages', languages)
  }

  const updateSubjects = (subjects: string[]): void => {
    updateProfileField('subjects', subjects)
  }

  const updateDegrees = (degrees: string[]): void => {
    updateProfileField('degrees', degrees)
  }

  const updateLevels = (levels: string[]): void => {
    updateProfileField('levels', levels)
  }

  const updateBio = (bio: string): void => {
    updateProfileField('bio', bio)
  }

  const updateTeachingMethod = (method: string): void => {
    updateProfileField('teachingMethod', method)
  }

  // Helper function to update fields (backwards compatibility)
  const updateField = (field: string, value: any): void => {
    if (['firstName', 'lastName', 'email', 'phoneNumber'].includes(field)) {
      updateUserField(field as keyof typeof userData, value)
    } else {
      updateProfileField(field as keyof typeof profileData, value)
    }
  }
  if (ProfileLoading || UserLoading) {
    return <ProfilePageSkeleton />
  }
  if (ProfileSuccess && UserSuccess) {
    return (
      <div className='min-h-screen bg-gray-50'>
        {/* Dashboard Container */}
        <div className='flex h-full w-full flex-col'>
          {/* Header Section */}
          {/* <div className='border-b border-gray-200 bg-white px-6 py-4'>
          <div className='flex items-center justify-between'>
            <div>
              <h1 className='text-2xl font-bold text-gray-900'>
                Profile Dashboard
              </h1>
              <p className='mt-1 text-gray-600'>
                Manage your mentor profile and settings
              </p>
            </div>
            {isEditing && (
              <Button onClick={handleSave} size='lg' className='px-6'>
                <Save className='mr-2 h-5 w-5' />
                Save All Changes
              </Button>
            )}
          </div>
        </div> */}

          {/* Main Dashboard Content */}
          <div className='flex-1 p-6'>
            <div className='mx-auto max-w-full space-y-6'>
              {/* Profile Header - Full Width */}
              <ProfileHeader
                profileData={{
                  firstName: userData?.firstName || '',
                  lastName: userData?.lastName || '',
                  location: profileData?.location || '',
                  profilePicture: profileData?.profilePicture || '',
                  phoneNumber: userData?.phoneNumber || '',
                  gender: profileData?.gender || ''
                }}
                onFieldUpdate={updateField}
              />

              {/* Stats Overview - Full Width */}
              <div className='grid grid-cols-1 gap-6 lg:grid-cols-4'>
                <div className='lg:col-span-1'>
                  <StatsCards
                    statsData={{
                      currency: profileData?.currency || 'TND',
                      hourlyRate:
                        parseInt(profileData?.hourlyRate?.toString() || '0') ||
                        0,
                      yearsOfExperience:
                        parseInt(
                          profileData?.yearsOfExperience?.toString() || '0'
                        ) || 0
                    }}
                    onFieldUpdate={updateField}
                  />
                </div>

                {/* Quick Info Cards */}
                <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:col-span-3'>
                  <LanguagesSection
                    languages={profileData?.languages || []}
                    onLanguagesUpdate={updateLanguages}
                  />
                  <TeachingMethodsSection
                    teachingMethod={profileData?.teachingMethod || ''}
                    onMethodUpdate={updateTeachingMethod}
                  />
                </div>
              </div>

              {/* Main Content Grid */}
              <div className='grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3'>
                {/* About Section - Takes more space */}
                <div className='lg:col-span-1 xl:col-span-2'>
                  <AboutSection
                    bio={profileData?.bio || ''}
                    onBioUpdate={updateBio}
                  />
                </div>

                {/* Education Section */}
                <div className='lg:col-span-1 xl:col-span-1'>
                  <EducationSection
                    degrees={profileData?.degrees || []}
                    onDegreesUpdate={updateDegrees}
                  />
                </div>
              </div>

              {/* Bottom Section Grid */}
              <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                {/* Subjects Section */}
                <SubjectsSection
                  subjects={profileData?.subjects || []}
                  onSubjectsUpdate={updateSubjects}
                />

                {/* Teaching Levels */}
                <LevelsSection
                  levels={profileData?.levels || []}
                  onLevelsUpdate={updateLevels}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProfilePage
