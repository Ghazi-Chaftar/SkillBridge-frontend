import Image from 'next/image'

export const ArchitectLoader: React.FC = () => {
  return (
    <div className='flex w-full items-center justify-center pt-[20%]'>
      <Image
        src='/architectLoader.gif'
        alt='Example GIF'
        width={50}
        height={50}
      />
    </div>
  )
}
