import AboutSectionSkeleton from './AboutSectionSkeleton'
import EducationSectionSkeleton from './EducationSectionSkeleton'
import LanguagesSectionSkeleton from './LanguagesSectionSkeleton'
import LevelsSectionSkeleton from './LevelsSectionSkeleton'
import ProfileHeaderSkeleton from './ProfileHeaderSkeleton'
import StatsCardsSkeleton from './StatsCardsSkeleton'
import SubjectsSectionSkeleton from './SubjectsSectionSkeleton'
import TeachingMethodsSectionSkeleton from './TeachingMethodsSectionSkeleton'

const ProfilePageSkeleton = (): JSX.Element => {
  return (
    <div className='container mx-auto space-y-6 p-4 lg:p-6'>
      {/* Profile Header */}
      <ProfileHeaderSkeleton />

      <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
        {/* Left Column */}
        <div className='space-y-6 lg:col-span-2'>
          <AboutSectionSkeleton />
          <SubjectsSectionSkeleton />
          <EducationSectionSkeleton />
          <LanguagesSectionSkeleton />
        </div>

        {/* Right Column */}
        <div className='space-y-6'>
          <StatsCardsSkeleton />
          <TeachingMethodsSectionSkeleton />
          <LevelsSectionSkeleton />
        </div>
      </div>
    </div>
  )
}

export default ProfilePageSkeleton
