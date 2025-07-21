'use client'

import { motion } from 'framer-motion'
import { Calendar, Plus, X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { Button } from '@/src/app/shared/components'

interface AvailabilitySectionProps {
  availability: string[]
  isEditing: boolean
  onAvailabilityUpdate: (availability: string[]) => void
}

const AvailabilitySection: React.FC<AvailabilitySectionProps> = ({
  availability,
  isEditing,
  onAvailabilityUpdate
}) => {
  const t = useTranslations('mentor.profile')
  const [newAvailability, setNewAvailability] = useState('')

  const addAvailability = (): void => {
    if (newAvailability.trim()) {
      onAvailabilityUpdate([...availability, newAvailability.trim()])
      setNewAvailability('')
    }
  }

  const removeAvailability = (index: number): void => {
    onAvailabilityUpdate(availability.filter((_, i) => i !== index))
  }

  return (
    <motion.div
      className='rounded-2xl bg-white p-6 shadow-lg'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <h3 className='mb-4 text-xl font-semibold text-gray-900'>
        {t('availability')}
      </h3>
      <div className='space-y-3'>
        {availability.map((time, index) => (
          <div
            key={index}
            className='bg-green-50 flex items-center justify-between rounded-lg p-4'
          >
            <div className='flex items-center space-x-3'>
              <Calendar className='text-green-600 h-5 w-5' />
              <span className='text-gray-700'>{time}</span>
            </div>
            {isEditing && (
              <button
                onClick={() => removeAvailability(index)}
                className='rounded-full p-1 text-red-500 hover:bg-red-100'
              >
                <X className='h-4 w-4' />
              </button>
            )}
          </div>
        ))}
        {isEditing && (
          <div className='flex space-x-2'>
            <input
              value={newAvailability}
              onChange={e => setNewAvailability(e.target.value)}
              placeholder={t('addAvailabilityPlaceholder')}
              className='flex-1 rounded-lg border border-gray-300 px-3 py-2'
              onKeyPress={e => e.key === 'Enter' && addAvailability()}
            />
            <Button onClick={addAvailability} size='sm'>
              <Plus className='h-4 w-4' />
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default AvailabilitySection
