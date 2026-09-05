import Link from "next/link";
import { getChallengesGroupedByCategory } from "@/lib/challenges";

export default function Home() {
  const groupedChallenges = getChallengesGroupedByCategory();

  return (
    <main className="page-shell">
      <section className="hero">
        <h1>Challenge Catalog</h1>
        <p>
          Practice frontend fundamentals from markdown challenges rendered with
          static generation.
        </p>
      </section>

      {groupedChallenges.length === 0 ? (
        <p>No challenges were found in the data directory.</p>
      ) : (
        groupedChallenges.map(({ category, challenges }) => (
          <section
            className="category-block"
            key={category}
            aria-labelledby={`${category}-title`}
          >
            <h2 id={`${category}-title`} className="category-title">
              {category}
            </h2>
            <ul className="challenge-grid">
              {challenges.map((challenge) => (
                <li
                  className="challenge-card"
                  key={`${challenge.category}-${challenge.slug}`}
                >
                  <h3>{challenge.title}</h3>
                  <p className="challenge-level">Level: {challenge.level}</p>
                  <p>{challenge.tags.join(" · ")}</p>
                  <Link
                    href={`/challenges/${challenge.category}/${challenge.slug}`}
                  >
                    Read challenge
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))
      )}
    </main>
  );
}
