import { Skeleton } from '@/src/app/shared/components/utils/Skeleton'

const TeachingMethodsSectionSkeleton = (): JSX.Element => {
  return (
    <div className='rounded-2xl border border-gray-100 bg-white p-6 shadow-sm'>
      <div className='mb-6 flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Skeleton className='h-5 w-5 rounded-full' />
          <Skeleton className='h-6 w-36 rounded-md' />
        </div>
        <Skeleton className='h-8 w-8 rounded-full' />
      </div>

      <div className='grid grid-cols-1 gap-4'>
        {[1, 2, 3].map(index => (
          <div key={index} className='rounded-xl border-2 p-4'>
            <div className='flex items-start gap-3'>
              <Skeleton className='h-10 w-10 rounded-full' />
              <div className='flex-1'>
                <div className='flex items-center justify-between'>
                  <Skeleton className='h-5 w-24 rounded-md' />
                </div>
                <Skeleton className='mt-2 h-4 w-full rounded-md' />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TeachingMethodsSectionSkeleton
