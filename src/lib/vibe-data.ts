/**
 * Static content for VibeReset: the moods users can pick and the activities
 * we recommend. Keeping data separate from UI makes pages easy to read.
 */

export type CategoryId = "calm" | "play" | "create" | "vibe" | "reset" | "energy";

export type Activity = {
  id: string;
  title: string;
  emoji: string;
  category: CategoryId;
  description: string;
  minutes: number;
  /** Where the activity lives. Some activities are simple prompts (no page). */
  href?: string;
};

export type Mood = {
  id: string;
  emoji: string;
  label: string;
  /** Activity ids recommended for this mood. */
  suggestions: string[];
};

export const CATEGORIES: { id: CategoryId; label: string; emoji: string; blurb: string }[] = [
  { id: "calm", label: "Calm", emoji: "🧘", blurb: "Slow everything down" },
  { id: "play", label: "Play", emoji: "🎮", blurb: "Tiny games, zero pressure" },
  { id: "create", label: "Create", emoji: "🎨", blurb: "Make something silly" },
  { id: "vibe", label: "Vibe", emoji: "🎵", blurb: "Sounds to float on" },
  { id: "reset", label: "Reset", emoji: "🧠", blurb: "Empty your head" },
  { id: "energy", label: "Energy", emoji: "⚡", blurb: "Move your body" },
];

export const ACTIVITIES: Activity[] = [
  // Calm
  { id: "breathing", title: "Breathing exercise", emoji: "🫁", category: "calm", description: "Follow the circle: in, hold, out.", minutes: 2, href: "/breathe" },
  { id: "meditation", title: "2-minute meditation", emoji: "🧘", category: "calm", description: "Sit still, eyes closed, timer on.", minutes: 2, href: "/timer" },
  { id: "relax-timer", title: "Relaxation timer", emoji: "⏳", category: "calm", description: "Pick a length and just be.", minutes: 5, href: "/timer" },
  { id: "body-scan", title: "Body scan", emoji: "💆", category: "calm", description: "Notice your body from head to toes.", minutes: 5, href: "/timer" },
  // Play
  { id: "memory", title: "Memory game", emoji: "🃏", category: "play", description: "Match the pairs.", minutes: 3, href: "/games" },
  { id: "reaction", title: "Reaction game", emoji: "⚡", category: "play", description: "Click the moment it turns green.", minutes: 2, href: "/games" },
  { id: "tap", title: "Quick tap challenge", emoji: "👆", category: "play", description: "How many taps in 10 seconds?", minutes: 1, href: "/games" },
  { id: "rps", title: "Rock Paper Scissors", emoji: "✊", category: "play", description: "Best of luck vs the computer.", minutes: 2, href: "/games" },
  // Create
  { id: "doodle", title: "Digital doodle board", emoji: "🖍️", category: "create", description: "Scribble with neon colours.", minutes: 5, href: "/doodle" },
  { id: "draw-challenge", title: "Random drawing challenge", emoji: "🎲", category: "create", description: "Get a silly prompt and draw it.", minutes: 5, href: "/doodle" },
  { id: "colour-mixer", title: "Colour mixer", emoji: "🌈", category: "create", description: "Blend colours until it feels right.", minutes: 3, href: "/doodle" },
  { id: "creative-prompt", title: "Creative prompts", emoji: "✍️", category: "create", description: "One prompt, no rules.", minutes: 5, href: "/doodle" },
  // Vibe
  { id: "ambient", title: "Ambient sounds", emoji: "🌌", category: "vibe", description: "Soft hum to sink into.", minutes: 5, href: "/vibe" },
  { id: "rain", title: "Rain sounds", emoji: "🌧️", category: "vibe", description: "Gentle rain, no thunder.", minutes: 5, href: "/vibe" },
  { id: "lofi", title: "Lo-fi atmosphere", emoji: "🎧", category: "vibe", description: "Warm, fuzzy background noise.", minutes: 5, href: "/vibe" },
  { id: "nature", title: "Nature sounds", emoji: "🌿", category: "vibe", description: "Wind, leaves, breathing room.", minutes: 5, href: "/vibe" },
  // Reset
  { id: "brain-dump", title: "Brain dump", emoji: "🧠", category: "reset", description: "Type out whatever is loud in your head.", minutes: 5, href: "/journal" },
  { id: "gratitude", title: "Gratitude note", emoji: "💚", category: "reset", description: "Three small good things.", minutes: 3, href: "/journal" },
  { id: "mood-check", title: "Mood check-in", emoji: "🪞", category: "reset", description: "Name the vibe you're in.", minutes: 1, href: "/mood" },
  { id: "bothering", title: "What's bothering you?", emoji: "💭", category: "reset", description: "One honest paragraph. Then close it.", minutes: 4, href: "/journal" },
  // Energy
  { id: "stretch", title: "Quick stretching", emoji: "🤸", category: "energy", description: "Neck, shoulders, back. Slowly.", minutes: 2, href: "/timer" },
  { id: "shake", title: "Shake-it-off timer", emoji: "🕺", category: "energy", description: "30 seconds of pure chaos.", minutes: 1, href: "/timer" },
  { id: "move-30", title: "30-second movement", emoji: "🏃", category: "energy", description: "Stand up and move, any way.", minutes: 1, href: "/timer" },
  { id: "eye-break", title: "Eye break", emoji: "👀", category: "energy", description: "Look 20 feet away for 20 seconds.", minutes: 1, href: "/timer" },
];

export const MOODS: Mood[] = [
  { id: "overwhelmed", emoji: "😵‍💫", label: "Overwhelmed", suggestions: ["breathing", "brain-dump", "meditation", "relax-timer"] },
  { id: "frustrated", emoji: "😫", label: "Frustrated", suggestions: ["breathing", "tap", "shake", "lofi"] },
  { id: "tired", emoji: "😴", label: "Tired", suggestions: ["breathing", "eye-break", "stretch", "nature"] },
  { id: "bored", emoji: "😐", label: "Bored", suggestions: ["memory", "rps", "doodle", "lofi"] },
  { id: "angry", emoji: "😤", label: "Angry", suggestions: ["shake", "tap", "breathing", "bothering"] },
  { id: "low", emoji: "😔", label: "Low", suggestions: ["gratitude", "nature", "doodle", "breathing"] },
  { id: "fried", emoji: "🧠", label: "Mentally exhausted", suggestions: ["eye-break", "meditation", "ambient", "brain-dump"] },
  { id: "break", emoji: "😌", label: "Just need a break", suggestions: ["relax-timer", "lofi", "memory", "stretch"] },
  { id: "good", emoji: "✨", label: "Feeling good", suggestions: ["gratitude", "doodle", "move-30", "reaction"] },
];

export const DRAW_PROMPTS = [
  "A cat running a coffee shop",
  "Your brain as a weather map",
  "A robot taking a nap",
  "The vibe of today in three shapes",
  "A plant that gives advice",
  "Your favourite snack as a superhero",
];

export const JOURNAL_PROMPTS = [
  "What's taking up space in your head?",
  "Three small good things from today",
  "What would make the next hour 5% easier?",
  "What's bothering you right now?",
];

export function getActivity(id: string): Activity | undefined {
  return ACTIVITIES.find((a) => a.id === id);
}
