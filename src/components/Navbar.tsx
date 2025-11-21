"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Home, User, BookOpen, Puzzle, Menu } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MusicPlayer } from "@/components/MusicPlayer";

const navItems = [
  { label: "Beranda", path: "/", icon: Home },
  { label: "Materi", path: "/materi", icon: BookOpen },
  { label: "Kuis", path: "/quiz", icon: Puzzle },
  { label: "Profil", path: "/profile", icon: User },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-gradient-to-r from-primary/5 via-background to-secondary/5 backdrop-blur-lg supports-[backdrop-filter]:bg-gradient-to-r supports-[backdrop-filter]:from-primary/5 supports-[backdrop-filter]:via-background/60 supports-[backdrop-filter]:to-secondary/5 shadow-sm">
      <div className="w-full px-4 md:px-6">
        {/* Mobile Layout - Flex */}
        <div className="flex md:hidden h-16 items-center justify-between gap-2">
          {/* Logo - Mobile */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
              <BookOpen className="h-4 w-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                BioEdu
              </span>
            </div>
          </Link>

          {/* Music Player & Mobile Menu */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-full bg-primary/10 border border-primary/20">
              <MusicPlayer />
            </div>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-lg h-9 w-9"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[320px]">
                <div className="flex flex-col gap-6 mt-8">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      BioEdu
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      Media Pembelajaran
                    </p>
                  </div>

                  <nav className="flex flex-col gap-2">
                    {navItems.map((item) => {
                      const isActive = pathname === item.path;
                      return (
                        <Link
                          key={item.path}
                          href={item.path}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300",
                            isActive
                              ? "bg-primary text-primary-foreground shadow-md"
                              : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
                          )}
                        >
                          <div
                            className={cn(
                              "p-2 rounded-lg transition-all",
                              isActive ? "bg-white/20" : "bg-muted"
                            )}
                          >
                            <item.icon className="h-5 w-5" />
                          </div>
                          {item.label}
                        </Link>
                      );
                    })}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Desktop Layout - Grid */}
        <div className="hidden md:grid h-16 grid-cols-[1fr_auto_1fr] items-center gap-4">
          {/* Logo - Desktop */}
          <div className="flex items-center justify-start">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
                <BookOpen className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  BioEdu
                </span>
                <span className="text-[10px] text-muted-foreground -mt-1 hidden sm:block">
                  Media Pembelajaran
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation - Center */}
          <nav className="flex items-center justify-center gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Music Player - Desktop */}
          <div className="flex items-center justify-end">
            <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-primary/10 border border-primary/20">
              <span className="text-xs font-medium text-primary hidden lg:block">
                Music
              </span>
              <MusicPlayer />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
