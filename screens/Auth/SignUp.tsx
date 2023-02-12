import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { SansText, Button, Input } from "../../components";
import { RootStackScreenProps } from "../../types";
import { Layout, Colors, Images, Sizes } from "../../constants";
import { useState } from "react";

export default function SignUp({ navigation }: RootStackScreenProps<"SignUp">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <ImageBackground source={Images.backgroundImage} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <KeyboardAvoidingView
          style={styles.container}
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

            <Button text="Sign Up" />

            <View style={styles.socialLoginContainer}>
              <TouchableOpacity
                style={styles.socialIconButton}
                activeOpacity={Sizes.activeOpacity}
              >
                <Image
                  source={Images.appleIcon}
                  style={styles.socialIconImg}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.socialIconButton}
                activeOpacity={Sizes.activeOpacity}
              >
                <Image
                  source={Images.facebookIcon}
                  style={styles.socialIconImg}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.socialIconButton}
                activeOpacity={Sizes.activeOpacity}
              >
                <Image
                  source={Images.googleIcon}
                  style={styles.socialIconImg}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.footer}>
              <TouchableOpacity
                activeOpacity={Sizes.activeOpacity}
                style={{ flexDirection: "row" }}
                onPress={() => navigation.navigate("SignIn")}
              >
                <SansText style={styles.infoText}>
                  Already have an account?
                </SansText>
                <SansText style={styles.signInLink}>Sign In here</SansText>
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
    marginBottom: Layout.window.height * 0.31,
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
  },
  infoText: {
    color: Colors.white,
    fontSize: Sizes.font,
  },
  signInLink: {
    color: Colors.primary,
    fontSize: Sizes.font,
    marginLeft: Sizes.paddingRegular,
    textDecorationColor: Colors.primary,
    textDecorationLine: "underline",
  },
  socialLoginContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: Sizes.paddingXL,
  },
  socialIconImg: {
    width: Sizes.h2,
    height: Sizes.h2,
  },
  socialIconButton: {
    width: 60,
    height: 60,
    borderRadius: Sizes.borderRadius,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: Sizes.paddingMedium,
  },
});
