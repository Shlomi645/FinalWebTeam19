// app/api/upload/route.js (App Router)
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("file");

  if (!file) {
    return new Response("No file uploaded", { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  try {
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ folder: "profile_pictures" }, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }).end(buffer);
    });

    return Response.json({ url: result.secure_url });
  } catch (err) {
    console.error("Upload error:", err);
    return new Response("Upload failed", { status: 500 });
  }
}
