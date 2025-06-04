"use client";

import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
  arrayUnion,
  arrayRemove,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import toast from "react-hot-toast";

export default function AnonymousCommentSection({ postId, user }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const q = collection(db, "posts", postId, "comments");
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const sorted = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .sort((a, b) => a.timestamp?.seconds - b.timestamp?.seconds);
      setComments(sorted);
    });
    return () => unsubscribe();
  }, [postId]);

  const handleComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      toast.error("Please write a comment.");
      return;
    }

    try {
      await addDoc(collection(db, "posts", postId, "comments"), {
        uid: user.uid,
        displayName: "Anonymous User",
        content: comment,
        timestamp: serverTimestamp(),
        likes: [],
      });

      setComment("");
      toast.success("Comment posted!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to post comment.");
    }
  };

  const toggleLikeComment = async (commentId, hasLiked) => {
    const commentRef = doc(db, "posts", postId, "comments", commentId);
    await updateDoc(commentRef, {
      likes: hasLiked ? arrayRemove(user.uid) : arrayUnion(user.uid),
    });
  };

  const deleteComment = async (commentId) => {
    const confirm = window.confirm("Delete this comment?");
    if (!confirm) return;

    try {
      await deleteDoc(doc(db, "posts", postId, "comments", commentId));
      toast.success("Comment deleted.");
    } catch (err) {
      console.error("Error deleting comment:", err);
      toast.error("Failed to delete comment.");
    }
  };

  return (
    <div className="mt-6">
      <form onSubmit={handleComment} className="flex gap-2 mb-4">
        <Input
          type="text"
          placeholder="Write a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button type="submit">Comment</Button>
      </form>

      <div className="space-y-4">
        {comments.map((c) => (
          <div
            key={c.id}
            className="rounded-md border p-3 bg-background shadow-sm text-sm space-y-1"
          >
            <div className="flex items-center gap-3">
              <img
                src="/defaultUserLogo.jpg"
                alt="Anonymous"
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex justify-between">
                  <strong className="text-foreground">Anonymous User</strong>
                  <span className="text-xs text-muted-foreground">
                    {c.timestamp?.toDate
                      ? c.timestamp.toDate().toLocaleString()
                      : "just now"}
                  </span>
                </div>
                <p className="text-foreground">{c.content}</p>
              </div>
            </div>

            <Separator className="my-2" />

            <div className="flex items-center gap-2 text-xs">
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  toggleLikeComment(c.id, c.likes?.includes(user.uid))
                }
              >
                ❤️ {c.likes?.length || 0}
              </Button>

              {user.uid === c.uid && (
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => deleteComment(c.id)}
                >
                  🗑️ Delete
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
