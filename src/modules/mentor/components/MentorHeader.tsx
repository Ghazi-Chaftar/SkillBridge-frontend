'use client'

import { motion } from 'framer-motion'
import { Bell, Search, Settings, User } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Input } from '@/src/app/shared/components'

interface MentorHeaderProps {
  locale: string
}

const MentorHeader: React.FC<MentorHeaderProps> = ({ locale: _locale }) => {
  const t = useTranslations('mentor')

  return (
    <motion.header
      className='border-b border-gray-200 bg-white px-6 py-4 shadow-sm'
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className='flex items-center justify-between'>
        {/* Search Bar */}
        <div className='flex flex-1 items-center space-x-4'>
          <div className='relative max-w-md flex-1'>
            <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400' />
            <Input
              type='text'
              placeholder={t('header.searchPlaceholder')}
              className='pl-10 pr-4'
            />
          </div>
        </div>

        {/* Right Side Actions */}
        <div className='flex items-center space-x-4'>
          {/* Notifications */}
          <motion.button
            className='relative rounded-full p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bell className='h-5 w-5' />
            <span className='absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white'>
              3
            </span>
          </motion.button>

          {/* Settings */}
          <motion.button
            className='rounded-full p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Settings className='h-5 w-5' />
          </motion.button>

          {/* Profile Menu */}
          <motion.div
            className='flex items-center space-x-3'
            whileHover={{ scale: 1.02 }}
          >
            <div className='hidden text-right sm:block'>
              <p className='text-sm font-medium text-gray-900'>John Doe</p>
              <p className='text-xs text-gray-500'>Mentor</p>
            </div>
            <button className='flex h-8 w-8 items-center justify-center rounded-full bg-purple-600 text-white hover:bg-purple-700'>
              <User className='h-4 w-4' />
            </button>
          </motion.div>
        </div>
      </div>
    </motion.header>
  )
}

export default MentorHeader
