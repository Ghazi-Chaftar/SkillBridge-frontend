'use client'
import { useEffect, useState } from 'react'

import { User } from '@/src/entities'
import { useVerifyClientFirstLogin } from '@/src/modules/login/services/clientLogin'
import { useRouter } from '@/src/navigation'
export type UseClientFirstLogin = {
  user: User | undefined
  isPending: boolean
  isError: boolean
}
const useClientFirstLogin = (id: string): UseClientFirstLogin => {
  const verifyClientFirstLogin = useVerifyClientFirstLogin(
    'verifyClientFirstLogin'
  )
  const router = useRouter()
  const [isPending, setisPending] = useState(true)
  useEffect(() => {
    verifyClientFirstLogin.mutate(
      { token: id },
      {
        onSuccess: () => {
          setisPending(false)
        }
      }
    )
  }, [id, verifyClientFirstLogin.mutate])

  if (verifyClientFirstLogin.isError) {
    router.push('/client')
  }

  return {
    user: verifyClientFirstLogin?.data?.data?.user,
    isPending: isPending,
    isError: verifyClientFirstLogin.isError
  }
}

export default useClientFirstLogin
