import VerificationModal from "@/components/VerificationModal";
import { images } from "@/constants/images";
import { useSignUp, useSSO } from "@clerk/expo";
import { AntDesign, Ionicons } from "@expo/vector-icons";

import SocialButton from "@/components/SocialButton";
import * as Linking from "expo-linking";
import { type Href, router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useState } from "react";
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type SSOStrategy = "oauth_google" | "oauth_facebook" | "oauth_apple";

WebBrowser.maybeCompleteAuthSession();

export default function SignUpScreen() {
  const { signUp, errors, fetchStatus } = useSignUp();
  const { startSSOFlow } = useSSO();
  // const { startOAuthFlow: startGoogleOAuth } = useOAuth({
  //   strategy: "oauth_google",
  // });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // useEffect(() => {
  //   void WebBrowser.warmUpAsync();
  //   return () => {
  //     void WebBrowser.coolDownAsync();
  //   };
  // }, []);

  // const handleGoogleAuth = useCallback(async () => {
  //   try {
  //     const { createdSessionId, setActive } = await startGoogleOAuth();
  //     if (createdSessionId) {
  //       await setActive?.({ session: createdSessionId });
  //       router.replace("/home");
  //     }
  //   } catch (err) {
  //     console.error("Google OAuth error", JSON.stringify(err, null, 2));
  //   }
  // }, [startGoogleOAuth]);

  const handleSignUp = async () => {
    if (!email || !password) return;
    setIsSubmitting(true);

    const { error } = await signUp.password({
      emailAddress: email,
      password,
    });

    if (error) {
      console.error(JSON.stringify(error, null, 2));
      setIsSubmitting(false);
      return;
    }

    if (!error) {
      await signUp.verifications.sendEmailCode();
      setIsSubmitting(false);
      setShowVerification(true);
    }
  };
  const handleSSO = async (strategy: SSOStrategy) => {
    const { createdSessionId, setActive } = await startSSOFlow({
      strategy,
      redirectUrl: Linking.createURL("/"),
    });
    if (createdSessionId && setActive) {
      await setActive({ session: createdSessionId });
      router.replace("/");
    }
  };

  const handleVerificationComplete = async (code: string) => {
    const result = await signUp.verifications.verifyEmailCode({ code });

    if (result.error) {
      console.error(JSON.stringify(result.error, null, 2));
      return false;
    }

    if (signUp.status === "complete") {
      await signUp.finalize({
        navigate: ({ session, decorateUrl }) => {
          if (session?.currentTask) {
            console.log(session?.currentTask);
            return;
          }
          const url = decorateUrl("/(tabs)");
          if (url.startsWith("http")) {
            window.location.href = url;
          } else {
            router.push(url as Href);
          }
        },
      });
      return true;
    }

    console.error("Sign-up attempt not complete:", signUp);
    return false;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View className="flex-1 px-6 pb-6">
          {/* Back button */}
          <TouchableOpacity
            onPress={() => router.back()}
            className="mb-6"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="chevron-back" size={28} color="#000" />
          </TouchableOpacity>

          {/* Heading */}
          <Text className="text-3xl font-poppins-bold text-text-primary mb-2">
            Create your account
          </Text>

          {/* Subtitle */}
          <Text className="text-base text-text-secondary mb-6">
            Start your language journey today ✨
          </Text>

          {/* Mascot illustration */}
          <View className="h-32 mb-8">
            <Image
              source={images.mascotAuth}
              className="w-full h-full"
              resizeMode="contain"
            />
          </View>

          {/* Email input */}
          <View className="mb-4">
            <TextInput
              placeholder="Email"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
            />
            {errors?.fields?.emailAddress && (
              <Text className="mt-1 text-xs text-red-500 font-poppins-regular">
                {errors.fields.emailAddress.message}
              </Text>
            )}
          </View>

          {/* Password input */}
          <View className="mb-6">
            <View style={styles.passwordContainer}>
              <TextInput
                placeholder="Password"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                style={[styles.passwordInput]}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons
                  name={showPassword ? "eye" : "eye-off"}
                  size={20}
                  color="#999"
                />
              </TouchableOpacity>
            </View>
            {errors?.fields?.password && (
              <Text className="mt-1 text-xs text-red-500 font-poppins-regular">
                {errors.fields.password.message}
              </Text>
            )}
          </View>

          {/* Sign Up button */}
          <TouchableOpacity
            className="bg-lingua-purple rounded-2xl items-center justify-center py-4 mb-6"
            activeOpacity={0.85}
            onPress={handleSignUp}
            disabled={
              !email || !password || isSubmitting || fetchStatus === "fetching"
            }
            style={
              !email || !password || isSubmitting || fetchStatus === "fetching"
                ? { opacity: 0.5 }
                : {}
            }
          >
            <Text className="font-poppins-semibold text-lg text-white">
              {isSubmitting ? "Creating account..." : "Sign Up"}
            </Text>
          </TouchableOpacity>

          {/* Divider */}
          <View className="flex-row items-center mb-6">
            <View className="flex-1 h-px bg-gray-300" />
            <Text className="px-4 text-sm text-text-secondary">
              or continue with
            </Text>
            <View className="flex-1 h-px bg-gray-300" />
          </View>

          {/* Social */}
          <SocialButton
            icon={<AntDesign name="google" size={20} color="#DB4437" />}
            label="Continue with Google"
            onPress={() => handleSSO("oauth_google")}
          />

          <TouchableOpacity
            className="flex-row items-center border border-gray-300 rounded-2xl px-6 py-4 mb-3"
            activeOpacity={0.7}
          >
            <Ionicons name="logo-facebook" size={20} color="#1877F2" />
            <Text className="flex-1 text-base text-text-primary font-poppins-medium ml-3">
              Continue with Facebook
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center border border-gray-300 rounded-2xl px-6 py-4 mb-6"
            activeOpacity={0.7}
          >
            <Ionicons name="logo-apple" size={20} color="#000" />
            <Text className="flex-1 text-base text-text-primary font-poppins-medium ml-3">
              Continue with Apple
            </Text>
          </TouchableOpacity>

          {/* Sign In link */}
          <View className="flex-row items-center justify-center">
            <Text className="text-sm text-text-secondary">
              Already have an account?{" "}
            </Text>
            <TouchableOpacity onPress={() => router.push("/(auth)/sign-in")}>
              <Text className="text-sm text-lingua-purple font-poppins-semibold">
                Log in
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>

      {/* Verification Modal */}
      <VerificationModal
        visible={showVerification}
        onComplete={handleVerificationComplete}
        onClose={() => setShowVerification(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#000",
    fontFamily: "poppins-regular",
    backgroundColor: "#f9f9f9",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 16,
    paddingHorizontal: 16,
    backgroundColor: "#f9f9f9",
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: "#000",
    fontFamily: "poppins-regular",
  },
});
