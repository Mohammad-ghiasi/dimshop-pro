import { Search } from 'lucide-react'
import ThemeImage from '../../Theme-Image'

export default function MobileSearchBar() {
  return (
    <>
    {/* آیکون سرچ سمت راست */}
    <div className="absolute right-3 top-1/2 h-4 w-4 sm:h-5 sm:w-5 -translate-y-1/2 text-muted-foreground mt-[-3px]">
    <Search size={23}  />
    </div>

    <ThemeImage
      w={70}
      h={50}
      className="absolute right-[112px] top-1/2 mt-[-2px] -translate-y-1/2"
    />

    {/* input با padding بیشتر از سمت چپ که متن به عکس نچسبه */}
    <div  className="w-full pl-10 pr-10 sm:pl-12 sm:pr-10 rounded-full bg-input h-11 flex items-center text-[14px] text-placeholder">
        <span>جستوجو در</span>
      </div>
  </>
  )
}
