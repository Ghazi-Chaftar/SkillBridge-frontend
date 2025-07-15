'use client'

import { useTranslations } from 'next-intl'
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
import { ChartContainer, ChartTooltip } from './Chart'

export type ChartConfig = Record<string, { label: string; color: string }>

export interface BarChartDataItem {
  label: string
  value: number
}

// Define a type for each bar series
export interface BarSeries {
  dataKey: string
  color?: string
  label?: string
}

interface MultiBarChartVerticalProps {
  chartData: unknown[] | undefined
  chartConfig?: ChartConfig
  title?: string
  description?: string
  footerNote?: string
  trendText?: string
  dataKey?: string // Make optional since we'll use barSeries instead
  barSeries?: BarSeries[] // New prop for multiple bars
  dataKeyAxis: string
  setMonthsAgo?: (value: number) => void
  isSelect?: boolean
  showLegend?: boolean
  barWidth?: number // Add new prop for bar width
}
interface ChartTooltipContentProps {
  active?: boolean
  payload?: Array<{
    value: number
    name: string
    dataKey: string
    payload: any
    fill?: string // Add this to capture the fill color from recharts
  }>
  label?: string
  hideLabel?: boolean
  multipleKeys?: Array<{ key: string; label: string; color?: string }> // Add color here
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

            // Use the explicitly passed color first, then fall back to fill or default
            const colorToUse = keyInfo.color || item.fill || '#cccccc'

            return (
              <div
                key={keyInfo.key}
                className='flex items-center justify-between gap-2'
              >
                <div className='flex items-center gap-2'>
                  {/* Color indicator */}
                  <div
                    className='h-3 w-3 rounded-full'
                    style={{ backgroundColor: colorToUse }}
                  />
                  <span>{keyInfo.label}:</span>
                </div>
                <CurrencyLabel className='font-semibold' amount={item.value} />
              </div>
            )
          })
        : payload.map((item, index) => (
            <div
              key={index}
              className='flex items-center justify-between gap-2'
            >
              <div className='flex items-center gap-2'>
                {/* Color indicator */}
                <div
                  className='h-3 w-3 rounded-full'
                  style={{ backgroundColor: item.fill || '#cccccc' }}
                />
                <span>{item.name || item.dataKey}:</span>
              </div>
              <span className='font-semibold'>{item.value}</span>
            </div>
          ))}
    </div>
  )
}
export function MultiBarChartVertical({
  chartData,
  chartConfig,
  title,
  description,
  dataKey,
  barSeries = [],
  setMonthsAgo,
  isSelect = false,
  dataKeyAxis,
  showLegend = false,
  barWidth
}: MultiBarChartVerticalProps): JSX.Element {
  const monthsAgoOptions = Array.from({ length: 7 }, (_, i) => 6 + i)
  const t = useTranslations('admin')

  // For backward compatibility, if dataKey is provided but barSeries is empty,
  // create a barSeries entry for the dataKey
  const bars =
    barSeries.length > 0
      ? barSeries
      : dataKey
        ? [{ dataKey, color: 'var(--sky-blue)' }]
        : []

  return (
    <div className='flex h-full w-full flex-col'>
      <div className='h-full w-full'>
        <div>
          {title && <p className='text-center'>{title}</p>}
          {description && <p>{description}</p>}
        </div>
        {isSelect && (
          <div className='flex justify-end'>
            <Select onValueChange={value => setMonthsAgo?.(parseInt(value))}>
              <SelectTrigger className='w-[300px]'>
                <SelectValue placeholder={t('dashboard.selectAnalysisRange')} />
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

        <div className='h-full w-full shadow-none outline-none'>
          <ChartContainer
            config={chartConfig}
            className='h-full w-full shadow-none outline-none'
          >
            <BarChart
              accessibilityLayer
              data={chartData}
              className='h-full w-full shadow-none outline-none'
            >
              <CartesianGrid vertical={false} horizontal={false} />
              <XAxis
                dataKey={dataKeyAxis}
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={value => value.slice(0, 3)}
                className='shadow-none outline-none'
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    hideLabel
                    multipleKeys={bars.map(bar => ({
                      key: bar.dataKey,
                      label: bar.label || bar.dataKey,
                      color: bar.color // Pass the color from barSeries
                    }))}
                  />
                }
              />
              {bars.map((bar, index) => (
                <Bar
                  key={`bar-${index}`}
                  dataKey={bar.dataKey}
                  fill={
                    bar.color || `var(--color-${index + 1}, var(--sky-blue))`
                  }
                  radius={8}
                  name={bar.label || bar.dataKey}
                  barSize={barWidth} // Apply the bar width here
                  className='shadow-none outline-none'
                />
              ))}
              {showLegend && <Legend />}
            </BarChart>
          </ChartContainer>
        </div>
      </div>
    </div>
  )
}
