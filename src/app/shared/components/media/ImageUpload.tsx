'use client'

import { Camera, User } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRef } from 'react'

interface ImageUploadProps {
  value: string | null
  onChange: (file: File | null, preview: string | null) => void
  disabled?: boolean
  maxSize?: number // in MB
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  disabled = false,
  maxSize = 5
}) => {
  const t = useTranslations('mentor.profile')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageClick = () => {
    if (!disabled) {
      fileInputRef.current?.click()
    }
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file size (5MB max)
    if (file.size > maxSize * 1024 * 1024) {
      alert(t('fileTooLarge') || `File size must be less than ${maxSize}MB`)
      return
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert(t('invalidFileType') || 'Please select a valid image file')
      return
    }

    // Create preview
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      onChange(file, result)
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className='group relative mx-auto lg:mx-0'>
      <div
        className={`flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-purple-100 to-blue-100 sm:h-28 sm:w-28 lg:h-32 lg:w-32 ${
          !disabled ? 'cursor-pointer' : ''
        }`}
        onClick={handleImageClick}
      >
        {value ? (
          <img
            src={value}
            alt={t('profilePicture')}
            className='h-full w-full object-cover'
          />
        ) : (
          <User className='h-12 w-12 text-gray-400 sm:h-14 sm:w-14 lg:h-16 lg:w-16' />
        )}
      </div>
      {!disabled && (
        <button
          type='button'
          onClick={handleImageClick}
          className='absolute inset-0 flex items-center justify-center rounded-2xl bg-black/50 opacity-0 transition-opacity group-hover:opacity-100'
        >
          <Camera className='h-6 w-6 text-white sm:h-7 sm:w-7 lg:h-8 lg:w-8' />
        </button>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type='file'
        accept='image/*'
        onChange={handleImageChange}
        className='hidden'
      />
    </div>
  )
}

export default ImageUpload
