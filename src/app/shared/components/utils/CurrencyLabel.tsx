import React from 'react'

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
  return <p className={className} style={style}>{`${amount} ${'TND'}`}</p>
}

export default CurrencyLabel
