import { useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Colors, Sizes } from "../constants";
import { SansText } from "./StyledText";
import { IProduct } from "../types";
import { TouchableOpacity } from "react-native-gesture-handler";
import { IconButton } from "./StyledButton";
import { Feather } from "@expo/vector-icons";

type CartItemProps = {
  onAdd?: () => void;
  onSubtract?: () => void;
  onRemove?: () => void;
  product: IProduct;
};

export default function CartItem({
  onAdd,
  onSubtract,
  onRemove,
  product,
}: CartItemProps) {
  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: Colors.light.greyLight,
          height: Sizes.componentHeight * 1.8,
          aspectRatio: 1,
          borderRadius: Sizes.borderRadius,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={product?.image}
          resizeMode="contain"
          style={{ width: "75%", height: "75%" }}
        />
      </View>
      <View
        style={{
          flex: 2,
          marginLeft: Sizes.paddingMedium,
        }}
      >
        <View style={{ flex: 2 }}>
          <SansText
            style={{ fontSize: Sizes.font, marginBottom: 2 }}
            numberOfLines={1}
          >
            {product?.name}
          </SansText>
          <SansText
            fontType="bold"
            style={{ fontSize: Sizes.font }}
            numberOfLines={1}
          >
            {product?.currency} {product?.price}
          </SansText>
        </View>
        <View
          style={{
            flex: 1.5,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={styles.stepperContainer}>
            <TouchableOpacity
              style={styles.stepperButton}
              activeOpacity={Sizes.activeOpacity}
            >
              <Feather name="minus" size={Sizes.font * 1.5} />
            </TouchableOpacity>
            <SansText
              style={{
                fontSize: Sizes.body1,
                width: 60,
                textAlign: "center",
              }}
            >
              10
            </SansText>
            <TouchableOpacity
              style={styles.stepperButton}
              activeOpacity={Sizes.activeOpacity}
            >
              <Feather name="plus" size={Sizes.font * 1.5} />
            </TouchableOpacity>
          </View>
          <IconButton
            name="trash-2"
            onPress={onRemove}
            iconStyle={{ color: Colors.light.grey }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: Sizes.paddingLarge * 2,
    height: Sizes.componentHeight * 1.8,
    alignItems: "center",
  },
  stepperButton: {
    width: 35,
    height: 35,
    borderRadius: Sizes.borderRadius,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    borderColor: Colors.light.grey,
  },
  stepperContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
