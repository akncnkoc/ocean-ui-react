import React from 'react'

type Props = {
  selected?: boolean
  onChange?: (selected: boolean, name: string) => void
  name?: string
  suffix?: React.ReactNode
  prefix?: React.ReactNode
  className?: string
}

export const Toggle = ({ selected, onChange, name, prefix, suffix, className }: Props) => {
  const handleToggle = () => {
    onChange && onChange(!selected, name)
  }
  return (
    <div className='flex justify-center items-center select-none'>
      {prefix && prefix}
      <div
        className={`
          w-14 h-7 flex items-center bg-gray-300 rounded-full mx-3 px-1
          cursor-pointer
          ${selected ? 'bg-blue-700' : ''}
          ${className && className}
        `}
        onClick={() => handleToggle()}
      >
        <div
          className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform ${
            selected ? 'translate-x-7' : ''
          }`}
        />
      </div>
      {suffix && suffix}
    </div>
  )
}
