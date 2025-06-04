"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import toast from "react-hot-toast";
import Picker from '@emoji-mart/react'; // ✅ Correct import

export default function CreatePost({ onSubmit, user, selectedCategory }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiSelect = (emoji) => {
    setContent((prev) => prev + emoji.native);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return toast.error("Please enter a title.");
    if (!content.trim()) return toast.error("Please enter post content.");

    try {
      await onSubmit({
        title,
        content,
        category: selectedCategory, // Use the selectedCategory prop
        user,
      });
      toast.success("Post published successfully!");
      setTitle("");
      setContent("");
      setShowEmojiPicker(false);
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
          <Input
            placeholder="Post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="Write something for your fellow students..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          {/* Emoji picker toggle (desktop only) */}
          <div className="hidden md:block">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="mb-2"
            >
              😊 Add Emoji
            </Button>
            {showEmojiPicker && (
              <div className="absolute z-50 bg-background border rounded p-2">
                <Picker onEmojiSelect={handleEmojiSelect} />
              </div>
            )}
          </div>
          <Button type="submit" className="w-full">
            Post
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
