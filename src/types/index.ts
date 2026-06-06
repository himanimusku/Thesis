export interface Paper {
  id: string;
  openAlexId?: string;
  doi?: string;
  title: string;
  abstract?: string;
  publishedDate?: string;
  venue?: string;
  citationCount: number;
  pdfUrl?: string;
  sourceUrl?: string;
  authors: AuthorBrief[];
  topics: TopicBrief[];
  institutions: InstitutionBrief[];
  summary?: PaperSummary;
}

export interface AuthorBrief {
  id: string;
  name: string;
  position?: number;
}

export interface TopicBrief {
  id: string;
  name: string;
  slug: string;
  score?: number;
}

export interface InstitutionBrief {
  id: string;
  name: string;
}

export interface Author {
  id: string;
  openAlexId?: string;
  name: string;
  affiliations: string[];
  hIndex?: number;
  citationCount?: number;
  paperCount?: number;
  profileImageUrl?: string;
  papers?: Paper[];
}

export interface Topic {
  id: string;
  name: string;
  slug: string;
  description?: string;
  paperCount: number;
  velocity: number;
}

export interface Institution {
  id: string;
  name: string;
  country?: string;
  type?: string;
  logoUrl?: string;
}

export interface PaperSummary {
  oneSentence?: string;
  executive?: string;
  technical?: string;
  contributions: string[];
  limitations: string[];
  futureWork: string[];
  practicalImpact?: string;
  relationToLit?: string;
}

export interface TrendSignal {
  id: string;
  name: string;
  description?: string;
  trendType: string;
  confidenceScore: number;
  momentumScore: number;
  growthRate: number;
  evidence: string[];
  detectedAt: string;
  topic?: TopicBrief;
}

export interface ResearchDigest {
  id: string;
  title: string;
  content: string;
  period: string;
  createdAt: string;
  topic?: TopicBrief;
}

export interface ResearchReview {
  id: string;
  query: string;
  title: string;
  overview?: string;
  keyPapers: string[];
  researchers: string[];
  milestones: string[];
  stateOfArt?: string;
  openProblems: string[];
  futureDirections: string[];
  status: "generating" | "completed" | "failed";
  createdAt: string;
}

export interface FeedItem {
  type: "breakthrough" | "trend" | "author_update" | "digest";
  id: string;
  title: string;
  subtitle?: string;
  timestamp: string;
  data: Paper | TrendSignal | ResearchDigest;
}

export interface SearchFilters {
  query?: string;
  dateFrom?: string;
  dateTo?: string;
  authors?: string[];
  institutions?: string[];
  topics?: string[];
  venues?: string[];
  minCitations?: number;
  sortBy?: "relevance" | "date" | "citations";
}
