import TurnCard from '../packages/turn-card/example'
import TurnCircle from '../packages/turn-circle/example'
import ScratchCard from '../packages/scratch-card/example'
import SlotMachine from '../packages/slot-machine/example'

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
  },
  {
    path: '/slot-machine',
    title: '老虎机',
    component: SlotMachine
  }
]

export default routes
