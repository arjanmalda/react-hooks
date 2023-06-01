// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function Greeting({initialName = ''}) {
  const {value, setValue} = useLocalStorageState(initialName)

  function handleChange(event) {
    setValue(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={value} onChange={handleChange} id="name" />
      </form>
      {value ? <strong>Hello </strong> : 'Please type your name'}
    </div>
  )
}

function useLocalStorageState(initialValue) {
  const [value, setValue] = React.useState(() => {
    return {greeting: 'Hello world'}
  })

  React.useEffect(() => {
    const valueForLocalStorage =
      typeof value === 'function' ||
      typeof value === 'object' ||
      typeof value === 'symbol'
        ? JSON.stringify({...value, stringified: true})
        : value

    window.localStorage.setItem('value', valueForLocalStorage)
  }, [value])

  if (value.prototype?.hasOwnProperty.call(value, 'stringified')) {
  }

  return {
    value: value.prototype?.hasOwnProperty.call(value, 'stringified')
      ? value[Object.keys(value)[0]]
      : value,
    setValue,
  }
}

function App() {
  return <Greeting initialName="Arjan" />
}

export default App
