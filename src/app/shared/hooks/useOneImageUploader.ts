'use client'
import { UseMutationResult } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { useEffect, useMemo, useRef, useState } from 'react'
import {
  UseFormClearErrors,
  UseFormGetValues,
  UseFormSetValue
} from 'react-hook-form'

import {
  checkFileSize,
  getFileUrl,
  handleDelete,
  handleUpload
} from '@/lib/utils'

import useEditImage from './useEditImage'
import useSaveImage from './useSaveImage'

export interface ImageType {
  file: File
}

interface useOneImageUploaderProps {
  form: {
    setValue: UseFormSetValue<any>
    clearErrors: UseFormClearErrors<any>
    getValues: UseFormGetValues<any>
    formState: any
  }
  name: string
  formDataKey?: string
  updatePictureMutation?: UseMutationResult<any, any, FormData, unknown>
  maxSizeMB?: number
  setBlockType?: (type: 'image') => void
  setImageContent?: (image: File) => void
  defaulImage?: {
    name: string
    url: string
  }
}

interface ErrorState {
  message: string
  hasError: boolean
  [key: string]: any
}
interface useOneImageUploader {
  image: any
  isDragging: boolean
  errorMessage: string
  fileInputRef: React.RefObject<HTMLInputElement>
  imageURL: string | undefined
  selectFile: (e: React.SyntheticEvent) => void
  onSelectFile: (event: React.ChangeEvent<HTMLInputElement>) => void
  resetImageState: () => void
  handleDeleteImage: () => Promise<void>
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void
  onDragLeave: (event: React.DragEvent<HTMLDivElement>) => void
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void
  uploadStatus: { success: boolean; message: string }
  tConstants: any
  openEditor: () => void
  closeEditor: () => void
  saveEditedImage: (editedImageUrl: string) => void
  isEditing: boolean
}
const useOneImageUploader = ({
  form,
  name,
  formDataKey,
  updatePictureMutation,
  maxSizeMB = 1,
  setBlockType,
  setImageContent,
  defaulImage
}: useOneImageUploaderProps): useOneImageUploader => {
  const [image, setImage] = useState<ImageType | null>()
  const [imageURL, setImageURL] = useState<string | undefined>(undefined)
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [isDefaultSet, setIsDefaultSet] = useState<boolean>(false)
  const [error, setError] = useState<ErrorState>({
    message: '',
    hasError: false
  })
  const [uploadStatus, setUploadStatus] = useState<{
    success: boolean
    message: string
  }>({ success: false, message: '' })
  const fileInputRef = useRef<HTMLInputElement>(null)
  const t = useTranslations('validation')
  const tConstants = useTranslations('constants')

  const selectFile = (e: React.SyntheticEvent): void => {
    e.preventDefault()
    fileInputRef.current?.click()
  }

  const handleFiles = (files: FileList): void => {
    if (files.length === 0) return
    const fileArray = Array.from(files)
    const file = fileArray[0]
    if (!checkFileSize(file, maxSizeMB)) {
      setError({ message: t('exceedSize', { maxSizeMB }), hasError: true })
      return
    }
    setImage({
      file: file
    })
    setError({ message: '', hasError: false })
    form.clearErrors(name)
  }
  const onSelectFile = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const files = event.target.files
    if (files && files.length > 0) {
      handleFiles(files)
    }
  }

  const safeImageObject = useMemo(() => {
    if (image?.file) {
      return {
        name: image.file.name,
        url: URL.createObjectURL(image.file)
      }
    }
    return defaulImage ?? { name: '', url: '' }
  }, [image?.file, defaulImage])
  const { uploadImage } = useSaveImage({
    image: safeImageObject,
    defaulImage,
    isDefaultSet,
    formDataKey,
    updatePictureMutation
  })

  const { openEditor, closeEditor, saveEditedImage, isEditing } = useEditImage({
    image: safeImageObject,
    form,
    name,
    updatePictureMutation,
    uploadImage
  })
  const onDrop = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault()
    setIsDragging(false)
    const files = event.dataTransfer.files
    if (files && files.length > 0) {
      handleFiles(files)
    }
  }

  const resetImageState = (): void => {
    setImage(null)
    setImageURL(undefined)
    form.setValue(name, null)
  }

  const handleDeleteImage = async (): Promise<void> => {
    resetImageState()
    await handleDelete({ formDataKey, updatePictureMutation })
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
    if (form && image) {
      form.setValue(name, image.file)
    }
    if (setBlockType && setImageContent && image) {
      setBlockType('image')
      setImageContent(image.file)
    }
  }, [image, name, form])

  useEffect(() => {
    if (name && form && form.formState?.defaultValues) {
      const defaultFile = form.formState.defaultValues[name]
      if (defaultFile) {
        setImage({ file: defaultFile })
        setIsDefaultSet(true)
      }
    }
  }, [form, name])

  useEffect(() => {
    const uploadImage = async (): Promise<void> => {
      const result = await handleUpload({
        image,
        formDataKey,
        updatePictureMutation
      })
      setUploadStatus({ success: result.success, message: result.message })
    }

    if (image) {
      uploadImage()
    }
  }, [image])

  useEffect(() => {
    const initialImageURL = form.getValues(name)
    if (initialImageURL) {
      setImageURL(getFileUrl(initialImageURL))
    }
  }, [form, name, setImageURL])

  useEffect(() => {
    const initialImageURL = form.getValues(name)
    if (initialImageURL) {
      setImageURL(initialImageURL)
    }
  }, [form, name, setImageURL, form.formState])

  return {
    image,
    isDragging,
    errorMessage: error.message,
    fileInputRef,
    imageURL,
    selectFile,
    onSelectFile,
    resetImageState,
    handleDeleteImage,
    onDragOver,
    onDragLeave,
    onDrop,
    uploadStatus,
    tConstants,
    openEditor,
    closeEditor,
    saveEditedImage,
    isEditing
  }
}

export default useOneImageUploader
