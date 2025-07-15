'use client'
import { createContext, useState } from 'react'

import type { StepperProps } from './types'

interface StepperContextValue extends StepperProps {
  clickable?: boolean
  isError?: boolean
  isLoading?: boolean
  isVertical?: boolean
  stepCount?: number
  expandVerticalSteps?: boolean
  activeStep: number
  initialStep: number
}

type StepperContextProviderProps = {
  value: Omit<StepperContextValue, 'activeStep'>
  children: React.ReactNode
}

const StepperContext = createContext<
  StepperContextValue & {
    nextStep: () => void
    prevStep: () => void
    resetSteps: () => void
    setStep: (step: number) => void
    setFormData: React.Dispatch<React.SetStateAction<any>>
    formData: any
  }
>({
  steps: [],
  activeStep: 0,
  initialStep: 0,
  nextStep: () => {},
  prevStep: () => {},
  resetSteps: () => {},
  setStep: () => {},
  formData: {},
  setFormData: () => {}
})

const StepperProvider = ({
  value,
  children
}: StepperContextProviderProps): JSX.Element => {
  const isError = value.state === 'error'
  const isLoading = value.state === 'loading'

  const [activeStep, setActiveStep] = useState(value.initialStep)
  const [formData, setFormData] = useState<any>({})

  const nextStep = (): void => {
    setActiveStep(prev => prev + 1)
  }

  const prevStep = (): void => {
    setActiveStep(prev => prev - 1)
  }

  const resetSteps = (): void => {
    setActiveStep(value.initialStep)
  }

  const setStep = (step: number): void => {
    setActiveStep(step)
  }

  return (
    <StepperContext.Provider
      value={{
        ...value,
        isError,
        isLoading,
        activeStep,
        nextStep,
        prevStep,
        resetSteps,
        setStep,
        formData,
        setFormData
      }}
    >
      {children}
    </StepperContext.Provider>
  )
}

export { StepperContext, StepperProvider }
