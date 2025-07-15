'use client'

import * as React from 'react'
import { Label, Legend, Pie, PieChart as RechartsPieChart } from 'recharts'

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  PriceChartTooltipContent
} from './Chart'

// Style object to remove focus outlines

export interface PieChartProps {
  chartData?: any[]
  chartConfig?: ChartConfig
  title?: string
  description?: string
  trendText?: string
  trendPercentage?: string
  footerNote?: string
  dataKey?: string
  nameKey?: string
  innerRadius?: number
  className?: string
  showTooltip?: boolean
  centerLabel?: boolean
  centerLabelText?: string
  showLegend?: boolean
  // New props for dual values in center
  showMultipleValues?: boolean
  multiValueIndices?: number[] // Indices of values to show from chartData
}

export function PieChart({
  chartData = [],
  chartConfig = {},
  title,
  description,
  dataKey = 'visitors',
  nameKey = 'browser',
  innerRadius = 60,
  className = '',
  showTooltip = true,
  centerLabel = true,
  centerLabelText = 'Visitors',
  showLegend = true,
  // New props with defaults
  showMultipleValues = false,
  multiValueIndices = [0, 1] // Default to first two items
}: PieChartProps): React.JSX.Element {
  const totalValue = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr[dataKey], 0)
  }, [chartData, dataKey])

  // Reference to the chart container
  const chartContainerRef = React.useRef<HTMLDivElement>(null)

  return (
    <div className={`flex flex-col ${className}`}>
      <div className='items-center pb-0'>
        {title && <p>{title}</p>}
        {description && <p>{description}</p>}
      </div>
      <div className='flex-1 pb-0' ref={chartContainerRef}>
        <ChartContainer
          config={chartConfig}
          className='mx-auto aspect-square max-h-[250px]'
        >
          <RechartsPieChart>
            {showTooltip && (
              <ChartTooltip
                cursor={false}
                content={<PriceChartTooltipContent hideLabel />}
              />
            )}
            <Pie
              data={chartData}
              dataKey={dataKey}
              nameKey={nameKey}
              innerRadius={innerRadius}
              outerRadius='80%'
              cornerRadius={10}
              paddingAngle={2}
              strokeWidth={5}
              focusable={false}
              className='shadow-none outline-none'
            >
              {centerLabel && !showMultipleValues && (
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor='middle'
                          dominantBaseline='middle'
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className='fill-foreground text-3xl font-bold'
                          >
                            {totalValue.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className='fill-muted-foreground'
                          >
                            {centerLabelText}
                          </tspan>
                        </text>
                      )
                    }
                  }}
                />
              )}

              {/* New center label for multiple values */}
              {centerLabel && showMultipleValues && chartData.length > 0 && (
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                      // Get the selected items (default to first two)
                      const items = multiValueIndices
                        .map(index => chartData[index])
                        .filter(item => item) // Filter out undefined items

                      if (items.length === 0) return null

                      // Three lines per item (title, value, spacing)
                      const lineHeight = 18 // Height of each line
                      const itemHeight = lineHeight * 3 // Height per item with spacing
                      const totalHeight = items.length * itemHeight
                      const startY =
                        (viewBox.cy || 0) - totalHeight / 2 + lineHeight

                      return (
                        <g>
                          {items.map((item, i) => {
                            if (!item) return null

                            const yPos = startY + i * itemHeight

                            // Title text (e.g. "Reste à encaissé")
                            const titleTspan = (
                              <text
                                key={`title-${i}`}
                                x={viewBox.cx}
                                y={yPos}
                                textAnchor='middle'
                                className='fill-gray-500 text-xs'
                              >
                                {item.category || item[nameKey]}
                              </text>
                            )

                            // Value text (e.g. "2083,11")
                            const valueTspan = (
                              <text
                                key={`value-${i}`}
                                x={viewBox.cx}
                                y={yPos + lineHeight}
                                textAnchor='middle'
                                className='text-base font-bold'
                                style={{
                                  // Use the fill color from the item
                                  fill:
                                    item.color ||
                                    chartConfig[item[nameKey]]?.color ||
                                    item.fill ||
                                    '#000000'
                                }}
                              >
                                {typeof item[dataKey] === 'number'
                                  ? item[dataKey].toLocaleString(undefined, {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2
                                    })
                                  : item[dataKey]}
                              </text>
                            )

                            return [titleTspan, valueTspan]
                          })}
                        </g>
                      )
                    }
                    return null
                  }}
                />
              )}
            </Pie>
          </RechartsPieChart>
        </ChartContainer>
        {showLegend && <Legend />}
      </div>
    </div>
  )
}
