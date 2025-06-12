"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import toast from "react-hot-toast";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import axios from "axios";

export default function CreatePost({ onSubmit, user, selectedCategory }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUploading, setImageUploading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiSelect = (emoji) => {
    setContent((prev) => prev + emoji.native);
  };

  const handleImageUpload = async (file) => {
    const maxSize = 5 * 1024 * 1024;
    if (!file.type.startsWith("image/")) return toast.error("Only image files allowed.");
    if (file.size > maxSize) return toast.error("Max size is 5MB.");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET_POSTS);

    setImageUploading(true);
    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );
      setUploadedImageUrl(res.data.secure_url);
      toast.success("Image uploaded!");
    } catch (err) {
      toast.error("Image upload failed.");
      console.error(err);
    } finally {
      setImageUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return toast.error("Enter a title.");
    if (!content.trim()) return toast.error("Enter content.");

    try {
      await onSubmit({
        title,
        content,
        category: selectedCategory,
        imageUrl: uploadedImageUrl || null,
        user,
      });
      toast.success("Post published!");
      setTitle("");
      setContent("");
      setUploadedImageUrl(null);
      setShowEmojiPicker(false);
    } catch (err) {
      toast.error("Failed to publish post.");
      console.error(err);
    }
  };

  return (
    <Card>
      <CardHeader><CardTitle>Create a Post</CardTitle></CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input placeholder="Post title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <div className="relative">
  <Textarea
    placeholder="Write something inspiring..."
    value={content}
    onChange={(e) => setContent(e.target.value)}
  />

  {/* Emoji picker visible only on desktop */}
  <div className="hidden md:block absolute bottom-2 right-2">
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className="text-lg"
      onClick={() => setShowEmojiPicker((prev) => !prev)}
    >
      😊
    </Button>
    {showEmojiPicker && (
      <div className="absolute z-50 right-0 bottom-10">
        <Picker data={data} onEmojiSelect={handleEmojiSelect} />
      </div>
    )}
  </div>
</div>


          <div
            className="border-2 border-dashed p-4 rounded cursor-pointer text-sm text-muted-foreground"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const file = e.dataTransfer.files[0];
              if (file) handleImageUpload(file);
            }}
            onClick={() => document.getElementById("imageInput").click()}
          >
            Drag & drop or click to upload image
            <input
              id="imageInput"
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => handleImageUpload(e.target.files[0])}
            />
          </div>

          {imageUploading && <p className="text-blue-500 text-sm">Uploading...</p>}
          {uploadedImageUrl && (
            <div className="relative">
              <img src={uploadedImageUrl} className="max-h-64 w-full object-contain rounded" />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
                onClick={() => setUploadedImageUrl(null)}
              >
                ❌
              </Button>
            </div>
          )}

          <Button type="submit" className="w-full">Post</Button>
        </form>
      </CardContent>
    </Card>
  );
}
