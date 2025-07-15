import { LoaderCircle } from 'lucide-react'
import React, { ReactNode } from 'react'

import { cn } from '@/lib/utils'

import { Button } from './Button'

interface SubmitButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isPending: boolean
  onClick: () => void
  children: ReactNode
  disabled?: boolean
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  isPending,
  onClick,
  children,
  disabled = false,
  ...props
}) => {
  return (
    <Button
      className={cn(
        'font-bold',
        isPending && 'hidden',
        disabled && 'cursor-not-allowed opacity-50'
      )}
      onClick={onClick}
      disabled={isPending || disabled}
      {...props}
    >
      {isPending ? (
        <LoaderCircle className='h-6 w-6 animate-spin text-white' />
      ) : (
        children
      )}
    </Button>
  )
}

export default SubmitButton
