'use client'

import { motion } from 'framer-motion'
import { CircleCheck, Edit3, Globe, Plus, X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'

import { Button, Input } from '@/src/app/shared/components'

import { useUpdateProfile } from '../hooks/profileManagement'

interface LanguagesSectionProps {
  languages: string[]
  onLanguagesUpdate: (languages: string[]) => void
}

const LanguagesSection: React.FC<LanguagesSectionProps> = ({
  languages,
  onLanguagesUpdate
}) => {
  const t = useTranslations('mentor.profile')

  const [newLanguage, setNewLanguage] = useState('')
  const [isBlurred, setIsBlurred] = useState(languages.length === 0)
  const [isEditing, setIsEditing] = useState(false)
  const updateProfileMutation = useUpdateProfile('profile')

  // Store the original languages when entering edit mode
  const originalLanguagesRef = useRef<string[] | null>(null)

  const onEditToggle = (): void => {
    if (isEditing) {
      // When saving, check if languages have changed
      const hasChanges =
        originalLanguagesRef.current &&
        (originalLanguagesRef.current.length !== languages.length ||
          !originalLanguagesRef.current.every(
            (lang, index) => lang === languages[index]
          ) ||
          !languages.every(
            (lang, index) => lang === originalLanguagesRef.current![index]
          ))

      // Only mutate if there are actual changes
      if (hasChanges) {
        updateProfileMutation.mutate({
          languages
        })
      }

      // Clear the original languages
      originalLanguagesRef.current = null
    } else {
      // When entering edit mode, store the original languages
      originalLanguagesRef.current = [...languages]
    }

    setIsEditing(prev => !prev)
  }

  const addLanguage = (): void => {
    if (newLanguage.trim() && !languages.includes(newLanguage.trim())) {
      const updated = [...languages, newLanguage.trim()]
      onLanguagesUpdate(updated)
      setNewLanguage('')
    }
  }

  const removeLanguage = (language: string): void => {
    const updated = languages.filter(l => l !== language)
    onLanguagesUpdate(updated)
  }

  const handleSetData = (): void => {
    setIsBlurred(false)
    onEditToggle()
  }

  useEffect(() => {
    if (languages.length > 0) {
      setIsBlurred(false)
    }
  }, [languages])

  return (
    <motion.div
      className='relative rounded-2xl border border-gray-100 bg-white p-6 shadow-sm'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      {/* Blur overlay for empty sections */}
      {isBlurred && !isEditing && (
        <div className='absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-white/80 backdrop-blur-sm'>
          <Button onClick={handleSetData} className='shadow-lg'>
            <Plus className='mr-2 h-4 w-4' />
            {t('addLanguages')}
          </Button>
        </div>
      )}

      <div className='mb-6 flex items-center justify-between'>
        <h2 className='flex items-center gap-2 text-xl font-semibold text-gray-900'>
          <Globe className='h-5 w-5 text-blue-600' />
          {t('languages')}
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
          <div className='flex items-center justify-center gap-2'>
            <Input
              value={newLanguage}
              onChange={e => setNewLanguage(e.target.value)}
              placeholder={t('addLanguagePlaceholder')}
              onKeyPress={e => e.key === 'Enter' && addLanguage()}
              className='flex-1'
            />
            <Button onClick={addLanguage} size='sm'>
              <Plus className='h-4 w-4' />
            </Button>
          </div>
        )}

        <div className='flex flex-wrap gap-2'>
          {languages.map((language, index) => (
            <motion.span
              key={language}
              className='inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-2 text-sm font-medium text-blue-800'
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              {language}
              {isEditing && (
                <button
                  onClick={() => removeLanguage(language)}
                  className='flex h-4 w-4 items-center justify-center rounded-full bg-blue-200 transition-colors hover:bg-blue-300'
                >
                  <X className='h-3 w-3' />
                </button>
              )}
            </motion.span>
          ))}
        </div>

        {languages.length === 0 && !isEditing && (
          <p className='py-8 text-center text-gray-500'>
            {t('noLanguagesYet')}
          </p>
        )}
      </div>
    </motion.div>
  )
}

export default LanguagesSection
