"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import AnonymousCommentSection from "@/components/AnonymousCommentSection";

export default function AnonymousPost({ post, user, onLike, onDelete }) {
  const hasLiked = post.likes?.includes(user.uid);

  return (
    <Card>
      {/* Header */}
      <CardHeader className="flex gap-4 items-center">
        <img
          src="/defaultUserLogo.jpg"
          alt="Anonymous"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <CardTitle className="text-base">{post.title}</CardTitle>
          <p className="text-xs text-muted-foreground">
            Anonymous User ·{" "}
            {post.timestamp?.toDate
              ? post.timestamp.toDate().toLocaleString()
              : "Just now"}
          </p>
        </div>
      </CardHeader>
      {/* Post Content */}
      <CardContent className="space-y-4">
        <p>{post.content}</p>
        <Separator />

        {/* Like & Delete Buttons */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className={`px-2 py-1 ${
              hasLiked
                ? "bg-pink-100 text-pink-700 dark:bg-pink-400 dark:text-white"
                : ""
            }`}
            onClick={() => onLike(post.id, hasLiked)}
          >
            ❤️ {post.likes?.length || 0}
          </Button>

          {user.uid === post.uid && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(post.id)}
            >
              🗑️ Delete
            </Button>
          )}
        </div>

        {/* Anonymous Comments */}
        <AnonymousCommentSection postId={post.id} user={user} />
      </CardContent>
    </Card>
  );
}
