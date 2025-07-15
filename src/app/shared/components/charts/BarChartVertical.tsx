'use client'

import { useTranslations } from 'next-intl'
import React from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '../layout'
import { ChartTooltip, ChartTooltipContent } from './Chart'

export type ChartConfig = Record<string, { label: string; color: string }>

export interface BarChartDataItem {
  label: string
  value: number
}

interface BarChartVerticalProps {
  chartData: unknown[] | undefined
  chartConfig?: ChartConfig
  title?: string
  description?: string
  footerNote?: string
  trendText?: string
  dataKey: string
  dataKeyAxis: string
  setMonthsAgo?: (value: number) => void
  isSelect?: boolean
}

export function BarChartVertical({
  chartData,
  title = 'Bar Chart',
  description = 'January - June 2024',
  dataKey,
  setMonthsAgo,
  isSelect = false,
  dataKeyAxis
}: BarChartVerticalProps): JSX.Element {
  const monthsAgoOptions = Array.from({ length: 7 }, (_, i) => 6 + i)
  const t = useTranslations('admin')
  const hasData = Array.isArray(chartData) && chartData.length > 0

  return (
    <div className='flex flex-col'>
      <Card>
        <CardHeader>
          <CardTitle className='text-center'>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
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

        <CardContent className='min-h-[300px]'>
          {!hasData ? (
            <div className='flex h-[300px] items-center justify-center'>
              <p>{t('dashboard.noDataAvailable')}</p>
            </div>
          ) : (
            <div className='h-[300px] w-full'>
              <ResponsiveContainer width='100%' height={300}>
                <BarChart
                  accessibilityLayer
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid vertical={false} strokeDasharray='3 3' />
                  <XAxis
                    dataKey={dataKeyAxis}
                    tickLine={false}
                    axisLine={false}
                    tick={props => {
                      const { x, y, payload } = props
                      // Get the month name and use the first 3 characters
                      const value = payload.value
                      const displayText =
                        typeof value === 'string' ? value.slice(0, 3) : value

                      return (
                        <g transform={`translate(${x},${y})`}>
                          <text
                            dy={16}
                            textAnchor='middle'
                            fill='#666'
                            fontSize={11}
                          >
                            {displayText}
                          </text>
                        </g>
                      )
                    }}
                    interval={0}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tickMargin={10}
                    domain={[0, 'dataMax + 5']}
                    allowDecimals={false}
                  />
                  <ChartTooltip
                    cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                    content={<ChartTooltipContent hideLabel label={dataKey} />}
                  />
                  <Bar
                    dataKey={dataKey}
                    fill='var(--sky-blue)'
                    radius={[8, 8, 0, 0]}
                    barSize={30}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
