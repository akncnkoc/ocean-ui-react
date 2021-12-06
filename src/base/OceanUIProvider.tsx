import React, {
  createContext,
  useContext,
  useLayoutEffect,
  useState
} from 'react'

export const ThemeContext = createContext<any>(null)

export const OceanUIProvider = (props) => {
  const [store, setStore] = useState({
    colorMode: 'light'
  })
  const [actions, setActions] = useState({
    updateColorMode: (mode) => setStore({ ...store, colorMode: mode })
  })

  useLayoutEffect(() => {
    let localColorMode = localStorage.getItem('ocean-ui-color-mode')
    if (!localColorMode) {
      localStorage.setItem('ocean-ui-color-mode', 'light')
      actions.updateColorMode('light')
    } else actions.updateColorMode(localColorMode)
  }, [])

  return (
    <ThemeContext.Provider value={{ actions, store }}>
      {props.children}
    </ThemeContext.Provider>
  )
}

export const useColorMode = (lightColor, darkColor) => {
  const context = useContext(ThemeContext)
  return context.store.colorMode === 'light' ? lightColor : darkColor
}
export const useToggleColorMode = () => {
  const context = useContext(ThemeContext)
  let toggleColorMode = () => {
    localStorage.setItem('ocean-ui-color-mode', context.store.colorMode === 'light' ? 'dark' : 'light')
    context.actions.updateColorMode(context.store.colorMode === 'light' ? 'dark' : 'light')
  }
  let colorMode = context.store.colorMode;
  return { toggleColorMode, colorMode }
}
