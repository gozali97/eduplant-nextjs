"use client";

import { HomePageData, AppInfo } from "@/types";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { BookOpen, Puzzle, User, Book, ArrowRight } from "lucide-react";
import Image from "next/image";

interface HomePageContentProps {
  data: HomePageData;
  appInfo: AppInfo;
}

const iconMap: Record<string, any> = {
  user: User,
  book: BookOpen,
  puzzle: Puzzle,
  list: Book,
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function HomePageContent({ data, appInfo }: HomePageContentProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 min-h-[calc(100vh-4rem)]">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Column: Hero Content */}
        <motion.div
          className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 order-2 lg:order-1"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-2">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-primary drop-shadow-sm">
              {appInfo.title}
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-muted-foreground">
              {appInfo.subtitle}
            </h2>
          </div>

          <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
            {appInfo.description}
          </p>

          {/* Navigation Grid */}
          <motion.div
            className="grid grid-cols-2 gap-4 w-full max-w-md mt-8"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {data.navigation.map((navItem) => {
              const Icon = iconMap[navItem.icon] || BookOpen;
              return (
                <motion.div key={navItem.id} variants={item}>
                  <Link href={navItem.path} className="block h-full">
                    <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-primary/20 bg-white/50 dark:bg-black/20 backdrop-blur-sm group cursor-pointer">
                      <CardContent className="flex flex-col items-center justify-center p-6 h-full gap-3">
                        <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                          <Icon className="w-8 h-8" />
                        </div>
                        <span className="font-bold text-lg group-hover:text-primary transition-colors">
                          {navItem.label}
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Right Column: Hero Image */}
        <motion.div
          className="flex justify-center items-center order-1 lg:order-2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative w-full max-w-[500px] aspect-square">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-full blur-3xl animate-pulse-slow" />
            <Image
              src={data.image}
              alt="Hero Illustration"
              fill
              className="object-contain relative z-10 drop-shadow-2xl hover:scale-105 transition-transform duration-500"
              priority
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
