'use client'

import { motion } from 'framer-motion'
import { CircleCheck, Edit3, GraduationCap, Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'

import { Button } from '@/src/app/shared/components'

import { useUpdateProfile } from '../hooks/profileManagement'

interface LevelsSectionProps {
  levels: string[]
  onLevelsUpdate: (levels: string[]) => void
}

const LevelsSection: React.FC<LevelsSectionProps> = ({
  levels,
  onLevelsUpdate
}) => {
  const t = useTranslations('mentor.profile')

  const [isBlurred, setIsBlurred] = useState(levels.length === 0)
  const [isEditing, setIsEditing] = useState(false)
  const updateProfileMutation = useUpdateProfile('profile')

  // Store the original levels when entering edit mode
  const originalLevelsRef = useRef<string[] | null>(null)

  const onEditToggle = (): void => {
    if (isEditing) {
      // When saving, check if levels have changed
      const hasChanges =
        originalLevelsRef.current &&
        (originalLevelsRef.current.length !== levels.length ||
          !originalLevelsRef.current.every(
            (level, index) => level === levels[index]
          ) ||
          !levels.every(
            (level, index) => level === originalLevelsRef.current![index]
          ))

      // Only mutate if there are actual changes
      if (hasChanges) {
        updateProfileMutation.mutate({
          levels
        })
      }

      // Clear the original levels
      originalLevelsRef.current = null
    } else {
      // When entering edit mode, store the original levels
      originalLevelsRef.current = [...levels]
    }

    setIsEditing(prev => !prev)
  }

  const availableLevels = [
    { key: 'primary', label: t('levels.elementary') },
    { key: 'high school', label: t('levels.highSchool') },
    { key: 'university', label: t('levels.college') }
  ]

  const toggleLevel = (level: string): void => {
    const updated = levels.includes(level)
      ? levels.filter(l => l !== level)
      : [...levels, level]

    onLevelsUpdate(updated)
  }

  const handleSetData = (): void => {
    setIsBlurred(false)
    onEditToggle()
  }

  useEffect(() => {
    if (levels.length > 0) {
      setIsBlurred(false)
    }
  }, [levels])

  return (
    <motion.div
      className='relative rounded-2xl border border-gray-100 bg-white p-6 shadow-sm'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      {/* Blur overlay for empty sections */}
      {isBlurred && !isEditing && (
        <div className='absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-white/80 backdrop-blur-sm'>
          <Button onClick={handleSetData} className='shadow-lg'>
            <Plus className='mr-2 h-4 w-4' />
            {t('addTeachingLevels')}
          </Button>
        </div>
      )}

      <div className='mb-6 flex items-center justify-between'>
        <h2 className='flex items-center gap-2 text-xl font-semibold text-gray-900'>
          <GraduationCap className='h-5 w-5 text-blue-600' />
          {t('teachingLevels')}
        </h2>
        {!isBlurred && (
          <Button onClick={onEditToggle} variant='ghost' size='sm'>
            {isEditing ? (
              <CircleCheck className='h-6 w-6' />
            ) : (
              <Edit3 className='h-4 w-4' />
            )}
          </Button>
        )}
      </div>

      <div className='space-y-4'>
        <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
          {availableLevels.map((level, index) => (
            <motion.button
              key={level.key}
              onClick={() => isEditing && toggleLevel(level.key)}
              disabled={!isEditing}
              className={`rounded-xl border-2 p-4 text-left transition-all ${
                levels.includes(level.key)
                  ? 'border-purple-300 bg-purple-50 text-purple-800'
                  : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-300'
              } ${isEditing ? 'cursor-pointer' : 'cursor-default'}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className='flex items-center justify-between'>
                <span className='font-medium'>{level.label}</span>
                {levels.includes(level.label) && (
                  <div className='bg-green-500 flex h-5 w-5 items-center justify-center rounded-full'>
                    <div className='h-2 w-2 rounded-full bg-white' />
                  </div>
                )}
              </div>
            </motion.button>
          ))}
        </div>

        {levels.length === 0 && !isEditing && (
          <p className='py-8 text-center text-gray-500'>{t('noLevelsYet')}</p>
        )}
      </div>
    </motion.div>
  )
}

export default LevelsSection
