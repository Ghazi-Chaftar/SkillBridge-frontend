import { UseMutationResult } from '@tanstack/react-query'
import { useEffect } from 'react'

import { fetchAllImages } from '@/src/modules/announcement/constants'

import { ImageType } from '../useImageUploader'

interface UseSaveImagesProps {
  images: ImageType[]
  defaulImages?: ImageType[]
  isDefaultSet: boolean
  formDataKey?: string
  updatePictureMutation?: UseMutationResult<any, any, FormData, unknown>
}

type UseSaveImagesReturnType = {
  uploadImage: (current_images: ImageType[]) => Promise<void>
}

const useSaveImages = ({
  images,
  defaulImages,
  isDefaultSet,
  formDataKey,
  updatePictureMutation
}: UseSaveImagesProps): UseSaveImagesReturnType => {
  const uploadImage = async (current_images: ImageType[]): Promise<void> => {
    const formDataImage = new FormData()
    const newImages = await fetchAllImages(current_images)
    newImages.forEach(image => {
      formDataImage.append(formDataKey!, image)
    })
    updatePictureMutation?.mutate(formDataImage)
  }

  useEffect(() => {
    if (
      isDefaultSet === true &&
      JSON.stringify(images) !== JSON.stringify(defaulImages)
    ) {
      uploadImage(images)
    }
  }, [images])

  return { uploadImage }
}

export default useSaveImages
