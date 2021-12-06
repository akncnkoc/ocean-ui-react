import React, { useEffect, useLayoutEffect, useState } from 'react'
import { AiOutlineLoading } from 'react-icons/ai'

type Props = {
  type: string
  variant?: 'default' | 'outline'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  loading?: boolean
  loadingText?: string
  rounded?: boolean
  floating?: boolean
  disabled?: boolean
  block?: boolean
  spinner?: React.ReactNode
  onClick?: Function
  children?: React.ReactNode
  className?: string
}

export const Button = ({
                         type = '',
                         variant = 'default',
                         size = 'sm',
                         loading = false,
                         loadingText = 'Loading',
                         rounded = false,
                         floating = false,
                         disabled = false,
                         block = false,
                         spinner,
                         onClick,
                         children,
                         className
                       }: Props) => {
  const [typeClass, setTypeClass] = useState<string>('')

  let handleTypeClass = () => {
    let customizedButtonClass = 'btn btn-' + type + ' ' + size
    if (variant === 'default') customizedButtonClass += ' default'
    if (variant === 'outline') customizedButtonClass += ' outline'
    if (rounded) customizedButtonClass += ' rounded-full'
    if (floating) customizedButtonClass += ' floating'
    if (disabled) customizedButtonClass += ' disabled'
    if (block) customizedButtonClass += ' w-full'
    if (className) customizedButtonClass += ' ' + className;
    setTypeClass(customizedButtonClass)
  }
  useEffect(() => handleTypeClass(), [type])
  useLayoutEffect(() => {
    handleTypeClass()
  }, [])

  return (
    <button
      type='button'
      onClick={(event) => onClick && onClick(event)}
      className={typeClass}>
      {loading && <AiOutlineLoading size='16' className='animate-spin mr-3' />}
      {loading && !spinner && loadingText}
      {spinner && loading && spinner}
      {children && !loading && children}
    </button>
  )
}
