import * as React from 'react'

export const useMediaQuery = (query: string): boolean => {
  const [screenSize, setScreenSize] = React.useState(false)

  React.useEffect(() => {
    function onChange(event: MediaQueryListEvent): void {
      setScreenSize(event.matches)
    }

    const result = matchMedia(query)
    result.addEventListener('change', onChange)
    setScreenSize(result.matches)

    return () => result.removeEventListener('change', onChange)
  }, [query])

  return screenSize
}
