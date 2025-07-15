import { Editor } from '@tiptap/react'
import { useCallback, useMemo } from 'react'

import { EditorFormatType as FormatTypeEnum } from '@/src/app/shared/constants/EditorFormatType'

export function useEditorFormat(editor: Editor): {
  activeFormatType: FormatTypeEnum | undefined
  setFormatType: (type: FormatTypeEnum) => void
} {
  const activeFormatType = useMemo<FormatTypeEnum | undefined>(() => {
    if (editor.isActive('paragraph')) return FormatTypeEnum.Paragraph
    if (editor.isActive('heading', { level: 1 })) return FormatTypeEnum.H1
    if (editor.isActive('heading', { level: 2 })) return FormatTypeEnum.H2
    if (editor.isActive('heading', { level: 3 })) return FormatTypeEnum.H3
    if (editor.isActive('heading', { level: 4 })) return FormatTypeEnum.H4
    if (editor.isActive('heading', { level: 5 })) return FormatTypeEnum.H5
    if (editor.isActive('heading', { level: 6 })) return FormatTypeEnum.H6
    return undefined
  }, [editor])

  const setFormatType = useCallback(
    (type: FormatTypeEnum) => {
      switch (type) {
        case FormatTypeEnum.Paragraph:
          editor.chain().focus().setParagraph().run()
          break
        case FormatTypeEnum.H1:
          editor.chain().focus().toggleHeading({ level: 1 }).run()
          break
        case FormatTypeEnum.H2:
          editor.chain().focus().toggleHeading({ level: 2 }).run()
          break
        case FormatTypeEnum.H3:
          editor.chain().focus().toggleHeading({ level: 3 }).run()
          break
        case FormatTypeEnum.H4:
          editor.chain().focus().toggleHeading({ level: 4 }).run()
          break
        case FormatTypeEnum.H5:
          editor.chain().focus().toggleHeading({ level: 5 }).run()
          break
        case FormatTypeEnum.H6:
          editor.chain().focus().toggleHeading({ level: 6 }).run()
          break
      }
    },
    [editor]
  )

  return { activeFormatType, setFormatType }
}
