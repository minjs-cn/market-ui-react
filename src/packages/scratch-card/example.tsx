import React, { useCallback, useState } from 'react'
import ScratchCard from './index'
import './index.less'

import optionImage from '../turn-circle/images/smile.png'
import bgImage from './images/bgImage.png'
import scratchBgImage from './images/scratchBgImage.png'

const defPption = {
  id: 1,
  title: '',
  image: ''
}

const props = {
  bgImage,
  padding: [12, 12, 18],
  scratchBgImage,
  isCleaned: false
}

const App = () => {
  const [option, setOption] = useState(defPption)

  const onTouchStart = useCallback(() => {
    if (option.title === '') {
      console.log('onTouchStart')
      setTimeout(() => {
        setOption({
          ...option,
          title: '一等奖',
          image: optionImage
        })
      }, 1000)
    }
  }, [option])

  const onTouchEnd = useCallback((e, p) => {
    console.log(p)
  }, [])

  return (
    <div>
      <ScratchCard {...props} option={option} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} />
      <div
        style={{
          position: 'relative',
          marginTop: 20,
          width: 200,
          height: 160,
          backgroundColor: 'red',
          padding: '10px'
        }}
      >
        <img
          style={{
            position: 'absolute',
            left: 50,
            top: 30,
            width: 100
          }}
          src={option.image}
          alt={option.title}
        />
        <ScratchCard.canvas width={180} height={140} onTouchStart={onTouchStart} {...option} />
      </div>
    </div>
  )
}

export default App
