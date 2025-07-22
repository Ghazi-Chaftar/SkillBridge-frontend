import { Skeleton } from '@/src/app/shared/components/utils/Skeleton'

const SubjectsSectionSkeleton = (): JSX.Element => {
  return (
    <div className='relative rounded-2xl border border-gray-100 bg-white p-6 shadow-sm'>
      <div className='mb-6 flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Skeleton className='h-5 w-5 rounded-full' />
          <Skeleton className='h-6 w-32 rounded-md' />
        </div>
        <Skeleton className='h-8 w-8 rounded-full' />
      </div>

      <div className='space-y-4'>
        <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
          {[1, 2, 3, 4, 5, 6].map(index => (
            <Skeleton key={index} className='h-16 w-full rounded-xl' />
          ))}
        </div>
      </div>
    </div>
  )
}

export default SubjectsSectionSkeleton
