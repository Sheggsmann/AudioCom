import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { Colors, Sizes } from "../constants";
import { TextInput, TextInputProps, View } from "./Themed";
import { SansText } from "./StyledText";
import { ViewStyle } from "react-native";

const HEIGHT = 55;

type CustomProps = TextInputProps & {
  iconLeft?: React.ComponentProps<typeof Feather>["name"];
  iconStyles?: {};
  iconSize?: number;
  containerStyle?: ViewStyle;
  inputStyle?: ViewStyle;
  error?: string;
};

export default function Input({
  iconLeft,
  iconStyles,
  iconSize,
  containerStyle,
  inputStyle,
  error,
  ...otherProps
}: CustomProps) {
  const [isActive, setIsActive] = useState(false);

  return (
    <View
      style={{
        ...styles.container,
        ...containerStyle,
      }}
    >
      <View
        style={{
          ...styles.wrapper,
          borderColor: error
            ? "pink"
            : isActive
            ? Colors.primary
            : Colors.white,
          ...inputStyle,
        }}
      >
        {iconLeft && (
          <Feather
            name={iconLeft}
            size={30}
            style={[styles.icon, iconStyles]}
          />
        )}

        <TextInput
          style={styles.textInput}
          placeholderTextColor={Colors.light.grey}
          onFocus={() => setIsActive(true)}
          onBlur={() => setIsActive(false)}
          {...otherProps}
        />
      </View>

      {error && (
        <View style={styles.errorContainer}>
          <SansText style={styles.errorText}>{error}</SansText>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: "transparent",
    marginBottom: 10,
  },
  wrapper: {
    width: "100%",
    height: HEIGHT,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: Sizes.borderRadius,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "white",
  },
  textInput: {
    flex: 1,
    fontFamily: "dm-sans",
    fontSize: Sizes.font,
    height: HEIGHT,
    padding: 15,
  },
  icon: {
    color: Colors.grey,
    paddingLeft: 15,
  },
  errorContainer: {
    width: "100%",
    alignSelf: "center",
    marginTop: 5,
    backgroundColor: "transparent",
  },
  errorText: {
    color: "pink",
    fontSize: 14,
  },
});
