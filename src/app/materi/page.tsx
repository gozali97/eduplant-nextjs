import { getMateriData } from "@/lib/data";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function MateriPage() {
  const data = getMateriData();

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4 py-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary tracking-tight">
            {data.title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {data.subtitle}
          </p>
        </div>

        {/* Introduction Card */}
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
            </div>
          </div>
        </div>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.topics.map((topic, index) => (
            <Link key={topic.id} href={`/materi/${topic.id}`} className="group">
              <Card className="h-full overflow-hidden border border-primary/10 shadow-md hover:shadow-xl transition-all duration-300 bg-white/85 dark:bg-card/85 backdrop-blur-md hover:-translate-y-2">
                <CardContent className="p-6 flex flex-col h-full relative">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <span className="text-8xl">{topic.icon}</span>
                  </div>

                  <div className="mb-6 p-4 w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-3xl shadow-inner">
                    {topic.icon}
                  </div>

                  <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {topic.title}
                  </h3>

                  <p className="text-muted-foreground mb-6 flex-grow">
                    {topic.summary}
                  </p>

                  <div className="flex items-center text-primary font-semibold group-hover:translate-x-2 transition-transform">
                    Pelajari <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
