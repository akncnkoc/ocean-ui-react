import React from 'react'
import { BiCheck } from 'react-icons/bi'
import { IoClose } from 'react-icons/io5'
import { AiOutlineLoading } from 'react-icons/ai'
import { FakeKeyGenerator } from '../helpers'

type Props = {
  value?: string
  searchable?: boolean
  options: Array<any>
  onSelect?: (title: string, value: string, name: string) => void
  selectFirst?: boolean
  name?: string
  loadAsync?: string
  optionKey?: string
  optionValue?: string
  placeholder?: string
  loadingText?: string
  searchEmptyText?: string
  title?: string
  error?: string
}

export const Select = ({
                         value,
                         searchable = true,
                         onSelect,
                         options = [],
                         selectFirst = false,
                         name,
                         loadAsync,
                         optionKey,
                         optionValue,
                         placeholder = 'Select',
                         loadingText = 'Loading...',
                         searchEmptyText = 'Herhangi bir sonuç bulunamadı',
                         title = '',
                         error
                       }: Props) => {
  const [state, setState] = React.useState({
    opened: false,
    findedIndex: -1,
    searchValue: '',
    selectedValue: '',
    findedValues: [],
    placement: 'bottom',
    error: '',
    loading: false
  })

  const selectRef = React.useRef<HTMLDivElement>(null)
  const selectRefContent = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (state.opened && selectRefContent.current) {
      const bounding = selectRefContent.current.getBoundingClientRect()
      if (
        bounding.bottom >
        (window.innerHeight || document.documentElement.clientHeight)
      ) {
        setState((prevState) => ({
          ...prevState,
          placement: 'top',
          findedValues: []
        }))
      }
    }
  }, [state.opened])
  React.useEffect(() => {
    if (selectFirst) {
      if (options.length >= 1) {
        onSelect &&
        onSelect(options[0][optionKey], options[0][optionValue], name)
        setState((prevState) => ({
          ...prevState,
          selectedValue: options[0][optionKey]
        }))
      }
    }
  }, [selectFirst])
  React.useEffect(() => {
    if (value !== '' && value !== undefined && name !== '') {
      const findedIndex = options.findIndex(
        (item) => item[optionValue] === value
      )
      if (findedIndex !== -1) {
        setState((prevState) => ({
          ...prevState,
          opened: false,
          selectedValue: options[findedIndex][optionKey]
        }))
        onSelect &&
        onSelect(
          options[findedIndex][optionKey],
          options[findedIndex][optionValue],
          name
        )
      }
    }
  }, [value])
  React.useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      findedValues: []
    }))
    const searchedOptions = []
    if (state.searchValue.length >= 1) {
      const searchOptions = options.length >= 1 ? options : asyncOptions
      searchOptions.map((item) => {
        if (
          item[optionKey]
            .toString()
            .toLocaleLowerCase()
            .includes(state.searchValue.toLocaleLowerCase())
        ) {
          searchedOptions.push(item)
          setState((prevState) => ({
            ...prevState,
            findedValues: searchedOptions
          }))
        }
      })
    } else {
      setState((prevState) => ({
        ...prevState,
        findedValues: []
      }))
    }
  }, [state.searchValue])

  React.useEffect(() => {
    const listener = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setState((prevState) => ({
          ...prevState,
          opened: false
        }))
      }
    }
    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)
    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  })

  // Async options

  const [asyncOptions, setAsyncOptions] = React.useState([])
  React.useEffect(() => {
    if (loadAsync && state.opened && asyncOptions.length === 0) {
      setState((prevState) => ({
        ...prevState,
        loading: true
      }))
      fetch(loadAsync)
        .then((res) => res.json())
        .then((json) => {
          json.map((item) =>
            setAsyncOptions((prevState) => [...prevState, item])
          )
        })
        .catch(() => {
          setState((prevState) => ({
            ...prevState,
            opened: false,
            error: 'Veriler yüklenemedi',
            // loading: false
          }))
        })
        .finally(() => {
          setState((prevState) => ({
            ...prevState,
            // loading: false
          }))
        })
    }
  }, [loadAsync, state.opened])

  return (
    <div ref={selectRef} className='relative select-none w-full'>
      {title && (
        <div className='mb-1 flex items-center z-20'>
          <div className='mr-1'>{title}</div>
        </div>
      )}
      <div
        className={`w-full border flex justify-between items-center
       ring-0 ring-transparent transition-all border-gray-200 py-2 px-3 rounded-md bg-white
       cursor-pointer
        ${state.opened ? '!ring-blue-500' : null}
        ${error ? 'border-red-600' : null}
        `}>
        {!selectFirst && !state.selectedValue ? (
          <div className='flex items-center justify-between w-full'>
            <span
              onClick={() => {
                setState((prevState) => ({
                  ...prevState,
                  opened: !state.opened
                }))
              }}
              className='text-gray-500 flex-1'>
              {placeholder}
            </span>
            {state.loading && (
              <AiOutlineLoading
                size='16'
                className='animate-spin'
                onClick={() => {
                  setState((prevState) => ({
                    ...prevState,
                    selectedValue: ''
                  }))
                }}
              />
            )}
          </div>
        ) : (
          <div className='flex items-center justify-between w-full'>
            <span
              onClick={() => {
                setState((prevState) => ({
                  ...prevState,
                  opened: !state.opened
                }))
              }}
              className='flex-1'>
              {state.selectedValue}
            </span>
            <IoClose
              size='16'
              onClick={() => {
                setState((prevState) => ({
                  ...prevState,
                  selectedValue: ''
                }))
              }}
            />
          </div>
        )}
      </div>
      {state.opened && (
        <div
          className={`w-full absolute ${
            state.placement === 'bottom' ? 'top-full' : 'bottom-full'
          } bg-white mt-2 rounded shadow-lg border z-50`}
          ref={selectRefContent}>
          {searchable && (
            <div className='relative'>
              <div className='w-full p-2 absolute top-0 left-0'>
                <input
                  type='text'
                  className='p-2 text-xs w-full border !border-gray-300 !ring-0 focus:outline-none shadow-none'
                  placeholder='Ara'
                  onChange={(e) => {
                    e.persist()
                    setState((prevState) => ({
                      ...prevState,
                      searchValue: e.target.value
                    }))
                  }}
                />
              </div>
            </div>
          )}
          <div
            className={`${searchable ?? 'mt-14'} overflow-y-auto scrollbar`}
            style={{ maxHeight: '300px' }}>
            {/* ASYNC OPTIONS */}
            {asyncOptions.length >= 1 &&
              !state.loading &&
              state.findedValues.length === 0 &&
              state.searchValue.length === 0 &&
              asyncOptions.map((optionItem) => (
                <div
                  key={FakeKeyGenerator(12)}
                  className='p-2 px-4 hover:bg-blue-300 transition-all flex items-center justify-between cursor-pointer'
                  onClick={() => {
                    setState((prevState) => ({
                      ...prevState,
                      opened: false,
                      selectedValue: optionItem[optionKey],
                      searchValue: '',
                      findedValues: []
                    }))
                    onSelect &&
                    onSelect(
                      optionItem[optionKey],
                      optionItem[optionValue],
                      name
                    )
                  }}>
                  <span>{optionItem[optionKey]}</span>
                  {state.selectedValue === optionItem[optionKey] ? (
                    <BiCheck size={16} />
                  ) : (
                    ''
                  )}
                  {state.selectedValue === optionItem[optionKey]}
                </div>
              ))}

            {asyncOptions.length >= 1 &&
              !state.loading &&
              state.findedValues.length >= 1 &&
              state.searchValue.length >= 0 &&
              state.findedValues.map((optionItem) => (
                <div
                  key={FakeKeyGenerator(12)}
                  className='p-2 px-4 hover:bg-blue-300 transition-all flex items-center justify-between cursor-pointer'
                  onClick={() => {
                    onSelect &&
                    onSelect(
                      optionItem[optionKey],
                      optionItem[optionValue],
                      name
                    )
                    setState((prevState) => ({
                      ...prevState,
                      opened: false,
                      selectedValue: optionItem[optionKey],
                      searchValue: '',
                      findedValues: []
                    }))
                  }}>
                  <span>{optionItem[optionKey]}</span>
                  {state.selectedValue === optionItem[optionKey] ? (
                    <BiCheck size={16} />
                  ) : (
                    ''
                  )}
                  {state.selectedValue === optionItem[optionKey]}
                </div>
              ))}

            {asyncOptions.length >= 1 &&
              !state.loading &&
              state.searchValue.length >= 1 &&
              state.findedValues.length === 0 && (
                <div
                  key={FakeKeyGenerator(12)}
                  className='p-2 px-4 hover:bg-blue-300 transition-all flex items-center justify-between cursor-pointer'>
                  <span>Herhangi bir sonuç bulunamadı</span>
                </div>
              )}

            {state.loading && <div className="px-4 py-2">{loadingText}</div>}

            {/* NORMAL OPTIONS */}
            {state.findedValues.length === 0 &&
              state.searchValue.length === 0 &&
              !loadAsync &&
              asyncOptions.length === 0 &&
              options.map((optionItem) => (
                <div
                  key={FakeKeyGenerator(12)}
                  style={{
                    padding: '8px',
                    paddingLeft: '16px',
                    paddingRight: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    setState((prevState) => ({
                      ...prevState,
                      opened: false,
                      selectedValue: optionItem[optionKey],
                      searchValue: '',
                      findedValues: []
                    }))
                    onSelect &&
                    onSelect(
                      optionItem[optionKey],
                      optionItem[optionValue],
                      name
                    )
                  }}>
                  <span>{optionItem[optionKey]}</span>
                  {state.selectedValue === optionItem[optionKey] ? (
                    <BiCheck size={16} />
                  ) : (
                    ''
                  )}
                </div>
              ))}
            {state.findedValues.length >= 1 &&
              state.searchValue.length >= 1 &&
              !loadAsync &&
              asyncOptions.length === 0 &&
              state.findedValues.map((optionItem) => (
                <div
                  key={FakeKeyGenerator(12)}
                  className='p-2 px-4 hover:bg-blue-300 transition-all flex items-center justify-between cursor-pointer'
                  onClick={() => {
                    setState((prevState) => ({
                      ...prevState,
                      opened: false,
                      selectedValue: optionItem[optionKey],
                      searchValue: '',
                      findedValues: []
                    }))
                    onSelect &&
                    onSelect(
                      optionItem[optionKey],
                      optionItem[optionValue],
                      name
                    )
                  }}>
                  <span>{optionItem[optionKey]}</span>
                  {state.selectedValue === optionItem[optionKey] ? (
                    <BiCheck size={16} />
                  ) : (
                    ''
                  )}
                </div>
              ))}
            {state.searchValue.length >= 1 &&
              !loadAsync &&
              asyncOptions.length === 0 &&
              state.findedValues.length === 0 && (
                <div
                  key={FakeKeyGenerator(12)}
                  className='p-2 px-4 hover:bg-blue-300 transition-all flex items-center justify-between cursor-pointer'>
                  <span>{searchEmptyText}</span>
                </div>
              )}
          </div>
        </div>
      )}
    </div>
  )
}
