"use client"

import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/nextjs'
import React from 'react'

const Header = () => {
  const {user}=useUser()
  console.log("🚀 ~ Header ~ user:", user)
  const RenderUserDetail=()=>{
    if (!user) return null;
    return <div>{user.username} {`'s`} Space</div>
  }


  return (
    <div className='flex items-center justify-between p-4 shadow-lg'>
      <RenderUserDetail/>
      <div>Home</div>
      <SignedOut>
        <SignInButton/>
      </SignedOut>
      <SignedIn>
        <UserButton/>
      </SignedIn>
    </div>
  )
}

export default Header
