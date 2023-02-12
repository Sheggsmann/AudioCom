import { StyleSheet, SafeAreaView, ScrollView, Platform } from "react-native";
import {
  TitlePage,
  View,
  IconButton,
  SansText,
  Button,
  CartItem,
} from "../components";
import { AppStackScreenProps } from "../types";
import { Colors, Sizes, Dummy, Layout } from "../constants";

export default function CartScreen({
  navigation,
}: AppStackScreenProps<"Cart">) {
  const renderTitle = (): JSX.Element => {
    return (
      <TitlePage
        containerStyle={{
          height: Sizes.componentHeight * 1.2,
        }}
        leftComponent={() => (
          <IconButton
            name="chevron-left"
            containerStyle={{
              flex: 1,
              alignItems: "flex-start",
              justifyContent: "center",
            }}
            onPress={() => navigation.goBack()}
          />
        )}
        middleComponent={() => (
          <SansText fontType="bold" style={{ fontSize: Sizes.body1 }}>
            Shopping Cart
          </SansText>
        )}
        rightComponent={() => (
          <IconButton
            name="trash-2"
            containerStyle={{
              alignItems: "flex-end",
              justifyContent: "center",
            }}
          />
        )}
      />
    );
  };

  const renderCartItems = (): JSX.Element => {
    return (
      <View style={{ paddingVertical: Sizes.paddingXL }}>
        {[...Dummy.featuredProducts, ...Dummy.featuredProducts].map(
          (product, index) => (
            <CartItem
              key={index.toString()}
              product={product}
              onAdd={() => {}}
            />
          )
        )}
      </View>
    );
  };

  const renderFooter = (): JSX.Element => {
    return (
      <View style={styles.footer}>
        <View style={styles.totalView}>
          <SansText style={{ fontSize: 12, color: Colors.greyDark }}>
            Total 2 Items
          </SansText>
          <SansText style={{ fontSize: Sizes.font }} fontType="bold">
            USD 295
          </SansText>
        </View>
        <Button text="Proceed to Checkout" rightIcon="chevron-right" />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderTitle()}
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: Sizes.paddingXL }}
        style={{ flex: 1 }}
      >
        {renderCartItems()}
      </ScrollView>
      {renderFooter()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  footer: {
    paddingHorizontal: Sizes.paddingLarge,
    paddingTop: Sizes.paddingLarge,
    paddingBottom: Layout.isSmallDevice || Platform.OS === "android" ? 10 : 0,
  },
  totalView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
});
