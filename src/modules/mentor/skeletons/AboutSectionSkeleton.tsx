import { Skeleton } from '@/src/app/shared/components/utils/Skeleton'

const AboutSectionSkeleton = (): JSX.Element => {
  return (
    <div className='relative rounded-2xl border border-gray-100 bg-white p-6 pb-20 shadow-sm'>
      <div className='mb-6 flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Skeleton className='h-5 w-5 rounded-full' />
          <Skeleton className='h-6 w-20 rounded-md' />
        </div>
        <Skeleton className='h-8 w-8 rounded-full' />
      </div>

      <div className='space-y-4'>
        <div className='space-y-2'>
          <Skeleton className='h-4 w-full rounded-md' />
          <Skeleton className='h-4 w-full rounded-md' />
          <Skeleton className='h-4 w-3/4 rounded-md' />
          <Skeleton className='h-4 w-full rounded-md' />
          <Skeleton className='h-4 w-5/6 rounded-md' />
        </div>
      </div>
    </div>
  )
}

export default AboutSectionSkeleton
