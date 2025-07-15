import { Editor } from '@tiptap/react'
import * as React from 'react'

import { EditorFormatType as FormatTypeEnum } from '@/src/app/shared/constants/EditorFormatType'
import { useEditorFormat } from '@/src/app/shared/hooks/useEditorFormat'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../Select'

interface FormatTypeProps {
  editor: Editor
}

export const FormatType: React.FC<FormatTypeProps> = ({ editor }) => {
  const { activeFormatType, setFormatType } = useEditorFormat(editor)

  return (
    <Select
      onValueChange={setFormatType}
      defaultValue={activeFormatType}
      value={activeFormatType}
    >
      <SelectTrigger className='invisible h-8 w-[120px] sm:visible'>
        <SelectValue placeholder='Select format' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value={FormatTypeEnum.Paragraph}>Paragraph</SelectItem>
          <SelectItem value={FormatTypeEnum.H1}>H1</SelectItem>
          <SelectItem value={FormatTypeEnum.H2}>H2</SelectItem>
          <SelectItem value={FormatTypeEnum.H3}>H3</SelectItem>
          <SelectItem value={FormatTypeEnum.H4}>H4</SelectItem>
          <SelectItem value={FormatTypeEnum.H5}>H5</SelectItem>
          <SelectItem value={FormatTypeEnum.H6}>H6</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
