import React, { useMemo, useState, useEffect } from 'react'
import { tween, easing } from 'src/packages/utils/popmotion'
import { noop } from 'src/packages/utils'

interface Props {
  size: number
  delay?: number
  target: number
  ease: easing.Easing
  onComplete?: () => void
}

const App = ({ ease, size = 80, delay = 0, target = 9, onComplete = noop }: Props) => {
  const slotStyle = useMemo(
    () => ({
      width: size,
      height: size
    }),
    [size]
  )

  const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

  const [y, setY] = useState(0)

  useEffect(() => {
    let tw: unknown = null

    setTimeout(() => {
      tw = tween({
        from: y,
        to: size * 9,
        duration: 1000,
        ease: easing.linear,
        loop: 2
      }).start({
        update(v: number) {
          setY(v)
        },
        complete() {
          tween({
            from: y,
            to: target * size,
            duration: 2000,
            ease: ease
          }).start({
            update(v: number) {
              setY(v)
            },
            complete() {
              onComplete()
            }
          })
        }
      })
    }, delay)

    return () => {
      ;(tw as { stop: () => void }).stop()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay, target])

  return (
    <div className="m-slot" style={slotStyle}>
      <div
        className="m-slot-inner"
        style={{
          height: size * 10,
          transform: `translate(0, -${y}px)`
        }}
      >
        {nums.map((num) => (
          <div style={slotStyle} key={num}>
            <span>{num}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
