'use client'

import * as React from 'react'
import * as RechartsPrimitive from 'recharts'

import { cn } from '@/lib/utils'

import CurrencyLabel from '../utils/CurrencyLabel'

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
    color?: string
  }
}

type ChartContextProps = {
  config: ChartConfig | undefined
}

const ChartContext = React.createContext<ChartContextProps | null>(null)

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'> & {
    config?: ChartConfig
    children: React.ComponentProps<
      typeof RechartsPrimitive.ResponsiveContainer
    >['children']
    responsive?: boolean
  }
>(({ id, className, children, config, responsive = true, ...props }, ref) => {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, '')}`

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn('flex justify-center text-xs', className)}
        {...props}
      >
        {config && <ChartStyle id={chartId} config={config} />}
        {responsive ? (
          <RechartsPrimitive.ResponsiveContainer>
            {children}
          </RechartsPrimitive.ResponsiveContainer>
        ) : (
          children
        )}
      </div>
    </ChartContext.Provider>
  )
})
ChartContainer.displayName = 'Chart'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([, config]) => config.color
  )

  if (!colorConfig.length) {
    return null
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
[data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    return itemConfig.color
      ? `  --dashboard-color-${key}: ${itemConfig.color};`
      : null
  })
  .join('\n')}
}
`
      }}
    />
  )
}

const ChartTooltip = RechartsPrimitive.Tooltip

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
    React.ComponentProps<'div'> & {
      hideLabel?: boolean
      hideIndicator?: boolean
      indicator?: 'line' | 'dot' | 'dashed'
      nameKey?: string
      labelKey?: string
    }
>(
  (
    {
      active,
      payload,
      className = '',
      indicator = 'dot',
      hideIndicator = false,
      color
    },
    ref
  ) => {
    if (!active || !payload?.length) {
      return null
    }

    return (
      <div
        ref={ref}
        className={cn(
          'grid min-w-[8rem] items-start gap-1.5 rounded-lg  border-dashboard-border bg-dashboard-background px-2.5 py-1.5 text-xs shadow-xl',
          className
        )}
      >
        <div className='grid gap-1.5'>
          {payload.map(item => {
            const indicatorColor =
              color || item.payload.fill || item.color || '#000000'

            return (
              <div
                key={item.dataKey}
                className={cn(
                  'flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5',
                  indicator === 'dot' && 'items-center'
                )}
              >
                {!hideIndicator && (
                  <div
                    className='h-3 w-3 shrink-0 rounded-full border'
                    style={{
                      backgroundColor: indicatorColor,
                      borderColor: indicatorColor
                    }}
                  />
                )}

                <div className='flex flex-1 justify-between leading-none'>
                  <span className='text-dashboard-muted-foreground'>
                    {item.payload?.label || item.name}
                  </span>

                  {item.value && (
                    <span className='font-mono font-medium tabular-nums text-dashboard-foreground'>
                      {item.value.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
)
ChartTooltipContent.displayName = 'ChartTooltip'

const ChartLegend = RechartsPrimitive.Legend

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'> &
    Pick<RechartsPrimitive.LegendProps, 'payload'> & {
      nameKey?: string
    }
>(({ className, payload, nameKey = 'value' }, ref) => {
  if (!payload?.length) {
    return null
  }

  return (
    <div
      ref={ref}
      className={cn('flex flex-col items-start gap-2 pt-3', className)}
    >
      {payload.map(item => (
        <div key={item.value} className='flex items-center gap-1.5'>
          <div
            className='h-2 w-2 shrink-0 rounded-[2px]'
            style={{
              backgroundColor: item.color
            }}
          />
          <span>{item[nameKey as keyof typeof item] ?? item.value}</span>{' '}
          {/* Ensure the text aligns properly */}
        </div>
      ))}
    </div>
  )
})
ChartLegendContent.displayName = 'ChartLegend'

const PriceChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
    React.ComponentProps<'div'> & {
      hideLabel?: boolean
      hideIndicator?: boolean
      indicator?: 'line' | 'dot' | 'dashed'
      nameKey?: string
      labelKey?: string
    }
>(
  (
    {
      active,
      payload,
      className = '',
      indicator = 'dot',
      hideIndicator = false,
      color
    },
    ref
  ) => {
    if (!active || !payload?.length) {
      return null
    }

    return (
      <div
        ref={ref}
        className={cn(
          'grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-dashboard-border bg-dashboard-background px-2.5 py-1.5 text-xs shadow-xl',
          className
        )}
      >
        <div className='grid gap-1.5'>
          {payload.map(item => {
            const indicatorColor =
              color || item.payload.fill || item.color || '#000000'

            return (
              <div
                key={item.dataKey}
                className={cn(
                  'flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5',
                  indicator === 'dot' && 'items-center'
                )}
              >
                {!hideIndicator && (
                  <div
                    className='h-3 w-3 shrink-0 rounded-full border'
                    style={{
                      backgroundColor: indicatorColor,
                      borderColor: indicatorColor
                    }}
                  />
                )}

                <div className='flex flex-1 justify-between leading-none'>
                  <span className='text-dashboard-muted-foreground'>
                    {item.payload?.label || item.name}
                  </span>

                  {item.value && (
                    <CurrencyLabel
                      amount={item.value.toLocaleString()}
                      className='pl-2 font-mono font-medium tabular-nums text-dashboard-foreground'
                    />
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
)
PriceChartTooltipContent.displayName = 'ChartTooltip'
export {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
  PriceChartTooltipContent
}
