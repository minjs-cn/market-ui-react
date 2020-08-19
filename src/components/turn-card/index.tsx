import React, { useState } from 'react'
import { TurnCard } from 'src/packages'
import 'src/packages/turn-card/index.less'

import optionImage from '../turn-circle/images/smile.png'
import backBgImage from './images/backBgImage.png'
import frontBgImage from './images/frontBgImage.png'

const option = {
  id: 1,
  title: `谢谢参与`,
  image: optionImage
}

const props = {
  option,
  width: 200,
  height: 300,
  backBgImage,
  frontBgImage,
  padding: [20, 0, 20]
}

const App = () => {
  const [status, setStatus] = useState('back')

  const onStart = () => {
    console.log('start')
    setStatus('front')
  }

  const onItemClick = (option: any) => {
    console.log(option)
  }

  return (
    <div>
      <TurnCard {...props} onStart={onStart} status={status} onItemClick={onItemClick} />
    </div>
  )
}

export default App
