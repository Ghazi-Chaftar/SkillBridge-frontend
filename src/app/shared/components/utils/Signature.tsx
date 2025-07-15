'use client'

import { Keyboard, SquarePen, Trash, Upload } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import React, { useRef, useState } from 'react'
import SignatureCanvas from 'react-signature-canvas'
import trimCanvas from 'trim-canvas'

import { Button } from './Button'

interface SignatureProps {
  label?: string
  onChange?: (dataUrl: string | null) => void
  initialValue?: string
}

const standardWidth = 400
const standardHeight = 150

const resolutionFactor = 2

const createStandardCanvas = (
  sourceCanvas: HTMLCanvasElement
): HTMLCanvasElement => {
  const canvasWidth = standardWidth * resolutionFactor
  const canvasHeight = standardHeight * resolutionFactor

  const standardCanvas = document.createElement('canvas')
  standardCanvas.width = canvasWidth
  standardCanvas.height = canvasHeight
  const standardCtx = standardCanvas.getContext('2d')
  if (!standardCtx) return standardCanvas

  const srcWidth = sourceCanvas.width
  const srcHeight = sourceCanvas.height

  const scale = Math.min(canvasWidth / srcWidth, canvasHeight / srcHeight)
  const newWidth = srcWidth * scale
  const newHeight = srcHeight * scale

  const offsetX = (canvasWidth - newWidth) / 2
  const offsetY = (canvasHeight - newHeight) / 2

  standardCtx.drawImage(
    sourceCanvas,
    0,
    0,
    srcWidth,
    srcHeight,
    offsetX,
    offsetY,
    newWidth,
    newHeight
  )
  return standardCanvas
}

const Signature: React.FC<SignatureProps> = ({ onChange, initialValue }) => {
  const t = useTranslations('constants')
  const [activeTab, setActiveTab] = useState<'draw' | 'upload' | 'type'>('draw')
  const [drawnSignatureDataUrl, setDrawnSignatureDataUrl] = useState<
    string | null
  >(initialValue || null)
  const [uploadedSignature, setUploadedSignature] = useState<string | null>(
    null
  )
  const [typedSignature, setTypedSignature] = useState<string | null>(null)

  const [drawCanvasKey, setDrawCanvasKey] = useState<number>(0)

  const signaturePadRef = useRef<SignatureCanvas>(null)
  const uploadSignaturePadRef = useRef<SignatureCanvas>(null)

  const handleClearDraw = (): void => {
    signaturePadRef.current?.clear()
    setDrawnSignatureDataUrl(null)
    setDrawCanvasKey(prev => prev + 1)
    onChange?.(null)
  }

  const handleTrimAndSaveDraw = (): void => {
    if (!signaturePadRef.current || !signaturePadRef.current._canvas) return

    const trimmedCanvas = trimCanvas(signaturePadRef.current._canvas)
    const standardCanvas = createStandardCanvas(trimmedCanvas)
    const dataUrl = standardCanvas.toDataURL('image/png')
    setDrawnSignatureDataUrl(dataUrl)
    onChange?.(dataUrl)
  }

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setUploadedSignature(reader.result)
        uploadSignaturePadRef.current?.clear()
      }
    }
    reader.readAsDataURL(file)
  }

  const handleClearUpload = (): void => {
    uploadSignaturePadRef.current?.clear()
    setUploadedSignature(null)
    onChange?.(null)
  }

  const handleTrimAndSaveUpload = (): void => {
    if (!uploadedSignature || !uploadSignaturePadRef.current) return

    const canvasEl = document.createElement('canvas')
    const container = uploadSignaturePadRef.current._canvas
    if (!container) return
    canvasEl.width = container.width
    canvasEl.height = container.height
    const ctx = canvasEl.getContext('2d')
    if (!ctx) return

    const background = new window.Image()
    background.src = uploadedSignature
    background.onload = () => {
      ctx.drawImage(background, 0, 0, canvasEl.width, canvasEl.height)
      if (
        uploadSignaturePadRef.current &&
        uploadSignaturePadRef.current._canvas
      ) {
        ctx.drawImage(
          uploadSignaturePadRef.current._canvas,
          0,
          0,
          canvasEl.width,
          canvasEl.height
        )
        const trimmedCanvas = trimCanvas(canvasEl)
        const standardCanvas = createStandardCanvas(trimmedCanvas)
        const dataUrl = standardCanvas.toDataURL('image/png')
        onChange?.(dataUrl)
      }
    }
  }

  const handleTypeSignature = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setTypedSignature(e.target.value)
  }

  const handleSaveTyped = (): void => {
    if (!typedSignature) return

    // Create a canvas to render the typed signature
    const canvas = document.createElement('canvas')
    canvas.width = standardWidth
    canvas.height = standardHeight
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set font style for signature
    ctx.fillStyle = 'black'
    ctx.font = 'italic 32px "Brush Script MT", cursive'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    // Draw the text
    ctx.fillText(typedSignature, canvas.width / 2, canvas.height / 2)

    const dataUrl = canvas.toDataURL('image/png')
    onChange?.(dataUrl)
  }

  return (
    <div className='w-full space-y-4'>
      {/* {label && (
        <label className='block text-sm font-medium text-gray-700'>
          {label}
        </label>
      )} */}

      <div className='flex w-full gap-2'>
        <button
          type='button'
          onClick={() => setActiveTab('draw')}
          className={`flex-1 rounded-md px-4 py-3 ${
            activeTab === 'draw'
              ? 'bg-red-400 text-white'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          <span className='flex items-center justify-center gap-2'>
            <SquarePen size={16} />
            {t('draw')}
          </span>
        </button>
        <button
          type='button'
          onClick={() => setActiveTab('type')}
          className={`flex-1 rounded-md px-4 py-3 ${
            activeTab === 'type'
              ? 'bg-red-400 text-white'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          <span className='flex items-center justify-center gap-2'>
            <Keyboard size={16} />
            {t('type')}
          </span>
        </button>
        <button
          type='button'
          onClick={() => setActiveTab('upload')}
          className={`flex-1 rounded-md px-4 py-3 ${
            activeTab === 'upload'
              ? 'bg-red-400 text-white'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          <span className='flex items-center justify-center gap-2'>
            <Upload size={16} />
            {t('upload')}
          </span>
        </button>
      </div>

      <div className='relative mt-4 rounded-md border border-gray-200 p-2'>
        {activeTab === 'draw' && (
          <div>
            <div className='relative h-32 w-full rounded'>
              <SignatureCanvas
                key={drawCanvasKey}
                ref={signaturePadRef}
                options={{
                  minWidth: 1,
                  maxWidth: 2,
                  throttle: 16,
                  velocityFilterWeight: 0.7,
                  penColor: 'black'
                }}
                canvasProps={{
                  className: 'signatureCanvas h-full w-full cursor-crosshair'
                }}
              />
              {drawnSignatureDataUrl && (
                <div className='pointer-events-none absolute inset-0 opacity-50'>
                  <Image
                    src={drawnSignatureDataUrl}
                    alt='Signature preview'
                    layout='fill'
                    objectFit='contain'
                  />
                </div>
              )}
            </div>
            {drawnSignatureDataUrl && (
              <button
                type='button'
                onClick={handleClearDraw}
                className='absolute right-2 top-2 text-red-500'
                aria-label='Clear signature'
              >
                <Trash size={16} />
              </button>
            )}
          </div>
        )}

        {activeTab === 'type' && (
          <div className='p-2'>
            <input
              type='text'
              placeholder='Type your signature'
              value={typedSignature || ''}
              onChange={handleTypeSignature}
              className='font-signature w-full rounded border border-gray-200 p-2 text-2xl'
              style={{ fontFamily: '"Brush Script MT", cursive' }}
            />
          </div>
        )}

        {activeTab === 'upload' && (
          <div>
            <input
              type='file'
              accept='image/*'
              onChange={handleUpload}
              className='block w-full text-sm text-gray-900
                       file:mr-4 file:rounded-full file:border-0 file:bg-gray-100 
                       file:px-4 file:py-2 file:text-sm file:font-semibold file:text-gray-700
                       hover:file:bg-gray-200'
            />
            {uploadedSignature && (
              <div
                className='relative mt-2 h-32 w-full rounded border border-gray-300'
                style={{
                  backgroundImage: `url(${uploadedSignature})`,
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center'
                }}
              >
                <SignatureCanvas
                  ref={uploadSignaturePadRef}
                  penColor='black'
                  canvasProps={{
                    className:
                      'signatureCanvas h-full w-full cursor-crosshair bg-transparent'
                  }}
                />
                <button
                  type='button'
                  onClick={handleClearUpload}
                  className='absolute right-2 top-2 text-red-500'
                  aria-label='Clear uploaded signature'
                >
                  <Trash size={16} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className='mt-4 text-right'>
        <Button
          type='button'
          onClick={() => {
            if (activeTab === 'draw') handleTrimAndSaveDraw()
            else if (activeTab === 'upload') handleTrimAndSaveUpload()
            else if (activeTab === 'type') handleSaveTyped()
          }}
          className='rounded-md bg-red-400 px-6 py-2 font-medium text-white hover:bg-red-500'
        >
          Insert
        </Button>
      </div>
    </div>
  )
}

export default Signature
