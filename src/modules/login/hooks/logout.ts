import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

export const useLogout = (loginUrl: string): (() => void) => {
  const router = useRouter()

  const logout = (): void => {
    Cookies.remove('accessToken')
    Cookies.remove('refreshToken')
    Cookies.remove('userType')
    Cookies.remove('userEmail')
    router.replace(loginUrl)
  }

  return logout
}
