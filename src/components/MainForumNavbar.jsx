"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  Laptop,
  Cpu,
  Server,
  Book,
  Microscope,
  Settings,
  Briefcase,
  Calculator,
  Atom,
  BookOpen,
  EyeOff,
} from "lucide-react"; // added EyeOff icon

export default function MainForumNavbar({ selectedCategory, setSelectedCategory }) {
  const studyGroups = [
    { name: "Software", icon: <Laptop size={16} className="mr-2" /> },
    { name: "Electrical", icon: <Cpu size={16} className="mr-2" /> },
    { name: "Information Systems", icon: <Server size={16} className="mr-2" /> },
    { name: "Civil Engineering", icon: <Book size={16} className="mr-2" /> },
    { name: "Biotechnology", icon: <Microscope size={16} className="mr-2" /> },
    { name: "Mechanical Engineering", icon: <Settings size={16} className="mr-2" /> },
    { name: "Industry and Management", icon: <Briefcase size={16} className="mr-2" /> },
    { name: "Mathematics", icon: <Calculator size={16} className="mr-2" /> },
    { name: "Physics", icon: <Atom size={16} className="mr-2" /> },
    { name: "English Studies", icon: <BookOpen size={16} className="mr-2" /> },
  ];

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const isStudyGroupSelected = studyGroups.some(
    (group) => group.name === selectedCategory
  );

  return (
    <div className="p-4 pt-5 pb-5 shadow-sm sticky top-20 z-30 bg-background border rounded-lg mb-4">
      <div className="flex flex-wrap gap-3 overflow-x-auto min-h-[48px] items-center">
        {/* Main Forum */}
        <Button
          variant="ghost"
          onClick={() => handleSelectCategory("All")}
          className={`relative flex items-center gap-1 text-sm px-4 py-2 transition-all duration-200 ${
            selectedCategory === "All"
              ? "text-blue-600 font-semibold"
              : "text-muted-foreground"
          }`}
        >
          Main Forum
          {selectedCategory === "All" && (
            <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-blue-600 rounded-full" />
          )}
        </Button>

        {/* Study Groups Dropdown */}
        <DropdownMenu onOpenChange={setIsDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={`relative flex items-center gap-1 text-sm px-4 py-2 transition-all duration-200 ${
                isStudyGroupSelected
                  ? "text-blue-600 font-semibold"
                  : "text-muted-foreground"
              }`}
            >
              Study Groups
              <ChevronDown
                size={16}
                className={`ml-1 transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
              {isStudyGroupSelected && (
                <span className="text-xs font-normal text-blue-600 ml-2">
                  ({selectedCategory})
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {studyGroups.map((group) => (
              <DropdownMenuItem
                key={group.name}
                asChild
                className={`flex items-center ${
                  selectedCategory === group.name
                    ? "bg-blue-100 dark:bg-blue-800 text-blue-600"
                    : ""
                }`}
              >
                <button
                  className="w-full text-left flex items-center"
                  onClick={() => handleSelectCategory(group.name)}
                >
                  {group.icon}
                  {group.name}
                </button>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Anonymous Button */}
        <Button
          variant="ghost"
          onClick={() => handleSelectCategory("Anonymous")}
          className={`relative flex items-center gap-1 text-sm px-4 py-2 transition-all duration-200 ${
            selectedCategory === "Anonymous"
              ? "text-blue-600 font-semibold"
              : "text-muted-foreground"
          }`}
        >
          <EyeOff size={16} className="mr-2" />
          Anonymous
          {selectedCategory === "Anonymous" && (
            <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-blue-600 rounded-full" />
          )}
        </Button>
      </div>
    </div>
  );
}
