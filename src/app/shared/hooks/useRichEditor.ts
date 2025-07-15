import Color from '@tiptap/extension-color'
import Text from '@tiptap/extension-text'
import TextStyle from '@tiptap/extension-text-style'
import { EditorOptions, useEditor as useTipTapEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect } from 'react'

interface UseRichEditorProps extends Partial<EditorOptions> {
  name: string
  setValue: (name: string, value: any) => void
  initialValue?: string
  onChange?: (value: string) => void // Add onChange to the hook props
}

export const useRichEditor = ({
  name,
  setValue,
  initialValue,
  onChange,
  ...options
}: UseRichEditorProps): ReturnType<typeof useTipTapEditor> => {
  const editor = useTipTapEditor({
    extensions: [StarterKit, Text, TextStyle, Color],
    ...options,
    content: initialValue || '',
    editable: true,
    onBlur: ({ editor, transaction }) => {
      if (name && setValue) {
        setValue(name, editor.getHTML())
      }
      if (options.onUpdate) {
        options.onUpdate({ editor, transaction })
      }
    },
    onUpdate: ({ editor }) => {
      if (onChange) {
        onChange(editor.getHTML()) // Trigger onChange every time content updates
      }
    }
  })

  useEffect(() => {
    if (editor && initialValue) {
      editor.commands.setContent(initialValue)
    }
  }, [editor, initialValue])

  return editor
}
