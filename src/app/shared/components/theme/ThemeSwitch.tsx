'use client'

import { useTheme } from 'next-themes'
import { FC, useEffect } from 'react'

interface ThemeSwitchProps {
  theme: string
}
export const ThemeSwitch: FC<ThemeSwitchProps> = ({ theme }) => {
  const { setTheme } = useTheme()
  useEffect(() => {
    setTheme(theme)
  }, [setTheme, theme])

  return <></>
}
