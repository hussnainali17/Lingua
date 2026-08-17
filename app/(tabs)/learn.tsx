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

export default function LearnScreen() {
  const router = useRouter();
  const selectedLanguage = useLanguageStore((state) => state.selectedLanguage);
  const lessonStatuses = useLessonStore((state) => state.lessonStatuses);

  if (!selectedLanguage) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>No language selected</Text>
          <Text style={styles.emptyText}>
            Go back and pick the language you want to learn.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const units = getUnitsByLanguage(selectedLanguage.id);
  const activeUnit = units[0];
  const lessons = activeUnit ? getLessonsByUnit(activeUnit.id) : [];
  const completedCount = lessons.filter(
    (lesson) => lessonStatuses[lesson.id] === "completed",
  ).length;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={10}>
          <Ionicons name="chevron-back" size={24} color="#0F172A" />
        </TouchableOpacity>

        <Text style={styles.headerTitle} numberOfLines={1}>
          {activeUnit?.title ?? "Lessons"}
        </Text>

        <TouchableOpacity hitSlop={10}>
          <Ionicons name="bookmark-outline" size={22} color="#0F172A" />
        </TouchableOpacity>
      </View>

      <Text style={styles.metaText}>
        Unit {activeUnit?.order ?? 1} · {completedCount}/{lessons.length}{" "}
        lessons
      </Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.heroContainer}>
          <Image
            source={images.palace}
            style={styles.heroImage}
            resizeMode="cover"
          />
        </View>

        <View style={styles.tabsRow}>
          <View style={styles.tabActive}>
            <Text style={styles.tabTextActive}>Lessons</Text>
          </View>
          <View style={styles.tabInactive}>
            <Text style={styles.tabTextInactive}>Practice</Text>
          </View>
        </View>

        <View style={styles.lessonList}>
          {lessons.map((lesson, index) => {
            const status = lessonStatuses[lesson.id] ?? "available";
            const isCompleted = status === "completed";

            return (
              <TouchableOpacity
                key={lesson.id}
                style={[
                  styles.lessonCard,
                  isCompleted && styles.lessonCardCompleted,
                ]}
                onPress={() =>
                  router.push({
                    pathname: "/lesson/[id]",
                    params: { id: lesson.id },
                  })
                }
              >
                <View style={styles.lessonIndexWrap}>
                  <Text style={styles.lessonIndexText}>{index + 1}</Text>
                </View>

                <View style={styles.lessonTextWrap}>
                  <Text style={styles.lessonTitle}>{lesson.title}</Text>
                  <Text style={styles.lessonMeta}>{lesson.type}</Text>
                </View>

                <View style={styles.lessonStatusWrap}>
                  <Text style={styles.lessonStatusText}>
                    {isCompleted
                      ? "Done"
                      : status === "in-progress"
                        ? "In progress"
                        : "Start"}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
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
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  headerTitle: {
    flex: 1,
    color: "#0F172A",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginHorizontal: 8,
  },
  metaText: {
    textAlign: "center",
    color: "#64748B",
    fontSize: 12,
    marginBottom: 14,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  heroContainer: {
    height: 180,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 18,
    backgroundColor: "#FFFFFF",
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  tabsRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
    marginBottom: 16,
  },
  tabActive: {
    paddingBottom: 10,
    marginRight: 18,
    borderBottomWidth: 2,
    borderBottomColor: "#6D28D9",
  },
  tabInactive: {
    paddingBottom: 10,
  },
  tabTextActive: {
    color: "#6D28D9",
    fontWeight: "700",
    fontSize: 14,
  },
  tabTextInactive: {
    color: "#64748B",
    fontWeight: "600",
    fontSize: 14,
  },
  lessonList: {
    gap: 12,
  },
  lessonCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
  },
  lessonCardCompleted: {
    backgroundColor: "#F5F3FF",
  },
  lessonIndexWrap: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "#EDE9FE",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  lessonIndexText: {
    color: "#6D28D9",
    fontWeight: "700",
  },
  lessonTextWrap: {
    flex: 1,
  },
  lessonTitle: {
    color: "#0F172A",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 2,
  },
  lessonMeta: {
    color: "#64748B",
    fontSize: 12,
    textTransform: "capitalize",
  },
  lessonStatusWrap: {
    marginLeft: 8,
  },
  lessonStatusText: {
    color: "#6D28D9",
    fontSize: 12,
    fontWeight: "700",
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
    color: "#64748B",
    fontSize: 14,
    textAlign: "center",
  },
});
