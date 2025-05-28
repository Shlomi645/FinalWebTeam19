"use client";

import { useEffect, useState } from "react";
import { getAllPosts } from "@/lib/posts";
//import CreatePost from "@/components/CreatePost";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { HeartIcon, MessageCircleIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function Home(){
  <div></div>
}
// export default function Home() {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchPosts = async () => {
//     const data = await getAllPosts();
//     setPosts(data);
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   return (
//     <div className="max-w-2xl mx-auto mt-8 space-y-6">
//       <CreatePost onPostCreated={fetchPosts} />

//       {loading ? (
//         <p className="text-center">Loading posts...</p>
//       ) : posts.length === 0 ? (
//         <p className="text-center text-muted-foreground">No posts yet.</p>
//       ) : (
//         posts.map((post) => (
//           <Card key={post.id}>
//             <CardContent className="pt-4 pb-6">
//               <div className="flex items-center space-x-3 mb-4">
//                 <Avatar>
//                   <AvatarImage src={post.author?.photoURL || "/defaultUserLogo.jpg"} />
//                 </Avatar>
//                 <div>
//                   <p className="font-medium">{post.author?.fullName || "User"}</p>
//                   <p className="text-sm text-muted-foreground">{new Date(post.createdAt).toLocaleString()}</p>
//                 </div>
//               </div>
//               <p className="mb-3">{post.content}</p>
//               {post.image && (
//                 <img src={post.image} alt="Post" className="w-full rounded-lg border mb-4" />
//               )}
//               <Separator />
//               <div className="flex gap-6 mt-4 text-sm text-muted-foreground">
//                 <div className="flex items-center gap-1 cursor-pointer">
//                   <HeartIcon className="w-4 h-4" />
//                   <span>{post.likes || 0}</span>
//                 </div>
//                 <div className="flex items-center gap-1 cursor-pointer">
//                   <MessageCircleIcon className="w-4 h-4" />
//                   <span>{post.comments?.length || 0}</span>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         ))
//       )}
//     </div>
//   );
// }
