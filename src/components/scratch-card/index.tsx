import React, { useCallback, useState } from 'react'
import { ScratchCard } from 'src/packages'
import 'src/packages/scratch-card/index.less'

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
    <div
      style={{
        position: 'absolute',
        left: '50px',
        top: '100px'
      }}
    >
      <ScratchCard {...props} option={option} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} />
      <ScratchCard.canvas width={200} height={200} onTouchStart={onTouchStart} {...option} />
    </div>
  )
}

export default App
