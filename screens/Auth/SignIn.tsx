import {
  StyleSheet,
  ImageBackground,
  View,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { SansText, Button, Input } from "../../components";
import { RootStackScreenProps } from "../../types";
import { Layout, Colors, Images, Sizes } from "../../constants";
import { useState } from "react";
import { useHeaderHeight } from "@react-navigation/elements";

export default function SignIn({ navigation }: RootStackScreenProps<"SignIn">) {
  const headerHeight = useHeaderHeight();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigation.replace("AppNavigation");
    }, 500);
  };

  return (
    <ImageBackground source={Images.backgroundImage} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <KeyboardAvoidingView
          style={styles.container}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : headerHeight + 47}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.titleContainer}>
            <SansText style={styles.title}>Audio</SansText>
            <SansText style={styles.subTitle}>
              It's modular and designed to last
            </SansText>
          </View>

          <View style={styles.bottomContainer}>
            <Input
              iconLeft="mail"
              placeholder="Email"
              keyboardType="email-address"
              value={email}
              onChangeText={(email) => setEmail(email)}
            />
            <Input
              value={password}
              onChangeText={(password) => setPassword(password)}
              iconLeft="lock"
              placeholder="Password"
              secureTextEntry
            />

            <View
              style={{
                alignSelf: "center",
                marginVertical: Sizes.paddingLarge,
              }}
            >
              <SansText
                style={styles.forgotText}
                fontType="bold"
                onPress={() => console.log("Forgot Password")}
              >
                Forgot Password
              </SansText>
            </View>

            <Button text="Sign In" loading={loading} onPress={onSubmit} />

            <View style={styles.footer}>
              <TouchableOpacity
                activeOpacity={Sizes.activeOpacity}
                style={{ flexDirection: "row" }}
                onPress={() => navigation.navigate("SignUp")}
              >
                <SansText style={styles.infoText}>
                  Don't have an account?
                </SansText>
                <SansText style={styles.signUpLink}>Sign Up here</SansText>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  titleContainer: {
    backgroundColor: "transparent",
    alignItems: "center",
    marginBottom: Layout.window.height * 0.35,
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    color: Colors.light.white,
    letterSpacing: 0.7,
  },
  subTitle: {
    fontSize: 14,
    color: Colors.light.white,
    letterSpacing: 0.2,
  },
  bottomContainer: {
    width: "85%",
    marginBottom: 50,
  },
  forgotText: {
    fontSize: Sizes.font,
    color: Colors.white,
    fontWeight: "bold",
  },
  footer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: Sizes.paddingXL,
  },
  infoText: {
    color: Colors.white,
    fontSize: Sizes.font,
  },
  signUpLink: {
    color: Colors.primary,
    fontSize: Sizes.font,
    marginLeft: Sizes.paddingRegular,
    textDecorationColor: Colors.primary,
    textDecorationLine: "underline",
  },
});
