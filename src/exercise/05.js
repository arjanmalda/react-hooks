// useRef and useEffect: DOM interaction
// http://localhost:3000/isolated/exercise/05.js

import * as React from 'react'
// eslint-disable-next-line no-unused-vars
import VanillaTilt from 'vanilla-tilt'

function Tilt({children}) {
  // 🐨 create a ref here with React.useRef()

  const tiltedDiv = React.useRef(null)

  React.useEffect(() => {
    const tiltNode = tiltedDiv.current
    VanillaTilt.init(tiltNode, {
      max: 25,
      speed: 800,
      glare: true,
      'max-glare': 0.5,
    })
    return () => tiltNode.vanillaTilt.destroy()
  }, [])

  //
  // 💰 Don't forget to specify your effect's dependencies array! In our case
  // we know that the tilt node will never change, so make it `[]`. Ask me about
  // this for a more in depth explanation.

  return (
    <div ref={tiltedDiv} className="tilt-root">
      <div className="tilt-child">{children}</div>
    </div>
  )
}

function App() {
  return (
    <Tilt>
      <div className="totally-centered">vanilla-tilt.js</div>
    </Tilt>
  )
}

export default App
