import { useAuth, useUser } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants/images";
import { getLessonsByUnit } from "@/data/lessons";
import { getUnitsByLanguage } from "@/data/units";
import { useLanguageStore } from "@/store/language-store";
import { useLessonStore } from "@/store/lesson-store";

export default function TabsHomeScreen() {
  const router = useRouter();
  const { signOut } = useAuth();
  const { user } = useUser();
  const selectedLanguage = useLanguageStore((state) => state.selectedLanguage);
  const { totalXp, streak } = useLessonStore();

  if (!selectedLanguage) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>No language selected</Text>
          <Text style={styles.emptyText}>
            Pick a language to start your learning journey.
          </Text>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.replace("/language-select")}
          >
            <Text style={styles.primaryButtonText}>Choose a language</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const units = getUnitsByLanguage(selectedLanguage.id);
  const activeUnit = units[0];
  const lessons = activeUnit ? getLessonsByUnit(activeUnit.id) : [];
  const dailyGoal = 100;
  const xpProgress = Math.min((totalXp / dailyGoal) * 100, 100);
  const firstName = user?.firstName ?? "Learner";

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.headerLeft}
            activeOpacity={0.8}
            onPress={() => router.push("/language-select")}
          >
            <Text style={styles.flagBadge}>{selectedLanguage.flagEmoji}</Text>
            <Text style={styles.greetingText}>Hello, {firstName}! 👋</Text>
          </TouchableOpacity>

          <View style={styles.headerRight}>
            <View style={styles.streakChip}>
              <Text style={styles.streakText}>{streak}</Text>
            </View>
            <TouchableOpacity onPress={() => signOut()} hitSlop={10}>
              <Ionicons name="log-out-outline" size={22} color="#0F172A" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.goalCard}>
          <View style={styles.goalCopy}>
            <Text style={styles.goalLabel}>Daily goal</Text>
            <Text style={styles.goalValueRow}>
              <Text style={styles.goalValue}>{totalXp}</Text>
              <Text style={styles.goalValueMeta}> / {dailyGoal} XP</Text>
            </Text>
            <View style={styles.progressTrack}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${Math.round(xpProgress)}%` },
                ]}
              />
            </View>
          </View>
          <Image
            source={images.treasure}
            style={styles.goalImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.heroCard}>
          <View style={styles.heroTextWrap}>
            <Text style={styles.heroLabel}>Continue learning</Text>
            <Text style={styles.heroTitle}>{selectedLanguage.name}</Text>
            <Text style={styles.heroMeta}>Unit {activeUnit?.order ?? 1}</Text>
          </View>
          <TouchableOpacity
            style={styles.heroButton}
            onPress={() => router.push("/(tabs)/learn")}
          >
            <Text style={styles.heroButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Today&apos;s plan</Text>
          <TouchableOpacity onPress={() => router.push("/(tabs)/learn")}>
            <Text style={styles.sectionLink}>View all</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.planCard}>
          {lessons.slice(0, 3).map((lesson, index) => (
            <TouchableOpacity
              key={lesson.id}
              style={styles.planRow}
              onPress={() =>
                router.push({
                  pathname: "/lesson/[id]",
                  params: { id: lesson.id },
                })
              }
            >
              <View style={styles.planIconWrap}>
                <Text style={styles.planIcon}>{index + 1}</Text>
              </View>
              <View style={styles.planTextWrap}>
                <Text style={styles.planTitle}>{lesson.title}</Text>
                <Text style={styles.planSubtitle}>{lesson.type}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 100,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  flagBadge: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#E2E8F0",
    textAlign: "center",
    lineHeight: 34,
    fontSize: 20,
  },
  greetingText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  streakChip: {
    minWidth: 38,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#FFF7ED",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  streakText: {
    color: "#F59E0B",
    fontWeight: "700",
    fontSize: 14,
  },
  goalCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF7ED",
    borderRadius: 20,
    padding: 18,
    marginBottom: 18,
  },
  goalCopy: {
    flex: 1,
    paddingRight: 8,
  },
  goalLabel: {
    color: "#475569",
    fontSize: 12,
    marginBottom: 8,
  },
  goalValueRow: {
    alignItems: "baseline",
  },
  goalValue: {
    fontSize: 30,
    fontWeight: "800",
    color: "#0F172A",
  },
  goalValueMeta: {
    fontSize: 14,
    color: "#64748B",
  },
  progressTrack: {
    height: 8,
    borderRadius: 999,
    backgroundColor: "#FDE68A",
    marginTop: 12,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: "#F59E0B",
  },
  goalImage: {
    width: 68,
    height: 68,
  },
  heroCard: {
    backgroundColor: "#6D28D9",
    borderRadius: 22,
    padding: 18,
    marginBottom: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  heroTextWrap: {
    flex: 1,
    paddingRight: 12,
  },
  heroLabel: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 4,
  },
  heroMeta: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
  },
  heroButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  heroButtonText: {
    color: "#6D28D9",
    fontWeight: "700",
    fontSize: 13,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
  },
  sectionLink: {
    color: "#4F46E5",
    fontSize: 13,
    fontWeight: "600",
  },
  planCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 8,
  },
  planRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  planIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "#EDE9FE",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  planIcon: {
    color: "#6D28D9",
    fontWeight: "700",
    fontSize: 14,
  },
  planTextWrap: {
    flex: 1,
  },
  planTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 2,
  },
  planSubtitle: {
    fontSize: 12,
    color: "#64748B",
    textTransform: "capitalize",
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
    marginBottom: 18,
  },
  primaryButton: {
    backgroundColor: "#6D28D9",
    borderRadius: 14,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
  },
});
