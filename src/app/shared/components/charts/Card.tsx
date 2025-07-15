'use client'

import { ReactNode } from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '../layout'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '../utils'

interface CarddProps {
  total: number
  title: string
  icon: ReactNode
  subtitle?: string
  children?: ReactNode
  description: string
}

const DashboardCard: React.FC<CarddProps> = ({
  total,
  title,
  icon,
  subtitle,
  children,
  description
}) => {
  return (
    <TooltipProvider>
      <Card className='relative flex h-[200px] w-[350px] flex-col p-0'>
        <CardHeader className='relative flex flex-col items-center pb-0 pt-5'>
          <div className='absolute left-3 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-pale-blue p-2'>
            {icon}
          </div>

          <div className='w-full px-10 text-center'>
            <CardTitle className='break-words text-lg'>{title}</CardTitle>
            {subtitle && <p className='text-sm text-muted'>{subtitle}</p>}
          </div>

          <Tooltip>
            <TooltipTrigger asChild>
              <div className='absolute right-4 top-3 flex h-4 w-4 cursor-pointer items-center justify-center rounded-full bg-gray-700 text-white hover:bg-gray-500'>
                ?
              </div>
            </TooltipTrigger>
            <TooltipContent side='top'>{description}</TooltipContent>
          </Tooltip>
        </CardHeader>

        <CardContent className='flex flex-1 flex-col items-center justify-center py-1'>
          <div className='flex h-full items-center justify-center'>
            <p className='text-4xl font-bold'>{total}</p>
          </div>
          <div className='mb-5 mt-auto flex items-center text-sm'>
            {children}
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  )
}

export default DashboardCard
