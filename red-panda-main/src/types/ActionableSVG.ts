export type ActionableSVG = {
  image: string,
  text: string,
  click?: { x: string, y: string },
  drag?: {
    xStart: string,
    yStart: string,
    length: string,
    direction: string,
    animate?: {
      id: string,
      property: string,
      from: number,
      to: number,
      formatNumber: (x: number) => string
    }
  },
}
