import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Trash2, Pencil, Check } from "lucide-react";
import { useVibeStore } from "@/stores/useVibeStore";
import { useHydrated } from "@/hooks/useHydrated";
import { JOURNAL_PROMPTS } from "@/lib/vibe-data";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "Brain dump — VibeReset" },
      { name: "description", content: "Type out whatever is loud in your head. Save it or bin it." },
      { property: "og:title", content: "Brain dump — VibeReset" },
      { property: "og:description", content: "What's taking up space in your head?" },
    ],
  }),
  component: JournalPage,
});

const MAX = 1000;

function JournalPage() {
  const hydrated = useHydrated();
  const entries = useVibeStore((s) => s.journalEntries);
  const addJournalEntry = useVibeStore((s) => s.addJournalEntry);
  const updateJournalEntry = useVibeStore((s) => s.updateJournalEntry);
  const deleteJournalEntry = useVibeStore((s) => s.deleteJournalEntry);
  const completeActivity = useVibeStore((s) => s.completeActivity);

  const [text, setText] = useState("");
  const [prompt, setPrompt] = useState(JOURNAL_PROMPTS[0]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  function save() {
    const content = text.trim();
    if (!content) {
      toast.error("Nothing to save yet — write a line first.");
      return;
    }
    addJournalEntry(content);
    completeActivity("brain-dump", 5);
    setText("");
    toast.success("Out of your head, onto the page. 🧠✨");
  }

  return (
    <PageShell title="Brain dump 🧠" subtitle="No structure, no grammar police. Just get it out.">
      <div className="glass rounded-3xl p-6">
        <div className="mb-4 flex flex-wrap gap-2">
          {JOURNAL_PROMPTS.map((p) => (
            <button
              key={p}
              onClick={() => setPrompt(p)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                p === prompt ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground hover:bg-secondary"
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        <label htmlFor="dump" className="text-lg font-semibold">
          {prompt}
        </label>
        <textarea
          id="dump"
          rows={7}
          maxLength={MAX}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing… nobody else sees this."
          className="mt-3 w-full resize-none rounded-2xl border border-input bg-background/60 p-4 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {text.length}/{MAX}
          </span>
          <button
            onClick={save}
            className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            Save entry
          </button>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="text-2xl font-bold">Previous dumps</h2>

        {!hydrated ? (
          <p className="mt-4 text-sm text-muted-foreground">Loading your entries…</p>
        ) : entries.length === 0 ? (
          <div className="glass mt-4 rounded-3xl p-8 text-center text-muted-foreground">
            Nothing here yet. Your first brain dump is one paragraph away. ✍️
          </div>
        ) : (
          <ul className="mt-4 space-y-3">
            {entries.map((e) => (
              <li key={e.id} className="glass rounded-3xl p-5">
                <div className="flex items-start justify-between gap-4">
                  <time className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {new Date(e.createdAt).toLocaleString()}
                  </time>
                  <div className="flex gap-2">
                    {editingId === e.id ? (
                      <button
                        aria-label="Save changes"
                        onClick={() => {
                          updateJournalEntry(e.id, editText.trim() || e.content);
                          setEditingId(null);
                          toast.success("Updated.");
                        }}
                        className="rounded-full border border-border p-2 hover:bg-secondary"
                      >
                        <Check className="h-4 w-4" />
                      </button>
                    ) : (
                      <button
                        aria-label="Edit entry"
                        onClick={() => {
                          setEditingId(e.id);
                          setEditText(e.content);
                        }}
                        className="rounded-full border border-border p-2 hover:bg-secondary"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                    )}
                    <button
                      aria-label="Delete entry"
                      onClick={() => {
                        deleteJournalEntry(e.id);
                        toast("Entry deleted.");
                      }}
                      className="rounded-full border border-border p-2 text-destructive hover:bg-secondary"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {editingId === e.id ? (
                  <textarea
                    value={editText}
                    onChange={(ev) => setEditText(ev.target.value)}
                    rows={5}
                    maxLength={MAX}
                    className="mt-3 w-full resize-none rounded-2xl border border-input bg-background/60 p-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                  />
                ) : (
                  <p className="mt-3 whitespace-pre-wrap text-sm text-muted-foreground">{e.content}</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </PageShell>
  );
}
