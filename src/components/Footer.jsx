export default function Footer() {
  return (
    <footer className="w-full fixed bottom-0 left-0 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm py-3 shadow-inner z-50">
      <div className="max-w-5xl mx-auto text-center relative">
        <p>
          © {new Date().getFullYear()} <span className="font-semibold">NorthStory</span>. All rights reserved.
        </p>
        <div className="mt-1 inline-block">
          Built with ❤ by{" "}
          <span className="relative group font-semibold text-purple-700 dark:text-purple-300 inline-block">
            students
            {/* Tooltip */}
            <div className="pointer-events-none absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 bg-white dark:bg-gray-900 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-700 rounded-md shadow-lg px-4 py-3 text-xs opacity-0 group-hover:opacity-100 transition duration-300 z-50">
              <ul className="space-y-1 text-center">
                <li>Shlomi Zrihan</li>
                <li>Shachar Nahum</li>
                <li>Noy Ben Ezra</li>
                <li>Eitan Zarbel</li>
                <li>Alexander Gruman</li>
                <li>Yovel Katz</li>
              </ul>
            </div>
          </span>
          , for students.
        </div>
      </div>
    </footer>
  );
}