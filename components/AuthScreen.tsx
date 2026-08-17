import { images } from "@/constants/images";
import Feather from "@expo/vector-icons/Feather";
import { Image } from "expo-image";
import { Link, router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type AuthMode = "sign-up" | "sign-in";

type AuthScreenProps = {
  mode: AuthMode;
};

const codeLength = 6;

export function AuthScreen({ mode }: AuthScreenProps) {
  const isSignUp = mode === "sign-up";
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isVerificationVisible, setIsVerificationVisible] = useState(false);
  const [verificationCode, setVerificationCode] = useState<string[]>(
    Array(codeLength).fill(""),
  );
  const inputRefs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    if (isVerificationVisible) {
      setVerificationCode(Array(codeLength).fill(""));
      setTimeout(() => inputRefs.current[0]?.focus(), 250);
    }
  }, [isVerificationVisible]);

  function openVerification() {
    setIsVerificationVisible(true);
  }

  function updateCode(value: string, index: number) {
    const digit = value.replace(/\D/g, "").slice(-1);
    const nextCode = [...verificationCode];
    nextCode[index] = digit;
    setVerificationCode(nextCode);

    if (digit && index < codeLength - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (digit && index === codeLength - 1) {
      setIsVerificationVisible(false);
      router.replace("/");
    }
  }

  function handleBackspace(index: number) {
    if (!verificationCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View className="flex-1 px-8 pb-8 pt-5">
        <TouchableOpacity
          accessibilityLabel="Go back"
          activeOpacity={0.75}
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Feather color="#001328" name="chevron-left" size={34} />
        </TouchableOpacity>

        <View className={isSignUp ? "mt-7" : "mt-3"}>
          <Text
            className={
              isSignUp
                ? "font-poppins-bold text-[30px] leading-5 text-text-primary"
                : "font-poppins-bold text-[36px] leading-7 text-text-primary"
            }
          >
            {isSignUp ? "Create your account" : "Welcome back"}
          </Text>
          <Text
            className={
              isSignUp
                ? "mt-2 font-poppins-medium text-[17px] leading-6 text-[#68708A]"
                : "mt-4 font-poppins-medium text-[21px] leading-7.5 text-[#68708A]"
            }
          >
            {isSignUp
              ? "Start your language journey today ✨"
              : "Continue your language journey today ✨"}
          </Text>
        </View>

        <View
          className={
            isSignUp
              ? "relative mt-0 h-52 items-center overflow-visible"
              : "relative mt-2 h-48.75 items-center overflow-hidden"
          }
        >
          <Text className="absolute left-21.5 top-20.5 text-[26px] text-[#FF9700]">
            ✦
          </Text>
          <Text className="absolute right-20 top-23 text-[26px] text-[#6AAEFF]">
            ✦
          </Text>
          <Text className="absolute right-24.5 top-33 text-[26px] text-[#FFD34A]">
            ✦
          </Text>
          <Image
            source={images.mascotAuth}
            contentFit="contain"
            style={[styles.mascot, isSignUp ? styles.mascotSignUp : null]}
          />
        </View>

        <View className={isSignUp ? "-mt-10 gap-4" : "-mt-7 gap-5"}>
          <View style={styles.inputBox}>
            <Text className="font-poppins-medium text-[18px] leading-6.25 text-[#717894]">
              Email
            </Text>
            <TextInput
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder="alex@gmail.com"
              placeholderTextColor="#001328"
              style={styles.textInput}
            />
          </View>

          {isSignUp ? (
            <View style={styles.inputBox}>
              <Text className="font-poppins-medium text-[18px] leading-6.25 text-[#717894]">
                Password
              </Text>
              <View style={styles.passwordRow}>
                <TextInput
                  placeholder="•••••••••"
                  placeholderTextColor="#001328"
                  secureTextEntry={!isPasswordVisible}
                  style={[styles.textInput, styles.passwordInput]}
                />
                <TouchableOpacity
                  accessibilityLabel="Toggle password visibility"
                  activeOpacity={0.75}
                  onPress={() => setIsPasswordVisible((current) => !current)}
                  style={styles.eyeButton}
                >
                  <Feather color="#6F7895" name="eye" size={27} />
                </TouchableOpacity>
              </View>
            </View>
          ) : null}
        </View>

        <TouchableOpacity
          activeOpacity={0.86}
          onPress={openVerification}
          style={styles.primaryButton}
        >
          <Text className="font-poppins-semibold text-[24px] leading-[24px] text-white">
            {isSignUp ? "Sign Up" : "Sign In"}
          </Text>
        </TouchableOpacity>

        <View className="my-7 flex-row items-center">
          <View className="h-0.5 flex-1 bg-[#EAECF2]" />
          <Text className="mx-4 font-poppins-medium text-[18px] leading-6.5 text-[#717894]">
            or continue with
          </Text>
          <View className="h-0.5 flex-1 bg-[#EAECF2]" />
        </View>

        <View className="gap-4">
          <SocialButton icon="google" label="Continue with Google" />
        </View>

        <View className="mt-auto items-center pt-4">
          <Text className="font-poppins-medium text-[18px] leading-7 text-[#717894]">
            {isSignUp ? "Already have an account? " : "Don't have an account? "}
            <Link
              href={isSignUp ? "/sign-in" : "/sign-up"}
              className="font-poppins-semibold text-lingua-deep-purple"
            >
              {isSignUp ? "Login" : "Sign up"}
            </Link>
          </Text>
        </View>
      </View>

      <Modal
        animationType="fade"
        onRequestClose={() => setIsVerificationVisible(false)}
        transparent
        visible={isVerificationVisible}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalRoot}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setIsVerificationVisible(false)}
            style={styles.modalBackdrop}
          />
          <View style={styles.modalCard}>
            <Text className="text-center font-poppins-bold text-[27px] leading-8.75 text-text-primary">
              Check your email
            </Text>
            <Text className="mt-3 text-center font-poppins-medium text-[16px] leading-6.25 text-[#68708A]">
              You have received an email. Enter the 6-digit verification code.
            </Text>

            <View className="mt-7 flex-row justify-between">
              {verificationCode.map((digit, index) => (
                <TextInput
                  key={index}
                  keyboardType="number-pad"
                  maxLength={1}
                  onChangeText={(value) => updateCode(value, index)}
                  onKeyPress={({ nativeEvent }) => {
                    if (nativeEvent.key === "Backspace") {
                      handleBackspace(index);
                    }
                  }}
                  ref={(input) => {
                    inputRefs.current[index] = input;
                  }}
                  style={styles.codeInput}
                  textContentType="oneTimeCode"
                  value={digit}
                />
              ))}
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}

type SocialButtonProps = {
  icon: "google";
  label: string;
};

function SocialButton({ icon, label }: SocialButtonProps) {
  return (
    <TouchableOpacity activeOpacity={0.82} style={styles.socialButton}>
      <View style={styles.socialIcon}>
        <Text className="font-poppins-bold text-[32px] leading-9 text-[#4285F4]">
          G
        </Text>
      </View>
      <Text className="font-poppins-medium text-[21px] leading-7.25 text-text-primary">
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  backButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: -8,
  },
  mascot: {
    width: 300,
    height: 300,
    marginTop: 5,
  },
  mascotSignUp: {
    width: 220,
    height: 220,
    marginTop: -6,
  },
  inputBox: {
    height: 105,
    borderWidth: 1.5,
    borderColor: "#ECEEF5",
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
    paddingTop: 18,
    justifyContent: "center",
  },
  textInput: {
    height: 46,
    padding: 0,
    marginTop: 7,
    fontFamily: "Poppins-Medium",
    fontSize: 21,
    lineHeight: 29,
    color: "#001328",
  },
  passwordInput: {
    flex: 1,
    marginRight: 10,
    minWidth: 0,
  },
  passwordRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 7,
  },
  eyeButton: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButton: {
    height: 82,
    borderRadius: 17,
    marginTop: 25,
    backgroundColor: "#6542F4",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#3D24C9",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 5,
  },
  socialButton: {
    height: 72,
    borderWidth: 1.5,
    borderColor: "#F0F1F6",
    borderRadius: 19,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  socialIcon: {
    position: "absolute",
    left: 54,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  modalRoot: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 19, 40, 0.38)",
  },
  modalCard: {
    marginHorizontal: 22,
    marginBottom: 26,
    borderRadius: 26,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 22,
    paddingTop: 28,
    paddingBottom: 30,
  },
  codeInput: {
    width: 48,
    height: 58,
    borderWidth: 1.5,
    borderColor: "#ECEEF5",
    borderRadius: 14,
    textAlign: "center",
    fontFamily: "Poppins-SemiBold",
    fontSize: 24,
    color: "#001328",
  },
});
