"use client";

import { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-hot-toast";

export default function ProfilePage() {
  const { user, setUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) return router.push("/signin");

      const userRef = doc(db, "users", currentUser.uid);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        setUserData(docSnap.data());
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  const handleChange = (field, value) => {
    setUserData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userData.age && (userData.age < 10 || userData.age > 120)) {
      toast.error("Please enter a valid age between 10 and 120.");
      alert("Please enter a valid age between 10 and 120.");
      return;
    }

    try {
      await updateDoc(doc(db, "users", userData.uid), userData);
      setUser(userData); // ✅ Update global state
      alert("Profile updated successfully!");
    } catch (err) {
      alert("Error updating profile: " + err.message);
    }
  };

  if (loading || !userData) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Edit Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" value={userData.fullName} onChange={(e) => handleChange("fullName", e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" value={userData.location} onChange={(e) => handleChange("location", e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input id="website" value={userData.website} onChange={(e) => handleChange("website", e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="faculty">Faculty</Label>
              <Input id="faculty" value={userData.faculty} onChange={(e) => handleChange("faculty", e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="institution">Institution</Label>
              <Input id="institution" value={userData.institution} onChange={(e) => handleChange("institution", e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                min={10}
                max={120}
                value={userData.age || ""}
                onChange={(e) => handleChange("age", parseInt(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={userData.bio || ""}
                onChange={(e) => handleChange("bio", e.target.value)}
              />
            </div>

            <Button type="submit" className="w-full">
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
