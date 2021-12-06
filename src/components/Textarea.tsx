import React from 'react'

type Props = {
  title?: string
  value?: string
  name?: string
  rows?: number | string
  cols?: number | string
  onChange?: (value: string, name: string) => void
  className?: string
}

export const Textarea = ({
                           title,
                           value,
                           onChange,
                           name,
                           rows = 3,
                           cols = 5,
                           className
                         }: Props) => {
  return (
    <div>
      {title && <div className='mb-1'>{title}</div>}
      <textarea
        value={value && value}
        onChange={(event) =>
          onChange && onChange(event.target.value, name)
        }
        className={`px-2 py-1 resize-none placeholder-gray-400 text-gray-600 relative bg-white bg-white rounded text-sm border border-gray-400 outline-none focus:outline-none w-full ${className}`}
        rows={parseInt(rows as string)}
        cols={parseInt(cols as string)}
      />
    </div>
  )
}
