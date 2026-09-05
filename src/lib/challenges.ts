import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type Challenge = {
  id: string;
  title: string;
  level: string;
  tags: string[];
  category: string;
  slug: string;
  content: string;
};

export type ChallengePreview = Omit<Challenge, "content">;

type Frontmatter = {
  id?: string;
  title?: string;
  level?: string;
  tags?: string[];
};

const DATA_DIRECTORY = path.join(process.cwd(), "data");

const sortedDirectoryEntries = (directoryPath: string): fs.Dirent[] => {
  return fs
    .readdirSync(directoryPath, { withFileTypes: true })
    .sort((left, right) => left.name.localeCompare(right.name));
};

export const getAllChallenges = (): Challenge[] => {
  if (!fs.existsSync(DATA_DIRECTORY)) {
    return [];
  }

  const categories = sortedDirectoryEntries(DATA_DIRECTORY).filter((entry) =>
    entry.isDirectory(),
  );

  const challenges: Challenge[] = [];

  for (const categoryEntry of categories) {
    const category = categoryEntry.name;
    const categoryPath = path.join(DATA_DIRECTORY, category);
    const challengeFolders = sortedDirectoryEntries(categoryPath).filter(
      (entry) => entry.isDirectory(),
    );

    for (const challengeFolder of challengeFolders) {
      const slug = challengeFolder.name;
      const markdownPath = path.join(categoryPath, slug, "index.md");

      if (!fs.existsSync(markdownPath)) {
        continue;
      }

      const source = fs.readFileSync(markdownPath, "utf8");
      const { data, content } = matter(source);
      const frontmatter = data as Frontmatter;

      challenges.push({
        id: frontmatter.id ?? slug,
        title: frontmatter.title ?? slug,
        level: frontmatter.level ?? category,
        tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
        category,
        slug,
        content,
      });
    }
  }

  return challenges;
};

export const getChallengesGroupedByCategory = (): Array<{
  category: string;
  challenges: ChallengePreview[];
}> => {
  const grouped = new Map<string, ChallengePreview[]>();

  for (const challenge of getAllChallenges()) {
    const preview: ChallengePreview = {
      id: challenge.id,
      title: challenge.title,
      level: challenge.level,
      tags: challenge.tags,
      category: challenge.category,
      slug: challenge.slug,
    };

    if (!grouped.has(challenge.category)) {
      grouped.set(challenge.category, []);
    }

    grouped.get(challenge.category)?.push(preview);
  }

  return [...grouped.entries()].map(([category, challenges]) => ({
    category,
    challenges,
  }));
};

export const getChallengeBySlug = (
  category: string,
  slug: string,
): Challenge | null => {
  return (
    getAllChallenges().find(
      (challenge) => challenge.category === category && challenge.slug === slug,
    ) ?? null
  );
};
