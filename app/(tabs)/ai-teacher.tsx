import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AITeacherTabScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View className="flex-1 items-center justify-center">
        <Text className="h2 text-text-primary">AI Teacher</Text>
        <Text className="body-md text-text-secondary mt-2">
          AI Teacher screen coming soon
        </Text>
      </View>
    </SafeAreaView>
  );
}
