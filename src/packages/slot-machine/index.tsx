import React, { useCallback } from 'react'
import Slot from './components/slot'
import { easing } from '../utils/popmotion'
import { noop } from '../utils'

interface Props {
  size?: number
  count?: number
  delay?: number
  targets?: Array<number>
  ease?: easing.Easing
  onComplete?: () => void
  onItemComplete?: (i: number) => void
}

const App = ({
  ease = easing.easeInOut,
  size = 80,
  count = 3,
  delay = 200,
  targets = [0, 1, 2],
  onComplete = noop,
  onItemComplete = noop
}: Props) => {
  const onGameComplate = useCallback(() => {
    onComplete()
  }, [onComplete])

  const onGameItemComplate = useCallback(
    (i: number) => {
      onItemComplete(i)
      if (i >= count - 1) onGameComplate()
    },
    [count, onGameComplate, onItemComplete]
  )

  const slots = Array.from(new Array(count).keys()).map((i) => (
    <Slot
      onComplete={() => {
        onGameItemComplate(i)
      }}
      ease={ease}
      size={size}
      delay={i * delay}
      target={targets[i]}
      key={i}
    />
  ))

  return <div className="m-slot-container">{slots}</div>
}

export default App
