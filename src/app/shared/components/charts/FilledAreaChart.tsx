'use client'

import { TrendingDown, TrendingUp } from 'lucide-react'
import { ReactNode } from 'react'
import { Area, AreaChart, CartesianGrid, Legend, XAxis } from 'recharts'

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

export interface AreaSeries {
  dataKey: string
  color?: string
  label?: string
  fill?: string
  fillOpacity?: number
  type?: 'linear' | 'monotone' | 'natural' | 'step'
  stackId?: string
}

interface FilledAreaChartProps {
  chartData: unknown[] | undefined
  chartConfig?: ChartConfig
  title?: string
  description?: string
  footerNote?: string
  trendText?: string | ReactNode
  trendValue?: number
  areaSeries?: AreaSeries[]
  dataKeyAxis: string
  setMonthsAgo?: (value: number) => void
  isSelect?: boolean
  showLegend?: boolean
  showGradient?: boolean
  withCard?: boolean
  height?: number | string
  className?: string
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

export function FilledAreaChart({
  chartData,
  chartConfig,
  title,
  description,
  footerNote,
  trendText,
  trendValue,
  areaSeries = [],
  dataKeyAxis,
  setMonthsAgo,
  isSelect = false,
  showLegend = false,
  showGradient = true,

  className = ''
}: FilledAreaChartProps): JSX.Element {
  const monthsAgoOptions = Array.from({ length: 7 }, (_, i) => 6 + i)

  // Gradient definitions for each area
  const gradientDefs = showGradient ? (
    <defs>
      {areaSeries.map((series, index) => (
        <linearGradient
          key={`fill-${series.dataKey}`}
          id={`fill-${series.dataKey}`}
          x1='0'
          y1='0'
          x2='0'
          y2='1'
        >
          <stop
            offset='5%'
            stopColor={series.color || `var(--color-${index + 1}, #1e88e5)`}
            stopOpacity={0.8}
          />
          <stop
            offset='95%'
            stopColor={series.color || `var(--color-${index + 1}, #1e88e5)`}
            stopOpacity={0.1}
          />
        </linearGradient>
      ))}
    </defs>
  ) : null

  return (
    // Make this a flex column to properly handle headers/footers
    <div className={`flex h-full w-full flex-col ${className}`}>
      {/* Header section with title and filter */}
      {(title || description || (isSelect && setMonthsAgo)) && (
        <div className='mb-4 flex-shrink-0'>
          {' '}
          {/* Add flex-shrink-0 to prevent header from shrinking */}
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
                  <SelectValue placeholder='Select range' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Last</SelectLabel>
                    {monthsAgoOptions.map(value => (
                      <SelectItem key={value} value={value.toString()}>
                        {value} months
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      )}

      <div className='h-full w-full '>
        <ChartContainer config={chartConfig} className='h-full w-full'>
          <AreaChart
            data={chartData}
            margin={{
              top: 10,
              right: 12,
              left: 12,
              bottom: 10
            }}
          >
            {/* Chart content remains the same */}
            <CartesianGrid
              vertical={false}
              strokeDasharray='3 3'
              horizontal={false}
            />
            <XAxis
              dataKey={dataKeyAxis}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={value =>
                typeof value === 'string' ? value.slice(0, 3) : value
              }
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  hideLabel={false}
                  multipleKeys={areaSeries.map(area => ({
                    key: area.dataKey,
                    label: area.label || area.dataKey,
                    currency: false
                  }))}
                />
              }
            />
            {gradientDefs}
            {areaSeries.map((area, index) => (
              <Area
                key={`area-${index}`}
                dataKey={area.dataKey}
                type={area.type || 'monotone'}
                fill={
                  showGradient
                    ? `url(#fill-${area.dataKey})`
                    : area.fill ||
                      area.color ||
                      `var(--color-${index + 1}, #1e88e5)`
                }
                fillOpacity={
                  area.fillOpacity !== undefined ? area.fillOpacity : 0.4
                }
                stroke={area.color || `var(--color-${index + 1}, #1e88e5)`}
                strokeWidth={2}
                stackId={area.stackId}
              />
            ))}
            {showLegend && <Legend />}
          </AreaChart>
        </ChartContainer>
      </div>
      {/* Footer section with trend and note */}
      {(trendText || trendValue || footerNote) && (
        <div className='mt-4 flex w-full flex-shrink-0 items-start gap-2 text-sm'>
          {' '}
          {/* Add flex-shrink-0 */}
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
