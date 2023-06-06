// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import {
  fetchPokemon,
  PokemonInfoFallback,
  PokemonDataView,
  PokemonForm,
} from '../pokemon'
import {ErrorBoundary} from 'react-error-boundary'

function PokemonInfo({pokemonName}) {
  const [pokemon, setPokemon] = React.useState()
  const [error, setError] = React.useState()

  const [componentState, setComponentState] = React.useState('idle')

  React.useEffect(() => {
    if (!pokemonName) return
    setComponentState('pending')
    setPokemon(null)
    setError(undefined)
    fetchPokemon(pokemonName)
      .then(pokemonData => {
        setPokemon(pokemonData)
        setComponentState('resolved')
      })
      .catch(error => {
        setComponentState('rejected')
        return setError(error)
      })
  }, [pokemonName])

  if (componentState === 'rejected') throw new Error('Something went wrong')

  if (!pokemonName) return <h2>Submit a pokemon</h2>

  if (error) return <h2>{error.message}</h2>

  if (!pokemon) return <PokemonInfoFallback name={pokemonName} />

  return <PokemonDataView pokemon={pokemon} />
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  function handleReset() {
    setPokemonName('')
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary
          resetKeys={[pokemonName]}
          onReset={handleReset}
          FallbackComponent={ErrorFallback}
        >
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

function ErrorFallback({error, resetErrorBoundary}) {
  return (
    <div role="alert">
      There was an error:{' '}
      <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

export default App
