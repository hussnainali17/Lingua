import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface VerificationModalProps {
  visible: boolean;
  onComplete: (code: string) => Promise<boolean>;
  onClose: () => void;
}

export default function VerificationModal({
  visible,
  onComplete,
  onClose,
}: VerificationModalProps) {
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDigitPress = async (digit: string) => {
    if (isVerifying) return;

    const emptyIndex = code.findIndex((c) => c === "");
    if (emptyIndex !== -1) {
      const newCode = [...code];
      newCode[emptyIndex] = digit;
      setCode(newCode);
      setError(null);

      if (emptyIndex === 5) {
        const fullCode = newCode.join("");
        setIsVerifying(true);
        const success = await onComplete(fullCode);
        setIsVerifying(false);
        if (!success) {
          setError("Invalid code. Please try again.");
          setCode(["", "", "", "", "", ""]);
        }
      }
    }
  };

  const handleBackspace = () => {
    if (isVerifying) return;
    const lastFilledIndex = code.findLastIndex((c) => c !== "");
    if (lastFilledIndex !== -1) {
      const newCode = [...code];
      newCode[lastFilledIndex] = "";
      setCode(newCode);
      setError(null);
    }
  };

  const resetCode = () => {
    setCode(["", "", "", "", "", ""]);
    setError(null);
    setIsVerifying(false);
  };

  const handleResend = () => {
    resetCode();
  };

  useEffect(() => {
    if (!visible) {
      resetCode();
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={onClose}
            style={styles.overlay}
          />

          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>

            <Text style={styles.heading}>Verify your email</Text>

            <Text style={styles.subtitle}>
              We&apos;ve sent a verification code to your email. Enter the
              6-digit code below.
            </Text>

            <View style={styles.codeContainer}>
              {code.map((digit, index) => (
                <View
                  key={index}
                  style={[styles.codeBox, error ? styles.codeBoxError : null]}
                >
                  <Text style={styles.codeText}>{digit}</Text>
                </View>
              ))}
            </View>

            {error && (
              <Text className="mb-4 text-center text-sm text-red-500 font-poppins-regular">
                {error}
              </Text>
            )}

            <View style={styles.numberPad}>
              <View style={styles.padRow}>
                {["1", "2", "3"].map((num) => (
                  <TouchableOpacity
                    key={num}
                    style={styles.padButton}
                    onPress={() => handleDigitPress(num)}
                    activeOpacity={0.7}
                    disabled={isVerifying}
                  >
                    <Text style={styles.padButtonText}>{num}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.padRow}>
                {["4", "5", "6"].map((num) => (
                  <TouchableOpacity
                    key={num}
                    style={styles.padButton}
                    onPress={() => handleDigitPress(num)}
                    activeOpacity={0.7}
                    disabled={isVerifying}
                  >
                    <Text style={styles.padButtonText}>{num}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.padRow}>
                {["7", "8", "9"].map((num) => (
                  <TouchableOpacity
                    key={num}
                    style={styles.padButton}
                    onPress={() => handleDigitPress(num)}
                    activeOpacity={0.7}
                    disabled={isVerifying}
                  >
                    <Text style={styles.padButtonText}>{num}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.padRow}>
                <TouchableOpacity
                  style={[styles.padButton, { flex: 1 }]}
                  onPress={() => handleDigitPress("0")}
                  activeOpacity={0.7}
                  disabled={isVerifying}
                >
                  <Text style={styles.padButtonText}>0</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.padButton, { flex: 1 }]}
                  onPress={handleBackspace}
                  activeOpacity={0.7}
                  disabled={isVerifying}
                >
                  <Ionicons name="backspace" size={24} color="#000" />
                </TouchableOpacity>
              </View>
            </View>

            <Text style={styles.helpText}>
              Didn&apos;t receive the code?{" "}
              <Text style={styles.resendLink} onPress={handleResend}>
                Resend
              </Text>
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
    maxHeight: "90%",
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 8,
    marginRight: -8,
    marginTop: -8,
  },
  heading: {
    fontSize: 24,
    fontWeight: "600",
    color: "#000",
    marginBottom: 8,
    fontFamily: "poppins-semibold",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 24,
    lineHeight: 20,
    fontFamily: "poppins-regular",
  },
  codeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
    paddingHorizontal: 8,
  },
  codeBox: {
    width: 48,
    height: 56,
    borderWidth: 2,
    borderColor: "#e0e0e0",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f9f9f9",
  },
  codeBoxError: {
    borderColor: "#ef4444",
    backgroundColor: "#fef2f2",
  },
  codeText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
    fontFamily: "poppins-semibold",
  },
  numberPad: {
    marginBottom: 24,
  },
  padRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  padButton: {
    flex: 1,
    height: 56,
    borderRadius: 12,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 6,
  },
  padButtonText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#000",
    fontFamily: "poppins-semibold",
  },
  helpText: {
    fontSize: 13,
    color: "#666",
    textAlign: "center",
    fontFamily: "poppins-regular",
  },
  resendLink: {
    color: "#6366f1",
    fontWeight: "600",
    fontFamily: "poppins-semibold",
  },
});
