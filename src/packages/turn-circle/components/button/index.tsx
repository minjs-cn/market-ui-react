import React, { useCallback } from 'react'

interface Props {
  size: number
  bgImage?: string
  onClick: (e: Event) => void
}

const Button = ({ size, onClick, bgImage }: Props) => {
  const style = {
    width: `${size}px`,
    height: `${size}px`,
    backgroundImage: bgImage ? `url(${bgImage})` : ''
  }

  const onStart = useCallback(
    (e) => {
      onClick(e)
    },
    [onClick]
  )

  return <div className="m-turncircle-button" style={style} onClick={onStart}></div>
}

export default Button
