'use client'

import { useTranslations } from 'next-intl'
import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis
} from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from '../layout'
import { ChartTooltip, ChartTooltipContent } from './Chart'

type ChartDataItem = {
  label: string
  value: number
}

type ChartConfig = Record<string, { label: string; color: string }>

type BarChartHorizontalProps = {
  chartData: ChartDataItem[]
  chartConfig: ChartConfig
  cardRef: React.RefObject<HTMLDivElement>
  hideLabels: boolean
  title: string
  labelDx?: number
  labelDy?: number
}

const BarChartHorizontal: React.FC<BarChartHorizontalProps> = ({
  chartData,
  cardRef,
  title
}) => {
  const t = useTranslations('admin')

  // Check if data exists and has values greater than 0

  // Calculate chart height based on number of items
  const itemHeight = 40
  const chartHeight = Math.max(200, chartData?.length * itemHeight + 50)
  const hasData = Array.isArray(chartData) && chartData.length > 0

  return (
    <div className='w-full'>
      <Card ref={cardRef} className='w-full'>
        <CardHeader className='text-center'>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className='min-h-[300px] w-full'>
          <div className='h-full w-full'>
            {!hasData ? (
              <div className='flex h-[200px] items-center justify-center text-gray-500'>
                {t('dashboard.noDataAvailable')}
              </div>
            ) : (
              <ResponsiveContainer width='100%' height={chartHeight}>
                <RechartsBarChart
                  data={chartData}
                  layout='vertical'
                  margin={{ top: 20, bottom: 20 }}
                >
                  <CartesianGrid horizontal={false} strokeDasharray='3 3' />
                  <YAxis
                    dataKey='label'
                    type='category'
                    width={190}
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <XAxis
                    type='number'
                    tickLine={false}
                    axisLine={false}
                    domain={[0, 'dataMax + 0.5']}
                    hide={true}
                  />
                  <ChartTooltip
                    cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                    content={<ChartTooltipContent />}
                  />
                  <Bar
                    dataKey='value'
                    fill='#8fc6fd'
                    radius={[0, 4, 4, 0]}
                    barSize={30}
                  >
                    <LabelList<ChartDataItem>
                      dataKey='value'
                      position='right'
                      formatter={(value: number) => value}
                      fontSize={12}
                    />
                  </Bar>
                </RechartsBarChart>
              </ResponsiveContainer>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default BarChartHorizontal
