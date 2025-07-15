import { cn } from '@/lib/utils'

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  withoutAnimation?: boolean
}

const Skeleton = ({
  className,
  withoutAnimation = false,
  ...props
}: SkeletonProps): JSX.Element => {
  return (
    <div
      className={cn(
        ' rounded-md bg-gray-900 bg-opacity-20',
        withoutAnimation ? 'bg-gray-400' : 'skeleton-pulse',
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
