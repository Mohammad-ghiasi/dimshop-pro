"use client"
import React from 'react'

import dynamic from "next/dynamic";

const ManageUserPage = dynamic(() => import("@/components/manageUser.tsx/UserPage"), {
  ssr: false,
});


export default function page() {
  return (
    <ManageUserPage />
  )
}
