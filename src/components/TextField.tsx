import React from 'react'

type Props = {
  suffix?: React.ReactNode
  prefix?: React.ReactNode
  placeholder?: string
  value?: string
  onValueChange: Function
  name?: string
  title?: string
  className?: string
  error?: string
  handleBlur?: Function
}

export const TextField = ({
                            suffix,
                            prefix,
                            placeholder = '',
                            value,
                            onValueChange,
                            name,
                            title,
                            className,
                            error,
                            handleBlur
                          }: Props) => {
  return (
    <div className={`relative flex w-full flex-wrap items-stretch`}>
      {title && <div className='mb-1 text-sm font-regular'>{title}</div>}
      {prefix && (
        <span
          className='z-10 h-full absolute text-center text-gray-400 absolute bg-transparent rounded items-center justify-center w-6 flex pl-1'>
          {prefix}
        </span>
      )}
      <input
        name={name}
        value={value}
        onBlur={(e) => handleBlur && handleBlur(e)}
        onChange={(event) => onValueChange(event)}
        type='text'
        placeholder={placeholder}
        className={`px-2 py-1 placeholder-gray-400 text-gray-600 relative rounded text-sm border border-gray-400 transition-colors outline-none focus:outline-none w-full ${
          suffix ? 'pr-6' : ''
        } ${prefix ? 'pl-6' : ''} ${className && className}
        `}
      />
      {suffix && (
        <span
          className='z-10 h-full absolute right-1 text-center text-gray-400 flex  bg-transparent rounded items-center justify-center w-6 pr-1'>
          {suffix}
        </span>
      )}
      {error && (
        <div
          className='w-full text-red-500'>
          {error}
        </div>
      )}
    </div>
  )
}
