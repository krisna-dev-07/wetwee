"use client"

import React, { useState } from 'react'
import { Button } from './ui/button'
import { BellIcon, HomeIcon, LogOutIcon, MenuIcon, MoonIcon, SunIcon, UserIcon } from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { User } from 'next-auth'
import { useRouter } from 'next/navigation'
import ModeToggle from './ui/modetoggle'
import { useTheme } from 'next-themes'

const MobileNavbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const { data: session } = useSession()
  const router = useRouter()
  const user: User = session?.user
  const { theme, setTheme } = useTheme();


  const handleSignUp = () => {
    router.push('/sign-up')
    setShowMobileMenu(false)
  }

  const handleSignIn = () => {
    router.push('/sign-in')
    setShowMobileMenu(false)
  }

  const handleSignOut = async () => {
    await signOut()
    setShowMobileMenu(false)
  }

  return (
    <div className="flex md:hidden items-center space-x-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="mr-2"
      >
        <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
      
      <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <MenuIcon className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        
        <SheetContent side="right" className="w-[300px]">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          
          <nav className="flex flex-col space-y-4 mt-6">
            <Button 
              variant="ghost" 
              className="flex items-center gap-3 justify-start" 
              asChild
            >
              <Link href="/" onClick={() => setShowMobileMenu(false)}>
                <HomeIcon className="w-4 h-4" />
                Home
              </Link>
            </Button>

            {user ? (
              <>
                <Button 
                  variant="ghost" 
                  className="flex items-center gap-3 justify-start" 
                  asChild
                >
                  <Link href="/notifications" onClick={() => setShowMobileMenu(false)}>
                    <BellIcon className="w-4 h-4" />
                    Notifications
                  </Link>
                </Button>
                
                <Button 
                  variant="ghost" 
                  className="flex items-center gap-3 justify-start" 
                  asChild
                >
                  <Link href="/profile" onClick={() => setShowMobileMenu(false)}>
                    <UserIcon className="w-4 h-4" />
                    Profile
                  </Link>
                </Button>
                
                <Button 
                  variant="secondary" 
                  className="flex items-center gap-3 justify-start w-full" 
                  onClick={handleSignOut}
                >
                  <LogOutIcon className="w-4 h-4" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="secondary" onClick={handleSignIn}>
                  Sign In
                </Button>
                <Button variant="outline" onClick={handleSignUp}>
                  Sign Up
                </Button>
              </>
            )}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default MobileNavbar