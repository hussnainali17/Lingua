import Feather from "@expo/vector-icons/Feather";
import { Tabs } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type TabName = "index" | "learn" | "ai-teacher" | "chat" | "profile";

interface TabConfig {
  name: TabName;
  label: string;
  icon: keyof typeof Feather.glyphMap;
}

const TABS: TabConfig[] = [
  { name: "index", label: "Home", icon: "home" },
  { name: "learn", label: "Learn", icon: "book-open" },
  { name: "ai-teacher", label: "AI Teacher", icon: "cpu" },
  { name: "chat", label: "Chat", icon: "message-circle" },
  { name: "profile", label: "Profile", icon: "user" },
];

const TAB_BAR_HEIGHT = 70;
const TAB_ICON_SIZE = 22;
const CIRCLE_SIZE = 48;

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={({ navigation }) => {
        const state = navigation.getState();
        const activeIndex = state?.index ?? 0;

        return (
          <View style={styles.tabBarContainer}>
            <View style={[styles.tabBar, { height: TAB_BAR_HEIGHT }]}>
              {TABS.map((tab, index) => {
                const isActive = activeIndex === index;

                return (
                  <TouchableOpacity
                    key={tab.name}
                    activeOpacity={0.7}
                    style={styles.tabItem}
                    onPress={() => {
                      navigation.navigate(tab.name as any);
                    }}
                  >
                    {/* Active tab: icon only inside purple circle, no label */}
                    {isActive ? (
                      <View style={styles.activeCircle}>
                        <Feather
                          name={tab.icon}
                          size={TAB_ICON_SIZE}
                          color="#FFFFFF"
                        />
                      </View>
                    ) : (
                      <>
                        <Feather
                          name={tab.icon}
                          size={TAB_ICON_SIZE}
                          color="#9CA3AF"
                        />
                        <Text style={styles.label}>{tab.label}</Text>
                      </>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        );
      }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="learn" />
      <Tabs.Screen name="ai-teacher" />
      <Tabs.Screen name="chat" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
    alignItems: "center",
  },
  tabItem: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  activeCircle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: "#6C4EF5",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#6C4EF5",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  label: {
    fontSize: 10,
    color: "#9CA3AF",
    fontFamily: "Poppins-Medium",
    marginTop: 4,
  },
});
