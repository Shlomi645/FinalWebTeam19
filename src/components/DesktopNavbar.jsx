"use client";

import React from "react";
import {
  BellIcon,
  HomeIcon,
  UserIcon,
  ShellIcon,
  HeadsetIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { useAuthUser } from "@/hooks/useAuthUser";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import UpliftPopup from "@/components/UpliftPopup";

function DesktopNavbar() {
  const { user } = useAuthUser();

  return (
    <div className="hidden md:flex items-center space-x-4">
      <ModeToggle />

      <Button variant="ghost" className="btn2 flex items-center gap-2" asChild>
        <Link href="/">
          <HomeIcon className="w-4 h-4" />
          <span className="hidden lg:inline">Home</span>
        </Link>
      </Button>

      {/* <Button variant="ghost" className="btn2 flex items-center gap-2" asChild>
        <Link href="/notifications">
          <BellIcon className="w-4 h-4" />
          <span className="hidden lg:inline">Notifications</span>
        </Link>
      </Button> maybe later */}

      <Button variant="ghost" className="btn2 flex items-center gap-2" asChild>
        <Link href="/profile">
          <UserIcon className="w-4 h-4" />
          <span className="hidden lg:inline">Profile</span>
        </Link>
      </Button>

      <Button variant="ghost" className="btn2 flex items-center gap-2" asChild>
        <Link href="/about-us">
          <ShellIcon className="w-4 h-4" />
          <span className="hidden lg:inline">About Us</span>
        </Link>
      </Button>

      <Button variant="ghost" className="btn2 flex items-center gap-2" asChild>
        <Link href="/contact">
          <HeadsetIcon className="w-4 h-4" />
          <span className="hidden lg:inline">Contact</span>
        </Link>
      </Button>

      {/* 👇 Auth buttons and uplift only visible if sidebar is hidden (lg:hidden) */}
      <div className="lg:hidden flex items-center gap-2">
        {user && <UpliftPopup />}

        {user ? (
          <Button  variant="destructive" onClick={() => signOut(auth)}>
            Logout
          </Button>
        ) : (
          <>
            <Button variant="outline" asChild>
              <Link href="/signin">Login</Link>
            </Button>
            <Button variant="default" asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default DesktopNavbar;
