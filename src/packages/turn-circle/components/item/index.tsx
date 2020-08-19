import React, { useMemo, useCallback } from 'react'

interface Props {
  index: number
  size: number
  onClick: (index: number) => void
  render: React.ReactNode
}

const TurnCircleItem = ({ size, index, onClick, render }: Props) => {
  const style = useMemo(
    () => ({
      width: `${size}px`,
      height: `${size}px`,
      transform: `rotate(${-15 + index * 60}deg) skew(15deg, 15deg)`
    }),
    [size, index]
  )

  const revertstyle = useMemo(
    () => ({
      width: `${size * 0.5}px`,
      height: `${size * 0.5}px`,
      transform: `translate(-30%, -30%) skew(-15deg, -15deg) rotate(-45deg)`
    }),
    [size]
  )

  const onItemClick = useCallback(() => {
    onClick(index)
  }, [index, onClick])

  return (
    <div className="m-tc-item" style={style} onClick={onItemClick}>
      <div className="m-tc-item__revert" style={revertstyle}>
        {render}
      </div>
    </div>
  )
}

export default TurnCircleItem
