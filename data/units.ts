import type { Unit } from "@/types/learning";

export const units: Unit[] = [
  // ── Spanish Units ──────────────────────────
  {
    id: "es-basics",
    languageId: "es",
    title: "Basics",
    description: "Essential words and phrases to get you started in Spanish.",
    order: 1,
  },
  {
    id: "es-food",
    languageId: "es",
    title: "Food & Drink",
    description:
      "Learn how to order food, name ingredients, and talk about meals.",
    order: 2,
  },

  // ── French Units ───────────────────────────
  {
    id: "fr-greetings",
    languageId: "fr",
    title: "Greetings",
    description: "Say hello, introduce yourself, and be polite in French.",
    order: 1,
  },
  {
    id: "fr-numbers-colors",
    languageId: "fr",
    title: "Numbers & Colors",
    description: "Count, describe objects, and learn basic adjectives.",
    order: 2,
  },

  // ── Japanese Units ─────────────────────────
  {
    id: "ja-introductions",
    languageId: "ja",
    title: "Introductions",
    description:
      "Learn how to introduce yourself, greet others, and use basic phrases.",
    order: 1,
  },
  {
    id: "ja-daily-life",
    languageId: "ja",
    title: "Daily Life",
    description:
      "Learn useful words and phrases for everyday situations in Japanese.",
    order: 2,
  },
  {
    id: "ja-food-travel",
    languageId: "ja",
    title: "Food & Travel",
    description:
      "Essential Japanese for dining out, travel, and navigating cities.",
    order: 3,
  },
];

export function getUnitsByLanguage(languageId: string): Unit[] {
  return units
    .filter((unit) => unit.languageId === languageId)
    .sort((a, b) => a.order - b.order);
}

export function getUnitById(id: string): Unit | undefined {
  return units.find((unit) => unit.id === id);
}
