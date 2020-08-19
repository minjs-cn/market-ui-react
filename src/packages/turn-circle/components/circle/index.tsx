import React, { useMemo } from 'react'

interface Props {
  size: number
  angle: number | undefined
  bgColor?: string
  bgImage?: string
  children: React.ReactNode
  startButton: React.ReactNode
}

const Circle = ({ angle, size, bgColor = '#eee', bgImage, children, startButton }: Props) => {
  const boxstyle = useMemo(
    () => ({
      width: `${size}px`,
      height: `${size}px`,
      backgroundColor: bgColor
    }),
    [size, bgColor]
  )

  const circlestyle = useMemo(
    () => ({
      width: `${size}px`,
      height: `${size}px`,
      backgroundImage: `url(${bgImage})`,
      transform: `rotate3d(0, 0, 1, ${angle}deg)`
    }),
    [size, angle, bgImage]
  )

  return (
    <div className="m-turncircle-box" style={boxstyle}>
      <div className="m-turncircle" style={circlestyle}>
        {children}
      </div>
      {startButton}
    </div>
  )
}

export default Circle
