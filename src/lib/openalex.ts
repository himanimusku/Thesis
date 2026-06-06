const BASE_URL = "https://api.openalex.org";
const MAILTO = "thesis-app@example.com";

// ---------------------------------------------------------------------------
// OpenAlex response types
// ---------------------------------------------------------------------------

export interface OAMeta {
  count: number;
  db_response_time_ms: number;
  page: number;
  per_page: number;
  next_cursor?: string;
}

export interface OAAutorship {
  author_position: string;
  author: {
    id: string;
    display_name: string;
    orcid?: string;
  };
  institutions: {
    id: string;
    display_name: string;
    country_code?: string;
    type?: string;
  }[];
}

export interface OAConcept {
  id: string;
  wikidata?: string;
  display_name: string;
  level: number;
  score: number;
}

export interface OATopic {
  id: string;
  display_name: string;
  subfield?: { id: string; display_name: string };
  field?: { id: string; display_name: string };
  domain?: { id: string; display_name: string };
}

export interface OASource {
  id: string;
  display_name: string;
  issn_l?: string;
  type?: string;
}

export interface OAWork {
  id: string;
  doi?: string;
  title: string;
  display_name: string;
  publication_date: string;
  publication_year: number;
  cited_by_count: number;
  type: string;
  is_oa: boolean;
  authorships: OAAutorship[];
  concepts: OAConcept[];
  topics?: OATopic[];
  primary_location?: {
    source?: OASource;
    pdf_url?: string;
    landing_page_url?: string;
  };
  locations?: {
    source?: OASource;
    pdf_url?: string;
    landing_page_url?: string;
  }[];
  abstract_inverted_index?: Record<string, number[]>;
  cited_by_api_url?: string;
  counts_by_year?: { year: number; cited_by_count: number }[];
  updated_date?: string;
}

export interface OAAuthor {
  id: string;
  display_name: string;
  orcid?: string;
  works_count: number;
  cited_by_count: number;
  summary_stats?: {
    "2yr_mean_citedness": number;
    h_index: number;
    i10_index: number;
  };
  affiliations?: {
    institution: { id: string; display_name: string; country_code?: string };
    years: number[];
  }[];
  last_known_institutions?: {
    id: string;
    display_name: string;
    country_code?: string;
    type?: string;
  }[];
  topics?: OATopic[];
  counts_by_year?: { year: number; works_count: number; cited_by_count: number }[];
  updated_date?: string;
}

export interface OAConceptEntity {
  id: string;
  display_name: string;
  description?: string;
  works_count: number;
  cited_by_count: number;
  level: number;
  ancestors?: { id: string; display_name: string }[];
  related_concepts?: { id: string; display_name: string; score: number }[];
  counts_by_year?: { year: number; works_count: number; cited_by_count: number }[];
  updated_date?: string;
}

export interface OAListResponse<T> {
  meta: OAMeta;
  results: T[];
  group_by?: unknown[];
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function oaId(raw: string): string {
  return raw.replace("https://openalex.org/", "");
}

function buildUrl(path: string, params: Record<string, string | undefined>): string {
  const url = new URL(`${BASE_URL}${path}`);
  url.searchParams.set("mailto", MAILTO);
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== "") url.searchParams.set(k, v);
  }
  return url.toString();
}

async function fetchOA<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    headers: { Accept: "application/json" },
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(
      `OpenAlex ${res.status}: ${res.statusText} — ${url.split("?")[0]} ${body.slice(0, 200)}`
    );
  }
  return res.json() as Promise<T>;
}

export function reconstructAbstract(
  invertedIndex: Record<string, number[]> | undefined | null,
): string | undefined {
  if (!invertedIndex) return undefined;

  const words: [number, string][] = [];
  for (const [word, positions] of Object.entries(invertedIndex)) {
    for (const pos of positions) {
      words.push([pos, word]);
    }
  }
  words.sort((a, b) => a[0] - b[0]);
  return words.map(([, w]) => w).join(" ");
}

// ---------------------------------------------------------------------------
// Works
// ---------------------------------------------------------------------------

export interface SearchWorksOptions {
  query?: string;
  filter?: string;
  sort?: string;
  page?: number;
  perPage?: number;
  cursor?: string;
}

export async function searchWorks(
  query: string,
  filters?: {
    topic?: string;
    author?: string;
    dateFrom?: string;
    dateTo?: string;
    minCitations?: number;
  },
  sort = "relevance_score",
  page = 1,
  perPage = 25,
): Promise<OAListResponse<OAWork>> {
  const filterParts: string[] = [];

  if (filters?.topic) filterParts.push(`title_and_abstract.search:${filters.topic}`);
  if (filters?.author) filterParts.push(`authorships.author.id:${filters.author}`);
  if (filters?.dateFrom) filterParts.push(`from_publication_date:${filters.dateFrom}`);
  if (filters?.dateTo) {
    filterParts.push(`to_publication_date:${filters.dateTo}`);
  } else {
    filterParts.push(`to_publication_date:${new Date().toISOString().slice(0, 10)}`);
  }
  if (filters?.minCitations) filterParts.push(`cited_by_count:>${filters.minCitations}`);
  if (!filters?.topic && !filters?.author && !query) {
    filterParts.push("type:article");
  }
  filterParts.push("language:en");

  let resolvedSort: string;
  if (sort === "relevance" && query) resolvedSort = "relevance_score:desc";
  else if (sort === "date" || (!query && sort === "relevance")) resolvedSort = "publication_date:desc";
  else if (sort === "citations") resolvedSort = "cited_by_count:desc";
  else resolvedSort = "publication_date:desc";

  const url = buildUrl("/works", {
    search: query || undefined,
    filter: filterParts.length > 0 ? filterParts.join(",") : undefined,
    sort: resolvedSort,
    page: String(page),
    per_page: String(perPage),
  });

  return fetchOA<OAListResponse<OAWork>>(url);
}

export async function getWork(id: string): Promise<OAWork> {
  const cleanId = id.startsWith("W") ? id : id.startsWith("https://") ? oaId(id) : `W${id}`;
  const url = buildUrl(`/works/${cleanId}`, {});
  return fetchOA<OAWork>(url);
}

export async function getTrendingWorks(
  topic?: string,
  days = 7,
  perPage = 10,
): Promise<OAListResponse<OAWork>> {
  const now = new Date();
  const from = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
  const fromStr = from.toISOString().slice(0, 10);

  const filterParts = [`from_publication_date:${fromStr}`];
  if (topic) filterParts.push(`concepts.display_name.search:${topic}`);

  const url = buildUrl("/works", {
    filter: filterParts.join(","),
    sort: "cited_by_count:desc",
    per_page: String(perPage),
  });

  return fetchOA<OAListResponse<OAWork>>(url);
}

// ---------------------------------------------------------------------------
// Authors
// ---------------------------------------------------------------------------

export async function searchAuthors(
  query: string,
  sort = "relevance_score",
  page = 1,
  perPage = 25,
): Promise<OAListResponse<OAAuthor>> {
  let resolvedSort: string;
  if (sort === "citations") resolvedSort = "cited_by_count:desc";
  else if (sort === "h_index") resolvedSort = "summary_stats.h_index:desc";
  else if (sort === "papers") resolvedSort = "works_count:desc";
  else if (!query) resolvedSort = "cited_by_count:desc";
  else resolvedSort = sort;

  const url = buildUrl("/authors", {
    search: query || undefined,
    sort: resolvedSort,
    page: String(page),
    per_page: String(perPage),
  });

  return fetchOA<OAListResponse<OAAuthor>>(url);
}

export async function getAuthor(id: string): Promise<OAAuthor> {
  const cleanId = id.startsWith("A") ? id : id.startsWith("https://") ? oaId(id) : `A${id}`;
  const url = buildUrl(`/authors/${cleanId}`, {});
  return fetchOA<OAAuthor>(url);
}

// ---------------------------------------------------------------------------
// Topics / Concepts
// ---------------------------------------------------------------------------

export async function searchTopics(
  query: string,
  sort = "relevance_score",
  page = 1,
  perPage = 25,
): Promise<OAListResponse<OAConceptEntity>> {
  let resolvedSort: string;
  if (sort === "paper_count") resolvedSort = "works_count:desc";
  else if (sort === "velocity") resolvedSort = "cited_by_count:desc";
  else if (!query) resolvedSort = "works_count:desc";
  else resolvedSort = sort;

  const url = buildUrl("/concepts", {
    search: query || undefined,
    filter: !query ? "level:1" : undefined,
    sort: resolvedSort,
    page: String(page),
    per_page: String(perPage),
  });

  return fetchOA<OAListResponse<OAConceptEntity>>(url);
}

export async function getTopic(id: string): Promise<OAConceptEntity> {
  const cleanId = id.startsWith("C") ? id : id.startsWith("https://") ? oaId(id) : `C${id}`;
  const url = buildUrl(`/concepts/${cleanId}`, {});
  return fetchOA<OAConceptEntity>(url);
}
