import { getReferencesData } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, Link as LinkIcon, ExternalLink } from "lucide-react";
import Image from "next/image";

export default function ReferencesPage() {
  const data = getReferencesData();

  return (
    <div className="min-h-[calc(100vh-4rem)] p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-primary/10 text-primary mb-4">
            <Book className="h-8 w-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">
            {data.title}
          </h1>
          <p className="text-xl text-muted-foreground">
            Sumber dan referensi yang digunakan dalam penyusunan materi.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Image Section */}
          <div className="md:col-span-1">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
              <Image
                src={data.image}
                alt="References Cover"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <p className="text-white font-medium">Ilustrasi Pustaka</p>
              </div>
            </div>
          </div>

          {/* List Section */}
          <div className="md:col-span-2">
            <Card className="h-full border border-primary/10 shadow-xl bg-white/85 dark:bg-card/85 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <LinkIcon className="h-6 w-6 text-primary" />
                  Daftar Pustaka
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.items.map((item, index) => (
                    <a
                      key={index}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-4 p-4 rounded-xl bg-background/50 hover:bg-primary/5 border border-transparent hover:border-primary/20 transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform">
                        {index + 1}
                      </div>
                      <div className="flex-grow pt-1">
                        <p className="text-lg text-foreground/80 group-hover:text-primary transition-colors font-medium leading-relaxed">
                          {item.title}
                        </p>
                      </div>
                      <ExternalLink className="h-5 w-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-1" />
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
