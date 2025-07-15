import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'

const SocialMedia: React.FC = () => {
  return (
    <div className='flex items-center justify-start  gap-4  '>
      <Facebook className='text-blue-500' />
      <Instagram className='text-red-500' />
      <Linkedin className='text-blue-500' />
      <Twitter className='text-blue-300' />
    </div>
  )
}

export default SocialMedia
