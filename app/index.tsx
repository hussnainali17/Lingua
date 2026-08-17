import { useLanguageStore } from "@/store/language-store";
import { useAuth } from "@clerk/expo";
import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const { isSignedIn, isLoaded } = useAuth();
  const selectedLanguage = useLanguageStore((state) => state.selectedLanguage);

  if (!isLoaded) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#6542F4" />
      </View>
    );
  }

  if (isSignedIn) {
    if (!selectedLanguage) {
      return <Redirect href="/language-select" />;
    }
    return <Redirect href="/(tabs)" />;
  }

  return <Redirect href="/onboarding" />;
}
