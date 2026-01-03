"use client";

import { MateriData } from "@/types";
import { VoiceNarrator } from "@/components/VoiceNarrator";
import Image from "next/image";

interface MateriIntroSectionProps {
  data: MateriData;
}

export function MateriIntroSection({ data }: MateriIntroSectionProps) {
  return (
    <div className="bg-white/75 dark:bg-black/50 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-lg border border-primary/10">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="relative aspect-video md:aspect-auto md:h-[300px] rounded-2xl overflow-hidden shadow-md">
          <Image
            src={data.introduction.image}
            alt={data.introduction.title}
            fill
            className="object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="space-y-4">
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-semibold text-sm">
            Pengantar
          </div>
          <h2 className="text-3xl font-bold">{data.introduction.title}</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {data.introduction.content}
          </p>

          {/* Voice Narrator for Introduction */}
          <div className="pt-4 border-t border-border/30 mt-6">
            <VoiceNarrator
              title={`${data.title} - ${data.introduction.title}`}
              content={data.introduction.content}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
