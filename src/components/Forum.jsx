"use client";

import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
  serverTimestamp,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";

import MainForumNavbar from "@/components/MainForumNavbar";
import CreatePost from "@/components/CreatePost";
import Post from "@/components/Post";
import AnonymousForum from "@/components/AnonymousForum";
import toast from "react-hot-toast";

export default function Forum() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const postsData = await Promise.all(
        snapshot.docs.map(async (docSnap) => {
          const post = { id: docSnap.id, ...docSnap.data() };
          let hasCommented = false;
          try {
            const commentsSnap = await getDocs(
              collection(db, "posts", docSnap.id, "comments")
            );
            hasCommented = commentsSnap.docs.some(
              (comment) => comment.data().uid === user.uid
            );
          } catch (error) {
            console.error("Error fetching comments:", error);
          }
          return { ...post, hasCommented };
        })
      );
      setPosts(postsData);
    });

    return () => unsubscribe();
  }, [user]);

  const handleCreatePost = async ({ title, content, category, imageUrl }) => {
    await addDoc(collection(db, "posts"), {
      uid: user.uid,
      displayName: user.fullName || user.email,
      authorImage:
        user.image ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(
          user.fullName || "User"
        )}&background=random`,
      title,
      content,
      category,
      imageUrl: imageUrl || null,
      timestamp: serverTimestamp(),
      likes: [],
    });
  };

  const handleToggleLike = async (postId, hasLiked) => {
    const postRef = doc(db, "posts", postId);
    await updateDoc(postRef, {
      likes: hasLiked ? arrayRemove(user.uid) : arrayUnion(user.uid),
    });
  };

  const handleDeletePost = async (postId) => {
    const confirm = window.confirm("Are you sure you want to delete this post?");
    if (!confirm) return;

    const postRef = doc(db, "posts", postId);
    const postSnap = await getDoc(postRef);
    const postData = postSnap.data();

    // 🧼 Delete image from Cloudinary if it exists
    if (postData?.imageUrl) {
      try {
        const publicId = postData.imageUrl
          .split("/")
          .pop()
          .split(".")[0]; // extract image public ID

        await fetch("/api/delete-image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ publicId }),
        });
      } catch (error) {
        console.error("Image deletion failed:", error);
      }
    }

    // 🗑️ Delete comments
    const commentsRef = collection(db, "posts", postId, "comments");
    const commentsSnap = await getDocs(commentsRef);
    const deletePromises = commentsSnap.docs.map((docSnap) =>
      deleteDoc(docSnap.ref)
    );
    await Promise.all(deletePromises);

    // Delete the post itself
    await deleteDoc(postRef);
    toast.success("Post deleted successfully!");
  };

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto p-4 text-center">
        <p className="text-lg text-muted-foreground">
          Please log in to view and create posts.
        </p>
      </div>
    );
  }

  if (selectedCategory === "Anonymous") {
    return (
      <div className="max-w-3xl mx-auto p-6 space-y-6">
        <MainForumNavbar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <AnonymousForum />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <MainForumNavbar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <CreatePost
        onSubmit={handleCreatePost}
        user={user}
        selectedCategory={selectedCategory === "All" ? "Main" : selectedCategory}
      />
      {posts
        .filter((post) =>
          selectedCategory === "All"
            ? post.category === "Main"
            : post.category === selectedCategory
        )
        .map((post) => (
          <Post
            key={post.id}
            post={post}
            user={user}
            onLike={handleToggleLike}
            onDelete={handleDeletePost}
          />
        ))}
    </div>
  );
}
