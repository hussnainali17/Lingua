import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type LessonStatus = "locked" | "available" | "in-progress" | "completed";

interface LessonProgressState {
  /** Map of lessonId -> status */
  lessonStatuses: Record<string, LessonStatus>;
  totalXp: number;
  streak: number;

  /** Mark a lesson as in-progress */
  startLesson: (lessonId: string) => void;
  /** Mark a lesson as completed and add XP */
  completeLesson: (lessonId: string, xpEarned?: number) => void;
  /** Get status for a specific lesson */
  getLessonStatus: (lessonId: string) => LessonStatus;
  /** Reset all progress */
  resetProgress: () => void;
}

const DEFAULT_XP_PER_LESSON = 20;

export const useLessonStore = create<LessonProgressState>()(
  persist(
    (set, get) => ({
      lessonStatuses: {
        // Mock data: first few lessons have some progress
        "es-basics-1": "completed",
        "es-basics-2": "in-progress",
        "fr-greetings-1": "completed",
        "ja-introductions-1": "in-progress",
      },
      totalXp: 420,
      streak: 3,

      startLesson: (lessonId: string) => {
        set((state) => ({
          lessonStatuses: {
            ...state.lessonStatuses,
            [lessonId]: "in-progress",
          },
        }));
      },

      completeLesson: (lessonId: string, xpEarned?: number) => {
        set((state) => {
          const currentStatus = state.lessonStatuses[lessonId];
          // Don't downgrade
          if (currentStatus === "completed") return state;

          return {
            lessonStatuses: {
              ...state.lessonStatuses,
              [lessonId]: "completed",
            },
            totalXp: state.totalXp + (xpEarned ?? DEFAULT_XP_PER_LESSON),
            streak: state.streak + 1,
          };
        });
      },

      getLessonStatus: (lessonId: string): LessonStatus => {
        return get().lessonStatuses[lessonId] ?? "available";
      },

      resetProgress: () => {
        set({
          lessonStatuses: {},
          totalXp: 0,
          streak: 0,
        });
      },
    }),
    {
      name: "lingua-lesson-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
