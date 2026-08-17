// ──────────────────────────────────────────────
// Learning Content System — Core Type Definitions
// ──────────────────────────────────────────────

/** A supported language in the app */
export interface Language {
  id: string;
  name: string;
  nativeName: string;
  flagEmoji: string;
  code: string; // e.g. "es", "fr", "ja"
  description: string;
}

/** A unit (module) within a language course */
export interface Unit {
  id: string;
  languageId: string;
  title: string;
  description: string;
  order: number;
}

/** The type of lesson */
export type LessonType = "vocabulary" | "audio" | "video" | "chat" | "quiz";

/** The type of a single activity within a lesson */
export type ActivityType =
  | "multiple-choice"
  | "translation"
  | "fill-blank"
  | "listening"
  | "speaking";

/** A single activity/question inside a lesson */
export interface Activity {
  id: string;
  type: ActivityType;
  prompt: string;
  options?: string[]; // for multiple-choice
  correctAnswer: string;
  audioUrl?: string; // for listening/speaking activities
}

/** A vocabulary word taught in a lesson */
export interface VocabularyWord {
  word: string;
  translation: string;
  pronunciation: string;
  partOfSpeech?: string; // e.g. "noun", "verb", "adjective"
}

/** A common phrase taught in a lesson */
export interface Phrase {
  text: string;
  translation: string;
  pronunciation: string;
  context?: string; // when to use this phrase
}

/** A lesson goal displayed to the user */
export interface LessonGoal {
  description: string;
  icon?: string; // emoji or icon name
}

/**
 * AI Teacher prompt configuration for future audio/video-based
 * Vision Agent lessons (Stream-powered).
 */
export interface AITeacherPrompt {
  context: string; // what the teacher should know
  instructions: string; // how the teacher should teach
  voiceType?: "friendly" | "professional" | "enthusiastic";
  prompts: string[]; // dialogue prompts for the teacher
}

/** A full lesson with all its content */
export interface Lesson {
  id: string;
  unitId: string;
  type: LessonType;
  title: string;
  description: string;
  order: number;
  goals: LessonGoal[];
  activities: Activity[];
  vocabulary: VocabularyWord[];
  phrases: Phrase[];
  teacherPrompt: AITeacherPrompt;
}
