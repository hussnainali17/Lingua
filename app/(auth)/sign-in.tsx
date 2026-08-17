import SocialButton from "@/components/SocialButton";
import VerificationModal from "@/components/VerificationModal";
import { images } from "@/constants/images";
import { useSignIn, useSSO } from "@clerk/expo";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { type Href, router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useState } from "react";
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

WebBrowser.maybeCompleteAuthSession();

export default function SignInScreen() {
  const { signIn, errors, fetchStatus } = useSignIn();
  type SSOStrategy = "oauth_google" | "oauth_facebook" | "oauth_apple";
  // const { startOAuthFlow: startGoogleOAuth } = useOAuth({
  //   strategy: "oauth_google",
  // });
  const { startSSOFlow } = useSSO();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);

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

  const handleSignIn = async () => {
    if (!email || !password) return;
    setIsSubmitting(true);

    const { error } = await signIn.password({
      emailAddress: email,
      password,
    });

    if (error) {
      console.error(JSON.stringify(error, null, 2));
      setIsSubmitting(false);
      return;
    }

    if (signIn.status === "complete") {
      await signIn.finalize({
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
    } else if (signIn.status === "needs_client_trust") {
      const emailCodeFactor = signIn.supportedSecondFactors.find(
        (factor) => factor.strategy === "email_code",
      );

      if (emailCodeFactor) {
        await signIn.mfa.sendEmailCode();
        setIsSubmitting(false);
        setShowVerification(true);
      }
    } else {
      console.error("Sign-in attempt not complete:", signIn);
      setIsSubmitting(false);
    }
  };

  const handleVerificationComplete = async (code: string) => {
    const result = await signIn.mfa.verifyEmailCode({ code });

    if (result.error) {
      console.error(JSON.stringify(result.error, null, 2));
      return false;
    }

    if (signIn.status === "complete") {
      await signIn.finalize({
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

    console.error("Sign-in attempt not complete:", signIn);
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
            Welcome back
          </Text>

          {/* Subtitle */}
          <Text className="text-base text-text-secondary mb-6">
            Continue your language journey ✨
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
            <View style={styles.input}>
              <TextInput
                placeholder="Email"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.textInputField}
              />
            </View>
            {errors?.fields?.identifier && (
              <Text className="mt-1 ml-1 text-xs text-red-500 font-poppins-regular">
                {errors.fields.identifier.message}
              </Text>
            )}
          </View>

          {/* Password input */}
          <View className="mb-6">
            <View style={styles.input}>
              <TextInput
                placeholder="Password"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.textInputField}
              />
            </View>
            {errors?.fields?.password && (
              <Text className="mt-1 ml-1 text-xs text-red-500 font-poppins-regular">
                {errors.fields.password.message}
              </Text>
            )}
          </View>

          {/* Sign In button */}
          <TouchableOpacity
            className="bg-lingua-purple rounded-2xl items-center justify-center py-4 mb-6"
            activeOpacity={0.85}
            onPress={handleSignIn}
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
              {isSubmitting ? "Signing in..." : "Sign In"}
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

          {/* Sign Up link */}
          <View className="flex-row items-center justify-center">
            <Text className="text-sm text-text-secondary">
              Don&apos;t have an account?{" "}
            </Text>
            <TouchableOpacity onPress={() => router.push("/(auth)/sign-up")}>
              <Text className="text-sm text-lingua-purple font-poppins-semibold">
                Sign up
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
    paddingHorizontal: 16,
    backgroundColor: "#f9f9f9",
  },
  textInputField: {
    paddingVertical: 12,
    fontSize: 16,
    color: "#000",
    fontFamily: "poppins-regular",
  },
});
