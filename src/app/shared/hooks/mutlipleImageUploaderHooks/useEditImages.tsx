import { UseMutationResult } from '@tanstack/react-query'
import { useState } from 'react'
import { UseFormSetValue } from 'react-hook-form'

import { ImageType } from '../useImageUploader'

interface UseEditImagesProps {
  images: ImageType[]
  form: { setValue: UseFormSetValue<any> }
  name: string
  updatePictureMutation?: UseMutationResult<any, any, FormData, unknown>
  uploadImage: (current_images: ImageType[]) => Promise<void>
}

type UseEditImagesReturn = {
  isEditing: boolean
  currentImageIndex: number | null
  openEditor: (index: number) => void
  closeEditor: () => void
  saveEditedImage: (editedImageUrl: string) => void
}

const useEditImages = ({
  images,
  form,
  name,
  updatePictureMutation,
  uploadImage
}: UseEditImagesProps): UseEditImagesReturn => {
  const [isEditing, setIsEditing] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(
    null
  )

  const openEditor = (index: number): void => {
    setCurrentImageIndex(index)
    setIsEditing(true)
  }

  const closeEditor = (): void => {
    setIsEditing(false)
    setCurrentImageIndex(null)
  }

  const saveEditedImage = (editedImageUrl: string): void => {
    if (currentImageIndex !== null) {
      const updatedImages = [...images]
      updatedImages[currentImageIndex].url = editedImageUrl
      form.setValue(name, updatedImages)
      setIsEditing(false)

      if (updatePictureMutation) {
        uploadImage(updatedImages)
      }
    }
  }

  return {
    isEditing,
    currentImageIndex,
    openEditor,
    closeEditor,
    saveEditedImage
  }
}

export default useEditImages
