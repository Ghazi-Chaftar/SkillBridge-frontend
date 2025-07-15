'use client'

import { useTranslations } from 'next-intl'
import { Pie, PieChart } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '../layout'
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from './Chart'

interface LabeledPieChartProps {
  chartData: unknown[] | undefined
  chartConfig: ChartConfig | undefined
  title: string
  description?: string
  nameKey: string
  dataKey: string
}

const LabeledPieChart: React.FC<LabeledPieChartProps> = ({
  chartData,
  chartConfig,
  title,
  description,
  dataKey,
  nameKey
}) => {
  const hasData = Array.isArray(chartData) && chartData.length > 0
  const t = useTranslations('admin')
  return (
    <Card className='flex h-[500px] w-[500px] flex-col p-2'>
      <CardHeader className='flex justify-center pb-0'>
        <CardTitle className='text-center'>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className='flex-1 pb-0'>
        {!hasData ? (
          <div className='flex h-[300px] items-center justify-center'>
            <p className='text-gray-500'>{t('dashboard.noDataAvailable')}</p>
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className='mx-auto aspect-square pb-0 [&_.recharts-pie-label-text]:fill-foreground'
          >
            <PieChart className='mx-auto h-[300px] w-[300px]'>
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className='bg-white text-black'
                    indicator='dot'
                  />
                }
              />
              <Pie data={chartData} dataKey={dataKey} label nameKey={nameKey} />
              <ChartLegend
                content={<ChartLegendContent nameKey={nameKey} />}
                wrapperStyle={{
                  display: 'flex',
                  justifyContent: 'center'
                }}
                className='mb-6'
              />
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter className='flex-col text-sm'></CardFooter>
    </Card>
  )
}

export default LabeledPieChart
