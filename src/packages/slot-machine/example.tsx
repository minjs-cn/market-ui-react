import React, { useState, useEffect, useCallback } from 'react'
import SlotMachine from './index'
import './index.less'

const App = () => {
  const [target, setTarget] = useState([0, 0, 0])

  useEffect(() => {
    setTimeout(() => {
      setTarget([5, 6, 7])
    }, 500)
  }, [])

  const onComplete = useCallback(() => {
    console.log('all complete')
  }, [])

  const onItemComplete = useCallback((i) => {
    console.log('complete', i)
  }, [])

  return (
    <div>
      <SlotMachine targets={target} onComplete={onComplete} onItemComplete={onItemComplete} />
    </div>
  )
}

export default App
