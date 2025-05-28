// lib/posts.js

import { db } from "@/lib/firebase"
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp } from "firebase/firestore"

export async function createPost(content, image = "", author) {
  const postData = {
    content,
    image,
    authorId: author.uid,
    authorName: author.fullName,
    authorImage: author.photoURL,
    createdAt: serverTimestamp(),
    likes: [],
    comments: [],
  }

  const docRef = await addDoc(collection(db, "posts"), postData)
  return { success: true, id: docRef.id }
}

export async function getAllPosts() {
  const q = query(collection(db, "posts"), orderBy("createdAt", "desc"))
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}
