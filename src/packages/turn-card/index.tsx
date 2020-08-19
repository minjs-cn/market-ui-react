import React, { useCallback, useEffect, useState, useMemo } from 'react'
import { noop } from '../utils'
import { paddingStyle } from '../utils/style'

interface Option {
  title: string
  image: string
  size?: number
}

interface Props {
  option: Option
  duration?: number
  status?: string
  width?: number
  height?: number
  fontSize?: number
  fontColor?: string
  frontBgColor?: string
  frontBgImage?: string
  backBgImage?: string
  backBgColor?: string
  padding?: Array<number>
  onStart: (option: Option) => void
  onItemClick?: (option: Option) => void
}

const App = ({
  option,
  status = 'back',
  width = 100,
  height = 150,
  fontColor = '',
  fontSize = 16,
  duration = 2000,
  frontBgColor = '',
  frontBgImage = '',
  backBgColor = '',
  backBgImage = '',
  padding = [0],
  onStart,
  onItemClick = noop
}: Props) => {
  const boxstyle = useMemo(
    () => ({
      width: `${width}px`,
      height: `${height}px`
    }),
    [width, height]
  )

  const backStyle = useMemo(
    () => ({
      backgroundImage: `url(${backBgImage})`,
      backgroundColor: backBgColor
    }),
    [backBgImage, backBgColor]
  )

  const frontStyle = useMemo(
    () => ({
      backgroundImage: `url(${frontBgImage})`,
      backgroundColor: frontBgColor,
      padding: paddingStyle(padding)
    }),
    [frontBgImage, frontBgColor, padding]
  )

  const titlestyle = useMemo(
    () => ({
      fontSize: `${fontSize}px`,
      color: fontColor
    }),
    [fontSize, fontColor]
  )

  const imageStyle = useMemo(
    () => ({
      width: `${option.size || width}px`,
      bottom: `${padding[3] || padding[1] || padding[0]}px`
    }),
    [option, width, padding]
  )

  const [cardStyle, setCardStyle] = useState({
    transform: ''
  })

  useEffect(() => {
    if (status === 'front') {
      setCardStyle({
        transform: 'rotate3d(0, 1, 0, 180deg)'
      })
    } else {
      setCardStyle({
        transform: 'rotate3d(0, 1, 0, 0deg)'
      })
    }
  }, [status])

  const onGameStart = useCallback(() => {
    onStart(option)
  }, [onStart, option])

  const onGameItemClick = useCallback(() => {
    onItemClick(option)
  }, [onItemClick, option])

  return (
    <div className="m-turncard" style={boxstyle}>
      <div
        className="m-turncard-inner"
        style={{
          ...cardStyle,
          transition: `transform ${duration}ms`
        }}
      >
        <div className="m-turncard-bg" style={backStyle} onClick={onGameStart}></div>
        <div className="m-turncard-item" style={frontStyle} onClick={onGameItemClick}>
          <div className="m-turncard-title" style={titlestyle}>
            {option.title}
          </div>
          <img
            style={imageStyle}
            className="m-turncard-image"
            src={option.image}
            alt={option.title}
          />
        </div>
      </div>
    </div>
  )
}

export default App
