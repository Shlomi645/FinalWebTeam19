"use client";

import { useAuth } from "@/context/AuthContext";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { LinkIcon, MapPinIcon } from "lucide-react";
import { UnAuthenticatedSidebar } from "./UnAuthenticatedSidebar";
import Link from "next/link";
import UpliftCard from "./UpliftCard";
import { Button } from "./ui/button";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation"; // ⬅️ Import useRouter

export default function Sidebar() {
  const { user, loading } = useAuth();
  const router = useRouter(); // ⬅️ Initialize router

  if (loading) return null;
  if (!user) return <UnAuthenticatedSidebar />;

  const fallbackImage = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    user.fullName || "User"
  )}&background=random`;

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/"); // ⬅️ Redirect to home page after logout
  };

  return (
    <div className="sticky top-20">
      <ul className="grid gap-3">
        {/* Profile Card */}
        <li>
          <Card className="w-full max-w-xs">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Link href="/profile" className="flex flex-col items-center justify-center">
                  <Avatar className="w-20 h-20 border-2">
                    <AvatarImage src={user.image || fallbackImage} alt="Profile" />
                  </Avatar>
                  <div className="mt-4 space-y-1">
                    <h3 className="font-semibold">{user.fullName}</h3>
                    <p className="text-sm text-muted-foreground">
                      @{user.email?.split("@")[0]}
                    </p>
                  </div>
                </Link>

                {user.bio && (
                  <p className="mt-3 text-sm text-muted-foreground text-center max-w-[220px] break-words">
                    {user.bio}
                  </p>
                )}

                <div className="w-full space-y-2 text-sm text-muted-foreground mt-4">
                  <div className="flex items-center">
                    <MapPinIcon className="w-4 h-4 mr-2" />
                    {user.location || "Not set"}
                  </div>
                  <div className="flex items-center">
                    <LinkIcon className="w-4 h-4 mr-2 shrink-0" />
                    <a
                      href={user.website || "#"}
                      className="hover:underline break-all text-xs max-w-[220px] inline-block"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {user.website || "https://example.com"}
                    </a>
                  </div>
                </div>

                <Separator className="my-4" />
                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={handleLogout} // ⬅️ Use handleLogout
                >
                  Logout
                </Button>
              </div>
            </CardContent>
          </Card>
        </li>

        {/* Uplift Card */}
        <li>
          <Card>
            <CardContent className="pt-6">
              <UpliftCard />
            </CardContent>
          </Card>
        </li>
      </ul>
    </div>
  );
}
