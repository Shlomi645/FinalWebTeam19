"use client";

import { useEffect, useState } from "react";
import { getAllPosts } from "@/lib/posts";
//import CreatePost from "@/components/CreatePost";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { HeartIcon, MessageCircleIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Forum from "@/components/Forum";

export default function Home() {
  return (
    <div className="p-6">
      <Forum />
    </div>
  );
}