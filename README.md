This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started
before all:
create file inside the !project folder! called ".env.local"
inside there add this following line:
"
CLOUDINARY_URL=cloudinary://542555544516639:SXrYdVOKcuWHeuOB4MYtfNwaC7U@dmp8nvzma
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dmp8nvzma
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=profile_pictures
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET_POSTS=post_images
CLOUDINARY_API_KEY=542555544516639
CLOUDINARY_API_SECRET=SXrYdVOKcuWHeuOB4MYtfNwaC7U
CLOUDINARY_CLOUD_NAME=dmp8nvzma
"

Then install via this commands:
npm install --legacy-peer-deps
npm install firebase --legacy-peer-deps
npm install cloudinary --legacy-peer-deps

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
