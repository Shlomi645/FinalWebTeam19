import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "NorthStory",
  description: "Social platform for students",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <Navbar />
            <Toaster
              position="top-center"
              toastOptions={{
                duration: 3000,
                style: {
                  background: "#fff",
                  color: "#333",
                  borderRadius: "8px",
                  padding: "12px 16px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                },
              }}
            />
            <main className="py-8">
              <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="hidden lg:block lg:col-span-3">
                    <Sidebar />
                  </div>
                  <div className="lg:col-span-9">{children}</div>
                </div>
              </div>
            </main>

       <Footer></Footer>
            
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
