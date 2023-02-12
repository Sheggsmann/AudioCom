import { View } from "./Themed";
import { Sizes, Layout } from "../constants";
import { ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type TitlePageProps = {
  leftComponent?: () => JSX.Element;
  middleComponent?: () => JSX.Element;
  rightComponent?: () => JSX.Element;
  containerStyle?: ViewStyle;
};

export default function TitlePage({
  leftComponent,
  middleComponent,
  rightComponent,
  containerStyle,
}: TitlePageProps) {
  const safeArea = useSafeAreaInsets();

  return (
    <View
      style={{
        width: "100%",
        height: Layout.window.height * 0.08,
        paddingHorizontal: Sizes.paddingXL,
        flexDirection: "row",
        ...containerStyle,
      }}
    >
      <View style={{ flex: 1, justifyContent: "center" }}>
        {leftComponent && leftComponent()}
      </View>
      <View style={{ flex: 4, justifyContent: "center", alignItems: "center" }}>
        {middleComponent && middleComponent()}
      </View>
      <View style={{ flex: 1, justifyContent: "center" }}>
        {rightComponent && rightComponent()}
      </View>
    </View>
  );
}
