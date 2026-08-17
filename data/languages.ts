import type { Language } from "@/types/learning";

export const languages: Language[] = [
  {
    id: "es",
    name: "Spanish",
    nativeName: "Español",
    flagEmoji: "🇪🇸",
    code: "es",
    description:
      "One of the world's most spoken languages. Learn Spanish and open doors across 20+ countries.",
  },
  {
    id: "fr",
    name: "French",
    nativeName: "Français",
    flagEmoji: "🇫🇷",
    code: "fr",
    description:
      "The language of love, diplomacy, and cuisine. Speak French and connect with the francophone world.",
  },
  {
    id: "ja",
    name: "Japanese",
    nativeName: "日本語",
    flagEmoji: "🇯🇵",
    code: "ja",
    description:
      "A fascinating language with three writing systems. Learn Japanese and explore a rich culture.",
  },
];

export function getLanguageById(id: string): Language | undefined {
  return languages.find((lang) => lang.id === id);
}

export function getLanguageByCode(code: string): Language | undefined {
  return languages.find((lang) => lang.code === code);
}
