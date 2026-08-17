import { images } from "@/constants/images";
import { languages } from "@/data/languages";
import { useLanguageStore } from "@/store/language-store";
import type { Language } from "@/types/learning";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LanguageSelectScreen() {
  const selectedLanguage = useLanguageStore((state) => state.selectedLanguage);
  const setSelectedLanguage = useLanguageStore(
    (state) => state.setSelectedLanguage,
  );
  const [selectedLanguageId, setSelectedLanguageId] = useState<string>(
    selectedLanguage?.id ?? languages[0]?.id ?? "",
  );
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (selectedLanguage?.id) {
      setSelectedLanguageId(selectedLanguage.id);
    }
  }, [selectedLanguage]);

  const filtered = languages.filter((lang) =>
    lang.name.toLowerCase().includes(search.toLowerCase()),
  );

  const renderItem = ({ item }: { item: Language }) => {
    const isSelected = item.id === selectedLanguageId;
    return (
      <TouchableOpacity
        onPress={() => setSelectedLanguageId(item.id)}
        className={`flex-row items-center py-3.5 px-3.5 bg-white border-[1.5px] rounded-[14px] ${isSelected ? "bg-[rgba(108,78,245,0.08)] border-lingua-purple" : "border-transparent"}`}
        activeOpacity={0.8}
      >
        <Text style={styles.flag}>{item.flagEmoji}</Text>
        <View className="flex-1 ml-3">
          <Text className="font-poppins-semibold text-base text-text-primary">
            {item.name}
          </Text>
          <Text className="body-sm text-text-secondary">{item.nativeName}</Text>
        </View>
        {isSelected ? (
          <View className="w-6.5 h-6.5 rounded-full bg-lingua-purple items-center justify-center">
            <Ionicons name="checkmark" size={14} color="#fff" />
          </View>
        ) : (
          <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View className="flex-row items-center px-4 py-3">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-8 h-8 items-center justify-center"
        >
          <Ionicons name="chevron-back" size={24} color="#001328" />
        </TouchableOpacity>
        <Text className="flex-1 text-center font-poppins-semibold text-lg text-text-primary">
          Choose a language
        </Text>
        <View className="w-8" />
      </View>

      <View className="px-4 mb-4">
        <View className="flex-row items-center bg-surface rounded-2xl px-4 py-3">
          <Ionicons name="search-outline" size={18} color="#9ca3af" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search languages"
            placeholderTextColor="#9ca3af"
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      <Text className="px-4 font-poppins-semibold text-base text-text-primary mb-2">
        Popular
      </Text>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View className="h-px bg-gray-200" />}
      />

      <View className="px-4 pt-3 pb-3">
        <TouchableOpacity
          className="bg-lingua-purple rounded-2xl items-center py-4"
          activeOpacity={0.85}
          testID="language-confirm-button"
          onPress={() => {
            const selectedLang =
              languages.find((l) => l.id === selectedLanguageId) ??
              selectedLanguage ??
              languages[0];

            if (!selectedLang) return;

            setSelectedLanguage(selectedLang);
            router.replace("/(tabs)");
          }}
        >
          <Text className="font-poppins-semibold text-base text-white">
            Continue
          </Text>
        </TouchableOpacity>
      </View>

      <Image
        source={images.earth}
        style={styles.earthImage}
        resizeMode="cover"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flag: {
    width: 44,
    height: 44,
    lineHeight: 44,
    textAlign: "center",
    fontSize: 28,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    backgroundColor: "#f3f4f6",
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#001328",
    padding: 0,
  },
  listContent: {
    paddingHorizontal: 16,
  },
  earthImage: {
    width: "100%",
    height: 130,
  },
});
