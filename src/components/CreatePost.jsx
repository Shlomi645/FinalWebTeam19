"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import toast from "react-hot-toast";

export default function CreatePost({ onSubmit, user }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!title.trim()) return toast.error("Please enter a title.");
  if (!content.trim()) return toast.error("Please enter post content.");
  if (!category) return toast.error("Please select a category.");

  try {
    await onSubmit({
      title,
      content,
      category,
      user, // ✅ pass the whole user object
    });
    toast.success("Post published successfully!");
    setTitle("");
    setContent("");
    setCategory("");
  } catch (error) {
    toast.error("Failed to publish post.");
    console.error(error);
  }
};

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create a Post</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input placeholder="Post title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Textarea placeholder="Write something for your fellow students..." value={content} onChange={(e) => setContent(e.target.value)} />
          <select
            className="w-full p-2 border rounded bg-white text-black dark:bg-gray-900 dark:text-white"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select category</option>
            <option value="Software">Software</option>
            <option value="Electrical">Electrical</option>
            <option value="Information Systems">Information Systems</option>
            <option value="Civil Engineering">Civil Engineering</option>
          </select>
          <Button type="submit" className="w-full">
            Post
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
