'use client'

import { motion } from 'framer-motion'
import { Check, GraduationCap } from 'lucide-react'
import { useTranslations } from 'next-intl'

interface LevelsSectionProps {
  levels: string[]
  isEditing: boolean
  onLevelsUpdate: (levels: string[]) => void
  onEditToggle: () => void
}

const LevelsSection: React.FC<LevelsSectionProps> = ({
  levels,
  isEditing,
  onLevelsUpdate,
  onEditToggle
}) => {
  const t = useTranslations('mentor.profile')

  const levelOptions = [
    { key: 'primarySchool', value: 'Primary School' },
    { key: 'highSchool', value: 'High School' },
    { key: 'university', value: 'University' }
  ]

  const isLevelSelected = (level: string): boolean => {
    return levels.includes(level)
  }

  const toggleLevel = (level: string): void => {
    if (isLevelSelected(level)) {
      onLevelsUpdate(levels.filter(l => l !== level))
    } else {
      onLevelsUpdate([...levels, level])
    }
  }

  return (
    <motion.div
      className='rounded-2xl bg-white p-6 shadow-lg'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <div className='mb-4 flex items-center space-x-2'>
        <GraduationCap className='h-6 w-6 text-purple-600' />
        <h3 className='text-xl font-semibold text-gray-900'>
          {t('teachingLevels')}
        </h3>
      </div>
      <div className='space-y-3'>
        {levels.length > 0 || isEditing ? (
          levelOptions.map(option => (
            <div
              key={option.key}
              className={`flex items-center justify-between rounded-lg p-4 transition-colors ${
                isLevelSelected(option.value)
                  ? 'border-2 border-purple-200 bg-purple-50'
                  : 'border-2 border-transparent bg-gray-50'
              }`}
            >
              <div className='flex items-center space-x-3'>
                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-full ${
                    isLevelSelected(option.value)
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-300'
                  }`}
                >
                  {isLevelSelected(option.value) && (
                    <Check className='h-4 w-4' />
                  )}
                </div>
                <span
                  className={`font-medium ${
                    isLevelSelected(option.value)
                      ? 'text-purple-700'
                      : 'text-gray-700'
                  }`}
                >
                  {t(`levelOptions.${option.key}`)}
                </span>
              </div>
              {isEditing && (
                <button
                  onClick={() => toggleLevel(option.value)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    isLevelSelected(option.value)
                      ? 'bg-purple-600 text-white hover:bg-purple-700'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {isLevelSelected(option.value) ? 'Remove' : 'Select'}
                </button>
              )}
            </div>
          ))
        ) : (
          <div className='relative'>
            <div className='space-y-3 blur-sm'>
              <div className='flex items-center justify-between rounded-lg border-2 border-purple-200 bg-purple-50 p-4'>
                <div className='flex items-center space-x-3'>
                  <div className='flex h-6 w-6 items-center justify-center rounded-full bg-purple-600 text-white'>
                    <Check className='h-4 w-4' />
                  </div>
                  <span className='font-medium text-purple-700'>
                    High School
                  </span>
                </div>
              </div>
              <div className='flex items-center justify-between rounded-lg border-2 border-transparent bg-gray-50 p-4'>
                <div className='flex items-center space-x-3'>
                  <div className='flex h-6 w-6 items-center justify-center rounded-full bg-gray-300'></div>
                  <span className='font-medium text-gray-700'>University</span>
                </div>
              </div>
            </div>
            <div className='absolute inset-0 flex items-center justify-center'>
              <button
                onClick={onEditToggle}
                className='rounded-lg bg-purple-600 px-6 py-3 text-white transition-colors hover:bg-purple-700'
              >
                Set Teaching Levels
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default LevelsSection
