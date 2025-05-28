"use client"

import { useEffect, useState } from "react"
import { collection, getDocs, orderBy, query } from "firebase/firestore"
import { db } from "@/lib/firebase"
import CreatePost from "@/components/CreatePost"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  const [posts, setPosts] = useState([])

  const fetchPosts = async () => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"))
    const querySnapshot = await getDocs(q)
    const postList = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))
    setPosts(postList)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <div className="max-w-3xl mx-auto mt-6 space-y-6">
      <CreatePost onPostCreated={fetchPosts} />

      {posts.length === 0 && (
        <p className="text-center text-muted-foreground">No posts yet. Be the first to post!</p>
      )}

      {posts.map((post) => (
        <Card key={post.id}>
          <CardContent className="pt-4 space-y-2">
            <p>{post.content}</p>
            {post.image && (
              <img
                src={post.image}
                alt="post"
                className="rounded max-h-64 object-cover"
              />
            )}
            <div className="text-sm text-muted-foreground">
              Likes: {post.likes || 0} | Comments: {post.comments || 0}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
