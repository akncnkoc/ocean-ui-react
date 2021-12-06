import React from 'react'
import { Toggle, useColorMode, useToggleColorMode } from 'ocean-ui-react'
import { Test } from './Test'

export const AnotherPackage = () => {
  const { toggleColorMode, colorMode } = useToggleColorMode()
  return (
    <div>
      <div className="flex">
        <div
          style={{
            width: 300,
            height: 300,
            backgroundColor: useColorMode('#ddd', '#aaa')
          }}/>
        <Test />
      </div>
      <Toggle
        selected={colorMode !== 'light'}
        onChange={(value, name) => {
          toggleColorMode(value)
        }}
        name='toggle'
      />
    </div>
  )
}
