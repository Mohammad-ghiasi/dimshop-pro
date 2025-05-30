import { Search } from 'lucide-react'
import SsrThemeImage from '@/components/Ssr-Theme-image'

export default function MobileSearchBar() {
  return (
    <>
    {/* آیکون سرچ سمت راست */}
    <div className="absolute right-3 top-1/2 h-4 w-4  -translate-y-1/2 text-muted-foreground mt-[-4px]">
    <Search size={23}  />
    </div>

    <SsrThemeImage
      w={70}
      h={50}
      className="absolute right-[126px] top-1/2 mt-[-1px] -translate-y-1/2"
    />

    {/* input با padding بیشتر از سمت چپ که متن به عکس نچسبه */}
    <div  className="w-full pl-12 pr-11 rounded-full bg-input h-11 flex items-center text-[14px] text-placeholder">
        <span>جست و جو در</span>
      </div>
  </>
  )
}
