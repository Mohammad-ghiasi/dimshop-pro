import FullMenu from './FullMenu'
import BaseMenu from './BaseMenu'
import MobileMenu from './mobile/MobileMenu'

export default function FullMenuSSR() {
  return (
      <FullMenu topMenu={<BaseMenu />} bottomMenu={<MobileMenu />} />
  )
}
