import { Skeleton } from '@/src/app/shared/components/utils/Skeleton'

const StatsCardsSkeleton = (): JSX.Element => {
  return (
    <div className='rounded-2xl border border-gray-100 bg-white p-6 shadow-sm'>
      <div className='mb-6 flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Skeleton className='h-5 w-5 rounded-full' />
          <Skeleton className='h-6 w-24 rounded-md' />
        </div>
        <Skeleton className='h-8 w-8 rounded-full' />
      </div>

      <div className='space-y-4'>
        {[1, 2].map(index => (
          <div
            key={index}
            className='flex items-center gap-4 rounded-xl bg-gray-50 p-4'
          >
            <Skeleton className='h-12 w-12 rounded-xl' />
            <div className='flex-1'>
              <Skeleton className='mb-2 h-4 w-20 rounded-md' />
              <Skeleton className='h-6 w-32 rounded-md' />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StatsCardsSkeleton
