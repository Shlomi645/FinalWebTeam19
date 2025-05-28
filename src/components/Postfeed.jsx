"use client"

import { useEffect, useState } from "react"
import { getAllPosts } from "@/lib/posts"
import { Card, CardContent } from "./ui/card"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Separator } from "./ui/separator"

export default function PostFeed() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getAllPosts()
        setPosts(data)
      } catch (error) {
        console.error("Error loading posts:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (loading) return <p className="text-center mt-10">Loading posts...</p>

  return (
    <div className="space-y-6">
      {posts.map(post => (
        <Card key={post.id}>
          <CardContent className="pt-6">
            <div className="flex items-start space-x-4">
              <Avatar>
                <AvatarImage src={post.authorImage || "/defaultUserLogo.jpg"} />
              </Avatar>
              <div>
                <h4 className="font-semibold">{post.authorName}</h4>
                <p className="text-sm text-muted-foreground mb-2">{new Date(post.createdAt?.seconds * 1000).toLocaleString()}</p>
                <p className="mb-2">{post.content}</p>
                {post.image && <img src={post.image} alt="post" className="rounded-lg max-w-full mt-2" />}
              </div>
            </div>
            <Separator className="my-4" />
            {/* Like/Comment buttons placeholder */}
            <div className="text-sm text-muted-foreground">💬 0 Comments • ❤️ {post.likes?.length || 0} Likes</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
