import { useRef, useState, useCallback } from 'react'

/**
 * Magnetic button that attracts toward the cursor on hover
 */
export default function MagneticButton({
  children,
  className = '',
  strength = 0.3,
  onClick,
  href,
  dataCursor,
  ...props
}) {
  const buttonRef = useRef(null)
  const [transform, setTransform] = useState({ x: 0, y: 0 })

  const handleMouseMove = useCallback((e) => {
    if (!buttonRef.current) return
    const rect = buttonRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    setTransform({ x: x * strength, y: y * strength })
  }, [strength])

  const handleMouseLeave = useCallback(() => {
    setTransform({ x: 0, y: 0 })
  }, [])

  const style = {
    transform: `translate(${transform.x}px, ${transform.y}px)`,
    transition: transform.x === 0 ? 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
  }

  const commonProps = {
    ref: buttonRef,
    className,
    style,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    'data-cursor': dataCursor || undefined,
    ...props,
  }

  if (href) {
    return (
      <a href={href} {...commonProps} onClick={onClick}>
        {children}
      </a>
    )
  }

  return (
    <button {...commonProps} onClick={onClick}>
      {children}
    </button>
  )
}
