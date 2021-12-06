import React, { useRef } from 'react'
import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineInfoCircle,
  AiOutlineWarning
} from 'react-icons/ai'
import { BiError } from 'react-icons/bi'
import { Button } from './Button'

type Props = {
  type: 'error' | 'warning' | 'info' | 'success'
  title?: string
  actions?: React.ReactNode
  suffix?: React.ReactNode
  prefix?: React.ReactNode
  children?: React.ReactNode
  onClose: () => void
  className?: string
}

export const Alert = ({
  type = 'success',
  title,
  actions,
  suffix,
  prefix,
  children,
  onClose,
  className
}: Props) => {
  let icon = null
  let typeClass = ''
  let alertRef = useRef(null)
  switch (type) {
    case 'error':
      icon = <BiError className={'text-red-900'} size={24} />
      typeClass = 'bg-red-200 text-red-900'
      break
    case 'warning':
      icon = <AiOutlineWarning className={'text-yellow-900'} size={24} />
      typeClass = 'bg-yellow-200 text-yellow-900'
      break
    case 'info':
      icon = <AiOutlineInfoCircle className={'text-blue-900'} size={24} />
      typeClass = 'bg-blue-200 text-blue-900'
      break
    case 'success':
      icon = <AiOutlineCheckCircle className={'text-green-900'} size={24} />
      typeClass = 'bg-green-200 text-green-900'
      break
  }
  let handleAlertClose = React.useCallback(() => {
    alertRef.current.style.opacity = 1
    let interval = setInterval(() => {
      alertRef.current.style.opacity -= 0.1
      if (alertRef.current.style.opacity <= 0) {
        clearInterval(interval)
        alertRef.current && alertRef.current.remove()
        onClose()
      }
    }, 20)
  }, [alertRef])

  return (
    <div
      ref={alertRef}
      className={`w-full rounded-md grid grid-cols-2 items-center justify-items-stretch ${typeClass} p-3 ${
        className && className
      }`}>
      <div className='flex items-center'>
        {prefix && !icon && prefix}
        {icon && <div className='mr-3 self-start'>{icon}</div>}
        <div className='flex flex-col'>
          {title && <div className='mb-1.5 font-bold'>{title}</div>}
          {children}
        </div>
      </div>
      {suffix && !actions && suffix}
      {!actions && onClose && (
        <div className='justify-self-end'>
          <Button onClick={() => handleAlertClose()} type='link' floating>
            <AiOutlineCloseCircle size={20} />
          </Button>
        </div>
      )}
      {actions && <div className='justify-self-end'>{actions}</div>}
    </div>
  )
}
