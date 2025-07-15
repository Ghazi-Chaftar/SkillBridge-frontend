import { Search } from 'lucide-react'
import * as React from 'react'

import { Button, Input } from '@/src/app/shared/components'

export interface SearchInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(() => {
  return (
    <form className='mx-auto w-full'>
      <div className='relative'>
        <div className='pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5 rtl:inset-x-0'>
          <Search className='h-4 w-4 text-secondary'></Search>
        </div>
        <Input type='text' id='seacrh' />
        <Button
          type='submit'
          className='absolute bottom-2.5 end-2.5 top-1 rounded-lg  px-4 py-2  '
        ></Button>
      </div>
    </form>
  )
})
SearchInput.displayName = 'SearchInput'

export { SearchInput }
