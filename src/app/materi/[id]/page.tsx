import { getTopic, getMateriData } from "@/lib/data";
import { TopicViewer } from "@/components/TopicViewer";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const data = getMateriData();
  return data.topics.map((topic) => ({
    id: topic.id,
  }));
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const topic = getTopic(id);

  if (!topic) {
    notFound();
  }

  return <TopicViewer topic={topic} />;
}
