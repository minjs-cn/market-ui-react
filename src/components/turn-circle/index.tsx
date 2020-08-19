import React, { useCallback, useState } from 'react'
import { TurnCircle } from 'src/packages'

import 'src/packages/turn-circle/index.less'

import optionImage from './images/smile.png'
import bgImage from './images/bgImage.png'
import btnImage from './images/btnImage.png'

const options = [1, 2, 3, 4, 5, 6].map((item) => ({
  id: item,
  title: `谢谢参与${item}`,
  image: optionImage
}))

const App = () => {
  const [state, setState] = useState({
    btnImage,
    idled: true,
    index: 0
  })

  const onStart = useCallback(() => {
    console.log('start')
    setState({
      ...state,
      idled: false,
      index: 4
    })
  }, [state])

  const onComplete = useCallback(() => {
    console.log('complete')
    setTimeout(() => {
      setState({
        ...state,
        idled: true
      })
    }, 1000)
  }, [state])

  const onItemClick = useCallback((i) => {
    console.log(options[i])
  }, [])

  return (
    <div>
      <TurnCircle
        {...state}
        onComplete={onComplete}
        onStart={onStart}
        options={options}
        bgImage={bgImage}
        onItemClick={onItemClick}
      />
    </div>
  )
}

export default App
