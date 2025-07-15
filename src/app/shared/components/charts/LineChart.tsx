import { useTranslations } from 'next-intl'
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'
import { ResponsiveContainer } from 'recharts'

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

interface LineChartComponentProps {
  chartData: unknown[] | undefined
  XDataKey: string
  YDataKey: string
  title: string
  isSelect?: boolean
  setMonthsAgo?: (value: number) => void
}

export function LineChartComponent({
  chartData,
  XDataKey,
  YDataKey,
  title,
  isSelect,
  setMonthsAgo
}: LineChartComponentProps): JSX.Element {
  const data = chartData || []
  const monthsAgoOptions = Array.from({ length: 7 }, (_, i) => 6 + i)
  const t = useTranslations('admin')
  const hasData = Array.isArray(chartData) && chartData.length > 0

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-center'>{title}</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
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
            <p>No data available</p>
          </div>
        ) : (
          <div className='h-[300px] w-full'>
            <ResponsiveContainer width='100%' height={300}>
              <LineChart
                data={data}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey={XDataKey}
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={value =>
                    typeof value === 'string' ? value.slice(0, 3) : value
                  }
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tickMargin={10}
                  domain={[0, 'dataMax + 1']}
                  allowDecimals={false}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Line
                  dataKey={YDataKey}
                  type='monotone'
                  stroke='var(--sky-blue)'
                  strokeWidth={2}
                  dot={{ fill: 'var(--sky-blue)', r: 4 }}
                  activeDot={{ fill: 'var(--sky-blue)', r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
