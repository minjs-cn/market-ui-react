import React, { useMemo } from 'react'

interface Props {
  title: string
  image: string
  fontSize?: number
  fontColor?: string
}

const Prize = ({ fontColor, fontSize, title, image }: Props) => {
  const titleStyle = useMemo(
    () => ({
      fontSize: `${fontSize}px`,
      color: fontColor
    }),
    [fontColor, fontSize]
  )

  return (
    <div>
      <div className="m-tc-item__title" style={titleStyle}>
        {title}
      </div>
      <img className="m-tc-item__image" src={image} alt={title} />
    </div>
  )
}

export default Prize
