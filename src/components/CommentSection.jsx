"use client";

import { useState, useEffect } from "react";
import {
  collection, addDoc, onSnapshot, updateDoc,
  deleteDoc, doc, arrayUnion, arrayRemove, serverTimestamp
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import toast from "react-hot-toast";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

export default function CommentSection({ postId, user }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  useEffect(() => {
    const q = collection(db, "posts", postId, "comments");
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const sorted = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        .sort((a, b) => a.timestamp?.seconds - b.timestamp?.seconds);
      setComments(sorted);
    });
    return () => unsubscribe();
  }, [postId]);

  const handleComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return toast.error("Please write a comment.");

    try {
      await addDoc(collection(db, "posts", postId, "comments"), {
        uid: user.uid,
        displayName: user.fullName || user.email,
        photoURL: user.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName || "User")}&background=random`,
        content: comment,
        timestamp: serverTimestamp(),
        likes: [],
      });
      setComment("");
      toast.success("Comment posted!");
    } catch (err) {
      toast.error("Failed to post comment.");
      console.error(err);
    }
  };

  const toggleLikeComment = async (commentId, hasLiked) => {
    const ref = doc(db, "posts", postId, "comments", commentId);
    await updateDoc(ref, {
      likes: hasLiked ? arrayRemove(user.uid) : arrayUnion(user.uid),
    });
  };

  const deleteComment = async (commentId) => {
    if (!confirm("Delete this comment?")) return;
    try {
      await deleteDoc(doc(db, "posts", postId, "comments", commentId));
      toast.success("Comment deleted!");
    } catch (err) {
      toast.error("Failed to delete comment.");
      console.error(err);
    }
  };

  const handleEmojiSelect = (emoji) => {
    setComment((prev) => prev + emoji.native);
  };

  return (
    <div className="mt-6">
      <form onSubmit={handleComment} className="flex gap-2 mb-4 relative">
        <Input
          type="text"
          placeholder="Write a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        {/* Emoji button shown only on desktop */}
        <div className="hidden md:block relative">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            😊
          </Button>
          {showEmojiPicker && (
            <div className="absolute z-50 top-10 right-0">
              <Picker data={data} onEmojiSelect={handleEmojiSelect} />
            </div>
          )}
        </div>

        <Button type="submit">Comment</Button>
      </form>


      <div className="space-y-4">
        {comments.map((c) => (
          <div key={c.id} className="rounded-md border p-3 shadow-sm text-sm">
            <div className="flex items-center gap-3">
              <Avatar className="w-8 h-8"><AvatarImage src={c.photoURL} /></Avatar>
              <div className="flex-1">
                <div className="flex justify-between">
                  <strong>{c.displayName}</strong>
                  <span className="text-xs text-muted-foreground">
                    {c.timestamp?.toDate ? c.timestamp.toDate().toLocaleString() : "just now"}
                  </span>
                </div>
                <p>{c.content}</p>
              </div>
            </div>
            <Separator className="my-2" />
            <div className="flex items-center gap-2 text-xs">
              <Button
                size="sm"
                variant="outline"
                className={c.likes?.includes(user.uid) ? "bg-pink-100 text-pink-700 dark:bg-pink-400 dark:text-white" : ""}
                onClick={() => toggleLikeComment(c.id, c.likes?.includes(user.uid))}
              >
                ❤️ {c.likes?.length || 0}
              </Button>
              {user.uid === c.uid && (
                <Button size="sm" variant="destructive" onClick={() => deleteComment(c.id)}>🗑️ Delete</Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
