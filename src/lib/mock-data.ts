import { Paper, Author, Topic, TrendSignal, FeedItem, ResearchReview } from "@/types";

export const mockTopics: Topic[] = [
  { id: "1", name: "Conversational Robotics", slug: "conversational-robotics", description: "Research at the intersection of natural language processing and robotics, enabling robots to engage in meaningful dialogue with humans.", paperCount: 1247, velocity: 12.4 },
  { id: "2", name: "Computational Biology", slug: "computational-biology", description: "Using computational methods to analyze biological data, model biological systems, and solve biological problems.", paperCount: 8930, velocity: 8.2 },
  { id: "3", name: "Drug Discovery", slug: "drug-discovery", description: "AI-driven approaches to identifying and developing new therapeutic compounds.", paperCount: 5621, velocity: 15.1 },
  { id: "4", name: "Reinforcement Learning", slug: "reinforcement-learning", description: "Training agents to make sequential decisions through trial-and-error interaction with environments.", paperCount: 12453, velocity: 6.8 },
  { id: "5", name: "Neuroscience", slug: "neuroscience", description: "Understanding the nervous system through computational and experimental approaches.", paperCount: 34210, velocity: 4.3 },
  { id: "6", name: "Quantum Computing", slug: "quantum-computing", description: "Leveraging quantum mechanical phenomena to process information in fundamentally new ways.", paperCount: 7832, velocity: 9.7 },
  { id: "7", name: "Synthetic Biology", slug: "synthetic-biology", description: "Designing and constructing new biological parts, devices, and systems.", paperCount: 4521, velocity: 11.2 },
  { id: "8", name: "Human Computer Interaction", slug: "human-computer-interaction", description: "Studying and designing the interaction between humans and computer systems.", paperCount: 15632, velocity: 5.9 },
  { id: "9", name: "AI Agents", slug: "ai-agents", description: "Autonomous AI systems capable of planning, reasoning, and executing complex tasks.", paperCount: 3241, velocity: 28.5 },
  { id: "10", name: "Protein Structure Prediction", slug: "protein-structure-prediction", description: "Predicting the 3D structure of proteins from their amino acid sequences.", paperCount: 2891, velocity: 7.4 },
];

export const mockAuthors: Author[] = [
  { id: "1", name: "Dr. Sarah Chen", affiliations: ["Stanford University", "Google DeepMind"], hIndex: 67, citationCount: 23400, paperCount: 142, profileImageUrl: undefined },
  { id: "2", name: "Prof. Marcus Weber", affiliations: ["MIT CSAIL"], hIndex: 54, citationCount: 18200, paperCount: 98, profileImageUrl: undefined },
  { id: "3", name: "Dr. Aisha Patel", affiliations: ["University of Oxford", "Meta AI"], hIndex: 45, citationCount: 12800, paperCount: 76, profileImageUrl: undefined },
  { id: "4", name: "Prof. Yuki Tanaka", affiliations: ["University of Tokyo"], hIndex: 72, citationCount: 31200, paperCount: 201, profileImageUrl: undefined },
  { id: "5", name: "Dr. James Morrison", affiliations: ["Carnegie Mellon University"], hIndex: 38, citationCount: 8900, paperCount: 54, profileImageUrl: undefined },
  { id: "6", name: "Prof. Elena Volkov", affiliations: ["ETH Zurich"], hIndex: 61, citationCount: 19800, paperCount: 123, profileImageUrl: undefined },
];

export const mockPapers: Paper[] = [
  {
    id: "1",
    title: "Memory-Augmented Conversational Robotics: A Scalable Framework for Long-Horizon Task Completion",
    abstract: "We present a novel framework that integrates episodic memory systems with conversational AI to enable robots to maintain context over extended interactions. Our approach achieves a 37% increase in task completion rates compared to existing baselines, with particular improvements in long-term conversational coherence and planning performance.",
    publishedDate: "2026-05-29",
    venue: "ICRA 2026",
    citationCount: 12,
    authors: [{ id: "1", name: "Dr. Sarah Chen", position: 0 }, { id: "2", name: "Prof. Marcus Weber", position: 1 }],
    topics: [{ id: "1", name: "Conversational Robotics", slug: "conversational-robotics" }],
    institutions: [{ id: "1", name: "Stanford University" }],
    summary: {
      oneSentence: "A memory-augmented framework that enables robots to maintain conversational context over extended interactions, achieving 37% improvement in task completion.",
      executive: "This paper introduces a scalable memory architecture for conversational robots that enables long-horizon task planning and execution. The key innovation is an episodic memory system that stores and retrieves contextual information from past interactions, allowing robots to build upon previous conversations and adapt their behavior accordingly.",
      technical: "The framework employs a hierarchical memory structure combining a fast-access working memory buffer with a compressed long-term episodic store. Retrieval is performed via learned attention over memory slots, conditioned on the current conversational context and task state.",
      contributions: ["37% increase in task completion rates", "Novel episodic memory architecture for robotics", "Improved long-term conversational coherence", "Scalable to 1000+ interaction episodes"],
      limitations: ["Tested only in simulated environments", "Memory retrieval latency may be problematic for real-time applications", "Limited to English-language interactions"],
      futureWork: ["Real-world deployment studies", "Multi-language support", "Integration with visual memory systems"],
      practicalImpact: "This work may significantly improve autonomous robots operating in real-world environments where sustained human interaction is required.",
      relationToLit: "Builds upon the episodic memory frameworks of Graves et al. (2016) and extends conversational grounding work by Clark & Brennan to robotic settings."
    }
  },
  {
    id: "2",
    title: "Scaling Laws for Scientific Reasoning in Large Language Models",
    abstract: "We investigate how scientific reasoning capabilities emerge and scale in large language models. Through systematic evaluation across 12 scientific disciplines, we identify critical scaling thresholds and demonstrate that scientific reasoning follows distinct scaling laws compared to general language understanding.",
    publishedDate: "2026-05-28",
    venue: "NeurIPS 2026",
    citationCount: 45,
    authors: [{ id: "3", name: "Dr. Aisha Patel", position: 0 }],
    topics: [{ id: "9", name: "AI Agents", slug: "ai-agents" }],
    institutions: [{ id: "2", name: "University of Oxford" }],
    summary: {
      oneSentence: "Large language models exhibit distinct scaling laws for scientific reasoning that diverge from general language understanding patterns.",
      executive: "This comprehensive study maps the emergence of scientific reasoning capabilities across model scales, identifying critical thresholds at which qualitative improvements occur in different scientific domains.",
      technical: "The authors evaluate models ranging from 1B to 1T parameters on a novel benchmark spanning physics, chemistry, biology, and mathematics reasoning tasks.",
      contributions: ["Novel scaling laws for scientific reasoning", "Identification of critical capability thresholds", "12-discipline benchmark suite"],
      limitations: ["Limited to English-language scientific texts", "Benchmark may not capture all aspects of reasoning"],
      futureWork: ["Multi-modal scientific reasoning", "Domain-specific fine-tuning studies"],
      practicalImpact: "Provides guidance for training AI systems that can meaningfully contribute to scientific discovery.",
      relationToLit: "Extends Kaplan et al. scaling laws to the scientific reasoning domain."
    }
  },
  {
    id: "3",
    title: "Graph Neural Networks for Protein-Protein Interaction Prediction: A Topological Approach",
    abstract: "We introduce a novel graph neural network architecture that leverages topological features of protein interaction networks to predict new interactions with 12% higher accuracy than existing methods. Our approach combines persistent homology with message-passing neural networks.",
    publishedDate: "2026-05-27",
    venue: "Nature Methods",
    citationCount: 28,
    authors: [{ id: "4", name: "Prof. Yuki Tanaka", position: 0 }, { id: "6", name: "Prof. Elena Volkov", position: 1 }],
    topics: [{ id: "10", name: "Protein Structure Prediction", slug: "protein-structure-prediction" }, { id: "2", name: "Computational Biology", slug: "computational-biology" }],
    institutions: [{ id: "3", name: "University of Tokyo" }],
    summary: {
      oneSentence: "A topological graph neural network achieves state-of-the-art protein-protein interaction prediction through persistent homology features.",
      executive: "This paper presents a novel approach to predicting protein-protein interactions by combining topological data analysis with graph neural networks, achieving 12% improvement over previous methods.",
      technical: "The architecture computes persistence diagrams from protein structure graphs and encodes these as vectorized features fed into a message-passing GNN with attention-based readout.",
      contributions: ["12% accuracy improvement over SOTA", "Novel integration of persistent homology with GNNs", "New benchmark dataset of 50K protein pairs"],
      limitations: ["Computational cost of persistent homology calculation", "Limited to binary interaction prediction"],
      futureWork: ["Multi-body interaction prediction", "Integration with AlphaFold structures"],
      practicalImpact: "Could accelerate drug target identification by better predicting protein interaction networks.",
      relationToLit: "Extends the author's previous work on protein interaction prediction with a fundamentally new topological approach."
    }
  },
  {
    id: "4",
    title: "Multi-Agent Planning with Shared World Models",
    abstract: "We propose a framework for multi-agent planning that leverages shared learned world models. Agents maintain individual policies while sharing a common representation of environment dynamics, enabling efficient coordination without direct communication.",
    publishedDate: "2026-05-30",
    venue: "ICML 2026",
    citationCount: 8,
    authors: [{ id: "5", name: "Dr. James Morrison", position: 0 }],
    topics: [{ id: "9", name: "AI Agents", slug: "ai-agents" }, { id: "4", name: "Reinforcement Learning", slug: "reinforcement-learning" }],
    institutions: [{ id: "4", name: "Carnegie Mellon University" }],
    summary: {
      oneSentence: "A shared world model framework enables multi-agent coordination without explicit communication channels.",
      executive: "This work introduces a novel approach to multi-agent systems where agents share a learned model of world dynamics while maintaining independent policies, achieving coordination through implicit understanding rather than explicit communication.",
      technical: "The shared world model is trained via a variational autoencoder on joint agent-environment trajectories, with each agent's policy optimized via model-based RL using the shared dynamics model.",
      contributions: ["Novel shared world model architecture", "Communication-free multi-agent coordination", "40% improvement in cooperative task benchmarks"],
      limitations: ["Requires centralized training phase", "Scales to maximum 8 agents in current implementation"],
      futureWork: ["Decentralized world model learning", "Scaling to large agent populations"],
      practicalImpact: "Enables coordination in multi-robot systems where communication may be unreliable or expensive.",
      relationToLit: "Combines world models (Ha & Schmidhuber, 2018) with multi-agent RL (Lowe et al., 2017)."
    }
  },
  {
    id: "5",
    title: "Quantum Error Correction with Topological Codes: Achieving Fault Tolerance at Scale",
    abstract: "We demonstrate a practical implementation of topological quantum error correction that achieves fault-tolerant operation with significantly reduced qubit overhead. Our surface code implementation reduces the physical-to-logical qubit ratio by 3x compared to previous approaches.",
    publishedDate: "2026-05-26",
    venue: "Physical Review Letters",
    citationCount: 67,
    authors: [{ id: "6", name: "Prof. Elena Volkov", position: 0 }],
    topics: [{ id: "6", name: "Quantum Computing", slug: "quantum-computing" }],
    institutions: [{ id: "5", name: "ETH Zurich" }],
    summary: {
      oneSentence: "A practical topological error correction scheme reduces qubit overhead for fault-tolerant quantum computing by 3x.",
      executive: "This paper presents a breakthrough in quantum error correction that makes fault-tolerant quantum computing more practically achievable by dramatically reducing the number of physical qubits needed per logical qubit.",
      technical: "The approach uses a modified surface code with adaptive decoding that exploits the topological properties of the code space to achieve higher error thresholds with fewer physical qubits.",
      contributions: ["3x reduction in qubit overhead", "Adaptive topological decoding algorithm", "Practical fault-tolerance demonstration"],
      limitations: ["Demonstrated on specific hardware architecture only", "Decoding latency challenges at large scales"],
      futureWork: ["Hardware-agnostic implementations", "Integration with quantum algorithms"],
      practicalImpact: "Brings practical fault-tolerant quantum computing significantly closer to reality.",
      relationToLit: "Builds upon Kitaev's toric code and recent surface code optimizations."
    }
  },
];

export const mockTrends: TrendSignal[] = [
  {
    id: "1",
    name: "AI Agents for Scientific Discovery",
    description: "A rapid increase in research exploring how autonomous AI agents can accelerate scientific research, from hypothesis generation to experimental design.",
    trendType: "research_explosion",
    confidenceScore: 0.92,
    momentumScore: 0.88,
    growthRate: 340,
    evidence: ["24 new papers in 7 days", "3 major research labs involved", "Rapid citation acceleration", "Multiple preprint servers showing concurrent submissions"],
    detectedAt: "2026-05-30",
    topic: { id: "9", name: "AI Agents", slug: "ai-agents" }
  },
  {
    id: "2",
    name: "Memory Architectures for Long-Horizon Robotics",
    description: "Growing convergence of memory systems research with robotic planning, focusing on enabling robots to operate effectively over extended time periods.",
    trendType: "emerging_concept",
    confidenceScore: 0.85,
    momentumScore: 0.76,
    growthRate: 180,
    evidence: ["12 new papers this month", "Cross-pollination from NLP memory research", "New benchmarks being established"],
    detectedAt: "2026-05-28",
    topic: { id: "1", name: "Conversational Robotics", slug: "conversational-robotics" }
  },
  {
    id: "3",
    name: "Topological Methods in Machine Learning",
    description: "Increasing adoption of algebraic topology tools (persistent homology, Betti numbers) as features and architectural components in deep learning.",
    trendType: "novel_methodology",
    confidenceScore: 0.78,
    momentumScore: 0.82,
    growthRate: 220,
    evidence: ["Applications spanning drug discovery, protein folding, and computer vision", "New theoretical foundations being established", "Multiple tutorial papers published"],
    detectedAt: "2026-05-25",
    topic: { id: "2", name: "Computational Biology", slug: "computational-biology" }
  },
  {
    id: "4",
    name: "Scaling Laws Beyond Language",
    description: "Research extending neural scaling law analysis to domains beyond language: scientific reasoning, robotics, and multi-modal systems.",
    trendType: "citation_acceleration",
    confidenceScore: 0.89,
    momentumScore: 0.91,
    growthRate: 290,
    evidence: ["Key papers gaining 50+ citations/week", "Every major lab publishing extensions", "New theoretical frameworks emerging"],
    detectedAt: "2026-05-29"
  },
  {
    id: "5",
    name: "Quantum-Classical Hybrid Algorithms",
    description: "New approaches combining quantum and classical computing for practical advantages on near-term quantum hardware.",
    trendType: "interdisciplinary_convergence",
    confidenceScore: 0.83,
    momentumScore: 0.69,
    growthRate: 150,
    evidence: ["Convergence of quantum physics and ML communities", "Industry adoption signals", "New benchmark results"],
    detectedAt: "2026-05-24",
    topic: { id: "6", name: "Quantum Computing", slug: "quantum-computing" }
  },
];

export const mockFeedItems: FeedItem[] = [
  {
    type: "breakthrough",
    id: "feed-1",
    title: "Memory-Augmented Conversational Robotics",
    subtitle: "Major Breakthrough in Conversational Robotics",
    timestamp: "2026-05-29",
    data: mockPapers[0],
  },
  {
    type: "trend",
    id: "feed-2",
    title: "AI Agents for Scientific Discovery",
    subtitle: "Emerging Trend — Past 7 Days",
    timestamp: "2026-05-30",
    data: mockTrends[0],
  },
  {
    type: "author_update",
    id: "feed-3",
    title: "New paper from Prof. Yuki Tanaka",
    subtitle: "Author you follow published new research",
    timestamp: "2026-05-27",
    data: mockPapers[2],
  },
  {
    type: "breakthrough",
    id: "feed-4",
    title: "Quantum Error Correction Breakthrough",
    subtitle: "Significant advance in Quantum Computing",
    timestamp: "2026-05-26",
    data: mockPapers[4],
  },
  {
    type: "trend",
    id: "feed-5",
    title: "Scaling Laws Beyond Language",
    subtitle: "Citation Acceleration Detected",
    timestamp: "2026-05-29",
    data: mockTrends[3],
  },
  {
    type: "breakthrough",
    id: "feed-6",
    title: "Multi-Agent Planning with Shared World Models",
    subtitle: "Notable Research in AI Agents",
    timestamp: "2026-05-30",
    data: mockPapers[3],
  },
];

export const mockDailyBrief = {
  date: "2026-05-31",
  totalPapers: 42,
  dominantThemes: [
    "Multi-agent planning",
    "Memory architectures",
    "Scientific reasoning systems",
  ],
  highlight: "The most significant publication came from Stanford and introduces a scalable memory framework for long-horizon robotics.",
  topPaper: mockPapers[0],
};

export const mockReview: ResearchReview = {
  id: "1",
  query: "Conversational Robotics",
  title: "Literature Review: Conversational Robotics",
  overview: "Conversational robotics is an interdisciplinary field combining natural language processing, dialogue systems, and embodied AI to create robots capable of engaging in meaningful human-like interactions. The field has experienced rapid growth since 2020, driven by advances in large language models and embodied AI.",
  keyPapers: [
    "Memory-Augmented Conversational Robotics (Chen & Weber, 2026)",
    "Grounded Language Understanding for Robotic Manipulation (Kumar et al., 2025)",
    "Social Robots with Theory of Mind (Tanaka & Lee, 2024)",
    "Dialogue-Driven Task Planning in Household Robots (Morrison et al., 2025)",
  ],
  researchers: ["Dr. Sarah Chen", "Prof. Marcus Weber", "Dr. James Morrison", "Prof. Yuki Tanaka"],
  milestones: [
    "2018 - First conversational robot systems with end-to-end training",
    "2020 - Integration of transformer-based language models",
    "2023 - LLM-powered robots achieve human-level dialogue coherence",
    "2025 - Memory-augmented systems enable multi-session interactions",
    "2026 - Scalable frameworks achieve 37% task completion improvement",
  ],
  stateOfArt: "Current state-of-the-art systems combine large language models with episodic memory and embodied perception to enable robots that can engage in extended, contextually-aware conversations while simultaneously performing physical tasks.",
  openProblems: [
    "Long-term memory consolidation in dynamic environments",
    "Multi-modal grounding of abstract conversational concepts",
    "Safety and alignment in open-ended robotic dialogue",
    "Scalability to diverse real-world deployment scenarios",
  ],
  futureDirections: [
    "Integration of world models with conversational planning",
    "Personalized robot companions with lifelong learning",
    "Multi-robot conversational coordination",
    "Cross-cultural and multilingual robotic interaction",
  ],
  status: "completed",
  createdAt: "2026-05-31",
};
