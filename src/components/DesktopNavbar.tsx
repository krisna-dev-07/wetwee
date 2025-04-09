"use client";
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { BellIcon, HomeIcon, UserIcon } from 'lucide-react'
import ModeToggle from './ui/modetoggle'
import { useRouter } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react';
import { User } from 'next-auth';
const DesktopNavbar = () => {

  const { data: session } = useSession();
  const user: User = session?.user
  const router = useRouter()
  const handleSignUp = () => {
    router.push('/sign-up') // Navigate to sign-up route
  }

  const handleSignIn = () => {
    router.push('/sign-in') // Navigate to sign-in route
  }
 
  return (
    <div className="hidden md:flex items-center space-x-4">

      <Button variant="link" className="flex items-center gap-2" asChild>
        <Link href="/">
          <HomeIcon className="w-4 h-4" />
          <span className="hidden lg:inline">Home</span>
        </Link>
      </Button>
      {user ? (
        <>
          <Button variant="link" className="flex items-center gap-2" asChild>
            <Link href="/notifications">
              <BellIcon className="w-4 h-4" />
              <span className="hidden lg:inline">Notifications</span>
            </Link>
          </Button>
          <Button variant="link" className="flex items-center gap-2" asChild>
            <Link
              href={`/profile/${user.username
                }`}
            >
              <UserIcon className="w-4 h-4" />
              <span className="hidden lg:inline">Profile</span>
            </Link>
          </Button>
          <Button variant="destructive" onClick={() => signOut()}>Sign out</Button>

          <ModeToggle />

        </>
      ) : (
        <><Button variant="outline" onClick={handleSignIn} >Sign In</Button>
          <Button variant="outline" onClick={handleSignUp}>Sign Up</Button>
          <ModeToggle />
        </>

      )}
    </div>
  );
}



export default DesktopNavbar
