import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getAllChallenges, getChallengeBySlug } from "@/lib/challenges";

type ChallengePageProps = {
  params: Promise<{
    category: string;
    slug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllChallenges().map((challenge) => ({
    category: challenge.category,
    slug: challenge.slug,
  }));
}

export async function generateMetadata({
  params,
}: ChallengePageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const challenge = getChallengeBySlug(category, slug);

  if (!challenge) {
    return {
      title: "Challenge not found",
    };
  }

  return {
    title: `${challenge.title} | Frontend Challenges for Humans`,
  };
}

export default async function ChallengePage({ params }: ChallengePageProps) {
  const { category, slug } = await params;
  const challenge = getChallengeBySlug(category, slug);

  if (!challenge) {
    notFound();
  }

  return (
    <main className="page-shell">
      <p>
        <Link href="/">Back to challenges</Link>
      </p>

      <article className="challenge-document">
        <header>
          <p className="challenge-badge">{challenge.category}</p>
          <h1>{challenge.title}</h1>
          <p className="challenge-level">Level: {challenge.level}</p>
          {challenge.tags.length > 0 ? (
            <p>{challenge.tags.join(" · ")}</p>
          ) : null}
        </header>

        <div className="markdown-content">
          <Markdown remarkPlugins={[remarkGfm]}>{challenge.content}</Markdown>
        </div>
      </article>
    </main>
  );
}
