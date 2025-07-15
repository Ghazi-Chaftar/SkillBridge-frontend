import React from 'react'

import { useArchitectStore } from '@/src/lib/useArchitectStore'

interface CurrencyLabelProps {
  className?: string
  amount: number | string
  style?: {
    color: string
  }
}

const CurrencyLabel: React.FC<CurrencyLabelProps> = ({
  className,
  amount,
  style
}) => {
  const { quoteTemplate } = useArchitectStore()
  return (
    <p className={className} style={style}>{`${amount} ${
      quoteTemplate?.currency ? quoteTemplate.currency : 'TND'
    }`}</p>
  )
}

export default CurrencyLabel
