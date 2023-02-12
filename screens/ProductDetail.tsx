import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import {
  TitlePage,
  IconButton,
  Button,
  SansText,
  MontserratText,
  Review,
  Product,
} from "../components";
import { AppStackScreenProps } from "../types";
import { Sizes, Colors, Images, Dummy } from "../constants";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

enum Tabs {
  Overview,
  Features,
  Specification,
}

const IMAGE_WIDTH = 285;
const IMAGE_HEIGHT = 390;

export default function ProductDetail({
  navigation,
  route,
}: AppStackScreenProps<"ProductDetail">) {
  const safeArea = useSafeAreaInsets();
  const { product } = route.params;

  const [activeTab, setActiveTab] = useState<Tabs>(Tabs.Overview);
  const screenOpacity = useSharedValue(0);
  const translateY = useSharedValue(100);

  const rStyle = useAnimatedStyle(() => {
    return {
      opacity: screenOpacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  useEffect(() => {
    screenOpacity.value = 0;
    translateY.value = 100;

    screenOpacity.value = withTiming(1, { duration: 500 });
    translateY.value = withTiming(0, { duration: 500 });
  }, [activeTab]);

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
            onPress={() => navigation.goBack()}
          />
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

  const renderProductHeader = (): JSX.Element => {
    return (
      <View style={{ paddingHorizontal: Sizes.paddingXL }}>
        <SansText
          fontType="bold"
          style={{
            color: Colors.primary,
            fontSize: Sizes.font,
            marginBottom: 5,
          }}
        >
          {product?.currency} {product?.price}
        </SansText>
        <MontserratText fontType="bold" style={{ fontSize: Sizes.h2 + 4 }}>
          {product?.name}
        </MontserratText>
      </View>
    );
  };

  const renderTabs = (): JSX.Element => {
    return (
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          activeOpacity={Sizes.activeOpacity}
          style={styles.tabButton}
          onPress={() => setActiveTab(Tabs.Overview)}
        >
          <SansText style={styles.tabText}>Overview</SansText>
          <View
            style={[
              styles.bottomLine,
              {
                backgroundColor:
                  activeTab === Tabs.Overview ? Colors.primary : "transparent",
              },
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={Sizes.activeOpacity}
          style={styles.tabButton}
          onPress={() => setActiveTab(Tabs.Features)}
        >
          <SansText style={styles.tabText}>Features</SansText>
          <View
            style={[
              styles.bottomLine,
              {
                backgroundColor:
                  activeTab === Tabs.Features ? Colors.primary : "transparent",
              },
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={Sizes.activeOpacity}
          style={styles.tabButton}
          onPress={() => setActiveTab(Tabs.Specification)}
        >
          <SansText style={styles.tabText}>Specification</SansText>
          <View
            style={[
              styles.bottomLine,
              {
                backgroundColor:
                  activeTab === Tabs.Specification
                    ? Colors.primary
                    : "transparent",
              },
            ]}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderTabScreens = (): JSX.Element => {
    return activeTab === Tabs.Overview ? (
      <Animated.View style={[{ marginTop: Sizes.paddingXL * 1.4 }, rStyle]}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: Sizes.paddingXL }}
        >
          <View style={styles.overviewImage}>
            <Image
              source={Images.productDetail1}
              style={{ width: "100%", height: "100%" }}
            />
          </View>
          <View style={styles.overviewImage}>
            <Image
              source={Images.productDetail2}
              style={{ width: "100%", height: "100%" }}
            />
          </View>
        </ScrollView>

        <View style={styles.reviewContainer}>
          <SansText style={{ fontSize: Sizes.font }}>Review (102)</SansText>

          <View style={{ paddingVertical: Sizes.paddingXL }}>
            {Dummy.reviews.slice(0, 3).map((review, index) => (
              <Review
                key={index.toString()}
                review={review}
                containerStyle={{ marginBottom: Sizes.paddingXL }}
              />
            ))}
          </View>

          <View>
            <Button
              text="See All Reviews"
              buttonStyle={{ backgroundColor: Colors.white, borderWidth: 0 }}
              textStyle={{ color: Colors.grey, fontSize: 14 }}
            />
          </View>
        </View>
      </Animated.View>
    ) : (
      <Animated.View style={[{ marginTop: Sizes.paddingXL * 1.4 }, rStyle]}>
        <SansText
          fontType="bold"
          style={{
            paddingHorizontal: Sizes.paddingXL,
            fontSize: Sizes.font,
            marginBottom: 10,
          }}
        >
          Highly Detailed Audio
        </SansText>

        <View style={styles.productInfoContainer}>
          <SansText style={styles.paragraph}>
            The speaker unit contains a diaphragm that is precision-grown from
            NAC Audio bio-cellulose, making it stiffer, lighter and stronger
            than regular PET speaker units, and allowing the sound-producing
            diaphragm to vibrate without the levels of distortion found in other
            speakers.
          </SansText>
          <SansText style={styles.paragraph}>
            The speaker unit contains a diaphragm that is precision-grown from
            NAC Audio bio-cellulose, making it stiffer, lighter and stronger
            than regular PET speaker units, and allowing the sound-producing
            diaphragm to vibrate without the levels of distortion found in other
            speakers.
          </SansText>

          <View style={{ flexDirection: "row", marginBottom: 20 }}>
            <View style={{ flex: 1 }}>
              <Image source={Images.product5} />
            </View>
            <View style={{ flex: 2 }}>
              <SansText fontType="bold" style={styles.featureItemTitle}>
                APTX HD WIRELESS AUDIO
              </SansText>

              <SansText>
                The Aptx® HD codec transmits 24-bit hi-res audio, equal to or
                better than CD quality.
              </SansText>
            </View>
          </View>

          <View style={{ flexDirection: "row", marginBottom: 20 }}>
            <View style={{ flex: 1 }}>
              <Image source={Images.product4} />
            </View>
            <View style={{ flex: 2 }}>
              <SansText fontType="bold" style={styles.featureItemTitle}>
                ULTRA SOFT WITH ALCANTARA
              </SansText>

              <SansText>
                Alcantara® is a highly innovative material offering an
                unrivalled combination of
              </SansText>
            </View>
          </View>
        </View>
      </Animated.View>
    );
  };

  const renderOtherProducts = (): JSX.Element => {
    return (
      <View
        style={{
          backgroundColor: Colors.light.greyLight,
          paddingVertical: Sizes.paddingXL,
        }}
      >
        <View
          style={{
            paddingHorizontal: Sizes.paddingXL,
            paddingBottom: Sizes.paddingXL,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <SansText style={{ fontSize: Sizes.font }}>Another Product</SansText>

          <TouchableOpacity
            activeOpacity={Sizes.activeOpacity}
            onPress={() => navigation.navigate("Explore")}
          >
            <SansText
              style={{
                fontSize: 14,
                color: Colors.greyDark,
              }}
            >
              See All
            </SansText>
          </TouchableOpacity>
        </View>

        <FlatList
          contentContainerStyle={{
            paddingHorizontal: Sizes.paddingXL,
            backgroundColor: Colors.light.greyLight,
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={Dummy.featuredProducts}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => (
            <Product
              product={item}
              containerStyle={{
                marginRight:
                  index === Dummy.featuredProducts.length - 1
                    ? 0
                    : Sizes.paddingXL,
              }}
            />
          )}
        />
      </View>
    );
  };

  const renderCartButton = (): JSX.Element => {
    return (
      <View
        style={[styles.cartButtonContainer, { bottom: safeArea.bottom + 20 }]}
      >
        <Button text="Add To Cart" />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {renderTitle()}
        {renderProductHeader()}
        {renderTabs()}
        {renderTabScreens()}
        {activeTab === Tabs.Overview && renderOtherProducts()}
      </ScrollView>
      {renderCartButton()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  cartButtonContainer: {
    paddingHorizontal: Sizes.paddingXL,
    position: "absolute",
    width: "100%",
  },
  tabsContainer: {
    paddingHorizontal: Sizes.paddingXL,
    flexDirection: "row",
    marginTop: Sizes.paddingXL,
  },
  tabButton: {
    marginRight: Sizes.paddingXL,
    alignItems: "center",
    height: 35,
  },
  tabText: {
    fontSize: Sizes.font,
  },
  bottomLine: {
    width: 30,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.primary,
    position: "absolute",
    bottom: 0,
  },
  overviewImage: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    borderRadius: Sizes.borderRadius,
    backgroundColor: Colors.light.greyLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Sizes.paddingXL,
    overflow: "hidden",
  },
  reviewContainer: {
    paddingHorizontal: Sizes.paddingXL,
    paddingVertical: Sizes.paddingXL * 1.8,
  },
  productInfoContainer: {
    paddingHorizontal: Sizes.paddingXL,
  },
  paragraph: {
    marginBottom: 15,
    lineHeight: 22,
  },
  featureItemTitle: {
    fontSize: Sizes.body1,
    marginBottom: 8,
  },
});
