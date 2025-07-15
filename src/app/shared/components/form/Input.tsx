'use client'

import { Eye, EyeOff } from 'lucide-react'
import { useLocale } from 'next-intl'
import * as React from 'react'
import { useState } from 'react'

import { cn } from '@/lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  isPassword?: boolean
  icon?: React.ReactElement
  parentClassName?: string
  rightIcon?: React.ReactElement
  onFocus?: () => void
}

interface PasswordState {
  type: 'password' | 'text'
  isVisible: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      isPassword = false,
      icon,
      rightIcon,
      defaultValue,
      parentClassName,
      onFocus,

      ...props
    },
    ref
  ) => {
    const [state, setState] = useState<PasswordState>({
      type: type === 'password' ? 'password' : 'text',
      isVisible: isPassword
    })
    const currentLanguage = useLocale()

    const handleToggle = (): void => {
      setState(prevState => ({
        ...prevState,
        isVisible: !prevState.isVisible,
        type: prevState.type === 'password' ? 'text' : 'password'
      }))
    }

    return (
      <div className={cn('relative w-full ', parentClassName)}>
        {rightIcon && (
          <div
            className={cn(
              'absolute top-[30%]  ',
              currentLanguage === 'ar' ? 'left-[15px]' : 'right-[15px]'
            )}
          >
            {rightIcon}
          </div>
        )}
        {icon && (
          <div
            className={cn(
              'absolute top-[25%]  h-6 w-6',
              currentLanguage === 'ar' ? 'right-[15px]' : 'left-[15px]'
            )}
          >
            {icon}
          </div>
        )}
        <input
          type={state.type}
          className={cn(
            'border-input placeholder:text-text-secandary flex h-[48px] w-full rounded-full border bg-background bg-white px-3 py-2 text-sm text-secondary ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ',
            className,
            icon && 'pl-11',
            currentLanguage === 'ar' && icon && 'pr-10',
            rightIcon && 'pr-9',
            currentLanguage === 'ar' && rightIcon && 'pl-8'
          )}
          ref={ref}
          defaultValue={defaultValue}
          onFocus={onFocus}
          onBlur={e => {
            props.onBlur?.(e)
          }}
          {...props}
        />
        {type === 'password' && (
          <button
            className={cn(
              'absolute top-[30%]  ',
              currentLanguage === 'ar' ? 'left-[15px]' : 'right-[15px]'
            )}
            type='button'
            onClick={handleToggle}
          >
            {state.isVisible ? (
              <EyeOff size={20} className='text-secondary' />
            ) : (
              <Eye size={20} className='text-secondary' />
            )}
          </button>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }
