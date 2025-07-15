import { MetricCard, MetricCardProps } from './MetricCard'

interface MetricCardsGroupProps {
  metrics: MetricCardProps[]
  className?: string
  formattedDate?: string | undefined
}

export function MetricCardsGroup({
  metrics,
  formattedDate
}: MetricCardsGroupProps): JSX.Element {
  return (
    <div className={`flex flex-col gap-4`}>
      {metrics.map((metric, index) => (
        <MetricCard key={index} {...metric} formattedDate={formattedDate} />
      ))}
    </div>
  )
}
