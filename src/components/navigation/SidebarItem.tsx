import { ChevronLeft } from "lucide-react";


export default function SidebarItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex justify-between items-center">
    <div className="flex items-center gap-x-2">
      {icon}
      <span>{label}</span>
    </div>
    <ChevronLeft size={20} />
  </div>
  )
}
