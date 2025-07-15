import { SelectProps } from '@radix-ui/react-select'
import { currencies as AllCurrencies } from 'country-data-list'
import React from 'react'

import { cn } from '@/lib/utils'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './Select'

export interface Currency {
  code: string
  name: string
  symbol?: string
}
interface CurrencySelectProps extends Omit<SelectProps, 'onValueChange'> {
  onValueChange?: (value: string) => void
  onCurrencySelect?: (currency: Currency) => void
  name: string
  placeholder?: string
  currencies?: 'custom' | 'all'
  variant?: 'default' | 'small'
  valid?: boolean
}
const CurrencySelect = React.forwardRef<HTMLButtonElement, CurrencySelectProps>(
  (
    {
      value,
      onValueChange,
      onCurrencySelect,
      name,
      placeholder = 'Select currency',
      currencies = 'all',
      variant = 'default',
      valid = true,
      ...props
    },
    ref
  ) => {
    const [selectedCurrency, setSelectedCurrency] =
      React.useState<Currency | null>(null)
    const uniqueCurrencies = React.useMemo<Currency[]>(() => {
      const currencyMap = new Map<string, Currency>()

      AllCurrencies.all.forEach((currency: Currency) => {
        if (currency.code && currency.name && currency.symbol) {
          currencyMap.set(currency.code, {
            code: currency.code,
            name: currency.name,
            symbol: currency.symbol
          })
        }
      })
      return Array.from(currencyMap.values()).sort((a, b) =>
        a.name.localeCompare(b.name)
      )
    }, [currencies])

    const handleValueChange = (newValue: string): void => {
      const fullCurrencyData = uniqueCurrencies.find(
        curr => curr.code === newValue
      )
      if (fullCurrencyData) {
        setSelectedCurrency(fullCurrencyData)
        if (onValueChange) {
          onValueChange(newValue)
        }
        if (onCurrencySelect) {
          onCurrencySelect(fullCurrencyData)
        }
      }
    }

    void selectedCurrency

    return (
      <Select
        value={value}
        onValueChange={handleValueChange}
        {...props}
        name={name}
        data-valid={valid}
      >
        <SelectTrigger
          className={cn('w-full', variant === 'small' && 'w-fit gap-2')}
          data-valid={valid}
          ref={ref}
        >
          {value && variant === 'small' ? (
            <SelectValue placeholder={placeholder}>
              <span>{value}</span>
            </SelectValue>
          ) : (
            <SelectValue placeholder={placeholder} />
          )}
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {uniqueCurrencies.map(currency => (
              <SelectItem key={currency?.code} value={currency?.code || ''}>
                <div className='flex w-full items-center gap-2'>
                  <span className='w-8 text-left text-sm '>
                    {currency?.code}
                  </span>
                  <span className='hidden'>{currency?.symbol}</span>
                  <span>{currency?.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    )
  }
)

CurrencySelect.displayName = 'CurrencySelect'

export { CurrencySelect }
