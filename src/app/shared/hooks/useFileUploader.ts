import { UseMutationResult } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import { UseFormClearErrors, UseFormSetValue } from 'react-hook-form'

export interface FileType {
  name: string
  url: string
}

interface UseFileUploaderProps {
  form: {
    setValue: UseFormSetValue<any>
    clearErrors: UseFormClearErrors<any>
    formState: any
  }
  name: string
  defaultFile?: FileType
  updateDocumentMutation?: UseMutationResult<any, any, FormData, unknown>
}

interface UseFileUploaderReturn {
  file: FileType | null
  isDragging: boolean
  error: string
  fileInputRef: React.RefObject<HTMLInputElement>
  selectFile: (e: React.SyntheticEvent) => void
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  deleteFile: () => void
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void
  onDragLeave: (event: React.DragEvent<HTMLDivElement>) => void
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void
}

const useFileUploader = ({
  form,
  name,
  defaultFile,
  updateDocumentMutation
}: UseFileUploaderProps): UseFileUploaderReturn => {
  const [file, setFile] = useState<FileType | null>(defaultFile || null)
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (file: File): void => {
    if (file.type !== 'application/pdf') {
      setError('invalidFileType')
      return
    }
    const newFile = { name: file.name, url: URL.createObjectURL(file) }
    setFile(newFile)
    form.clearErrors(name)
    form.setValue(name, newFile)
    setError('')
    if (updateDocumentMutation) {
      const formData = new FormData()
      formData.append(name, file)
      updateDocumentMutation.mutate(formData)
    }
  }

  const selectFile = (e: React.SyntheticEvent): void => {
    e.preventDefault()
    fileInputRef.current?.click()
  }

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const files = event.target.files
    if (files && files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  const onDrop = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault()
    setIsDragging(false)
    const files = event.dataTransfer.files
    if (files && files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  const deleteFile = (): void => {
    setFile(null)
    form.setValue(name, null)
  }

  const onDragOver = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault()
    setIsDragging(true)
    event.dataTransfer.dropEffect = 'copy'
  }

  const onDragLeave = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault()
    setIsDragging(false)
  }

  useEffect(() => {
    if (defaultFile) {
      setFile(defaultFile)
    }
  }, [defaultFile])

  return {
    file,
    isDragging,
    error,
    fileInputRef,
    selectFile,
    onFileChange,
    deleteFile,
    onDragOver,
    onDragLeave,
    onDrop
  }
}

export default useFileUploader
