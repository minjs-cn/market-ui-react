import React from 'react'

interface Props {
  title: string
  image: string
  size?: number
}

const App = ({ title, image, size = 100 }: Props) => {
  return (
    <div className="m-scratch-option">
      <div className="m-scratch-option-title">{title}</div>
      <img width={size} src={image} alt={title} />
    </div>
  )
}

export default App
