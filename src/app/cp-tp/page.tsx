import { getCompetenciesData } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, BookOpen } from "lucide-react";
import Image from "next/image";

export default function CpTpPage() {
  const data = getCompetenciesData();

  return (
    <div className="min-h-[calc(100vh-4rem)] p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 space-y-4">
          {/* <div className="inline-flex items-center justify-center p-3 rounded-full bg-primary/10 text-primary mb-4">
            <Target className="h-8 w-8" />
          </div> */}
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">
            {data.title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Capaian dan Tujuan Pembelajaran untuk Materi Bagian-Bagian Tumbuhan
          </p>
        </div>

        {/* Content Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {data.items.map((item, index) => (
            <Card
              key={item.id}
              className="overflow-hidden border border-primary/10 shadow-xl bg-white/85 dark:bg-card/85 backdrop-blur-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Content Section */}
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-bold">
                    {index + 1}
                  </div>
                  {item.title}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-lg leading-relaxed text-foreground/90 whitespace-pre-line">
                    {item.content}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info Section */}
        {/* <div className="mt-12 text-center">
          <Card className="inline-block border border-primary/10 bg-white/85 dark:bg-card/85 backdrop-blur-xl shadow-lg">
            <CardContent className="flex items-center gap-4 p-6">
              <BookOpen className="h-6 w-6 text-primary" />
              <div className="text-left">
                <p className="font-semibold text-foreground">
                  Media Pembelajaran Interaktif
                </p>
                <p className="text-sm text-muted-foreground">
                  Kelas 4 SD - Kurikulum Merdeka
                </p>
              </div>
            </CardContent>
          </Card>
        </div> */}
      </div>
    </div>
  );
}
