import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { HomeIcon } from 'lucide-react'
import ModeToggle from './ui/modetoggle'

const DesktopNavbar = () => {
  return (
    <div className="hidden md:flex items-center space-x-4">

    <Button variant="ghost" className="flex items-center gap-2" asChild>
      <Link href="/">
        <HomeIcon className="w-4 h-4" />
        <span className="hidden lg:inline">Home</span>
      </Link>
    </Button>
    <Button variant="secondary" >Sign In</Button>
    <Button variant="secondary" >Sign Up</Button>
    <ModeToggle />
    </div>
  )
}

export default DesktopNavbar
