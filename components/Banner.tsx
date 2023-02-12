import { Feather } from "@expo/vector-icons";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { Colors, Sizes, Layout } from "../constants";
import { SansText, MontserratText } from "./StyledText";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

const BANNER_WIDTH = Layout.window.width * 0.9;
const BANNER_HEIGHT = 178;

console.log(BANNER_WIDTH);

type BannerProps = {
  onPressShopNow?: () => void;
  productName?: string;
  image: any;
  index: number;
  contentsLength: number;
  containerStyle?: ViewStyle;
  translateX: Animated.SharedValue<number>;
};

export default function Banner({
  productName,
  image,
  index,
  contentsLength,
  onPressShopNow,
  containerStyle,
  translateX,
}: BannerProps) {
  const rStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      [
        (index - 2) * BANNER_WIDTH,
        (index - 1) * BANNER_WIDTH,
        index * BANNER_WIDTH,
      ],
      [0.8, 1, 0.8],
      Extrapolate.CLAMP
    );

    console.log("\n");
    console.log("INDEX: ", index);
    console.log("TRANSLATE X VALUE: ", translateX.value);
    console.log("SCALE: ", scale);

    return {
      // marginHorizontal: index === 1 || index === contentsLength - 2 ? 0 : 18.75,
      transform: [{ scale: withSpring(scale) }],
    };
  });

  return (
    <Animated.View style={[styles.container, rStyle]}>
      <View style={styles.left}>
        <MontserratText fontType="bold" style={styles.productNameText}>
          {productName}
        </MontserratText>
        <TouchableOpacity
          onPress={onPressShopNow}
          style={styles.shopNowBtn}
          activeOpacity={Sizes.activeOpacity}
        >
          <SansText style={styles.shopNowText} fontType="bold">
            Shop now
          </SansText>
          <Feather
            name="arrow-right"
            style={styles.shopNowIcon}
            size={Sizes.h3}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.right}>
        <Image
          source={image}
          resizeMode="contain"
          style={styles.productImage}
        />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: BANNER_WIDTH,
    height: BANNER_HEIGHT,
    backgroundColor: Colors.white,
    borderRadius: Sizes.borderRadius,
    padding: Sizes.paddingXL,
    // marginHorizontal: Sizes.paddingXL,
  },
  left: {
    flex: 1,
    marginRight: Sizes.borderRadius,
    justifyContent: "space-between",
  },
  right: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  productNameText: {
    fontSize: Sizes.h3,
  },
  productImage: {
    width: "100%",
    height: 135,
  },
  shopNowBtn: {
    flexDirection: "row",
    alignItems: "center",
  },
  shopNowText: {
    color: Colors.primary,
    fontSize: Sizes.font,
  },
  shopNowIcon: {
    color: Colors.primary,
    marginLeft: 8,
  },
});
