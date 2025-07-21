'use client'

import { motion } from 'framer-motion'
import { BookOpen, CircleCheck, Edit3, Plus, X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'

import { Button, Input } from '@/src/app/shared/components'

import { useUpdateProfile } from '../hooks/profileManagement'

interface SubjectsSectionProps {
  subjects: string[]
  onSubjectsUpdate: (subjects: string[]) => void
}

const SubjectsSection: React.FC<SubjectsSectionProps> = ({
  subjects,
  onSubjectsUpdate
}) => {
  const t = useTranslations('mentor.profile')

  const [newSubject, setNewSubject] = useState('')
  const [isBlurred, setIsBlurred] = useState(subjects.length === 0)
  const [isEditing, setIsEditing] = useState(false)
  const updateProfileMutation = useUpdateProfile('profile')

  // Store the original subjects when entering edit mode
  const originalSubjectsRef = useRef<string[] | null>(null)

  const onEditToggle = (): void => {
    if (isEditing) {
      // When saving, check if subjects have changed
      const hasChanges =
        originalSubjectsRef.current &&
        (originalSubjectsRef.current.length !== subjects.length ||
          !originalSubjectsRef.current.every(
            (subject, index) => subject === subjects[index]
          ) ||
          !subjects.every(
            (subject, index) => subject === originalSubjectsRef.current![index]
          ))

      // Only mutate if there are actual changes
      if (hasChanges) {
        updateProfileMutation.mutate({
          subjects
        })
      }

      // Clear the original subjects
      originalSubjectsRef.current = null
    } else {
      // When entering edit mode, store the original subjects
      originalSubjectsRef.current = [...subjects]
    }

    setIsEditing(prev => !prev)
  }

  const addSubject = (): void => {
    if (newSubject.trim() && !subjects.includes(newSubject.trim())) {
      const updated = [...subjects, newSubject.trim()]
      onSubjectsUpdate(updated)
      setNewSubject('')
    }
  }

  const removeSubject = (subject: string): void => {
    const updated = subjects.filter(s => s !== subject)
    onSubjectsUpdate(updated)
  }

  const handleSetData = (): void => {
    setIsBlurred(false)
    onEditToggle()
  }

  useEffect(() => {
    if (subjects.length > 0) {
      setIsBlurred(false)
    }
  }, [subjects])

  return (
    <motion.div
      className='relative rounded-2xl border border-gray-100 bg-white p-6 shadow-sm'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Blur overlay for empty sections */}
      {isBlurred && !isEditing && (
        <div className='absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-white/80 backdrop-blur-sm'>
          <Button onClick={handleSetData} className='shadow-lg'>
            <Plus className='mr-2 h-4 w-4' />
            {t('addTeachingSubjects')}
          </Button>
        </div>
      )}

      <div className='mb-6 flex items-center justify-between'>
        <h2 className='flex items-center gap-2 text-xl font-semibold text-gray-900'>
          <BookOpen className='h-5 w-5 text-blue-600' />
          {t('teachingSubjects')}
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
          <div className='flex items-center gap-2'>
            <Input
              value={newSubject}
              onChange={e => setNewSubject(e.target.value)}
              placeholder={t('addSubjectPlaceholder')}
              onKeyPress={e => e.key === 'Enter' && addSubject()}
              className='flex-1'
            />
            <Button onClick={addSubject} size='sm'>
              <Plus className='h-4 w-4' />
            </Button>
          </div>
        )}

        <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
          {subjects.map((subject, index) => (
            <motion.div
              key={subject}
              className='flex items-center justify-between rounded-xl border border-purple-200 bg-purple-50 p-4'
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <span className='font-medium text-purple-800'>{subject}</span>
              {isEditing && (
                <button
                  onClick={() => removeSubject(subject)}
                  className='flex h-6 w-6 items-center justify-center rounded-full bg-purple-200 transition-colors hover:bg-purple-300'
                >
                  <X className='h-4 w-4 text-purple-700' />
                </button>
              )}
            </motion.div>
          ))}
        </div>

        {subjects.length === 0 && !isEditing && (
          <p className='py-8 text-center text-gray-500'>{t('noSubjectsYet')}</p>
        )}
      </div>
    </motion.div>
  )
}

export default SubjectsSection
