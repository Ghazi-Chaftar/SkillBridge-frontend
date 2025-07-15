import { EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {
  FieldErrors,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch
} from 'react-hook-form'

import { cn } from '@/lib/utils'

import { useRichEditor } from '../../../hooks/useRichEditor'
import { Loader } from '../../loader'
import EditorToolbar from './toolbar/EditorToolbar'

interface EditorProps {
  name?: string
  placeholder?: string
  setValue?: UseFormSetValue<any>
  watch?: UseFormWatch<any>
  trigger?: UseFormTrigger<any>
  errors?: FieldErrors
  value?: string
  onChange?: (value: string) => void
  className?: string
  editorToolbarClassName?: string
  rows?: number
  style?: React.CSSProperties
  onFocus?: () => void
  onBlur?: () => void
}

const Editor: React.FC<EditorProps> = ({
  name,
  placeholder,
  setValue,
  watch,
  trigger,
  errors,
  value,
  onChange,
  className,
  editorToolbarClassName,
  rows = 5,
  style,
  onFocus,
  onBlur
}) => {
  const content = value || (name && watch && watch(name)) || ''
  const fieldError = name && errors && errors[name]

  const editor = useRichEditor({
    name: name || '',
    setValue: setValue || (() => {}),
    initialValue: content,
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: 'list-disc pl-8'
          }
        },
        orderedList: {
          HTMLAttributes: {
            class: 'list-decimal pl-8'
          }
        }
      })
    ],
    onUpdate: ({ editor }) => {
      if (onChange) {
        onChange(editor.getHTML())
      }
      if (name && trigger) {
        // Use setTimeout to avoid blocking the UI during typing
        setTimeout(() => {
          trigger(name)
        }, 300)
      }
    }
  })

  const calculatedHeight = `${rows * 24 + 24}px`

  return (
    <>
      {editor ? (
        <div className='flex w-full flex-col gap-1'>
          <div
            className={cn(
              'prose border-input dark:prose-invert w-full overflow-hidden rounded-lg border bg-background bg-white',
              fieldError ? 'border-red-500' : '',
              className
            )}
            style={style}
          >
            {/* Toolbar fixed at the top (non-scrollable) */}
            <div className='sticky top-0 z-10 border-b bg-white'>
              <EditorToolbar
                editor={editor}
                editorToolbarClassName={editorToolbarClassName}
              />
            </div>

            {/* Content area (scrollable) */}
            <div
              className='editor z-[1] overflow-y-auto'
              style={{
                height: calculatedHeight,
                maxHeight: calculatedHeight
              }}
            >
              <EditorContent
                editor={editor}
                placeholder={placeholder}
                onFocus={onFocus}
                onBlur={onBlur}
              />
            </div>
          </div>
          {fieldError && (
            <p className='mt-1 text-sm text-red-500'>
              {fieldError.message?.toString()}
            </p>
          )}
        </div>
      ) : (
        <Loader />
      )}
    </>
  )
}

export default Editor
