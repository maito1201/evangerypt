import { useEffect, useState } from 'react'

export const useIsMobileDevice = () => {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    if ('ontouchstart' in window || 'onmsgesturechange' in window) {
      setIsMobile(true)
    }
  }, [])
  return isMobile
}
