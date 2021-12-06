import React from 'react'
import { useColorMode } from 'ocean-ui-react'

export const Test = () => {
  return (
    <div
      style={{
        width: 300,
        height: 300,
        backgroundColor: useColorMode('red', 'blue')
      }} />
  )
}
