import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState
} from 'react'

interface IFormContext {
  formData: any
  setFormData: Dispatch<SetStateAction<any>>
  onHandleBack: () => void
  onHandleNext: () => void
  onDoubleNext: () => void
  onDoubleBack: () => void
  step: number
}

export const FormContext = createContext<IFormContext>({
  formData: {},
  onHandleBack: () => {},
  onHandleNext: () => {},
  setFormData: () => {},
  onDoubleNext: () => {},
  onDoubleBack: () => {},
  step: 1
})

interface IProps {
  children: ReactNode
}

export function FormProvider({ children }: IProps): JSX.Element {
  const [formData, setFormData] = useState()
  const [step, setStep] = useState(1)

  function onHandleNext(): void {
    setStep(prev => prev + 1)
    setFormData((prev: any) => ({ ...prev, rollback: false }))
  }
  function onDoubleNext(): void {
    setStep(prev => prev + 2)
    setFormData((prev: any) => ({ ...prev, rollback: false }))
  }

  function onHandleBack(): void {
    setStep(prev => prev - 1)
    setFormData((prev: any) => ({ ...prev, rollback: true }))
  }
  function onDoubleBack(): void {
    setStep(prev => prev - 2)
    setFormData((prev: any) => ({ ...prev, rollback: true }))
  }
  return (
    <FormContext.Provider
      value={{
        formData,
        setFormData,
        onHandleBack,
        onHandleNext,
        step,
        onDoubleNext,
        onDoubleBack
      }}
    >
      {children}
    </FormContext.Provider>
  )
}

export function useFormStepper(): IFormContext {
  return useContext(FormContext)
}
