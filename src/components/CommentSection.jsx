"use client";

import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  deleteDoc,
  doc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function CommentSection({ postId, user }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "posts", postId, "comments"),
      orderBy("timestamp", "asc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setComments(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, [postId]);

  const toggleLikeComment = async (commentId, hasLiked) => {
    const commentRef = doc(db, "posts", postId, "comments", commentId);
    try {
      await updateDoc(commentRef, {
        likes: hasLiked ? arrayRemove(user.uid) : arrayUnion(user.uid),
      });
    } catch (err) {
      console.error("Error toggling comment like:", err);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    await addDoc(collection(db, "posts", postId, "comments"), {
      uid: user.uid,
      displayName: user.fullName || user.email,
      content: comment,
      timestamp: new Date(),
    });

    setComment("");
  };

  const deleteComment = async (commentId) => {
    const confirm = window.confirm("Are you sure you want to delete this comment?");
    if (!confirm) return;

    try {
      await deleteDoc(doc(db, "posts", postId, "comments", commentId));
    } catch (err) {
      console.error("Error deleting comment:", err);
    }
  };

  return (
    <div className="mt-4 border-t pt-2">
      <form onSubmit={handleComment} className="flex gap-2 mb-2">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a comment"
          className="flex-1 p-2 border rounded bg-white text-black dark:bg-gray-900 dark:text-white"
        />
        <button
          type="submit"
          className="btn bg-blue-500 text-white text-sm px-2 py-1 rounded hover:bg-blue-600 transition"
        >
          Add Comment
        </button>
      </form>

      <div className="space-y-1">
        {comments.map((c) => (
          <div
            key={c.id}
            className="text-sm border rounded p-2 bg-gray-50 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
          >
            <div>
              <strong>{c.displayName}:</strong> {c.content}
              <div className="text-xs text-gray-400 mt-1">
                {c.timestamp?.toDate
                  ? c.timestamp.toDate().toLocaleString()
                  : "just now"}
              </div>
            </div>

            <div className="mt-1 flex gap-2 items-center">
              <button
                className={`btn text-xs px-2 py-0.5 rounded transition ${
                  c.likes?.includes(user.uid)
                    ? "bg-pink-100 text-pink-700 dark:bg-pink-400 dark:text-white"
                    : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-white"
                }`}
                onClick={() =>
                  toggleLikeComment(c.id, c.likes?.includes(user.uid))
                }
              >
                ❤️ {c.likes?.length || 0}
              </button>

              {user.uid === c.uid && (
                <button
                  onClick={() => deleteComment(c.id)}
                  className=" btn text-xs text-red-600 "
                >
                  🗑️ Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
