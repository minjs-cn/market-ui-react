import React, { useCallback, useState, useEffect, useMemo } from 'react'
import Circle from './components/circle'
import Item from './components/item'
import Prize from './components/prize'
import StartButton from './components/button'
import { noop, isUndef } from 'src/packages/utils'
import { tween, easing } from 'src/packages/utils/popmotion'
import './index.less'

interface Option {
  id: number
  title: string
  image: string
}

interface Props {
  options: Option[]
  idled: boolean
  duration?: number
  index?: number
  ease?: easing.Easing
  size?: number
  bgImage?: string
  bgColor?: string
  btnImage?: string
  fontColor?: string
  fontSize?: number
  onStart: () => void
  onComplete: (i: number) => void
  onItemClick?: (i: number) => void
}

// 初始化角度，布局原因导致初始化的角度不为0才能让第一个奖品在正上方
const startAngle = 60
// 一圈的角度
const allAngle = 360
// 空闲循环次数
const idelLoop = 10000
// 目标转圈次数
const targetCircle = 2
// 奖品个数
const optionSize = 6
// 单个角度
const singleAngle = allAngle / optionSize
// 默认按钮背景
const defBgImage = '//yun.tuisnake.com/h5-mami/activity/turnCircle/v8/imgs/button.png'

const BigWheel = ({
  options,
  idled = true,
  duration = 1000,
  index = 0,
  ease,
  size = 300,
  bgColor,
  btnImage = defBgImage,
  fontColor,
  fontSize,
  bgImage,
  onStart,
  onComplete,
  onItemClick = noop
}: Props) => {
  if (options.length !== optionSize) throw new Error(`奖品选项必须要${optionSize}个`)

  const onGameComplete = useCallback(
    (i: number) => {
      onComplete(i)
    },
    [onComplete]
  )

  const [state, setState] = useState({
    angle: startAngle
  })

  const durationTime = useMemo(() => {
    if (idled) return duration * 10
    return duration
  }, [duration, idled])

  const easeFn = useMemo(() => {
    if (idled) return easing.linear
    if (isUndef(ease)) return easing.easeInOut
    return ease
  }, [ease, idled])

  useEffect(() => {
    let loop = 0
    let angle = 0
    if (idled) {
      // 空闲状态旋转
      angle = state.angle + allAngle
      loop = idelLoop
    } else {
      // 目标状态旋转
      angle =
        state.angle +
        (optionSize - index) * singleAngle -
        ((state.angle - singleAngle) % allAngle) +
        allAngle * targetCircle
    }

    const tw = tween({
      from: state.angle,
      to: angle,
      duration: durationTime,
      loop,
      ease: easeFn
    }).start({
      update(v: number) {
        setState({
          ...state,
          angle: v
        })
      },
      complete() {
        !idled && onGameComplete(0)
      }
    })

    return () => {
      tw.stop()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idled, index, easeFn, durationTime, onGameComplete])

  const onGameStart = useCallback(() => {
    // 空闲状态可点击
    idled && onStart()
  }, [idled, onStart])

  const onGameItemClick = useCallback(
    (i: number) => {
      // 空闲状态可点击
      idled && onItemClick(i)
    },
    [idled, onItemClick]
  )

  return (
    <Circle
      angle={state.angle}
      size={size}
      bgColor={bgColor}
      bgImage={bgImage}
      startButton={<StartButton size={size * 0.3} onClick={onGameStart} bgImage={btnImage} />}
    >
      {options.map((option, index) => (
        <Item
          key={option.id}
          index={index}
          size={size / 2}
          onClick={() => onGameItemClick(index)}
          render={
            <Prize
              fontSize={fontSize}
              fontColor={fontColor}
              title={option.title}
              image={option.image}
            />
          }
        ></Item>
      ))}
    </Circle>
  )
}

export default BigWheel
