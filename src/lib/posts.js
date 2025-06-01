// lib/posts.js
import { db } from "@/lib/firebase"
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp } from "firebase/firestore"

export async function createPost({ title, content, category, user }) {
  const postData = {
    title,
    content,
    category,
    uid: user.uid,
    displayName: user.fullName || user.email,
    authorImage: user.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName || "User")}&background=random`,
    timestamp: serverTimestamp(),
    likes: [],
  }

  const docRef = await addDoc(collection(db, "posts"), postData)
  return { success: true, id: docRef.id }
}

export async function getAllPosts() {
  const q = query(collection(db, "posts"), orderBy("timestamp", "desc"))
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}
