"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Beaker, Search, Check, ArrowRight, Loader2, Sparkles } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";

const SUGGESTED_TOPICS = [
  "Artificial Intelligence",
  "Machine Learning",
  "Natural Language Processing",
  "Computer Vision",
  "Robotics",
  "Social Robotics",
  "Neuroscience",
  "Quantum Computing",
  "Bioinformatics",
  "Climate Science",
  "Materials Science",
  "Drug Discovery",
  "Genetics",
  "Astrophysics",
  "Cryptography",
  "Human-Computer Interaction",
  "Reinforcement Learning",
  "Graph Neural Networks",
  "Large Language Models",
  "Protein Folding",
  "Autonomous Vehicles",
  "Medical Imaging",
  "Speech Recognition",
  "Recommender Systems",
  "Federated Learning",
  "Computational Biology",
  "Energy Storage",
  "Sustainability",
];

const SUGGESTED_AUTHORS = [
  { name: "Yann LeCun", id: "A5001226970", field: "Deep Learning" },
  { name: "Geoffrey Hinton", id: "A5108093963", field: "Neural Networks" },
  { name: "Fei-Fei Li", id: "A5100450462", field: "Computer Vision" },
  { name: "Demis Hassabis", id: "A5005349213", field: "AI Research" },
  { name: "Ilya Sutskever", id: "A5006446297", field: "Deep Learning" },
  { name: "Yoshua Bengio", id: "A5073317515", field: "Deep Learning" },
  { name: "Andrew Ng", id: "A5048151964", field: "Machine Learning" },
  { name: "Jürgen Schmidhuber", id: "A5016aboración38254", field: "Recurrent Networks" },
  { name: "Andrej Karpathy", id: "A5047907673", field: "Deep Learning" },
  { name: "Ian Goodfellow", id: "A5027383561", field: "Generative Models" },
  { name: "Pieter Abbeel", id: "A5003442439", field: "Robotics & RL" },
  { name: "Chelsea Finn", id: "A5050095283", field: "Meta-Learning" },
  { name: "Daphne Koller", id: "A5069498297", field: "Probabilistic Models" },
  { name: "Michael I. Jordan", id: "A5015807855", field: "Machine Learning" },
  { name: "Stuart Russell", id: "A5023467402", field: "AI Safety" },
];

export default function OnboardingPage() {
  const { completeOnboarding, profile } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedAuthors, setSelectedAuthors] = useState<{ name: string; id: string }[]>([]);
  const [customTopic, setCustomTopic] = useState("");
  const [loading, setLoading] = useState(false);

  function toggleTopic(topic: string) {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  }

  function toggleAuthor(author: { name: string; id: string }) {
    setSelectedAuthors((prev) =>
      prev.some((a) => a.id === author.id)
        ? prev.filter((a) => a.id !== author.id)
        : [...prev, author]
    );
  }

  function addCustomTopic() {
    const t = customTopic.trim();
    if (t && !selectedTopics.includes(t)) {
      setSelectedTopics((prev) => [...prev, t]);
    }
    setCustomTopic("");
  }

  async function handleFinish() {
    setLoading(true);
    try {
      await completeOnboarding(selectedTopics, selectedAuthors);
      router.push("/");
    } catch {
      router.push("/");
    } finally {
      setLoading(false);
    }
  }

  function handleSkip() {
    handleFinish();
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 mb-3">
            <Beaker className="h-7 w-7 text-[var(--primary)]" />
            <span className="text-xl font-bold text-[var(--foreground)]">Thesis</span>
          </div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">
            {step === 1 && "Welcome! Let's personalize your feed"}
            {step === 2 && "Follow researchers"}
            {step === 3 && "You're all set!"}
          </h1>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">
            {step === 1 && "Pick topics you're interested in (you can change these later)"}
            {step === 2 && "Get updates when these researchers publish new work"}
            {step === 3 && "Your feed is ready"}
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8 flex gap-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded-full transition-colors ${
                s <= step ? "bg-[var(--primary)]" : "bg-[var(--border)]"
              }`}
            />
          ))}
        </div>

        {/* Step 1: Topics */}
        {step === 1 && (
          <div>
            <div className="mb-4 flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-foreground)]" />
                <input
                  type="text"
                  value={customTopic}
                  onChange={(e) => setCustomTopic(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addCustomTopic())}
                  placeholder="Type a custom topic..."
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] py-2 pl-10 pr-4 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20"
                />
              </div>
              {customTopic.trim() && (
                <button
                  onClick={addCustomTopic}
                  className="rounded-lg bg-[var(--primary)] px-3 text-sm font-medium text-white hover:bg-[var(--primary)]/90"
                >
                  Add
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2 max-h-[320px] overflow-y-auto">
              {SUGGESTED_TOPICS.map((topic) => {
                const selected = selectedTopics.includes(topic);
                return (
                  <button
                    key={topic}
                    onClick={() => toggleTopic(topic)}
                    className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-all ${
                      selected
                        ? "border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)]"
                        : "border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] hover:border-[var(--primary)]/40"
                    }`}
                  >
                    {selected && <Check className="mr-1 inline h-3 w-3" />}
                    {topic}
                  </button>
                );
              })}
              {selectedTopics
                .filter((t) => !SUGGESTED_TOPICS.includes(t))
                .map((topic) => (
                  <button
                    key={topic}
                    onClick={() => toggleTopic(topic)}
                    className="rounded-full border border-[var(--primary)] bg-[var(--primary)]/10 px-3 py-1.5 text-sm font-medium text-[var(--primary)]"
                  >
                    <Check className="mr-1 inline h-3 w-3" />
                    {topic}
                  </button>
                ))}
            </div>

            {selectedTopics.length > 0 && (
              <p className="mt-3 text-xs text-[var(--muted-foreground)]">
                {selectedTopics.length} topic{selectedTopics.length !== 1 ? "s" : ""} selected
              </p>
            )}

            <div className="mt-6 flex items-center justify-between">
              <button
                onClick={handleSkip}
                className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              >
                Skip for now
              </button>
              <button
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--primary)] px-5 py-2.5 text-sm font-medium text-white hover:bg-[var(--primary)]/90"
              >
                Next
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Authors */}
        {step === 2 && (
          <div>
            <div className="space-y-2 max-h-[360px] overflow-y-auto">
              {SUGGESTED_AUTHORS.map((author) => {
                const selected = selectedAuthors.some((a) => a.id === author.id);
                return (
                  <button
                    key={author.id}
                    onClick={() => toggleAuthor({ name: author.name, id: author.id })}
                    className={`w-full flex items-center gap-3 rounded-lg border p-3 text-left transition-all ${
                      selected
                        ? "border-[var(--primary)] bg-[var(--primary)]/5"
                        : "border-[var(--border)] bg-[var(--card)] hover:border-[var(--primary)]/40"
                    }`}
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-xs font-bold text-[var(--accent-foreground)]">
                      {author.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[var(--foreground)]">{author.name}</p>
                      <p className="text-xs text-[var(--muted-foreground)]">{author.field}</p>
                    </div>
                    {selected && (
                      <Check className="h-4 w-4 shrink-0 text-[var(--primary)]" />
                    )}
                  </button>
                );
              })}
            </div>

            {selectedAuthors.length > 0 && (
              <p className="mt-3 text-xs text-[var(--muted-foreground)]">
                Following {selectedAuthors.length} researcher{selectedAuthors.length !== 1 ? "s" : ""}
              </p>
            )}

            <div className="mt-6 flex items-center justify-between">
              <button
                onClick={() => setStep(1)}
                className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              >
                &larr; Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--primary)] px-5 py-2.5 text-sm font-medium text-white hover:bg-[var(--primary)]/90"
              >
                Next
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && (
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
              <Sparkles className="h-8 w-8 text-emerald-600" />
            </div>

            <div className="mb-6 space-y-3 text-left">
              {selectedTopics.length > 0 && (
                <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)] mb-2">
                    Your Interests
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedTopics.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-[var(--primary)]/10 px-2.5 py-0.5 text-xs font-medium text-[var(--primary)]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {selectedAuthors.length > 0 && (
                <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)] mb-2">
                    Following
                  </p>
                  <p className="text-sm text-[var(--foreground)]">
                    {selectedAuthors.map((a) => a.name).join(", ")}
                  </p>
                </div>
              )}
              {selectedTopics.length === 0 && selectedAuthors.length === 0 && (
                <p className="text-sm text-[var(--muted-foreground)]">
                  No preferences selected. You&apos;ll see general research highlights.
                </p>
              )}
            </div>

            <button
              onClick={handleFinish}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--primary)] px-6 py-2.5 text-sm font-medium text-white hover:bg-[var(--primary)]/90 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  Go to my feed
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
