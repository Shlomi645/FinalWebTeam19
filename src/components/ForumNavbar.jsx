"use client";

import { Button } from "@/components/ui/button";

export default function ForumNavbar({ selectedCategory, setSelectedCategory }) {
  const categories = ["All", "Software", "Electrical", "Information Systems", "Civil Engineering"];

  return (
    <div className="p-4 pt-5 pb-5 shadow-sm sticky top-20 z-30 bg-background border rounded-lg mb-4">
      <div className="flex flex-wrap gap-3 overflow-x-auto min-h-[48px] items-center">
        {categories.map((cat) => (
          <Button
            key={cat}
            variant="ghost"
            onClick={() => setSelectedCategory(cat)}
            className={`btn2 relative flex items-center gap-1 text-sm px-4 py-2 transition-all duration-200
              ${selectedCategory === cat ? "text-blue-600 font-semibold" : "text-muted-foreground"}
            `}
          >
            {cat}
            {selectedCategory === cat && (
              <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-blue-600 rounded-full" />
            )}
          </Button>
        ))}
      </div>
    </div>
  );
}
