import React from 'react'

type Props = {
  name?: string
  checked?: boolean
  onValueChange?: Function
  children?: React.ReactNode
  className?: string
}


export const Checkbox = ({ name, checked, children, onValueChange, className }: Props) => {
  return (
    <label className='flex items-center space-x-3 select-none'>
      <input
        type='checkbox'
        name={name}
        defaultChecked={checked}
        onChange={(event) => {
          let checked = !event.target.checked
          onValueChange && onValueChange({ checked, name })
        }}
        className={`appearance-none h-5 w-5 border border-gray-300 rounded-md checked:bg-blue-600 checked:border-transparent focus:outline-none formtick transition-all ${className && className}`}
      />
      <span className='text-gray-900 font-medium'>
        {children}
      </span>
    </label>
  )
}
