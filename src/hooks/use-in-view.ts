import { useEffect, useRef, useState } from 'react'

export const useInView = <T extends HTMLElement>(
  callback: (entry: IntersectionObserverEntry) => void,
  options?: IntersectionObserverInit
) => {
  const ref = useRef<T | null>(null)
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        setIsIntersecting(entry.isIntersecting)
        if (entry.isIntersecting) {
          callback(entry)
        }
      }
    }, options)
    observer.observe(ref.current)
    return () => observer.disconnect()
  })
  return { ref, isIntersecting }
}
