import React, { useState } from 'react'
import { TextField, Button, useToggleColorMode } from 'ocean-ui-react'
import { CgSearch } from 'react-icons/cg'
import { BsMoonFill, BsSunFill} from "react-icons/bs";

export const Header = () => {
  const [searchText, setSearchText] = useState()
  const { toggleColorMode, colorMode } = useToggleColorMode()

  return (
    <div className='w-full h-12 border-b border-gray-200'>
      <div className='container mx-auto px-24 flex items-center grid grid-cols-3 h-full'>
        <div className="flex-1">OCEAN UI</div>
        <div className="flex-1 flex justify-center">
          <TextField
            prefix={<CgSearch />}
            value={searchText}
            onChange={({ value }) => setSearchText(value)}
          />
        </div>
        <div className="flex-1 space-x-2 flex justify-end">
          <Button size={"xs"} type={"primary"}>Github</Button>
          <Button floating type={colorMode === 'light' ? 'dark' : 'primary'} onClick={()=> toggleColorMode()}>
            {colorMode === 'light' ? <BsMoonFill/> : <BsSunFill />}
          </Button>
        </div>
      </div>
    </div>
  )
}
