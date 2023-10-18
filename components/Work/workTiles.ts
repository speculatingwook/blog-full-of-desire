export type WorkTile = {
  title: string
  description: string
  image: {
    src: string
    width: number
    height: number
  }
}

export const workTiles: WorkTile[] = [
  // {
  //   description: `Here are things`,
  //   title: `I've worked on`,
  //   image: {
  //     src: '/static/images/aphex-apps.webp',
  //     width: 600,
  //     height: 770,
  //   },
  // },
  {
    description: 'I built',
    title: 'Greendar',
    image: {
      src: '/static/images/greendar.jpeg',
      width: 600,
      height: 554,
    },
  },
  // {
  //   description: `I maintained`,
  //   title: 'Aphex Planner',
  //   image: {
  //     src: '/static/images/planner-app.webp',
  //     width: 600,
  //     height: 717,
  //   },
  // },
  {
    description: `I built`,
    title: '지구방위대',
    image: {
      src: '/static/images/지구방위대.png',
      width: 600,
      height: 717,
    },
  },
]
