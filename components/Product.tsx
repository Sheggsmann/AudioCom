import { StyleSheet, Image, ViewStyle } from "react-native";
import { View } from "./Themed";
import { IProduct } from "../types";
import { Colors, Sizes, Layout, Images } from "../constants";
import { SansText } from "./StyledText";
import { IconButton } from "./StyledButton";
import { TouchableOpacity } from "react-native-gesture-handler";

const PRODUCT_WIDTH = Layout.window.width * 0.5;
const PRODUCT_HEIGHT = 212;

type ProductProps = {
  product: IProduct;
  index?: number;
  containerStyle?: ViewStyle;
  textContainerStyle?: ViewStyle;
  detailedProduct?: boolean;
  onPress?: () => void;
};

export default function Product({
  product,
  textContainerStyle,
  containerStyle,
  detailedProduct,
  onPress,
}: ProductProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={Sizes.activeOpacity}
      style={[styles.container, containerStyle]}
    >
      <View style={styles.imageContainer}>
        <Image
          source={product.image}
          style={styles.productImage}
          resizeMode="contain"
        />
      </View>
      <View style={[styles.productInfoContainer, textContainerStyle]}>
        <SansText style={{ marginBottom: 4 }}>{product?.name}</SansText>
        <SansText fontType="bold">
          {product?.currency} {product?.price}
        </SansText>
      </View>

      {detailedProduct && (
        <View style={styles.extraInfoContainer}>
          <Image
            source={Images.star}
            style={styles.starIcon}
            resizeMode="contain"
          />
          <SansText
            style={{
              marginLeft: Sizes.paddingSmall,
              marginRight: Sizes.paddingMedium,
              fontSize: 10,
              marginTop: 2,
            }}
          >
            4.6
          </SansText>
          <SansText style={{ flex: 1, fontSize: 10, marginTop: 2 }}>
            86 Reviews
          </SansText>
          <IconButton
            name="more-vertical"
            iconStyle={{ color: Colors.greyDark }}
            containerStyle={{
              width: 40,
              alignItems: "flex-end",
              zIndex: 1,
            }}
          />
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    width: PRODUCT_WIDTH,
    height: PRODUCT_HEIGHT,
    borderRadius: Sizes.borderRadius,
    padding: Sizes.borderRadius,
    justifyContent: "space-between",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 3,
  },
  productInfoContainer: {
    flex: 1,
    padding: 10,
  },
  productImage: {
    width: 125,
    height: 125,
  },
  extraInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  starIcon: {
    width: Sizes.font - 6,
    height: Sizes.font - 6,
  },
});
