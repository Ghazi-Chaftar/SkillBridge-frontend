import Image from 'next/image'

export const Loader: React.FC = () => {
  return (
    <div className='flex h-64 w-full items-center justify-center'>
      <Image src='/loader.gif' alt='Example GIF' width={50} height={50} />
    </div>
  )
}
