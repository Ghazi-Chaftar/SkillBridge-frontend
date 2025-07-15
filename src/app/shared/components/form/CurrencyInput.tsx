import { currencies } from 'country-data-list'
import { useLocale } from 'next-intl'
import React from 'react'

import { cn } from '@/lib/utils'
import { useArchitectStore } from '@/src/lib/useArchitectStore'
import { useChangeCurrency } from '@/src/modules/architect/quote/hooks/useChangeBankDetails'

import { Currency } from './CurrencySelect'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger
} from './Select'

interface CurrencyInputProps {
  className?: string
  currencyCode?: string
  value?: number
  maxValue?: number
  onChange?: (value: number | React.ChangeEvent<HTMLInputElement>) => void
  onCurrencyChange?: (currencyCode: string) => void
  disabled?: boolean
  hideCurrency?: boolean
}

const CurrencyInput = React.forwardRef<HTMLInputElement, CurrencyInputProps>(
  (
    {
      className,
      currencyCode,
      value,
      maxValue,
      onChange,
      disabled,
      hideCurrency,
      ...props
    },
    ref
  ) => {
    const currentLanguage = useLocale()
    const { quoteTemplate } = useArchitectStore()
    const changeCurrencyMutation = useChangeCurrency('ArchitectTemplate')
    const uniqueCurrencies = React.useMemo<Currency[]>(() => {
      const currencyMap = new Map<string, Currency>()

      currencies.all.forEach((currency: Currency) => {
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
    }, [])

    const selectedCurrency = React.useMemo(() => {
      if (currencyCode) {
        return uniqueCurrencies.find(curr => curr.code === currencyCode)
      }

      if (!quoteTemplate?.currency)
        return uniqueCurrencies.find(curr => curr.code === 'TND')
      else
        return uniqueCurrencies.find(
          curr => curr.code === quoteTemplate.currency.toString()
        )
    }, [currencyCode, quoteTemplate?.currency, uniqueCurrencies])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      // If the input is empty, pass undefined to the parent component
      if (e.target.value === '') {
        if (onChange) {
          onChange(undefined as any)
        }
        return
      }

      const inputValue = Number(e.target.value)
      const newValue =
        maxValue !== undefined && inputValue > maxValue ? maxValue : inputValue

      if (onChange) {
        onChange(newValue)
      }
    }

    // Handle click to select all text
    const handleClick = (e: React.MouseEvent<HTMLInputElement>): void => {
      e.currentTarget.select()
    }

    // Helper function to determine the input value display
    const getDisplayValue = (): number | '' => {
      if (value === undefined || value === null || value === 0) {
        return ''
      }
      return value
    }

    const handleCurrencyChange = (newCurrencyCode: string): void => {
      changeCurrencyMutation.mutate({
        currency: newCurrencyCode
      })
    }

    return (
      <div className='relative w-full'>
        <input
          ref={ref}
          className={cn(
            'border-input placeholder:text-text-secandary flex h-[48px] w-full rounded-md border bg-background bg-white px-3 py-2 text-sm text-secondary ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            hideCurrency
              ? ''
              : currentLanguage === 'ar'
                ? 'pl-[90px]'
                : 'pr-[90px]',
            className
          )}
          type='number'
          value={getDisplayValue()}
          disabled={disabled}
          onChange={handleChange}
          onClick={handleClick}
          max={maxValue}
          {...props}
        />

        {!hideCurrency && (
          <div
            className={cn(
              'absolute top-0 flex h-[48px] items-center',
              currentLanguage === 'ar' ? 'left-1' : 'right-1'
            )}
          >
            <Select
              value={selectedCurrency?.code}
              onValueChange={handleCurrencyChange}
              name='currency-select'
              disabled={disabled}
            >
              <SelectTrigger
                className='h-[36px] border-0 bg-transparent hover:bg-gray-50 focus:ring-0'
                style={{ boxShadow: 'none' }}
              >
                <span className='flex items-center gap-1'>
                  {changeCurrencyMutation.isPending ? (
                    <span className='inline-block h-4 w-4 animate-spin rounded-full border-2 border-text-secondary border-t-transparent' />
                  ) : (
                    <span>{selectedCurrency?.code}</span>
                  )}
                </span>
              </SelectTrigger>
              <SelectContent className='min-w-[200px]'>
                <SelectGroup>
                  {uniqueCurrencies.map(currency => (
                    <SelectItem
                      key={currency?.code}
                      value={currency?.code || ''}
                    >
                      <div className='flex w-full items-center gap-2'>
                        <span className='w-8 text-left text-sm font-medium'>
                          {currency?.code}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    )
  }
)

CurrencyInput.displayName = 'CurrencyInput'

export default CurrencyInput
