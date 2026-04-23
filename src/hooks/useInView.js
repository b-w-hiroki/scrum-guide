import { useEffect, useRef, useState } from 'react'

export function useInView({ threshold = 0.12, triggerOnce = true } = {}) {
  const ref = useRef(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true)
        if (triggerOnce) obs.disconnect()
      }
    }, { threshold })

    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return [ref, isInView]
}
