"use client";

import { HomePageData, AppInfo } from "@/types";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface HomePageContentProps {
  data: HomePageData;
  appInfo: AppInfo;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, scale: 0.5 },
  show: { opacity: 1, scale: 1 },
};

// Button positions around the circle (in degrees and distance from center)
const buttonPositions = [
  { top: "8%", left: "50%", translate: "-50% -50%" }, // Top - Profil
  { top: "18%", right: "-3%", translate: "40% -10%" }, // Top Right - Materi
  { bottom: "18%", right: "-3%", translate: "40% 10%" }, // Bottom Right - Quiz
  { bottom: "2%", left: "50%", translate: "-50% 80%" }, // Bottom - CP & TP
  { bottom: "18%", left: "-3%", translate: "-40% 10%" }, // Bottom Left - Referensi
];

export function HomePageContent({ data, appInfo }: HomePageContentProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 min-h-[calc(100vh-4rem)] overflow-hidden">
      <div className="w-full max-w-7xl">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-6 lg:gap-12 items-center">
          {/* Left Column: Hero Content */}
          <motion.div
            className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-3 lg:space-y-6 order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-2">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-primary drop-shadow-sm leading-tight">
                {appInfo.title}
              </h1>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-muted-foreground">
                {appInfo.subtitle}
              </h2>
            </div>

            <p className="text-base md:text-lg text-muted-foreground max-w-md leading-relaxed">
              {appInfo.description}
            </p>

            {/* Mobile/Tablet Navigation Grid - Hidden on desktop */}
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-lg mt-4 lg:hidden"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {data.navigation.map((navItem) => {
                return (
                  <motion.div key={navItem.id} variants={item}>
                    <Link href={navItem.path} className="block">
                      <div className="relative hover:scale-105 transition-all duration-300 cursor-pointer group">
                        <Image
                          src={navItem.image}
                          alt={navItem.label}
                          width={150}
                          height={150}
                          className="w-full h-auto object-contain drop-shadow-lg group-hover:drop-shadow-2xl transition-all"
                        />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Right Column: Hero Image with Circular Buttons - Desktop only */}
          <motion.div
            className="relative flex justify-center items-center order-1 lg:order-2 min-h-[280px] sm:min-h-[350px] lg:min-h-[650px] py-4 sm:py-6 lg:py-12"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Central Hero Image */}
            <div className="relative w-full max-w-[300px] sm:max-w-[380px] lg:max-w-[420px] aspect-[4/3] z-10">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-2xl blur-3xl animate-pulse-slow" />
              <Image
                src={data.image}
                alt="Hero Illustration"
                fill
                className="object-contain relative z-10 drop-shadow-2xl hover:scale-105 transition-transform duration-500 rounded-lg"
                priority
              />
            </div>

            {/* Circular Button Layout - Desktop only */}
            <motion.div
              className="hidden lg:block absolute inset-0"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {data.navigation.map((navItem, index) => {
                const position = buttonPositions[index] || buttonPositions[0];
                return (
                  <motion.div
                    key={navItem.id}
                    className="absolute"
                    style={{
                      top: position.top,
                      bottom: position.bottom,
                      left: position.left,
                      right: position.right,
                      transform: position.translate,
                    }}
                    variants={item}
                  >
                    <Link href={navItem.path} className="block">
                      <div className="relative hover:scale-110 transition-all duration-300 cursor-pointer group">
                        <Image
                          src={navItem.image}
                          alt={navItem.label}
                          width={140}
                          height={140}
                          className="w-[110px] xl:w-[140px] h-auto object-contain drop-shadow-xl group-hover:drop-shadow-2xl transition-all animate-float"
                          style={{
                            animationDelay: `${index * 0.2}s`,
                          }}
                        />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
