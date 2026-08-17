import Feather from "@expo/vector-icons/Feather";
import { images } from "@/constants/images";
import { Image } from "expo-image";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OnboardingScreen() {
  const { height, width } = useWindowDimensions();
  const isCompact = height < 820;
  const isNarrow = width < 390;
  const logoSize = isCompact ? 44 : 70;
  const mascotSize = Math.min(
    width * (isNarrow ? 0.72 : 0.78),
    isCompact ? 285 : 410,
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <View
        className="flex-1"
        style={[
          styles.screen,
          {
            paddingHorizontal: isNarrow ? 30 : 40,
            paddingBottom: isCompact ? 22 : 36,
            paddingTop: isCompact ? 8 : 20,
          },
        ]}
      >
        <View
          className="flex-row items-center justify-center"
          style={{ marginTop: isCompact ? 2 : 12 }}
        >
          <Image
            source={images.mascotLogo}
            contentFit="contain"
            style={{ width: logoSize, height: logoSize }}
          />
          <Text
            className="ml-2 font-poppins-bold text-text-primary"
            style={{
              fontSize: isCompact ? 31 : 36,
              lineHeight: isCompact ? 37 : 43,
            }}
          >
            muolingo
          </Text>
        </View>

        <View style={{ marginTop: isCompact ? 42 : 64 }}>
          <Text
            className="font-poppins-bold text-text-primary"
            style={{
              fontSize: isCompact ? 36 : 43,
              lineHeight: isCompact ? 50 : 59,
            }}
          >
            Your AI language{"\n"}
            <Text className="text-lingua-deep-purple">teacher</Text>.
          </Text>
          <Text
            className="font-poppins-medium text-[#666B82]"
            style={{
              marginTop: isCompact ? 22 : 20,
              fontSize: isCompact ? 20 : 23,
              lineHeight: isCompact ? 30 : 41,
            }}
          >
            Real conversations, personalized{"\n"}lessons, anytime, anywhere.
          </Text>
        </View>

        <View
          className="relative flex-1 items-center overflow-hidden"
          style={{ marginTop: isCompact ? 20 : 28 }}
        >
          <View
            className="absolute left-0 rounded-2xl bg-[#EFF8FF]"
            style={styles.helloBubble}
          >
            <Text
              className="font-poppins-medium text-text-primary"
              style={styles.bubbleText}
            >
              Hello!
            </Text>
            <View
              className="absolute bottom-[-9px] right-6 h-5 w-5 bg-[#EFF8FF]"
              style={styles.bubbleTail}
            />
          </View>

          <View
            className="absolute right-4 top-0 rounded-2xl bg-[#F5F3FF]"
            style={styles.holaBubble}
          >
            <Text
              className="font-poppins-medium italic text-lingua-deep-purple"
              style={styles.bubbleText}
            >
              iHola!
            </Text>
            <View
              className="absolute bottom-[-8px] left-7 h-5 w-5 bg-[#F5F3FF]"
              style={styles.bubbleTail}
            />
          </View>

          <View
            className="absolute right-0 rounded-2xl bg-[#FFF5F0]"
            style={styles.nihaoBubble}
          >
            <Text
              className="font-poppins-medium text-[#FF4A32]"
              style={styles.bubbleText}
            >
              你好!
            </Text>
            <View
              className="absolute bottom-[-8px] left-7 h-5 w-5 bg-[#FFF5F0]"
              style={styles.bubbleTail}
            />
          </View>

          <Image
            source={images.mascotWelcome}
            contentFit="contain"
            style={[
              styles.mascot,
              {
                width: mascotSize,
                height: mascotSize,
                marginTop: isCompact ? 98 : 95,
              },
            ]}
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.86}
          onPress={() => router.push("/sign-up")}
          style={[styles.button, { height: isCompact ? 86 : 96 }]}
        >
          <Text className="font-poppins-semibold text-[24px] leading-[32px] text-white">
            Get Started
          </Text>
          <Feather color="#FFFFFF" name="chevron-right" size={36} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  screen: {
    backgroundColor: "#FFFFFF",
  },
  helloBubble: {
    top: 6,
    paddingHorizontal: 22,
    paddingVertical: 13,
    transform: [{ rotate: "-6deg" }],
  },
  holaBubble: {
    paddingHorizontal: 22,
    paddingVertical: 13,
    transform: [{ rotate: "10deg" }],
  },
  nihaoBubble: {
    top: 82,
    paddingHorizontal: 22,
    paddingVertical: 13,
    transform: [{ rotate: "10deg" }],
  },
  bubbleText: {
    fontSize: 22,
    lineHeight: 28,
  },
  bubbleTail: {
    transform: [{ rotate: "45deg" }],
  },
  mascot: {
    flexShrink: 1,
  },
  button: {
    borderRadius: 26,
    backgroundColor: "#5B3BF6",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 70,
    shadowColor: "#3D24C9",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 5,
  },
});
