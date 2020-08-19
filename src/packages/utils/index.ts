export function isUndef(value: unknown): boolean {
  return value === undefined
}

export function noop() {}

export function padding2rect(padding = [0]) {
  const top = padding[0]
  const right = padding[1] || padding[0]
  const bottom = padding[2] || padding[1]
  const left = padding[3] || padding[1] || padding[0]

  return {
    left,
    right,
    bottom,
    top
  }
}

export function isCanvasClear(canvas: HTMLCanvasElement): number {
  const { width, height } = canvas
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
  const { data } = ctx.getImageData(0, 0, width, height)

  let count = 0
  for (let i = 0; i < data.length; i += 3) {
    if (data[i] === 0) count++
  }

  const p = count / (width * height)

  return p
}
