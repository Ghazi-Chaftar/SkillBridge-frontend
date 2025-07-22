import { Skeleton } from '@/src/app/shared/components/utils/Skeleton'

const EducationSectionSkeleton = (): JSX.Element => {
  return (
    <div className='relative rounded-2xl border border-gray-100 bg-white p-6 shadow-sm'>
      <div className='mb-6 flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Skeleton className='h-5 w-5 rounded-full' />
          <Skeleton className='h-6 w-40 rounded-md' />
        </div>
        <Skeleton className='h-8 w-8 rounded-full' />
      </div>

      <div className='space-y-4'>
        <div className='space-y-3'>
          {[1, 2, 3].map(index => (
            <div
              key={index}
              className='flex items-center justify-between rounded-xl border border-orange-200 bg-orange-50 p-4'
            >
              <div className='flex items-center gap-3'>
                <Skeleton className='h-8 w-8 rounded-full' />
                <Skeleton className='h-5 w-48 rounded-md' />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default EducationSectionSkeleton
