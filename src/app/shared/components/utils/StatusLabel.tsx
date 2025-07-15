import React, { FC } from 'react'

import { cn } from '@/lib/utils'

type StatusLabelProps = {
  status: string
  label?: string
  className?: string
  number?: number
}
const StatusLabel: FC<StatusLabelProps> = ({
  status,
  className,
  label,
  number
}) => {
  return (
    <p
      className={cn(
        'w-24 truncate rounded-md px-3  py-1 text-center text-sm  font-bold text-secondary',
        status === 'Accepted' && 'bg-emerald-100 text-success',
        status === 'Pending' && 'bg-yellow-100  text-pending-yellow-label',
        status === 'Rejected' && 'bg-red-100  text-red-700',
        status === 'Refused' && 'bg-red-100  text-red-700',
        status === 'Draft' && 'bg-gray-100 text-gray-500',
        status === 'Reminded' && 'bg-red-100  text-red-700',
        status === 'Canceled' && 'bg-gray-100 text-gray-500',
        className
      )}
    >
      {status === 'Reminded' && number
        ? `${label ? label : status} (${number})`
        : label
          ? label
          : status}
    </p>
  )
}

export default StatusLabel
