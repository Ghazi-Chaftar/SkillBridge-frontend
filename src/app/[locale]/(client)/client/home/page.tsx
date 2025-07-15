'use client'

import { useState } from 'react'

import FAQSection from '@/src/modules/home/components/FAQSection'
import ForStudentsSection from '@/src/modules/home/components/ForStudentsSection'
import ForTeachersSection from '@/src/modules/home/components/ForTeachersSection'
import HeroSection from '@/src/modules/home/components/HeroSection'
import HowItWorksSection from '@/src/modules/home/components/HowItWorksSection'
import TestimonialsSection from '@/src/modules/home/components/TestimonialsProps'
import WhyChooseUsSection from '@/src/modules/home/components/WhyChooseUsSection'

const ClientHome = (): JSX.Element => {
  const [email, setEmail] = useState('')

  return (
    <div className='min-h-screen bg-white'>
      <HeroSection />
      <HowItWorksSection />
      <WhyChooseUsSection />
      <ForTeachersSection />
      <ForStudentsSection />
      <TestimonialsSection email={email} setEmail={setEmail} />
      <FAQSection />
    </div>
  )
}

export default ClientHome
