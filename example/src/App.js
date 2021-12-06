import React, { useEffect, useState } from "react";
import { Header } from './components/Header'
import { FormControl, TextField } from 'ocean-ui-react'

const App = () => {
  const [data, setData] = useState({
    name: '',
    surname: ''
  })
  return (
    <div className='w-full h-full'>
      <Header />
      <FormControl
        formProps={[data, setData]}
        validations={{
          surname: {
            required: 'Röfle'
          }
        }}
        render={({ handleChange, errors, handleBlur }) => (
          <div>
            <TextField
              onValueChange={handleChange}
              name='surname'
              value={data.surname}
              error={errors.surname}
              handleBlur={handleBlur}
            />
          </div>
        )}
      />
      {data.surname}
    </div>
  )
}

export default App
