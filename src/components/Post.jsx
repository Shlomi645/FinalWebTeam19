"use client"

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import CommentSection from "@/components/CommentSection";

export default function Post({ post, user, onLike, onDelete }) {
  const hasLiked = post.likes?.includes(user.uid);

  return (
    <Card>
      <CardHeader className="flex gap-4 items-center">
        <Avatar className="w-10 h-10">
          <AvatarImage
            src={post.authorImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(post.displayName)}&background=random`}
          />
        </Avatar>
        <div className="flex flex-col">
          <CardTitle className="text-base">{post.title}</CardTitle>
          <p className="text-xs text-muted-foreground">
            {post.displayName} ·{" "}
            {post.timestamp?.toDate ? post.timestamp.toDate().toLocaleString() : "Just now"}
          </p>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p>{post.content}</p>
        <Separator />

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className={`px-2 py-1 ${hasLiked ? "bg-pink-100 text-pink-700 dark:bg-pink-400 dark:text-white" : ""}`}
            onClick={() => onLike(post.id, hasLiked)}
          >
            ❤️ {post.likes?.length || 0}
          </Button>

          {(user.uid === post.uid || post.hasCommented) && (
            <Button variant="destructive" size="sm" onClick={() => onDelete(post.id)}>
              🗑️ Delete
            </Button>
          )}
        </div>

        <CommentSection postId={post.id} user={user} />
      </CardContent>
    </Card>
  );
}
