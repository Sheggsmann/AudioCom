import { useState } from "react";
import { StyleSheet, SafeAreaView, Image, ScrollView } from "react-native";
import { AppStackScreenProps } from "../types";
import { View, Input, TitlePage, IconButton, SansText } from "../components";
import { Colors, Dummy, Images, Sizes } from "../constants";
import { Feather } from "@expo/vector-icons";

export default function SearchScreen({
  navigation,
}: AppStackScreenProps<"Search">) {
  const [latestSearch, setLatestSearch] = useState([
    { name: "TMA-2 Wireless" },
    { name: "Cable" },
  ]);

  const [products, setProducts] = useState(Dummy.featuredProducts);

  const renderTitle = (): JSX.Element => {
    return (
      <TitlePage
        leftComponent={() => (
          <IconButton
            name="chevron-left"
            containerStyle={{
              flex: 1,
              alignItems: "flex-start",
              justifyContent: "center",
            }}
            onPress={() => navigation.navigate("Home")}
          />
        )}
        middleComponent={() => (
          <SansText fontType="bold" style={{ fontSize: Sizes.body1 }}>
            Search
          </SansText>
        )}
        rightComponent={() => (
          <IconButton
            name="shopping-cart"
            containerStyle={{
              alignItems: "flex-end",
              justifyContent: "center",
            }}
            onPress={() => navigation.navigate("Cart")}
          />
        )}
      />
    );
  };

  const renderSearchBar = (): JSX.Element => {
    return (
      <View style={{ paddingHorizontal: Sizes.paddingXL, marginVertical: 15 }}>
        <Input
          iconLeft="search"
          inputStyle={{ borderColor: Colors.light.grey, borderWidth: 1 }}
          placeholder="Search headphone"
        />
      </View>
    );
  };

  const renderLatestSearch = (): JSX.Element => {
    return (
      <View
        style={{
          paddingHorizontal: Sizes.paddingXL,
          marginBottom: 15,
        }}
      >
        <SansText style={{ fontSize: Sizes.body1 }}>Latest Search</SansText>

        <View style={{ marginTop: 10 }}>
          {latestSearch.map((item, index) => (
            <View key={index.toString()} style={styles.latestSearchItem}>
              <Feather
                name="clock"
                color={Colors.grey}
                size={Sizes.h3}
                style={{ marginRight: 10 }}
              />
              <SansText style={{ flex: 1, fontSize: Sizes.font }}>
                {item.name}
              </SansText>
              <IconButton
                name="x"
                iconStyle={{ width: Sizes.h3, height: Sizes.h3 }}
                onPress={() =>
                  setLatestSearch((prev) =>
                    prev.filter((product) => product.name !== item.name)
                  )
                }
              />
            </View>
          ))}
        </View>
      </View>
    );
  };

  const renderPopularProducts = (): JSX.Element => {
    return (
      <View style={{ paddingHorizontal: Sizes.paddingXL }}>
        <View>
          <SansText style={{ fontSize: Sizes.body1 }}>
            Popular Products
          </SansText>
        </View>

        {products.map((product, index) => (
          <View key={index.toString()} style={styles.productRow}>
            <View
              style={{
                backgroundColor: Colors.light.greyLight,
                padding: 10,
                borderRadius: Sizes.borderRadius,
              }}
            >
              <Image source={product.image} style={styles.productImage} />
            </View>

            <View
              style={{
                marginLeft: Sizes.paddingLarge,
                justifyContent: "space-between",
                flex: 1,
              }}
            >
              <View>
                <SansText style={{ fontSize: Sizes.font }}>
                  {product.name}
                </SansText>
                <SansText fontType="bold">
                  {product.currency} {product.price}
                </SansText>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    source={Images.star}
                    resizeMode="contain"
                    style={{ width: Sizes.font, height: Sizes.font }}
                  />
                  <SansText style={{ marginHorizontal: 10 }}>4.6</SansText>
                  <SansText>86 Reviews</SansText>
                </View>
                <IconButton
                  name="more-vertical"
                  iconStyle={{ color: Colors.greyDark }}
                />
              </View>
            </View>
          </View>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        {renderTitle()}
        {renderSearchBar()}
        {renderLatestSearch()}
        {renderPopularProducts()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  latestSearchItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Sizes.paddingLarge,
  },
  productRow: {
    marginTop: Sizes.paddingXL,
    flexDirection: "row",
  },
  productImage: {
    width: 60,
    height: 60,
  },
});
