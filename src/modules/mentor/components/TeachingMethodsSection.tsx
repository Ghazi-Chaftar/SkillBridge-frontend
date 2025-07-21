'use client'

import { motion } from 'framer-motion'
import {
  Check,
  CircleCheck,
  Edit3,
  Lightbulb,
  Monitor,
  Users,
  Zap
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRef, useState } from 'react'

import { Button } from '@/src/app/shared/components'

import { useUpdateProfile } from '../hooks/profileManagement'

interface TeachingMethodsSectionProps {
  teachingMethod: string
  onMethodUpdate?: (method: string) => void
}

const TeachingMethodsSection: React.FC<TeachingMethodsSectionProps> = ({
  teachingMethod,
  onMethodUpdate
}) => {
  const t = useTranslations('mentor.profile')

  // Local editing state
  const [isEditing, setIsEditing] = useState(false)
  const updateProfileMutation = useUpdateProfile('profile')

  // Store the original teaching method when entering edit mode
  const originalMethodRef = useRef<string | null>(null)

  const methodOptions = [
    {
      key: 'online',
      label: t('teachingMethods.online'),
      icon: Monitor,
      description: t('teachingMethods.onlineDesc'),
      color: 'purple'
    },
    {
      key: 'in person',
      label: t('teachingMethods.inPerson'),
      icon: Users,
      description: t('teachingMethods.inPersonDesc'),
      color: 'purple'
    },
    {
      key: 'hybrid',
      label: t('teachingMethods.hybrid'),
      icon: Zap,
      description: t('teachingMethods.hybridDesc'),
      color: 'purple'
    }
  ]

  const handleMethodSelect = (methodKey: string): void => {
    if (isEditing) {
      onMethodUpdate?.(methodKey)
    }
  }

  const onEditToggle = (): void => {
    if (isEditing) {
      // When saving, check if teaching method has changed
      const hasChanges =
        originalMethodRef.current !== null &&
        originalMethodRef.current !== teachingMethod

      // Only mutate if there are actual changes
      if (hasChanges) {
        updateProfileMutation.mutate({
          teachingMethod
        })
      }

      // Clear the original method
      originalMethodRef.current = null
    } else {
      // When entering edit mode, store the original teaching method
      originalMethodRef.current = teachingMethod
    }

    setIsEditing(prev => !prev)
  }

  return (
    <motion.div
      className='rounded-2xl border border-gray-100 bg-white p-6 shadow-sm'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
    >
      <div className='mb-6 flex items-center justify-between'>
        <h2 className='flex items-center gap-2 text-xl font-semibold text-gray-900'>
          <Lightbulb className='h-5 w-5 text-blue-600' />
          {t('teachingMethods.title')}
        </h2>
        <Button onClick={onEditToggle} variant='ghost' size='sm'>
          {isEditing ? (
            <CircleCheck className='h-6 w-6' />
          ) : (
            <Edit3 className='h-4 w-4' />
          )}
        </Button>
      </div>

      <div className='grid grid-cols-1 gap-4'>
        {methodOptions.map((option, index) => {
          const isSelected = teachingMethod === option.key
          const colorClasses = {
            blue: {
              selected: 'bg-blue-50 border-blue-300 text-blue-800',
              unselected:
                'bg-gray-50 border-gray-200 text-gray-700 hover:border-blue-200 hover:bg-blue-50'
            },
            green: {
              selected: 'bg-green-50 border-green-300 text-green-800',
              unselected:
                'bg-gray-50 border-gray-200 text-gray-700 hover:border-green-200 hover:bg-green-50'
            },
            purple: {
              selected: 'bg-purple-50 border-purple-300 text-purple-800',
              unselected:
                'bg-gray-50 border-gray-200 text-gray-700 hover:border-purple-200 hover:bg-purple-50'
            }
          }

          return (
            <motion.button
              key={option.key}
              onClick={() => handleMethodSelect(option.key)}
              disabled={!isEditing}
              className={`relative rounded-xl border-2 p-4 text-left transition-all ${
                isSelected
                  ? colorClasses[option.color as keyof typeof colorClasses]
                      .selected
                  : colorClasses[option.color as keyof typeof colorClasses]
                      .unselected
              } ${isEditing ? 'cursor-pointer' : 'cursor-default'}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className='flex items-start gap-3'>
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    isSelected ? `bg-${option.color}-200` : 'bg-gray-200'
                  }`}
                >
                  <option.icon
                    className={`h-5 w-5 ${
                      isSelected ? `text-${option.color}-700` : 'text-gray-600'
                    }`}
                  />
                </div>
                <div className='flex-1'>
                  <div className='flex items-center justify-between'>
                    <h3 className='font-semibold'>{option.label}</h3>
                    {isSelected && (
                      <div
                        className={`h-6 w-6 bg-${option.color}-500 flex items-center justify-center rounded-full`}
                      >
                        <Check className='h-4 w-4 text-white' />
                      </div>
                    )}
                  </div>
                  <p className='mt-1 text-sm opacity-80'>
                    {option.description}
                  </p>
                </div>
              </div>
            </motion.button>
          )
        })}
      </div>
    </motion.div>
  )
}

export default TeachingMethodsSection
