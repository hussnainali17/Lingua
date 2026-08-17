import { useLanguageStore } from "@/store/language-store";
import { useAuth, useClerk, useUser } from "@clerk/expo";
import { Redirect, router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();
  const { signOut } = useClerk();
  const selectedLanguage = useLanguageStore((state) => state.selectedLanguage);
  const clearSelectedLanguage = useLanguageStore(
    (state) => state.clearSelectedLanguage,
  );

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  const handleSignOut = () => {
    signOut();
  };

  const handleClearSelection = () => {
    clearSelectedLanguage();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-3xl font-poppins-bold text-text-primary mb-2">
          Welcome! 🎉
        </Text>
        <Text className="text-base text-text-secondary text-center mb-6">
          You have successfully logged in and verified your email
        </Text>
        {user?.emailAddresses?.[0]?.emailAddress && (
          <Text className="text-sm text-text-secondary mb-8 font-poppins-medium">
            Signed in as {user.emailAddresses[0].emailAddress}
          </Text>
        )}

        {/* Selected Language Display */}
        {selectedLanguage && (
          <TouchableOpacity
            className="mb-6 items-center"
            activeOpacity={0.8}
            onPress={() => router.push("/language-select")}
          >
            <Text className="text-2xl mb-1">{selectedLanguage.flagEmoji}</Text>
            <Text className="font-poppins-semibold text-lg text-text-primary">
              {selectedLanguage.name} ({selectedLanguage.nativeName})
            </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          className="bg-lingua-green rounded-2xl items-center justify-center px-8 py-3 mb-3"
          activeOpacity={0.85}
          onPress={() => router.push("/language-select")}
        >
          <Text className="font-poppins-semibold text-base text-white">
            Change Language
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-lingua-deep-purple rounded-2xl items-center justify-center px-8 py-3 mb-3"
          activeOpacity={0.85}
          onPress={handleClearSelection}
        >
          <Text className="font-poppins-semibold text-base text-white">
            Clear Selection (Test)
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-lingua-purple rounded-2xl items-center justify-center px-8 py-3"
          activeOpacity={0.85}
          onPress={handleSignOut}
        >
          <Text className="font-poppins-semibold text-base text-white">
            Sign Out
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
