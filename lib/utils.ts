import { UseMutationResult } from '@tanstack/react-query'
import { type ClassValue, clsx } from 'clsx'
import Cookies from 'js-cookie'
import { twMerge } from 'tailwind-merge'

import { ImageType as UploaderImageType } from '@/src/app/shared/hooks/useImageUploader'
import { ImageType } from '@/src/app/shared/hooks/useOneImageUploader'
import { Image } from '@/src/types'

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function getUserEmailFromCookie(): string {
  const userCookie = Cookies.get('user')
  const user = userCookie ? JSON.parse(userCookie) : {}
  return user.email || ''
}

export const formatDatetoDigits = (date: Date | undefined): string => {
  return (
    date?.toLocaleDateString('fr-CA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }) ?? ''
  )
}

export const formatDatetoString = (date: Date | undefined): string => {
  return (
    date?.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }) ?? ''
  )
}

export const timestampToDate = (
  timestamp: string | undefined
): { date: string; time: string } => {
  if (!timestamp) {
    return {
      date: '',
      time: ''
    }
  }

  const date = new Date(timestamp)
  const formattedDate = date.toLocaleDateString()
  const formattedTime = date.toLocaleTimeString()

  return {
    date: formattedDate,
    time: formattedTime
  }
}

export const stringToDate = (timestamp: string | undefined): string => {
  if (!timestamp) {
    return ''
  }

  const date = new Date(timestamp)
  const formattedDate = date.toLocaleDateString()

  return formattedDate
}

export const checkFileSize = (file: File, maxSizeMB: number): boolean => {
  const BYTES_PER_MB = 1024 * 1024 // Number of bytes in one megabyte
  const fileSizeMB = file.size / BYTES_PER_MB
  return fileSizeMB <= maxSizeMB
}

export interface HandleUploadProps {
  image: ImageType | null | undefined
  formDataKey?: string
  updatePictureMutation?: UseMutationResult<any, any, FormData, unknown>
}

export interface HandleDeleteProps {
  formDataKey?: string
  updatePictureMutation?: UseMutationResult<any, any, FormData, unknown>
}

export interface UploadResult {
  success: boolean
  message: string
  data?: any
}

/**
 * Handles the upload of an image file.
 * @param {HandleUploadProps} props - The properties for the upload handler.
 * @returns {Promise<UploadResult>} - Returns a promise that resolves when the upload is complete.
 */
export const handleUpload = async ({
  image,
  formDataKey,
  updatePictureMutation
}: HandleUploadProps): Promise<UploadResult> => {
  if (image) {
    try {
      const formData = new FormData()
      formData.append(formDataKey!, image.file)
      const response = await updatePictureMutation!.mutateAsync(formData)
      return {
        success: true,
        message: 'Image uploaded successfully.',
        data: response
      }
    } catch (error) {
      return {
        success: false,
        message: 'Image upload failed.',
        data: error
      }
    }
  } else {
    return {
      success: false,
      message: 'No image provided.'
    }
  }
}

/**
 * Handles the deletion of an image file.
 * @param {HandleDeleteProps} props - The properties for the delete handler.
 * @returns {Promise<void>} - Returns a promise that resolves when the deletion is complete.
 */
export const handleDelete = async ({
  formDataKey,
  updatePictureMutation
}: HandleDeleteProps): Promise<void> => {
  const formData = new FormData()
  formData.append(formDataKey!, '')
  await updatePictureMutation!.mutateAsync(formData)
}

export const getFileUrl = (imagePath?: string): string | undefined => {
  if (imagePath?.toString()?.startsWith('/')) {
    return `http://127.0.0.1:8000${imagePath}`
  } else {
    return imagePath
  }
}
export function formatTime(time: string): string {
  if (typeof time !== 'string') {
    throw new Error('Input must be a string')
  }

  const parts = time.split(':')

  if (parts.length !== 3) {
    throw new Error('Input must be in the format HH:MM:SS')
  }
  const [hours, minutes] = parts

  return `${hours}:${minutes}`
}

export const dataURLToBlob = (dataURL: string): Blob => {
  const [header, base64Data] = dataURL.split(',')

  const match = header.match(/:(.*?);/)
  if (!match) {
    throw new Error('Invalid data URL format')
  }

  const mimeType = match[1]
  const binaryString = atob(base64Data)
  const arrayBuffer = new ArrayBuffer(binaryString.length)
  const uint8Array = new Uint8Array(arrayBuffer)

  Array.from(binaryString).forEach((char, index) => {
    uint8Array[index] = char.charCodeAt(0)
  })

  return new Blob([arrayBuffer], { type: mimeType })
}

export const dataURLToBlobURL = (dataURL: string): string => {
  const blob = dataURLToBlob(dataURL)
  return URL.createObjectURL(blob)
}

export const buildImage = (backendImages: Image[]): UploaderImageType[] => {
  return backendImages?.map(({ id, image }) => ({
    name: id.toString(),
    url: getFileUrl(image)!
  }))
}

export const buildOneImage = (backendImages: string): UploaderImageType => {
  return {
    name: backendImages?.toString(),
    url: getFileUrl(backendImages)!
  }
}

export const snakeToCamel = (str: string): string => {
  return str
    .toLowerCase()
    .split('_')
    .map((word, index) =>
      index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join('')
}

export const handleDownload = async (fileUrl: string): Promise<void> => {
  const response = await fetch(fileUrl)
  const blob = await response.blob()
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', fileUrl.split('/')[3])
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export const handlePreview = (fileUrl: string): void => {
  window.open(fileUrl, '_blank')
}

export const extractThumbnail = async (
  videoUrl: string,
  captureTime: number = 1
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video')
    video.src = videoUrl
    video.crossOrigin = 'anonymous'

    // Triggered once metadata is loaded, so we can safely seek to the capture time
    video.onloadedmetadata = () => {
      video.currentTime = captureTime
    }

    // Triggered once the video has successfully sought to the capture time
    video.onseeked = () => {
      const canvas = document.createElement('canvas')
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const context = canvas.getContext('2d')

      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height)
        const thumbnailDataUrl = canvas.toDataURL('image/jpeg')
        resolve(thumbnailDataUrl)
      } else {
        reject('Failed to get canvas context')
      }
    }

    video.onerror = () => {
      reject('Error loading video')
    }
  })
}

export function getBasePath(url: string): string {
  const parts = url.split('/').filter(Boolean)
  return `/${parts.slice(0, parts.length - 1).join('/')}/`
}
