import { Search } from 'lucide-react'
import ThemeImage from '../../Theme-Image'

export default function MobileSearchBar() {
  return (
    <>
    {/* آیکون سرچ سمت راست */}
    <div className="absolute right-3 top-1/2 h-4 w-4  -translate-y-1/2 text-muted-foreground mt-[-4px]">
    <Search size={23}  />
    </div>

    <ThemeImage
      w={70}
      h={50}
      className="absolute right-[113px] top-1/2 mt-[-2px] -translate-y-1/2"
    />

    {/* input با padding بیشتر از سمت چپ که متن به عکس نچسبه */}
    <div  className="w-full pl-12 pr-11 rounded-full bg-input h-11 flex items-center text-[14px] text-placeholder">
        <span>جستوجو در</span>
      </div>
  </>
  )
}
