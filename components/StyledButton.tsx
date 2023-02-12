import { Feather } from "@expo/vector-icons";
import {
  TouchableOpacity,
  View,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from "react-native";
import { Colors, Sizes } from "../constants";
import { SansText } from "./StyledText";

type ButtonProps = {
  text: string;
  rightIcon?: React.ComponentProps<typeof Feather>["name"];
  buttonStyle?: {};
  textStyle?: {};
  iconStyle?: {};
  loading?: boolean;
  onPress?: () => void;
};

export function Button({
  text,
  rightIcon,
  buttonStyle,
  textStyle,
  iconStyle,
  loading = false,
  onPress,
  ...otherProps
}: ButtonProps) {
  return (
    <TouchableOpacity
      {...otherProps}
      activeOpacity={0.7}
      disabled={loading}
      onPress={onPress}
    >
      <View
        style={{
          backgroundColor: Colors.primary,
          minHeight: Sizes.componentHeight,
          padding: Sizes.paddingLarge,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: rightIcon && !loading ? "space-between" : "center",
          borderRadius: Sizes.borderRadius,
          borderWidth: 2,
          borderColor: Colors.primary,
          width: "100%",
          ...buttonStyle,
        }}
      >
        {loading ? (
          <ActivityIndicator color={Colors.white} />
        ) : (
          <SansText
            style={{
              fontWeight: "bold",
              fontSize: Sizes.font,
              color: Colors.white,
              ...textStyle,
            }}
            fontType="bold"
          >
            {text}
          </SansText>
        )}
        {!loading && rightIcon && (
          <Feather name={rightIcon} size={Sizes.h3} color={Colors.white} />
        )}
      </View>
    </TouchableOpacity>
  );
}

type IconButtonProps = {
  name: React.ComponentProps<typeof Feather>["name"];
  onPress?: () => void;
  containerStyle?: ViewStyle;
  iconStyle?: ViewStyle & TextStyle;
};

export function IconButton({
  name: iconName,
  onPress,
  containerStyle,
  iconStyle,
}: IconButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={Sizes.activeOpacity}
      style={[
        {
          alignItems: "center",
        },
        containerStyle,
      ]}
      onPress={onPress}
    >
      <Feather name={iconName} size={25} style={iconStyle} />
    </TouchableOpacity>
  );
}
