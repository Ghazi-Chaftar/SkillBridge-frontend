'use client'

import { motion } from 'framer-motion'
import { Award, CircleCheck, Edit3, Plus, X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'

import { Button, Input } from '@/src/app/shared/components'

import { useUpdateProfile } from '../hooks/profileManagement'

interface EducationSectionProps {
  degrees: string[]
  onDegreesUpdate: (degrees: string[]) => void
}

const EducationSection: React.FC<EducationSectionProps> = ({
  degrees,
  onDegreesUpdate
}) => {
  const t = useTranslations('mentor.profile')

  const [newDegree, setNewDegree] = useState('')
  const [isBlurred, setIsBlurred] = useState(degrees.length === 0)
  const [isEditing, setIsEditing] = useState(false)
  const updateProfileMutation = useUpdateProfile('profile')

  // Store the original degrees when entering edit mode
  const originalDegreesRef = useRef<string[] | null>(null)

  const onEditToggle = (): void => {
    if (isEditing) {
      // When saving, check if degrees have changed
      const hasChanges =
        originalDegreesRef.current &&
        (originalDegreesRef.current.length !== degrees.length ||
          !originalDegreesRef.current.every(
            (degree, index) => degree === degrees[index]
          ) ||
          !degrees.every(
            (degree, index) => degree === originalDegreesRef.current![index]
          ))

      // Only mutate if there are actual changes
      if (hasChanges) {
        updateProfileMutation.mutate({
          degrees: degrees
        })
      }

      // Clear the original degrees
      originalDegreesRef.current = null
    } else {
      // When entering edit mode, store the original degrees
      originalDegreesRef.current = [...degrees]
    }

    setIsEditing(prev => !prev)
  }

  const addDegree = (): void => {
    if (
      newDegree.trim() &&
      !degrees.includes(newDegree.trim()) &&
      degrees.length < 4
    ) {
      const updated = [...degrees, newDegree.trim()]
      onDegreesUpdate(updated)
      setNewDegree('')
    }
  }

  const removeDegree = (degree: string): void => {
    const updated = degrees.filter(d => d !== degree)
    onDegreesUpdate(updated)
  }

  const handleSetData = (): void => {
    setIsBlurred(false)
    onEditToggle()
  }

  useEffect(() => {
    if (degrees.length > 0) {
      setIsBlurred(false)
    }
  }, [degrees])

  return (
    <motion.div
      className='relative rounded-2xl border border-gray-100 bg-white p-6 shadow-sm'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      {/* Blur overlay for empty sections */}
      {isBlurred && !isEditing && (
        <div className='absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-white/80 backdrop-blur-sm'>
          <Button onClick={handleSetData} className='shadow-lg'>
            <Plus className='mr-2 h-4 w-4' />
            {t('addEducation')}
          </Button>
        </div>
      )}

      <div className='mb-6 flex items-center justify-between'>
        <h2 className='flex items-center gap-2 text-xl font-semibold text-gray-900'>
          <Award className='h-5 w-5 text-blue-600' />
          {t('educationCredentials')}
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
        {isEditing && (
          <div className='space-y-2'>
            <div className='flex items-center gap-2'>
              <Input
                value={newDegree}
                onChange={e => setNewDegree(e.target.value)}
                placeholder={
                  degrees.length >= 4
                    ? t('maxEducationReached')
                    : t('addDegreePlaceholder')
                }
                onKeyPress={e => e.key === 'Enter' && addDegree()}
                className='flex-1'
                disabled={degrees.length >= 4}
              />
              <Button
                onClick={addDegree}
                size='sm'
                disabled={degrees.length >= 4}
              >
                <Plus className='h-4 w-4' />
              </Button>
            </div>
            {degrees.length >= 4 && (
              <p className='text-sm text-orange-600'>
                {t('maxEducationLimit')}
              </p>
            )}
          </div>
        )}

        <div className='space-y-3'>
          {degrees.map((degree, index) => (
            <motion.div
              key={degree}
              className='flex items-center justify-between rounded-xl border border-orange-200 bg-orange-50 p-4'
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className='flex items-center gap-3'>
                <div className='flex h-8 w-8 items-center justify-center rounded-full bg-orange-200'>
                  <Award className='h-4 w-4 text-orange-700' />
                </div>
                <span className='font-medium text-orange-800'>{degree}</span>
              </div>
              {isEditing && (
                <button
                  onClick={() => removeDegree(degree)}
                  className='flex h-6 w-6 items-center justify-center rounded-full bg-orange-200 transition-colors hover:bg-orange-300'
                >
                  <X className='h-4 w-4 text-orange-700' />
                </button>
              )}
            </motion.div>
          ))}
        </div>

        {degrees.length === 0 && !isEditing && (
          <p className='py-8 text-center text-gray-500'>
            {t('noEducationYet')}
          </p>
        )}
      </div>
    </motion.div>
  )
}

export default EducationSection
