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

export default function Sidebar() {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) return <UnAuthenticatedSidebar />;

  return (
    <div className="sticky top-20">
      <ul style={{ display: "grid", gap: "10px" }}>
        {/* Profile Card with Logout */}
        <li>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Link href="/profile" className="flex flex-col items-center justify-center">
                  <Avatar className="w-20 h-20 border-2">
                    <AvatarImage src={user.photoURL || "/defaultUserLogo.jpg"} />
                  </Avatar>

                  <div className="mt-4 space-y-1">
                    <h3 className="font-semibold">{user.fullName}</h3>
                    <p className="text-sm text-muted-foreground">@{user.email?.split("@")[0]}</p>
                  </div>
                </Link>

                {user.bio && (
                  <p className="mt-3 text-sm text-muted-foreground">{user.bio}</p>
                )}

                <div className="w-full">
                  <Separator className="my-4" />
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">{user.following || 0}</p>
                      <p className="text-xs text-muted-foreground">Following</p>
                    </div>
                    <Separator orientation="vertical" />
                    <div>
                      <p className="font-medium">{user.followers || 0}</p>
                      <p className="text-xs text-muted-foreground">Followers</p>
                    </div>
                  </div>
                  <Separator className="my-4" />
                </div>

                <div className="w-full space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <MapPinIcon className="w-4 h-4 mr-2" />
                    {user.location || "Not set"}
                  </div>
                  <div className="flex items-center">
                    <LinkIcon className="w-4 h-4 mr-2 shrink-0" />
                    <a
                      href={user.website || "#"}
                      className="hover:underline truncate"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {user.website || "https://example.com"}
                    </a>
                  </div>
                </div>

                {/* 🔻 Logout Button */}
                <Separator className="my-4" />
                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={() => signOut(auth)}
                >
                  Logout
                </Button>
              </div>
            </CardContent>
          </Card>
        </li>

        {/* Gemini Uplift Card */}
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
