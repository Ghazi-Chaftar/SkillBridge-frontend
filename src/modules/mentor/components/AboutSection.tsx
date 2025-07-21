'use client'

import { motion } from 'framer-motion'
import { CircleCheck, Edit3, FileText, Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'

import { Button, Textarea } from '@/src/app/shared/components'
import Description from '@/src/app/shared/components/utils/Description'

import { useUpdateProfile } from '../hooks/profileManagement'

interface AboutSectionProps {
  bio: string
  onBioUpdate: (bio: string) => void
}

const AboutSection: React.FC<AboutSectionProps> = ({ bio, onBioUpdate }) => {
  const t = useTranslations('mentor.profile')

  const [isBlurred, setIsBlurred] = useState(!bio)
  const [isEditing, setIsEditing] = useState(false)
  const updateProfileMutation = useUpdateProfile('profile')

  // Store the original bio when entering edit mode
  const originalBioRef = useRef<string | null>(null)

  const onEditToggle = (): void => {
    if (isEditing) {
      // When saving, check if bio has changed
      const hasChanges =
        originalBioRef.current !== null && originalBioRef.current !== bio

      // Only mutate if there are actual changes
      if (hasChanges) {
        updateProfileMutation.mutate({
          bio: bio
        })
      }

      // Clear the original bio
      originalBioRef.current = null
    } else {
      // When entering edit mode, store the original bio
      originalBioRef.current = bio
    }

    setIsEditing(prev => !prev)
  }

  const handleSave = (): void => {
    onBioUpdate(bio)
    onEditToggle()
    setIsBlurred(false)
  }

  const handleSetData = (): void => {
    setIsBlurred(false)
    onEditToggle()
  }

  useEffect(() => {
    if (bio.length > 0) {
      setIsBlurred(false)
    }
  }, [bio])

  return (
    <motion.div
      className='relative rounded-2xl border border-gray-100 bg-white p-6 pb-20 shadow-sm'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Blur overlay for empty sections */}
      {isBlurred && !isEditing && (
        <div className='absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-white/80 backdrop-blur-sm'>
          <Button onClick={handleSetData} className='shadow-lg'>
            <Plus className='mr-2 h-4 w-4' />
            {t('addAboutInfo')}
          </Button>
        </div>
      )}

      <div className='mb-6 flex items-center justify-between'>
        <h2 className='flex items-center gap-2 text-xl font-semibold text-gray-900'>
          <FileText className='h-5 w-5 text-blue-600' />
          {t('aboutMe')}
        </h2>
        {!isBlurred && (
          <Button
            onClick={isEditing ? handleSave : onEditToggle}
            variant='ghost'
            size='sm'
          >
            {isEditing ? (
              <CircleCheck className='h-6 w-6' />
            ) : (
              <Edit3 className='h-4 w-4' />
            )}
          </Button>
        )}
      </div>

      <div className='space-y-4'>
        {isEditing ? (
          <Textarea
            value={bio}
            onChange={e => onBioUpdate(e.target.value)}
            placeholder={t('bioPlaceholder')}
            className=''
          />
        ) : (
          <div className='prose max-w-none'>
            <Description description={bio || t('noBioYet')} lineNumber='3' />
            {/* <p className='leading-relaxed text-gray-700'>
              {bio || t('noBioYet')}
            </p> */}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default AboutSection
