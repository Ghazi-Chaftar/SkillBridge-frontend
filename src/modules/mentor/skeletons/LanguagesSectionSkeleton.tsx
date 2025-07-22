import { Skeleton } from '@/src/app/shared/components/utils/Skeleton'

const LanguagesSectionSkeleton = (): JSX.Element => {
  return (
    <div className='relative rounded-2xl border border-gray-100 bg-white p-6 shadow-sm'>
      <div className='mb-6 flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Skeleton className='h-5 w-5 rounded-full' />
          <Skeleton className='h-6 w-20 rounded-md' />
        </div>
        <Skeleton className='h-8 w-8 rounded-full' />
      </div>

      <div className='space-y-4'>
        <div className='flex flex-wrap gap-2'>
          {[1, 2, 3, 4].map(index => (
            <Skeleton
              key={index}
              className={`h-10 rounded-full ${
                index === 1
                  ? 'w-20'
                  : index === 2
                    ? 'w-16'
                    : index === 3
                      ? 'w-24'
                      : 'w-18'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default LanguagesSectionSkeleton
