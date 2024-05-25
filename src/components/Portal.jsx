import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

const Portal = props => {
  const { children } = props

  const [mounted, setMounted] = useState(false)
  const ref = useRef()

  useEffect(() => {
    setMounted(true)

    ref.current = document.createElement('div')
    ref.current.setAttribute('movie-portal-container', '')

    document.body.appendChild(ref.current)

    return () => {
      document.body.removeChild(ref.current)
    }
  }, [])

  if (!mounted) {
    return null
  }

  return createPortal(children, ref.current)
}

export default Portal
