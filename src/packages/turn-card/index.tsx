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
  option, // 奖品项
  status = 'back', // 状态 背面还是正面
  width = 100, // 牌子宽度
  height = 150, // 牌子高度
  fontColor = '', // 文字颜色
  fontSize = 16, // 文字大小
  duration = 2000, // 翻转速度
  frontBgColor = '', // 正面背景颜色
  frontBgImage = '', // 正面背景图片
  backBgColor = '', // 反面背景颜色
  backBgImage = '', // 反面背景图片
  padding = [0], // 正面边距
  onStart, // 开始
  onItemClick = noop // 点击正面，即奖品项
}: Props) => {
  // 容器样式
  const boxstyle = useMemo(
    () => ({
      width: `${width}px`,
      height: `${height}px`
    }),
    [width, height]
  )
  // 反面样式
  const backStyle = useMemo(
    () => ({
      backgroundImage: `url(${backBgImage})`,
      backgroundColor: backBgColor
    }),
    [backBgImage, backBgColor]
  )
  // 正面样式
  const frontStyle = useMemo(
    () => ({
      backgroundImage: `url(${frontBgImage})`,
      backgroundColor: frontBgColor,
      padding: paddingStyle(padding)
    }),
    [frontBgImage, frontBgColor, padding]
  )
  // 奖品标题
  const titlestyle = useMemo(
    () => ({
      fontSize: `${fontSize}px`,
      color: fontColor
    }),
    [fontSize, fontColor]
  )
  // 奖品图片
  const imageStyle = useMemo(
    () => ({
      width: `${option.size || width}px`,
      bottom: `${padding[3] || padding[1] || padding[0]}px`
    }),
    [option, width, padding]
  )
  // 卡片样式
  const [cardStyle, setCardStyle] = useState({
    transform: ''
  })
  // 更改卡片样式启动翻转效果
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
  // 点击背面
  const onGameStart = useCallback(() => {
    onStart(option)
  }, [onStart, option])
  // 点击正面
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
