import React from 'react'

interface RadioOptions {
  value: string
  title: string
}

type Props = {
  title?: string
  options?: Array<RadioOptions>
  name?: string
  value?: string
  onValueChange: ({ value, name }) => void
  className?: string
}

export const Radio = ({ title, options, name, value, onValueChange, className }: Props) => {
  return (
    <div className='block'>
      <span className='text-gray-700'>{title}</span>
      <div className='mt-2'>
        {options &&
          options.length >= 1 &&
          options.map((item) => (
            <div key={item.value}>
              <label className='inline-flex items-center'>
                <input
                  type='radio'
                  className={`form-radio ${className && className}`}
                  onChange={(event) => {
                    let value = event.target.value
                    onValueChange && onValueChange({ value, name })
                  }}
                  name={name}
                  value={item.value}
                  defaultChecked={item.value === value}
                />
                <span className='ml-2'>{item.title}</span>
              </label>
            </div>
          ))}
      </div>
    </div>
  )
}
