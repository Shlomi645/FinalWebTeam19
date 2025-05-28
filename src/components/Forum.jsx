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
  getDocs,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import CommentSection from "@/components/CommentSection";
import { useTheme } from "next-themes";

export default function Forum() {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { theme } = useTheme();

        useEffect(() => {
        if (!user?.uid) return; // הוסף תנאי בטיחות

        const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
        const unsubscribe = onSnapshot(q, async (snapshot) => {
            const postsData = await Promise.all(
            snapshot.docs.map(async (docSnap) => {
                const post = { id: docSnap.id, ...docSnap.data() };

                // בדוק אם המשתמש הנוכחי הגיב לפוסט
                const commentsSnap = await getDocs(collection(db, "posts", docSnap.id, "comments"));
                const hasCommented = commentsSnap.docs.some((comment) => comment.data().uid === user.uid);
                return { ...post, hasCommented };
            })
            );
            setPosts(postsData);
        });

        return () => unsubscribe();
        }, [user?.uid]); // בטוח יותר – לא יתפוצץ אם user עוד לא קיים



  const toggleLike = async (postId, hasLiked) => {
    const postRef = doc(db, "posts", postId);
    try {
      await updateDoc(postRef, {
        likes: hasLiked ? arrayRemove(user.uid) : arrayUnion(user.uid),
      });
    } catch (err) {
      console.error("Failed to update like:", err);
    }
  };

  const deletePost = async (postId) => {
    const confirm = window.confirm("Are you sure you want to delete this post?");
    if (!confirm) return;
    try {
      const commentsRef = collection(db, "posts", postId, "comments");
      const commentsSnap = await getDocs(commentsRef);
      const deletePromises = commentsSnap.docs.map((docSnap) => deleteDoc(docSnap.ref));
      await Promise.all(deletePromises);
      await deleteDoc(doc(db, "posts", postId));
    } catch (err) {
      console.error("Failed to delete post and comments:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content || !category) return;
    try {
      await addDoc(collection(db, "posts"), {
        uid: user.uid,
        displayName: user.fullName || user.email,
        title,
        content,
        category,
        timestamp: new Date(),
      });
      setTitle("");
      setContent("");
      setCategory("");
    } catch (err) {
      console.error("Error adding post:", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-3xl font-extrabold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
        <span className="text-4xl">📢</span> NorthStory Forum
      </h2>

      {/* Category filter buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {["All", "Software", "Electrical", "Information Systems", "Civil Engineering"].map((cat) => (
          <button
            key={cat}
      className={`btn2 ${selectedCategory === cat ? "btn2-active" : ""}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mb-6 space-y-2">
        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 border rounded "
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Write your post..."
          className="w-full p-2 border rounded h-24"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <select
          className="w-full p-2 border rounded bg-white text-black dark:bg-gray-900 dark:text-white"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select a category</option>
          <option value="Software">Software</option>
          <option value="Electrical">Electrical</option>
          <option value="Information Systems">Information Systems</option>
          <option value="Civil Engineering">Civil Engineering</option>
        </select>
        <button type="submit" className="btn bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
          Post
        </button>
      </form>

      {/* Posts display */}
      <div className="space-y-4">
        {posts
          .filter((post) => selectedCategory === "All" || post.category === selectedCategory)
          .map((post) => {
            const userIsOwner = user.uid === post.uid;
            const userHasCommented = post.comments?.some((c) => c.uid === user.uid);

            return (
              <div key={post.id} className="border p-3 rounded shadow">
                <h3 className="font-semibold">{post.title}</h3>
                <p>{post.content}</p>
                <p className="text-sm text-gray-500">
                  Posted by {post.displayName} · {post.timestamp?.toDate ? post.timestamp.toDate().toLocaleString() : "just now"}
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <button
                    className={`btn text-sm px-2 py-1 rounded transition cursor-pointer ${
                      post.likes?.includes(user.uid)
                        ? theme === "dark"
                          ? "bg-red-400 text-white"
                          : "bg-red-200 text-red-700"
                        : theme === "dark"
                        ? "bg-gray-700 text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                    onClick={() => toggleLike(post.id, post.likes?.includes(user.uid))}
                  >
                    ❤️ {post.likes?.length || 0}
                  </button>

                 {(user.uid === post.uid || post.hasCommented) && (
                <button onClick={() => deletePost(post.id)} className="btn text-xs text-red-600 ml-2">
                    🗑️ Delete
                </button>
                )}

                </div>
                <CommentSection postId={post.id} user={user} />
              </div>
            );
          })}
      </div>
    </div>
  );
}
