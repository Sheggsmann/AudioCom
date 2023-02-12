import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Pressable,
} from "react-native";
import { Dummy, Colors, Images, Sizes, Layout } from "../constants";
import { AppStackScreenProps, IProduct } from "../types";
import {
  TitlePage,
  IconButton,
  SansText,
  Input,
  CategoryList,
  Banner,
  Product,
} from "../components";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const BANNER_WIDTH = Layout.window.width * 0.9;
const EMPTY_ITEM_WIDTH = (Layout.window.width - BANNER_WIDTH) / 2;

export default function Home({ navigation }: AppStackScreenProps<"Home">) {
  const safeArea = useSafeAreaInsets();

  const [sliderProducts, setSliderProducts] = useState<IProduct[]>([
    // { id: -1 },
    ...Dummy.sliderProducts,
    // { id: -2 },
  ]);

  const [featuredProducts, setFeaturedProducts] = useState(
    Dummy.featuredProducts
  );

  const translateX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translateX.value = event.contentOffset.x;
    console.log(event.contentOffset.x);
  });

  const renderTitle = (): JSX.Element => {
    return (
      <TitlePage
        containerStyle={{ paddingBottom: 10 }}
        leftComponent={() => (
          <IconButton
            name="bar-chart-2"
            containerStyle={{
              flex: 1,
              alignItems: "flex-start",
              justifyContent: "center",
            }}
            iconStyle={{ transform: [{ scaleX: -1 }, { rotate: "-90deg" }] }}
          />
        )}
        middleComponent={() => (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={Images.logo}
              style={{
                width: 100,
                height: 50,
              }}
              resizeMode="contain"
            />
          </View>
        )}
        rightComponent={() => (
          <TouchableOpacity
            activeOpacity={Sizes.activeOpacity}
            style={{
              flex: 1,
              alignItems: "flex-end",
              justifyContent: "center",
            }}
            onPress={() => navigation.navigate("Profile")}
          >
            <Image
              source={Images.profile}
              style={{ width: Sizes.avatar }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      />
    );
  };

  const renderIntro = (): JSX.Element => {
    return (
      <View
        style={{
          paddingHorizontal: Sizes.paddingXL,
          paddingTop: Sizes.paddingMedium,
          paddingBottom: Sizes.paddingXL,
        }}
      >
        <SansText style={styles.nameText}>Hi, Promise</SansText>
        <SansText style={styles.questionText} fontType="bold">
          What are you looking for today?
        </SansText>
      </View>
    );
  };

  const renderSearch = (): JSX.Element => {
    return (
      <View style={{ paddingHorizontal: Sizes.paddingXL, marginBottom: 15 }}>
        <Pressable onPress={() => navigation.navigate("Search")}>
          <Input
            iconLeft="search"
            inputStyle={{ borderColor: Colors.light.grey, borderWidth: 1 }}
            placeholder="Search headphone"
            editable={false}
            pointerEvents="none"
          />
        </Pressable>
      </View>
    );
  };

  const renderTopProducts = (): JSX.Element => {
    return (
      <View style={styles.topProductsContainer}>
        <CategoryList
          categories={Dummy.categories}
          containerStyle={{ marginBottom: Sizes.paddingXL }}
        />

        <Animated.FlatList
          contentContainerStyle={{
            marginBottom: Sizes.paddingXL,
            backgroundColor: "green",
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
          decelerationRate={"fast"}
          scrollEventThrottle={16}
          snapToInterval={BANNER_WIDTH + 18.75}
          snapToAlignment="center"
          onScroll={scrollHandler}
          data={sliderProducts}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => {
            // if (index === 0 || index === sliderProducts.length - 1)
            //   return (
            //     <View
            //       style={{
            //         width: EMPTY_ITEM_WIDTH,
            //         backgroundColor: "red",
            //         height: 50,
            //       }}
            //     />
            //   );

            return (
              <Banner
                index={index}
                productName={item.name}
                image={item.image}
                translateX={translateX}
                contentsLength={sliderProducts.length}
                onPressShopNow={() =>
                  navigation.navigate("ProductDetail", { product: item })
                }
              />
            );
          }}
        />
      </View>
    );
  };

  const renderFeaturedProducts = (): JSX.Element => {
    return (
      <View style={styles.featuredProductsContainer}>
        <View style={styles.sectionTitle}>
          <SansText style={styles.sectionTitleText}>Featured Products</SansText>
          <TouchableOpacity
            activeOpacity={Sizes.activeOpacity}
            onPress={() => navigation.navigate("Explore")}
          >
            <SansText style={styles.viewAllText}>See All</SansText>
          </TouchableOpacity>
        </View>

        <FlatList
          contentContainerStyle={{
            paddingHorizontal: Sizes.paddingXL,
            backgroundColor: Colors.light.greyLight,
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={featuredProducts}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => (
            <Product
              product={item}
              containerStyle={{
                marginRight:
                  index === featuredProducts.length - 1 ? 0 : Sizes.paddingXL,
              }}
              onPress={() =>
                navigation.navigate("ProductDetail", { product: item })
              }
            />
          )}
        />
      </View>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: safeArea.top }]}>
      <FlatList
        ListHeaderComponent={
          <View style={{ backgroundColor: Colors.white }}>
            {renderTitle()}
            {renderIntro()}
            {renderSearch()}
            {renderTopProducts()}
            {renderFeaturedProducts()}
          </View>
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: Colors.light.greyLight,
        }}
        data={[]}
        renderItem={() => <></>}
        ListFooterComponent={() => <View style={{ height: 50 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  nameText: {
    fontSize: Sizes.font,
    marginBottom: 5,
  },
  questionText: {
    fontSize: Sizes.h2,
    lineHeight: 32,
  },
  topProductsContainer: {
    backgroundColor: Colors.light.greyLight,
    borderTopRightRadius: Sizes.borderRadius * 3.5,
    borderTopLeftRadius: Sizes.borderRadius * 3.5,
    paddingTop: 30,
  },
  featuredProductsContainer: {
    backgroundColor: Colors.light.greyLight,
  },
  sectionTitle: {
    paddingHorizontal: Sizes.paddingXL,
    marginBottom: Sizes.paddingXL,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sectionTitleText: {
    fontSize: Sizes.font,
  },
  viewAllText: {
    fontSize: Sizes.font - 2,
    color: Colors.greyDark,
  },
});
