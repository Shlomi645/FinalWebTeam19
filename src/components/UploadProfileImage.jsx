"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { auth, db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function UploadProfileImage({ open, onClose, onUpload }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const uploadToCloudinary = async () => {
    if (!file) return toast.error("Please select a file.");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

    setUploading(true);
    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
        formData
      );
      const imageUrl = res.data.secure_url;

      // שמור ב־Firestore
      const currentUser = auth.currentUser;
      const userRef = doc(db, "users", currentUser.uid);
      await updateDoc(userRef, { image: imageUrl });

      toast.success("Profile picture updated!");
      onUpload(imageUrl);
      onClose();
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Profile Picture</DialogTitle>
        </DialogHeader>

        <Input type="file" accept="image/*" onChange={handleFileChange} />
        <Button
          onClick={uploadToCloudinary}
          disabled={uploading}
          className="mt-4 w-full"
        >
          {uploading ? "Uploading..." : "Upload"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
