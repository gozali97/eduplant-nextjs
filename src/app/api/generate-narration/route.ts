import { Mistral } from "@mistralai/mistralai";
import { NextRequest, NextResponse } from "next/server";

// Initialize Mistral client with API key from environment
const mistral = new Mistral({
  apiKey: process.env.MISTRAL_API_KEY || "",
});

export async function POST(request: NextRequest) {
  try {
    const { title, content } = await request.json();

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    // Check if API key is configured
    if (!process.env.MISTRAL_API_KEY) {
      return NextResponse.json(
        { error: "Mistral API key is not configured" },
        { status: 500 }
      );
    }

    // Generate narration using Mistral AI
    const result = await mistral.chat.complete({
      model: "mistral-small-latest",
      messages: [
        {
          role: "system",
          content: `Kamu adalah seorang guru Sekolah Dasar yang ramah dan antusias. Tugasmu adalah menjelaskan materi pembelajaran tentang bagian-bagian tumbuhan dengan cara yang menyenangkan, mudah dipahami, dan engaging untuk anak-anak SD. 

Gunakan:
- Bahasa Indonesia yang sederhana dan jelas
- Nada bicara yang ramah dan bersahabat
- Contoh-contoh yang relatable untuk anak-anak
- Analogi sederhana yang mudah diingat
- Kalimat yang tidak terlalu panjang

Hindari:
- Istilah ilmiah yang terlalu rumit
- Kalimat yang bertele-tele
- Penjelasan yang terlalu teoritis

Buatlah narasi penjelasan yang natural seperti guru sedang berbicara langsung ke siswa.`,
        },
        {
          role: "user",
          content: `Buatlah narasi penjelasan yang menarik dan mudah dipahami tentang materi berikut:

Judul: ${title}

Konten:
${content}

Buatlah penjelasan dalam 1-2 paragraf yang natural seperti guru sedang berbicara. Jangan terlalu panjang, fokus pada poin-poin penting yang mudah diingat.`,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    // Extract the generated narration
    const narration =
      result.choices?.[0]?.message?.content || "Materi tidak dapat dibaca.";

    return NextResponse.json({ narration });
  } catch (error) {
    console.error("Error generating narration:", error);
    return NextResponse.json(
      { error: "Failed to generate narration" },
      { status: 500 }
    );
  }
}
