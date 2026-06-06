import type { Paper, Author, Topic, AuthorBrief, TopicBrief, InstitutionBrief } from "@/types";
import type { OAWork, OAAuthor, OAConceptEntity } from "./openalex";
import { reconstructAbstract } from "./openalex";

// ---------------------------------------------------------------------------
// Works → Paper
// ---------------------------------------------------------------------------

function oaId(raw: string | null | undefined): string {
  if (!raw) return "";
  return raw.replace("https://openalex.org/", "");
}

function slugify(name: string | null | undefined): string {
  if (!name) return "";
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function transformWork(work: OAWork): Paper {
  const authors: AuthorBrief[] = (work.authorships ?? []).map((a, i) => ({
    id: oaId(a.author?.id),
    name: a.author?.display_name ?? "Unknown",
    position: i,
  }));

  const topics: TopicBrief[] = (work.concepts ?? []).slice(0, 5).map((c) => ({
    id: oaId(c.id),
    name: c.display_name,
    slug: slugify(c.display_name),
    score: c.score,
  }));

  const institutionSet = new Map<string, InstitutionBrief>();
  for (const a of (work.authorships ?? [])) {
    for (const inst of (a.institutions ?? [])) {
      if (inst.id && !institutionSet.has(inst.id)) {
        institutionSet.set(inst.id, {
          id: oaId(inst.id),
          name: inst.display_name ?? "Unknown Institution",
        });
      }
    }
  }

  const pdfUrl =
    work.primary_location?.pdf_url ??
    work.locations?.find((l) => l.pdf_url)?.pdf_url ??
    undefined;

  return {
    id: oaId(work.id),
    openAlexId: work.id,
    doi: work.doi ?? undefined,
    title: work.title ?? work.display_name,
    abstract: reconstructAbstract(work.abstract_inverted_index),
    publishedDate: work.publication_date,
    venue: work.primary_location?.source?.display_name,
    citationCount: work.cited_by_count,
    pdfUrl,
    sourceUrl: work.primary_location?.landing_page_url ?? work.doi ?? undefined,
    authors,
    topics,
    institutions: Array.from(institutionSet.values()),
  };
}

export function transformWorks(works: OAWork[]): Paper[] {
  return works.map(transformWork);
}

// ---------------------------------------------------------------------------
// OAAuthor → Author
// ---------------------------------------------------------------------------

export function transformAuthor(oa: OAAuthor): Author {
  const affiliations: string[] = [];
  if (oa.last_known_institutions) {
    for (const inst of oa.last_known_institutions) {
      affiliations.push(inst.display_name);
    }
  } else if (oa.affiliations) {
    for (const aff of oa.affiliations.slice(0, 3)) {
      affiliations.push(aff.institution.display_name);
    }
  }

  return {
    id: oaId(oa.id),
    openAlexId: oa.id,
    name: oa.display_name,
    affiliations,
    hIndex: oa.summary_stats?.h_index,
    citationCount: oa.cited_by_count,
    paperCount: oa.works_count,
  };
}

export function transformAuthors(authors: OAAuthor[]): Author[] {
  return authors.map(transformAuthor);
}

// ---------------------------------------------------------------------------
// OAConceptEntity → Topic
// ---------------------------------------------------------------------------

export function transformTopic(concept: OAConceptEntity): Topic {
  const currentYear = new Date().getFullYear();
  const thisYearCount =
    concept.counts_by_year?.find((c) => c.year === currentYear)?.works_count ?? 0;
  const lastYearCount =
    concept.counts_by_year?.find((c) => c.year === currentYear - 1)?.works_count ?? 1;

  const velocity =
    lastYearCount > 0
      ? Math.round(((thisYearCount - lastYearCount) / lastYearCount) * 100 * 10) / 10
      : 0;

  return {
    id: oaId(concept.id),
    name: concept.display_name,
    slug: slugify(concept.display_name),
    description: concept.description,
    paperCount: concept.works_count,
    velocity,
  };
}

export function transformTopics(concepts: OAConceptEntity[]): Topic[] {
  return concepts.map(transformTopic);
}
