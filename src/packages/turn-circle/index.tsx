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
  options, // 奖品项
  idled = true, // 是否空闲状态
  duration = 1000, // 抽奖停顿时间
  index = 0, // 转到第几个奖品
  ease, // 抽奖运动函数
  size = 300, // 奖盘大小
  bgColor, // 背景颜色
  btnImage = defBgImage, // 参与按钮背景图片
  fontColor, // 奖品文字颜色
  fontSize, // 奖品文字大小
  bgImage, // 背景图片
  onStart, // 开始
  onComplete, // 停下
  onItemClick = noop // 点击奖品项
}: Props) => {
  if (options.length !== optionSize) throw new Error(`奖品选项必须要${optionSize}个`)

  // 抽奖结束
  const onGameComplete = useCallback(
    (i: number) => {
      onComplete(i)
    },
    [onComplete]
  )
  // 转盘角度
  const [state, setState] = useState({
    angle: startAngle
  })
  // 转盘旋转时间
  const durationTime = useMemo(() => {
    if (idled) return duration * 10
    return duration
  }, [duration, idled])
  // 转盘运动时间函数
  const easeFn = useMemo(() => {
    if (idled) return easing.linear
    if (isUndef(ease)) return easing.easeInOut
    return ease
  }, [ease, idled])

  // 每次更新的时候
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
