import { getProfileData } from "@/lib/data";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { Mail, MapPin, Calendar, Briefcase, Heart } from "lucide-react";

export default function ProfilePage() {
  const data = getProfileData();

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 md:p-8 bg-gradient-to-b from-background to-muted/30">
      <Card className="w-full max-w-4xl overflow-hidden border-none shadow-2xl bg-white/80 dark:bg-card/80 backdrop-blur-xl">
        {/* Header with Image */}
        <CardHeader className="p-0">
          <div className="flex items-center justify-center">
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              {data.title}
            </h1>
          </div>
        </CardHeader>

        {/* Content Section */}
        <CardContent className="p-4">
          <div className="space-y-2 text-center">
            {/* Name - Large Display */}
            <div className="mb-6">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                {data.content.name}
              </h2>
            </div>

            {/* Info Cards Grid */}
            <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {/* Birth Info */}
              <div className="p-4 rounded-xl bg-muted/30 border border-border/50 hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground mb-1">
                  Tempat, Tanggal Lahir
                </p>
                <p className="font-semibold">
                  {data.content.birthPlace}, {data.content.birthDate}
                </p>
              </div>

              {/* Email */}
              <div className="p-4 rounded-xl bg-muted/30 border border-border/50 hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground mb-1">Email</p>
                <p className="font-semibold break-all">{data.content.email}</p>
              </div>

              {/* Profession */}
              <div className="p-4 rounded-xl bg-muted/30 border border-border/50 hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Briefcase className="h-5 w-5 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground mb-1">Profesi</p>
                <p className="font-semibold text-lg">
                  {data.content.profession}
                </p>
              </div>

              {/* Hobbies */}
              <div className="p-4 rounded-xl bg-muted/30 border border-border/50 hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Heart className="h-5 w-5 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground mb-1">Hobi</p>
                <p className="font-semibold">{data.content.hobbies}</p>
              </div>
            </div>

            {/* Description */}
            <div className="pt-6 border-t">
              <p className="text-lg leading-relaxed text-muted-foreground max-w-3xl mx-auto">
                {data.content.description}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
