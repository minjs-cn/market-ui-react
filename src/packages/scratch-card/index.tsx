import React, { useMemo } from 'react'
import { padding2rect, noop } from '../utils'
import MyPrize from './components/prize'
import MyCanvas from './components/canvas'

interface Option {
  title: string
  image: string
  size?: number
}

interface Props {
  option: Option
  width?: number
  height?: number
  bgImage?: string
  bgColor?: string
  padding?: Array<number>
  scratchBgColor?: string
  scratchBgImage?: string
  isCleaned?: boolean
  isCleanRatio?: number
  onTouchStart?: () => void
  onTouchMove?: (e: React.TouchEvent<HTMLCanvasElement>) => void
  onTouchEnd?: (e: React.TouchEvent<HTMLCanvasElement>, p: number) => void
}

const App = ({
  option,
  width = 300,
  height = 180,
  bgImage,
  bgColor,
  padding = [0],
  scratchBgColor = '#eee',
  scratchBgImage,
  isCleaned,
  isCleanRatio,
  onTouchStart = noop,
  onTouchMove = noop,
  onTouchEnd = noop
}: Props) => {
  const boxStyle = {
    width: `${width}px`,
    height: `${height}px`,
    backgroundImage: `url(${bgImage})`,
    backgroundColor: bgColor
  }

  const { top, right, bottom, left } = useMemo(() => padding2rect(padding), [padding])
  const cWidth = useMemo(() => width - left - right, [width, left, right])
  const cHeight = useMemo(() => height - top - bottom, [height, top, bottom])
  const wrapperStyle = useMemo(
    () => ({
      left: `${left}px`,
      top: `${top}px`,
      width: `${cWidth}px`,
      height: `${cHeight}px`
    }),
    [left, top, cWidth, cHeight]
  )

  return (
    <div className="m-scratch" style={boxStyle}>
      <MyPrize {...option} />
      <div style={wrapperStyle} className="m-scratch-wrapper">
        <MyCanvas
          width={cWidth}
          height={cHeight}
          bgColor={scratchBgColor}
          bgImage={scratchBgImage}
          isCleaned={isCleaned}
          isCleanRatio={isCleanRatio}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        />
      </div>
    </div>
  )
}

App.canvas = MyCanvas

export default App
