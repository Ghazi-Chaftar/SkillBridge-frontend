'use client'

import { motion } from 'framer-motion'
import { BookOpen, CircleCheck, Clock, DollarSign, Edit3 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRef, useState } from 'react'

import { Button, Input } from '@/src/app/shared/components'
import CurrencyInput from '@/src/app/shared/components/form/CurrencyInput'

import { useUpdateProfile } from '../hooks/profileManagement'

interface StatsCardsProps {
  statsData: {
    currency: string
    hourlyRate: number
    yearsOfExperience: number
  }
  onFieldUpdate: (field: string, value: any) => void
}

const StatsCards: React.FC<StatsCardsProps> = ({
  statsData,
  onFieldUpdate
}) => {
  const t = useTranslations('mentor.profile')
  const [isEditing, setIsEditing] = useState(false)
  const updateProfileMutation = useUpdateProfile('profile')

  // Store the original values when entering edit mode
  const originalValuesRef = useRef<{
    currency: string
    hourlyRate: number
    yearsOfExperience: number
  } | null>(null)

  const onEditToggle = (): void => {
    if (isEditing) {
      // When saving, check if values have changed
      const hasChanges =
        originalValuesRef.current &&
        (originalValuesRef.current.currency !== statsData.currency ||
          originalValuesRef.current.hourlyRate !== statsData.hourlyRate ||
          originalValuesRef.current.yearsOfExperience !==
            statsData.yearsOfExperience)

      // Only mutate if there are actual changes
      if (hasChanges) {
        updateProfileMutation.mutate({
          currency: statsData.currency,
          hourlyRate: statsData.hourlyRate.toString(),
          yearsOfExperience: statsData.yearsOfExperience.toString()
        })
      }

      // Clear the original values
      originalValuesRef.current = null
    } else {
      // When entering edit mode, store the original values
      originalValuesRef.current = {
        currency: statsData.currency,
        hourlyRate: statsData.hourlyRate,
        yearsOfExperience: statsData.yearsOfExperience
      }
    }

    setIsEditing(prev => !prev)
  }

  const handleInputChange = (
    field: string,
    value: string | number | React.ChangeEvent<HTMLInputElement>
  ): void => {
    // Convert value to string if it's a number or extract value from event
    const stringValue =
      typeof value === 'object' ? value.target.value : String(value)

    const numValue =
      field === 'hourlyRate' || field === 'experience'
        ? parseFloat(stringValue) || 0
        : parseInt(stringValue) || 0
    onFieldUpdate(field, numValue)
  }

  const stats = [
    {
      label: t('hourlyRate'),
      value: `${statsData.hourlyRate} ${statsData.currency}`,
      icon: DollarSign,
      color: 'bg-blue-500',
      field: 'hourlyRate'
    },
    {
      label: t('experience'),
      value: `${statsData.yearsOfExperience} ${t('years')}`,
      icon: Clock,
      color: 'bg-purple-500',
      field: 'yearsOfExperience'
    }
  ]

  return (
    <div className='rounded-2xl border border-gray-100 bg-white p-6 shadow-sm'>
      <div className='mb-6 flex items-center justify-between'>
        <h2 className='flex items-center gap-2 text-xl font-semibold text-gray-900'>
          <BookOpen className='h-5 w-5 text-blue-600' />
          {t('quickStats')}
        </h2>
        <Button onClick={onEditToggle} variant='ghost' size='sm'>
          {isEditing ? (
            <CircleCheck className='h-6 w-6' />
          ) : (
            <Edit3 className='h-4 w-4' />
          )}{' '}
        </Button>
      </div>

      <div className='space-y-4'>
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className='flex items-center gap-4 rounded-xl bg-gray-50 p-4 transition-colors hover:bg-gray-100'
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div
              className={`h-12 w-12 rounded-xl ${stat.color} flex items-center justify-center`}
            >
              <stat.icon className='h-6 w-6 text-white' />
            </div>
            <div className='flex-1'>
              <p className='text-sm font-medium text-gray-600'>{stat.label}</p>
              {isEditing ? (
                stat.field === 'hourlyRate' ? (
                  <CurrencyInput
                    value={statsData.hourlyRate}
                    onCurrencyChange={onFieldUpdate}
                    currencyCode={statsData.currency}
                    onChange={value => handleInputChange(stat.field, value)}
                    className='mt-1'
                  />
                ) : (
                  <Input
                    type='number'
                    value={statsData.yearsOfExperience}
                    onChange={e => handleInputChange(stat.field, e)}
                    className='mt-1'
                  />
                )
              ) : (
                <p className='text-lg font-semibold text-gray-900'>
                  {stat.value}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default StatsCards
