"use client";

import React, { useState } from "react";
import {
  BellIcon,
  HeadsetIcon,
  HomeIcon,
  MenuIcon,
  MoonIcon,
  SunIcon,
  UserIcon,
  ShellIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { useAuthUser } from "@/hooks/useAuthUser";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import UpliftPopup from "@/components/UpliftPopup";
import { useRouter } from "next/navigation";

export default function MobileNavbar() {
  const { theme, setTheme } = useTheme();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { user } = useAuthUser();
  const router = useRouter();

  const handleNavClick = () => {
    setShowMobileMenu(false);
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
    setShowMobileMenu(false);
  };

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
              onClick={handleNavClick}
            >
              <Link href="/">
                <HomeIcon className="w-4 h-4" />
                Home
              </Link>
            </Button>
            {/* <Button
              variant="ghost"
              className="flex items-center gap-3 justify-start"
              asChild
              onClick={handleNavClick}
            >
              <Link href="/notifications">
                <BellIcon className="w-4 h-4" />
                Notifications
              </Link>
            </Button>  maybe later */} 
            <Button
              variant="ghost"
              className="flex items-center gap-3 justify-start"
              asChild
              onClick={handleNavClick}
            >
              <Link href="/profile">
                <UserIcon className="w-4 h-4" />
                Profile
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="flex items-center gap-3 justify-start"
              asChild
              onClick={handleNavClick}
            >
              <Link href="/about-us">
                <ShellIcon className="w-4 h-4" />
                About Us
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="flex items-center gap-3 justify-start"
              asChild
              onClick={handleNavClick}
            >
              <Link href="/contact">
                <HeadsetIcon className="w-4 h-4" />
                Contact
              </Link>
            </Button>

            {user && (
              <div className="px-2">
                <UpliftPopup />
              </div>
            )}

            {user ? (
              <Button
                variant="destructive"
                className="flex items-center gap-3 justify-start"
                onClick={handleLogout}
              >
                Logout
              </Button>
            ) : (
              <>
                <Button
                  variant="ghost"
                  className="flex items-center gap-3 justify-start"
                  asChild
                  onClick={handleNavClick}
                >
                  <Link href="/signin">Login</Link>
                </Button>
                <Button
                  variant="ghost"
                  className="flex items-center gap-3 justify-start"
                  asChild
                  onClick={handleNavClick}
                >
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
