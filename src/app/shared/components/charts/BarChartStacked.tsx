'use client'

import { TrendingDown, TrendingUp } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { ReactNode } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, XAxis } from 'recharts'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '../form'
import CurrencyLabel from '../utils/CurrencyLabel'
import { ChartConfig, ChartContainer, ChartTooltip } from './Chart'

// Define a type for each bar series, similar to MultiBarChartVertical
export interface StackedBarSeries {
  dataKey: string
  color?: string
  label?: string
  stackId: string
  radius?: [number, number, number, number]
}

interface BarChartStackedProps {
  chartData: unknown[] | undefined
  chartConfig?: ChartConfig
  title?: string
  description?: string
  footerNote?: string
  trendText?: string | ReactNode
  trendValue?: number
  barSeries: StackedBarSeries[] // Required property for stacked bars
  dataKeyAxis: string
  setMonthsAgo?: (value: number) => void
  isSelect?: boolean
  showLegend?: boolean
  height?: number | string
  className?: string
  barSize?: number
  barGap?: number
  maxBarSize?: number
}

interface ChartTooltipContentProps {
  active?: boolean
  payload?: Array<{
    value: number
    name: string
    dataKey: string
    payload: any
  }>
  label?: string
  hideLabel?: boolean
  multipleKeys?: Array<{ key: string; label: string; currency?: boolean }>
}

const ChartTooltipContent = ({
  active,
  payload,
  label,
  hideLabel = false,
  multipleKeys
}: ChartTooltipContentProps): JSX.Element | null => {
  if (!active || !payload || !payload.length) return null

  return (
    <div className='rounded border bg-white p-2 shadow-md'>
      {!hideLabel && <p className='font-semibold'>{label}</p>}
      {multipleKeys
        ? multipleKeys.map(keyInfo => {
            const item = payload.find(p => p.dataKey === keyInfo.key)
            if (!item) return null
            return (
              <div key={keyInfo.key} className='flex justify-between gap-2'>
                <span>{keyInfo.label}:</span>
                {keyInfo.currency ? (
                  <CurrencyLabel
                    className='font-semibold'
                    amount={item.value}
                  />
                ) : (
                  <span className='font-semibold'>{item.value}</span>
                )}
              </div>
            )
          })
        : payload.map((item, index) => (
            <div key={index} className='flex justify-between gap-2'>
              <span>{item.name || item.dataKey}:</span>
              <span className='font-semibold'>{item.value}</span>
            </div>
          ))}
    </div>
  )
}

export function BarChartStacked({
  chartData,
  chartConfig,
  title,
  description,
  footerNote,
  trendText,
  trendValue,
  barSeries,
  dataKeyAxis,
  setMonthsAgo,
  isSelect = false,
  showLegend = false,
  className = '',
  barSize,
  barGap,
  maxBarSize
}: BarChartStackedProps): JSX.Element {
  const monthsAgoOptions = Array.from({ length: 7 }, (_, i) => 6 + i)
  const t = useTranslations('admin')

  return (
    <div className={`flex h-full w-full flex-col ${className}`}>
      {/* Header section with title and filter */}
      {(title || description || (isSelect && setMonthsAgo)) && (
        <div className='mb-4 flex-shrink-0'>
          {(title || description) && (
            <div className='mb-4'>
              {title && (
                <p className='text-center text-lg font-semibold'>{title}</p>
              )}
              {description && (
                <p className='text-center text-sm text-muted-foreground'>
                  {description}
                </p>
              )}
            </div>
          )}
          {isSelect && setMonthsAgo && (
            <div className='flex justify-end'>
              <Select onValueChange={value => setMonthsAgo(parseInt(value))}>
                <SelectTrigger className='w-[200px]'>
                  <SelectValue
                    placeholder={t('dashboard.selectAnalysisRange')}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>{t('dashboard.last')}</SelectLabel>
                    {monthsAgoOptions.map(value => (
                      <SelectItem key={value} value={value.toString()}>
                        {value} {t('dashboard.months')}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      )}

      {/* Chart container */}
      <div className='h-full w-full flex-grow'>
        <ChartContainer config={chartConfig} className='h-full w-full'>
          <BarChart
            data={chartData}
            margin={{
              top: 10,
              right: 10,
              left: 10,
              bottom: 10
            }}
            barSize={barSize}
            barGap={barGap}
            maxBarSize={maxBarSize}
          >
            <CartesianGrid
              vertical={false}
              horizontal={false}
              strokeDasharray='3 3'
            />
            <XAxis
              dataKey={dataKeyAxis}
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tickFormatter={value =>
                typeof value === 'string' ? value.slice(0, 3) : value
              }
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  hideLabel={false}
                  multipleKeys={barSeries.map(bar => ({
                    key: bar.dataKey,
                    label: bar.label || bar.dataKey,
                    currency: true
                  }))}
                />
              }
            />
            {barSeries.map((bar, index) => (
              <Bar
                key={`bar-${index}`}
                dataKey={bar.dataKey}
                stackId={bar.stackId}
                fill={bar.color || `var(--color-${index + 1}, var(--sky-blue))`}
                radius={bar.radius || [0, 0, 0, 0]}
                name={bar.label || bar.dataKey}
              />
            ))}
            {showLegend && <Legend />}
          </BarChart>
        </ChartContainer>
      </div>

      {/* Footer section with trend and note */}
      {(trendText || trendValue || footerNote) && (
        <div className='mt-4 flex w-full flex-shrink-0 items-start gap-2 text-sm'>
          <div className='grid gap-2'>
            {trendText && (
              <div className='flex items-center gap-2 font-medium leading-none'>
                {typeof trendText === 'string' ? (
                  <>
                    {trendText}
                    {trendValue !== undefined &&
                      (trendValue > 0 ? (
                        <TrendingUp className='text-green-500 h-4 w-4' />
                      ) : (
                        <TrendingDown className='h-4 w-4 text-red-500' />
                      ))}
                  </>
                ) : (
                  trendText
                )}
              </div>
            )}
            {footerNote && (
              <div className='flex items-center gap-2 leading-none text-muted-foreground'>
                {footerNote}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
