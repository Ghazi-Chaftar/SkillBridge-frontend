'use client'

import { motion } from 'framer-motion'
import { Camera, Edit3, MapPin, Phone, User } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'

import {
  Button,
  Form,
  FormElement,
  Input,
  PhoneInput,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/src/app/shared/components'
import useCustomForm from '@/src/app/shared/hooks/useCustomForm'

import { useUpdateProfile, useUpdateUser } from '../hooks/profileManagement'
import {
  ProfileHeaderFormData,
  profileHeaderSchema
} from '../schemas/profileSchemas'

interface ProfileHeaderProps {
  profileData: {
    firstName: string
    lastName: string
    location: string
    profilePicture: string
    phoneNumber: string
    gender: string
  }
  onFieldUpdate: (field: string, value: any) => void
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  profileData,
  onFieldUpdate
}) => {
  const t = useTranslations('mentor.profile')
  const tauth = useTranslations('auth')
  const [isEditing, setIsEditing] = useState(false)

  const onEditToggle = (): void => {
    setIsEditing(prev => !prev)
  }

  const { form, handleSubmit, control, reset, setValue } = useCustomForm(
    profileHeaderSchema,
    {},
    {
      firstName: profileData.firstName,
      lastName: profileData.lastName,
      phoneNumber: profileData.phoneNumber,
      location: profileData.location,
      gender: profileData.gender
    }
  )
  const updateUserMutation = useUpdateUser('user')
  const updateProfileMutation = useUpdateProfile('profile')

  const onSubmit: SubmitHandler<ProfileHeaderFormData> = data => {
    const userDataChanged =
      data.firstName !== profileData.firstName ||
      data.lastName !== profileData.lastName ||
      data.phoneNumber !== profileData.phoneNumber

    const profileDataChanged =
      data.gender !== profileData.gender ||
      data.location !== profileData.location

    onFieldUpdate('firstName', data.firstName)
    onFieldUpdate('lastName', data.lastName)
    onFieldUpdate('phoneNumber', data.phoneNumber)
    onFieldUpdate('location', data.location)
    onFieldUpdate('gender', data.gender)

    if (userDataChanged) {
      updateUserMutation.mutate({
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber
      })
    }

    if (profileDataChanged) {
      updateProfileMutation.mutate({
        gender: data.gender || 'male',
        location: data.location
      })
    }

    reset()
    setIsEditing(false)
  }

  return (
    <motion.div
      className='mb-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:mb-6 sm:p-6 lg:mb-8 lg:p-8'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Form {...form} className='w-full'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col gap-4 sm:gap-6 lg:flex-row lg:items-start lg:gap-8'>
            {/* Profile Picture */}
            <div className='group relative mx-auto lg:mx-0'>
              <div className='flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-purple-100 to-blue-100 sm:h-28 sm:w-28 lg:h-32 lg:w-32'>
                {profileData.profilePicture ? (
                  <img
                    src={profileData.profilePicture}
                    alt={t('profilePicture')}
                    className='h-full w-full object-cover'
                  />
                ) : (
                  <User className='h-12 w-12 text-gray-400 sm:h-14 sm:w-14 lg:h-16 lg:w-16' />
                )}
              </div>
              {isEditing && (
                <button className='absolute inset-0 flex items-center justify-center rounded-2xl bg-black/50 opacity-0 transition-opacity group-hover:opacity-100'>
                  <Camera className='h-6 w-6 text-white sm:h-7 sm:w-7 lg:h-8 lg:w-8' />
                </button>
              )}
            </div>

            {/* Profile Info */}
            <div className='flex-1 space-y-3 sm:space-y-4'>
              <div className='flex flex-col gap-3 sm:gap-4'>
                <div className='space-y-2'>
                  {/* Edit Button for Mobile */}
                  <div className='flex items-center justify-between lg:hidden'>
                    <div></div>
                    {!isEditing && (
                      <Button
                        onClick={onEditToggle}
                        variant='outline'
                        size='sm'
                        className='shrink-0'
                        type='button'
                      >
                        <Edit3 className='mr-1 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4' />
                        <span className='text-xs sm:text-sm'>
                          {t('editProfile')}
                        </span>
                      </Button>
                    )}
                    {isEditing && (
                      <Button
                        variant='outline'
                        size='sm'
                        className='shrink-0'
                        type='submit'
                        isPending={
                          updateUserMutation.isPending ||
                          updateProfileMutation.isPending
                        }
                        isSuccess={
                          updateUserMutation.isSuccess ||
                          updateProfileMutation.isSuccess
                        }
                      >
                        <Edit3 className='mr-1 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4' />
                        <span className='text-xs sm:text-sm'>{t('save')}</span>
                      </Button>
                    )}
                  </div>

                  {/* Name Section */}
                  {isEditing ? (
                    <div className='flex flex-col gap-2 sm:flex-row sm:gap-4'>
                      <FormElement
                        control={control}
                        name='firstName'
                        label={tauth('form.firstName')}
                        errorClassName='text-xs w-full'
                      >
                        <Input
                          placeholder={t('firstName')}
                          className='text-sm sm:text-base'
                        />
                      </FormElement>
                      <FormElement
                        control={control}
                        name='lastName'
                        label={tauth('form.lastName')}
                        errorClassName='text-xs w-full'
                      >
                        <Input
                          placeholder={t('lastName')}
                          className='text-sm sm:text-base'
                        />
                      </FormElement>
                    </div>
                  ) : (
                    <h1 className='text-xl font-bold text-gray-900 sm:text-2xl lg:text-3xl'>
                      {profileData.firstName} {profileData.lastName}
                    </h1>
                  )}
                </div>

                {/* Contact Info */}
                <div className='space-y-2'>
                  {isEditing ? (
                    <div className='space-y-3'>
                      <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3'>
                        <FormElement
                          control={control}
                          name='location'
                          label={t('location')}
                          errorClassName='text-xs w-full'
                        >
                          <Input
                            placeholder={t('location')}
                            className='w-full text-sm sm:text-base'
                          />
                        </FormElement>
                        <FormElement
                          control={control}
                          name='phoneNumber'
                          label={t('phoneNumber')}
                          errorClassName='text-xs w-full'
                        >
                          <PhoneInput
                            placeholder={t('phoneNumber')}
                            className='w-full text-sm sm:text-base'
                          />
                        </FormElement>
                        <FormElement
                          control={control}
                          name='gender'
                          label={t('gender')}
                          errorClassName='text-xs w-full'
                        >
                          <Select
                            onValueChange={value => setValue('gender', value)}
                          >
                            <SelectTrigger className='w-full text-sm sm:text-base'>
                              <SelectValue placeholder={t('selectGender')} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value='male'>{t('male')}</SelectItem>
                              <SelectItem value='female'>
                                {t('female')}
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormElement>
                      </div>
                    </div>
                  ) : (
                    <div className='flex flex-col gap-2 text-gray-600 sm:flex-row sm:flex-wrap sm:gap-4 lg:flex-row lg:gap-6'>
                      {profileData.location && (
                        <div className='flex items-center gap-1'>
                          <MapPin className='h-3 w-3 sm:h-4 sm:w-4' />
                          <span className='text-sm sm:text-base'>
                            {profileData.location}
                          </span>
                        </div>
                      )}
                      {profileData.phoneNumber && (
                        <div className='flex items-center gap-1'>
                          <Phone className='h-3 w-3 sm:h-4 sm:w-4' />
                          <span className='text-sm sm:text-base'>
                            {profileData.phoneNumber}
                          </span>
                        </div>
                      )}
                      {profileData.gender && (
                        <div className='flex items-center gap-1'>
                          <User className='h-3 w-3 sm:h-4 sm:w-4' />
                          <span className='text-sm sm:text-base'>
                            {t(profileData.gender)}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Edit Button for Desktop */}
                <div className='hidden lg:flex lg:justify-end'>
                  {!isEditing && (
                    <Button
                      onClick={onEditToggle}
                      variant='outline'
                      size='sm'
                      className='shrink-0'
                      type='button'
                    >
                      <Edit3 className='mr-2 h-4 w-4' />
                      {t('editProfile')}
                    </Button>
                  )}
                  {isEditing && (
                    <Button
                      variant='outline'
                      size='sm'
                      className='shrink-0'
                      type='submit'
                      isPending={
                        updateUserMutation.isPending ||
                        updateProfileMutation.isPending
                      }
                      isSuccess={
                        updateUserMutation.isSuccess ||
                        updateProfileMutation.isSuccess
                      }
                    >
                      <Edit3 className='mr-2 h-4 w-4' />
                      {t('save')}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </motion.div>
  )
}

export default ProfileHeader
