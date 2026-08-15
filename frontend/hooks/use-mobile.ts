import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(() => {
    if (typeof window === 'undefined') {
      return false; // Default to false on server
    }
    return window.innerWidth < MOBILE_BREAKPOINT;
  });

  React.useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(mql.matches) // Use mql.matches for consistency
    }
    mql.addEventListener("change", onChange)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return isMobile
}
