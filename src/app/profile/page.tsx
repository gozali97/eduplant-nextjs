import { getProfileData } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Github, Mail, MapPin } from "lucide-react";

export default function ProfilePage() {
  const data = getProfileData();

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 md:p-8 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <Card className="w-full max-w-4xl overflow-hidden border-none shadow-2xl bg-white/80 dark:bg-card/80 backdrop-blur-xl">
        <div className="grid md:grid-cols-3 min-h-[400px]">
          {/* Sidebar / Image Section */}
          <div className="bg-gradient-to-b from-primary/10 to-primary/5 p-8 flex flex-col items-center text-center border-r border-border/50">
            <div className="relative mb-6 group">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500" />
              <Avatar className="h-40 w-40 border-4 border-background shadow-xl relative z-10">
                <AvatarImage
                  src={data.image}
                  alt={data.content.name}
                  className="object-cover"
                />
                <AvatarFallback className="text-4xl font-bold bg-primary text-primary-foreground">
                  {data.content.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>

            <h2 className="text-2xl font-bold mb-1">{data.content.name}</h2>
            <p className="text-primary font-medium mb-4">{data.content.role}</p>

            <div className="flex gap-3 mt-auto">
              <div className="p-2 rounded-full bg-background shadow-sm hover:scale-110 transition-transform cursor-pointer text-muted-foreground hover:text-primary">
                <Github className="h-5 w-5" />
              </div>
              <div className="p-2 rounded-full bg-background shadow-sm hover:scale-110 transition-transform cursor-pointer text-muted-foreground hover:text-primary">
                <Mail className="h-5 w-5" />
              </div>
              <div className="p-2 rounded-full bg-background shadow-sm hover:scale-110 transition-transform cursor-pointer text-muted-foreground hover:text-primary">
                <MapPin className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="md:col-span-2 p-8 md:p-12 flex flex-col justify-center">
            <div className="space-y-6">
              <div>
                <Badge variant="secondary" className="mb-4 px-4 py-1 text-sm">
                  Tentang Pengembang
                </Badge>
                <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {data.title}
                </h1>
              </div>

              <div className="prose dark:prose-invert max-w-none">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {data.content.description}
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground mt-4">
                  Aplikasi ini dikembangkan dengan teknologi web modern untuk
                  memberikan pengalaman belajar yang interaktif dan menyenangkan
                  bagi siswa.
                </p>
              </div>

              <div className="pt-6 border-t grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Versi Aplikasi
                  </div>
                  <div className="font-semibold">1.0.0</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Update Terakhir
                  </div>
                  <div className="font-semibold">November 2025</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
