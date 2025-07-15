'use client'

import { motion } from 'framer-motion'

import { Link } from '@/src/navigation'

const AuthHeader = (): JSX.Element => {
  return (
    <motion.div
      className='mb-8 text-center'
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <div className='flex items-center justify-center'>
        <Link href='/client/home'>
          <div className='flex items-center space-x-2'>
            <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-blue-500'>
              <span className='text-sm font-bold text-white'>S</span>
            </div>
            <span className='text-xl font-bold text-gray-900'>SkillBridge</span>
          </div>
        </Link>
      </div>
    </motion.div>
  )
}

export default AuthHeader
