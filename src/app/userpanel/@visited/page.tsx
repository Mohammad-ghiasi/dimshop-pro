import HeaderTitle from '@/components/headerTitle/HeaderTitle'
import { EyeOff } from 'lucide-react'
import React from 'react'

export default function Page() {
  return (
    <div className="mt-4 py-6 md:bg-card flex flex-col gap-y-6  md:px-4 shadow-sm ">
      <div className="">
        <HeaderTitle className="after:h-[2px]">بازدید های اخیر</HeaderTitle>
      </div>
        {1 && (
        <div className="w-full">
          <p className="flex justify-center items-center gap-x-2 py-8">
            <span>
              <EyeOff className="w-5 h-5 md:w-6 md:h-6" />
            </span>{" "}
            <span className="text-sm md:text-base">کالایی دریافت نشد!</span>
          </p>
        </div>
      )}
    </div>
  )
}
