import * as React from 'react'

import { cn } from '@/lib/utils'
import { Button } from '@/src/app/shared/components'

import type { StepSharedProps } from './types'
import { useStepper } from './use-stepper'

type StepButtonContainerProps = StepSharedProps & { children?: React.ReactNode }

const StepButtonContainer = ({
  isCurrentStep,
  isCompletedStep,
  children,
  isError,
  isLoading: isLoadingProp,
  onClickStep
}: StepButtonContainerProps): JSX.Element | null => {
  const {
    clickable,
    isLoading: isLoadingContext,
    variant,
    styles
  } = useStepper()

  const currentStepClickable = clickable || !!onClickStep

  const isLoading = isLoadingProp || isLoadingContext

  if (variant === 'line') {
    return null
  }

  return (
    <Button
      variant='ghost'
      type='button'
      tabIndex={currentStepClickable ? 0 : -1}
      className={cn(
        'stepper__step-button-container  bg-gray-200',
        'pointer-events-none rounded-[8px] p-0',
        'h-[var(--step-icon-size)] w-[var(--step-icon-size)]',
        'flex items-center justify-center rounded-[8px] border-2',
        'data-[clickable=true]:pointer-events-auto',
        'data-[active=true]:border-primary data-[active=true]:bg-primary data-[active=true]:text-primary-foreground',
        'data-[current=true]:border-primary data-[current=true]:bg-white',
        'data-[invalid=true]:text-destructive-foreground data-[invalid=true]:border-destructive data-[invalid=true]:bg-destructive',

        styles?.['step-button-container']
      )}
      aria-current={isCurrentStep ? 'step' : undefined}
      data-current={isCurrentStep}
      data-invalid={isError && (isCurrentStep || isCompletedStep)}
      data-active={isCompletedStep}
      data-clickable={currentStepClickable}
      data-loading={isLoading && (isCurrentStep || isCompletedStep)}
    >
      {children}
    </Button>
  )
}

export { StepButtonContainer }
