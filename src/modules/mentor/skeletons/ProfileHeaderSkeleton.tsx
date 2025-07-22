import { Skeleton } from '@/src/app/shared/components/utils/Skeleton'

const ProfileHeaderSkeleton = (): JSX.Element => {
  return (
    <div className='mb-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:mb-6 sm:p-6 lg:mb-8 lg:p-8'>
      <div className='flex flex-col gap-4 sm:gap-6 lg:flex-row lg:items-start lg:gap-8'>
        {/* Profile Picture Skeleton */}
        <div className='mx-auto lg:mx-0'>
          <Skeleton className='h-24 w-24 rounded-2xl sm:h-28 sm:w-28 lg:h-32 lg:w-32' />
        </div>

        {/* Profile Info Skeleton */}
        <div className='flex-1 space-y-3 sm:space-y-4'>
          <div className='flex flex-col gap-3 sm:gap-4'>
            <div className='space-y-2'>
              {/* Edit Button Skeleton for Mobile */}
              <div className='flex items-center justify-between lg:hidden'>
                <div></div>
                <Skeleton className='h-8 w-24 rounded-md' />
              </div>

              {/* Name Skeleton */}
              <Skeleton className='h-8 w-64 rounded-md sm:h-9 lg:h-10' />
            </div>

            {/* Contact Info Skeleton */}
            <div className='space-y-2'>
              <div className='flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-4 lg:flex-row lg:gap-6'>
                <div className='flex items-center gap-1'>
                  <Skeleton className='h-3 w-3 rounded-full sm:h-4 sm:w-4' />
                  <Skeleton className='h-4 w-20 rounded-md sm:h-5 sm:w-24' />
                </div>
                <div className='flex items-center gap-1'>
                  <Skeleton className='h-3 w-3 rounded-full sm:h-4 sm:w-4' />
                  <Skeleton className='h-4 w-24 rounded-md sm:h-5 sm:w-28' />
                </div>
                <div className='flex items-center gap-1'>
                  <Skeleton className='h-3 w-3 rounded-full sm:h-4 sm:w-4' />
                  <Skeleton className='h-4 w-16 rounded-md sm:h-5 sm:w-20' />
                </div>
              </div>
            </div>

            {/* Edit Button Skeleton for Desktop */}
            <div className='hidden lg:flex lg:justify-end'>
              <Skeleton className='h-8 w-24 rounded-md' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileHeaderSkeleton
