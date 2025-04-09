"use client"
import React, { useState } from 'react'
import { Button } from './ui/button'
import { useTheme } from 'next-themes';
import { BellIcon, HomeIcon, LogOutIcon, MenuIcon, MoonIcon, SunIcon, UserIcon } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { User } from 'next-auth';
import ModeToggle from './ui/modetoggle';
import { useRouter } from 'next/navigation';

const MobileNavbar = () => {
  const { theme, setTheme } = useTheme();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { data: session } = useSession()
  const router = useRouter()

  const handleSignUp = () => {
    router.push('/sign-up') // Navigate to sign-up route
  }

  const handleSignIn = () => {
    router.push('/sign-in') // Navigate to sign-in route
  }
  const user: User = session?.user
  return (
    <div className="flex md:hidden items-center space-x-2">
     <ModeToggle/>
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
            <Button variant="ghost" className="flex items-center gap-3 justify-start" asChild>
              <Link href="/">
                <HomeIcon className="w-4 h-4" />
                Home
              </Link>
            </Button>


            {user ? (
              <>
                <Button variant="ghost" className="flex items-center gap-3 justify-start" asChild>
                  <Link href="/notifications">
                    <BellIcon className="w-4 h-4" />
                    Notifications
                  </Link>
                </Button>
                <Button variant="ghost" className="flex items-center gap-3 justify-start" asChild>
                  <Link href="/profile">
                    <UserIcon className="w-4 h-4" />
                    Profile
                  </Link>
                </Button>
                <Button variant="secondary" className="flex items-center gap-3 justify-start w-full" onClick={() => signOut()}>
                  <LogOutIcon className="w-4 h-4" />
                  Logout
                </Button>
              </>
            ) : (

              <Button variant="secondary" onClick={handleSignIn} >Sign In</Button>


            )}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default MobileNavbar
