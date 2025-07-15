'use client'

import { TrendingDown, TrendingUp } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { ReactNode, useCallback } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  Legend,
  XAxis,
  YAxis
} from 'recharts'

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

// Define a type for each bar series
export interface HorizontalBarSeries {
  dataKey: string
  color?: string
  label?: string
  stackId?: string
  radius?: number | [number, number, number, number]
}

interface BarChartHorizontalProps {
  chartData: unknown[] | undefined
  chartConfig?: ChartConfig
  title?: string
  description?: string
  footerNote?: string
  trendText?: string | ReactNode
  trendValue?: number
  barSeries: HorizontalBarSeries[]
  categoryKey: string
  setMonthsAgo?: (value: number) => void
  isSelect?: boolean
  showLegend?: boolean
  height?: number | string
  className?: string
  barSize?: number
  barGap?: number
  maxBarSize?: number
  hideXAxis?: boolean
  formatValue?: (value: any) => string
  formatCategory?: (value: any) => string
  formatBarColor?: (entry: any) => string
  tooltipFormatter?: (value: any) => string
  showLabels?: boolean // Whether to show value labels
  labelPosition?: 'right' | 'center' | 'inside' // New option: 'inside'
  onBarClick?: (data: any, index: number) => void // Callback for bar click
  labelColor?: string // Color for labels (useful for inside positioning)
  labelFormatter?: (value: any) => string // Function to format label values
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
  multipleKeys,
  tooltipFormatter
}: ChartTooltipContentProps & {
  tooltipFormatter?: (value: any) => string
}): JSX.Element | null => {
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
                {/* Display just the value if tooltipFormatter is provided */}
                {tooltipFormatter ? (
                  <span className='font-semibold'>
                    {tooltipFormatter(item.value)}
                  </span>
                ) : (
                  <>
                    <span>{keyInfo.label}:</span>
                    {keyInfo.currency ? (
                      <CurrencyLabel
                        className='font-semibold'
                        amount={item.value}
                      />
                    ) : (
                      <span className='font-semibold'>{item.value}</span>
                    )}
                  </>
                )}
              </div>
            )
          })
        : payload.map((item, index) => (
            <div key={index} className='flex justify-center'>
              {/* Display just the value if tooltipFormatter is provided */}
              {tooltipFormatter ? (
                <span className='font-semibold'>
                  {tooltipFormatter(item.value)}
                </span>
              ) : (
                <div className='flex justify-between gap-2'>
                  <span>{item.name || item.dataKey}:</span>
                  <span className='font-semibold'>{item.value}</span>
                </div>
              )}
            </div>
          ))}
    </div>
  )
}

export function BarChartHorizontal({
  chartData,
  chartConfig,
  title,
  description,
  footerNote,
  trendText,
  trendValue,
  barSeries,
  categoryKey,
  setMonthsAgo,
  isSelect = false,
  showLegend = false,
  className = '',
  barSize,
  barGap,
  maxBarSize,
  hideXAxis = false,
  formatValue,
  formatCategory,
  formatBarColor,
  showLabels = false,
  labelPosition = 'right',
  labelColor = '#ffffff', // Default white text for inside labels
  labelFormatter = value => value?.toString() || '',
  tooltipFormatter,
  onBarClick
}: BarChartHorizontalProps): JSX.Element {
  const monthsAgoOptions = Array.from({ length: 7 }, (_, i) => 6 + i)
  const t = useTranslations('admin')

  // Handle bar click events
  const handleBarClick = useCallback(
    (data: any, index: number) => {
      if (onBarClick) {
        onBarClick(data, index)
      }
    },
    [onBarClick]
  )

  // Custom label renderer for more control
  const renderCustomBarLabel = (props: any): JSX.Element | null => {
    const { x, y, width, height, value } = props

    if (!value || value === 0) return null

    // Format the value
    const formattedValue = labelFormatter
      ? labelFormatter(value)
      : typeof value === 'number'
        ? value.toLocaleString()
        : value

    let labelX, textAnchor, fill

    if (labelPosition === 'inside') {
      labelX = x + 10
      textAnchor = 'start'
      fill = labelColor
    } else if (labelPosition === 'center') {
      labelX = x + width / 2
      textAnchor = 'middle'
      fill = '#333333'
    } else {
      // 'right'
      labelX = x + width + 5
      textAnchor = 'start'
      fill = '#333333'
    }

    // Only show label inside if bar is wide enough
    if (labelPosition === 'inside' && width < 40) {
      return null
    }

    return (
      <text
        x={labelX}
        y={y + height / 2}
        fill={fill}
        textAnchor={textAnchor}
        dominantBaseline='central'
        fontSize={12}
      >
        {formattedValue}
      </text>
    )
  }

  return (
    <div className={`flex h-full w-full flex-col ${className}`}>
      {/* Header section with title and filter */}
      {(title || description || (isSelect && setMonthsAgo)) && (
        <div className='mb-4 flex-shrink-0'>
          {(title || description) && (
            <div className='mb-4'>
              {title && (
                <p className='text-start text-lg font-semibold'>{title}</p>
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
      <div className='h-full w-full flex-grow p-0'>
        <ChartContainer config={chartConfig} className='h-full w-full p-0'>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout='vertical'
            margin={{
              top: 5,
              right: labelPosition === 'right' ? 50 : 30,
              left: 0,
              bottom: 5
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
            <YAxis
              dataKey={categoryKey}
              type='category'
              tickLine={false}
              axisLine={false}
              tickMargin={5}
              width={70}
              tickFormatter={value =>
                formatCategory ? formatCategory(value) : value
              }
            />
            {!hideXAxis && (
              <XAxis
                type='number'
                tickLine={false}
                axisLine={false}
                tickFormatter={value =>
                  formatValue ? formatValue(value) : value
                }
              />
            )}
            <ChartTooltip
              cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
              content={
                <ChartTooltipContent
                  hideLabel={false}
                  multipleKeys={barSeries.map(bar => ({
                    key: bar.dataKey,
                    label: bar.label || bar.dataKey,
                    currency: false
                  }))}
                  tooltipFormatter={tooltipFormatter}
                />
              }
            />
            {barSeries.map((bar, index) => {
              const barColor =
                bar.color || `var(--color-${index + 1}, var(--sky-blue))`

              return (
                <Bar
                  key={`bar-${index}`}
                  dataKey={bar.dataKey}
                  stackId={bar.stackId}
                  fill={barColor}
                  radius={bar.radius || 5}
                  name={bar.label || bar.dataKey}
                  // Add onClick handler for the bar
                  onClick={(data, i) => handleBarClick(data, i)}
                  className='cursor-pointer' // Add pointer cursor for clickable bars
                  {...(formatBarColor && {
                    fill: undefined,
                    stroke: undefined,
                    fillOpacity: 1
                  })}
                >
                  {/* Add the LabelList component for value labels */}
                  {showLabels && (
                    <LabelList
                      dataKey={bar.dataKey}
                      position={
                        labelPosition === 'inside' ? 'center' : labelPosition
                      } // Use center position for inside labels
                      content={renderCustomBarLabel}
                      fill={labelPosition === 'inside' ? labelColor : barColor}
                    />
                  )}

                  {formatBarColor &&
                    chartData?.map((entry, i) => (
                      <Cell
                        key={`cell-${i}`}
                        fill={formatBarColor(entry)}
                        // Add click handler to each cell for consistent behavior
                        onClick={() => handleBarClick(entry, i)}
                      />
                    ))}
                </Bar>
              )
            })}
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
