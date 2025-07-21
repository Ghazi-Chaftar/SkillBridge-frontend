'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

import AuthFeatures from '@/src/modules/login/components/AuthFeatures'
import AuthHeader from '@/src/modules/login/components/AuthHeader'
import LoginForm from '@/src/modules/login/components/LoginForm'
import RegistrationForm from '@/src/modules/login/components/RegistrationForm'

const AuthPage = (): JSX.Element => {
  const t = useTranslations('auth')
  const [isLogin, setIsLogin] = useState(true)

  const toggleMode = (): void => {
    setIsLogin(!isLogin)
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100'>
      <div className='flex min-h-screen'>
        {/* Left Side - Features */}
        <AuthFeatures />

        {/* Right Side - Auth Form */}
        <motion.div
          className='flex w-full items-center justify-center p-8 lg:w-1/2'
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className='w-full max-w-md'>
            {/* Logo/Brand */}
            <AuthHeader />

            {/* Form Toggle */}
            <motion.div
              className='mb-8 flex rounded-lg bg-gray-100 p-1'
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <button
                onClick={() => !isLogin && toggleMode()}
                className={`flex-1 rounded-md py-2 text-center font-semibold transition-all ${
                  isLogin
                    ? 'bg-white text-purple-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {t('tabs.login')}
              </button>
              <button
                onClick={() => isLogin && toggleMode()}
                className={`flex-1 rounded-md py-2 text-center font-semibold transition-all ${
                  !isLogin
                    ? 'bg-white text-purple-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {t('tabs.register')}
              </button>
            </motion.div>

            {/* Forms */}
            <motion.div
              key={isLogin ? 'login' : 'register'}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {isLogin ? <LoginForm /> : <RegistrationForm />}
            </motion.div>

            {/* Footer */}
            <motion.div
              className='mt-8 text-center text-sm text-gray-600'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              {isLogin ? (
                <p>
                  {t('form.noAccount')}{' '}
                  <button
                    onClick={toggleMode}
                    className='font-medium text-purple-600 hover:text-purple-700'
                  >
                    {t('form.signUpLink')}
                  </button>
                </p>
              ) : (
                <p>
                  {t('form.haveAccount')}{' '}
                  <button
                    onClick={toggleMode}
                    className='font-medium text-purple-600 hover:text-purple-700'
                  >
                    {t('form.signInLink')}
                  </button>
                </p>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AuthPage
