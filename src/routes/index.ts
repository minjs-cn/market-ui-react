import TurnCard from '../components/turn-card'
import TurnCircle from '../components/turn-circle'
import ScratchCard from '../components/scratch-card'

const routes = [
  {
    path: '/turn-circle',
    title: '大转盘',
    component: TurnCircle
  },
  {
    path: '/turn-card',
    title: '翻牌子',
    component: TurnCard
  },
  {
    path: '/scratch-card',
    title: '刮刮卡',
    component: ScratchCard
  }
]

export default routes
