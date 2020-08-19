import React, { useRef, useEffect, useCallback } from 'react'
import { isCanvasClear, noop } from '../../../utils'

interface Props {
  width: number
  height: number
  bgColor?: string
  bgImage?: string
  isCleaned?: boolean
  isCleanRatio?: number
  onTouchStart?: () => void
  onTouchMove?: (e: React.TouchEvent<HTMLCanvasElement>) => void
  onTouchEnd?: (e: React.TouchEvent<HTMLCanvasElement>, p: number) => void
}

const App = ({
  width,
  height,
  bgColor = '#eee',
  bgImage,
  isCleaned = true,
  isCleanRatio = 0.5,
  onTouchStart = noop,
  onTouchMove = noop,
  onTouchEnd = noop
}: Props) => {
  const caRef = useRef<HTMLCanvasElement>(null)
  const offset = useRef({
    left: 0,
    top: 0,
    width,
    height
  })

  useEffect(() => {
    const canvas = caRef.current
    const ctx = (canvas as HTMLCanvasElement).getContext('2d')
    // 设置canvas的宽高
    ;(canvas as HTMLCanvasElement).width = width
    ;(canvas as HTMLCanvasElement).height = height
    // 保存canvas的偏移
    offset.current = (canvas as HTMLCanvasElement).getBoundingClientRect()
    // 设置canvas涂层
    if (bgImage) {
      const scBgImage = new Image()
      scBgImage.onload = () => {
        ;(ctx as CanvasRenderingContext2D).drawImage(scBgImage, 0, 0, width, height)
      }
      scBgImage.onerror = () => {
        console.log('error')
      }
      scBgImage.src = bgImage
    } else {
      ;(ctx as CanvasRenderingContext2D).fillStyle = bgColor
      ;(ctx as CanvasRenderingContext2D).fillRect(0, 0, width, height)
    }
  }, [caRef, width, height, bgImage, bgColor])

  const onGameTouchStart = useCallback(() => {
    const canvas = caRef.current
    const ctx = (canvas as HTMLCanvasElement).getContext('2d')
    // 设置绘图上下文模式
    ;(ctx as CanvasRenderingContext2D).globalCompositeOperation = 'destination-out'
    onTouchStart()
  }, [onTouchStart])

  const onGameTouchMove = useCallback(
    (e: React.TouchEvent<HTMLCanvasElement>) => {
      const canvas = caRef.current
      const ctx = (canvas as HTMLCanvasElement).getContext('2d')
      // 利用圆形形状清除涂层
      ;(ctx as CanvasRenderingContext2D).beginPath()
      ;(ctx as CanvasRenderingContext2D).arc(
        ((e.touches[0].clientX - offset.current.left) * width) / offset.current.width,
        ((e.touches[0].clientY - offset.current.top) * height) / offset.current.height,
        10,
        0,
        2 * Math.PI
      )
      ;(ctx as CanvasRenderingContext2D).fill()
      ;(ctx as CanvasRenderingContext2D).closePath()
      onTouchMove(e)
    },
    [height, onTouchMove, width]
  )

  const onGameTouchEnd = useCallback(
    (e: React.TouchEvent<HTMLCanvasElement>) => {
      const canvas = caRef.current
      const ctx = (canvas as HTMLCanvasElement).getContext('2d')
      // 计算刮去的面积比例
      const hasCleanRatio = isCanvasClear(canvas as HTMLCanvasElement)
      // 开启清屏且比例大于设定
      if (isCleaned && hasCleanRatio >= isCleanRatio) {
        ;(ctx as CanvasRenderingContext2D).rect(0, 0, width, height)
        ;(ctx as CanvasRenderingContext2D).fill()
      }
      onTouchEnd(e, hasCleanRatio)
    },
    [isCleaned, isCleanRatio, onTouchEnd, width, height]
  )

  return (
    <canvas
      onTouchStart={onGameTouchStart}
      onTouchMove={onGameTouchMove}
      onTouchEnd={onGameTouchEnd}
      className="m-scratch-card"
      ref={caRef}
    ></canvas>
  )
}

export default App
