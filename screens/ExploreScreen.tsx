import { useState, useEffect } from "react";
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Pressable,
  Keyboard,
  Platform,
} from "react-native";
import {
  View,
  TitlePage,
  IconButton,
  SansText,
  MontserratText,
  Product,
  CategoryList,
  Button,
  Input,
} from "../components";
import { AppStackScreenProps } from "../types";
import { Colors, Dummy, Layout, Sizes, Images } from "../constants";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { ScrollView } from "react-native-gesture-handler";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Layout.window;

const PRODUCT_WIDTH =
  SCREEN_WIDTH * 0.5 - (Sizes.paddingXL + Sizes.borderRadius);

const FILTER_BOTTOMSHEET_HEIGHT = SCREEN_HEIGHT * 0.63;

export default function ExploreScreen({
  navigation,
}: AppStackScreenProps<"Explore">) {
  const safeArea = useSafeAreaInsets();

  const [products, setProducts] = useState(Dummy.exploreProducts);
  const [filterVisible, setFilterVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>(Dummy.filterBy[0]);

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

  const renderHeader = (): JSX.Element => {
    return (
      <View style={styles.header}>
        <View>
          <SansText style={styles.headerTitle}>Headphone</SansText>
          <MontserratText fontType="bold" style={styles.headerSubtitle}>
            TMA Wireless
          </MontserratText>
        </View>
      </View>
    );
  };

  const renderFilterSection = (): JSX.Element => {
    return (
      <View style={styles.filterSectionContainer}>
        <View style={{ width: 100 }}>
          <TouchableOpacity
            activeOpacity={Sizes.activeOpacity}
            style={styles.filterButton}
            onPress={() => setFilterVisible(true)}
          >
            <Image
              source={Images.sliderIcon}
              resizeMode="contain"
              style={{ width: Sizes.h3, height: Sizes.h3 }}
            />
            <SansText style={{ marginLeft: Sizes.borderRadius }}>
              Filter
            </SansText>
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={Dummy.filterBy}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={{
                marginLeft: Sizes.paddingLarge + 4,
                minHeight: 25,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <SansText>{item}</SansText>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  };

  const renderCard = (): JSX.Element => {
    return <View style={styles.card}></View>;
  };

  // Bottom Sheet Animations
  const translateY = useSharedValue(SCREEN_HEIGHT);

  const rStyle = useAnimatedStyle(() => {
    return {
      top: translateY.value,
    };
  });

  useEffect(() => {
    if (filterVisible) {
      translateY.value = withTiming(SCREEN_HEIGHT - FILTER_BOTTOMSHEET_HEIGHT, {
        duration: 300,
      });
    }
  }, [filterVisible]);

  const closeFilterModal = () => {
    setFilterVisible(false);
  };

  const renderFilterModal = (): JSX.Element => {
    const closeModal = () => {
      translateY.value = withTiming(
        SCREEN_HEIGHT,
        { duration: 250 },
        (isFinished) => {
          if (isFinished) runOnJS(closeFilterModal)();
        }
      );
    };

    const restoreFilterModalToDefault = () => {
      Keyboard.dismiss();
      translateY.value = withTiming(SCREEN_HEIGHT - FILTER_BOTTOMSHEET_HEIGHT);
    };

    return (
      <>
        {filterVisible && (
          <View
            style={{
              position: "absolute",
              width: SCREEN_WIDTH,
              height: SCREEN_HEIGHT,
              top: 0,
              backgroundColor: "rgba(0,0,0,0.6)",
              justifyContent: "flex-end",
            }}
          >
            <Pressable
              style={{
                width: SCREEN_WIDTH,
                height: SCREEN_HEIGHT - FILTER_BOTTOMSHEET_HEIGHT,
                position: "absolute",
                top: 0,
              }}
              onPress={closeModal}
            />
            <Animated.View style={[styles.modalContainer, rStyle]}>
              <ScrollView onResponderEnd={restoreFilterModalToDefault}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: Sizes.paddingXL,
                  }}
                >
                  <SansText fontType="bold" style={{ fontSize: Sizes.h2 }}>
                    Filter
                  </SansText>
                  <IconButton name="x" onPress={closeModal} />
                </View>

                <View style={{ marginVertical: Sizes.paddingLarge }}>
                  <SansText style={styles.filterSectionTitle}>
                    Category
                  </SansText>
                  <CategoryList categories={Dummy.categories} />
                </View>

                {/* Sort By */}
                <View style={{ marginBottom: Sizes.paddingLarge }}>
                  <SansText style={styles.filterSectionTitle}>Sort By</SansText>

                  <View
                    style={{
                      flexWrap: "wrap",
                      flexDirection: "row",
                      paddingHorizontal: Sizes.paddingXL,
                    }}
                  >
                    {Dummy.filterBy.map((filterText, index) => (
                      <TouchableOpacity
                        activeOpacity={Sizes.activeOpacity}
                        style={[
                          styles.filterByButton,
                          {
                            backgroundColor:
                              activeFilter === filterText
                                ? Colors.primary
                                : "transparent",
                            borderColor:
                              activeFilter === filterText
                                ? Colors.primary
                                : Colors.light.greyLight,
                          },
                        ]}
                        key={index.toString()}
                        onPress={() => setActiveFilter(filterText)}
                      >
                        <SansText
                          style={{
                            color:
                              activeFilter === filterText
                                ? Colors.white
                                : Colors.greyDark,
                          }}
                        >
                          {filterText}
                        </SansText>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                {/* Price Range */}
                <View style={{ marginBottom: Sizes.paddingLarge }}>
                  <SansText style={styles.filterSectionTitle}>
                    Price Range
                  </SansText>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      paddingHorizontal: Sizes.paddingXL,
                    }}
                  >
                    <Input
                      containerStyle={{
                        flex: 1,
                        marginRight: Sizes.paddingMedium,
                      }}
                      placeholder="Min Price"
                      inputStyle={{ borderColor: Colors.light.greyLight2 }}
                      keyboardType="numeric"
                      onFocus={() => {
                        translateY.value = withTiming(SCREEN_HEIGHT * 0.1);
                      }}
                      onBlur={restoreFilterModalToDefault}
                    />
                    <Input
                      containerStyle={{
                        flex: 1,
                        marginLeft: Sizes.paddingMedium,
                      }}
                      placeholder="Max Price"
                      inputStyle={{ borderColor: Colors.light.greyLight2 }}
                      keyboardType="number-pad"
                      onFocus={() => {
                        translateY.value = withTiming(SCREEN_HEIGHT * 0.1);
                      }}
                      onBlur={restoreFilterModalToDefault}
                    />
                  </View>
                </View>

                <View style={{ paddingHorizontal: Sizes.paddingXL }}>
                  <Button text="Apply Filter" />
                </View>
              </ScrollView>
            </Animated.View>
          </View>
        )}
      </>
    );
  };

  return (
    <>
      <View style={[styles.container, { paddingTop: safeArea.top }]}>
        {renderTitle()}
        <FlatList
          contentContainerStyle={{
            backgroundColor: Colors.light.greyLight2,
            flexGrow: 1,
          }}
          ListHeaderComponent={
            <View style={{ backgroundColor: Colors.white }}>
              {renderHeader()}
              {renderFilterSection()}
              {renderCard()}
            </View>
          }
          data={products}
          keyExtractor={(_, index) => index.toString()}
          numColumns={2}
          renderItem={({ item, index }) => {
            return (
              <Product
                product={item}
                containerStyle={{
                  marginLeft:
                    index % 2 === 0 ? Sizes.paddingXL : Sizes.borderRadius,
                  marginRight:
                    index % 2 === 1 ? Sizes.paddingXL : Sizes.borderRadius,
                  marginBottom: Sizes.borderRadius * 2,
                  width: PRODUCT_WIDTH,
                }}
                textContainerStyle={{ padding: 2 }}
                detailedProduct
                onPress={() =>
                  navigation.navigate("ProductDetail", { product: item })
                }
              />
            );
          }}
          ListFooterComponent={
            <View
              style={{
                height: Sizes.componentHeight,
                backgroundColor: Colors.light.greyLight2,
              }}
            />
          }
        />
      </View>
      {renderFilterModal()}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    paddingHorizontal: Sizes.paddingXL,
    paddingVertical: Sizes.paddingRegular,
  },
  headerTitle: {
    fontSize: Sizes.font,
    marginBottom: Sizes.borderRadius,
  },
  headerSubtitle: {
    fontSize: Sizes.h2,
  },
  filterSectionContainer: {
    paddingHorizontal: Sizes.paddingXL,
    paddingTop: Sizes.paddingLarge,
    flexDirection: "row",
    alignItems: "center",
  },
  filterButton: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.light.grey,
    borderRadius: Sizes.borderRadius,
    width: 90,
  },
  card: {
    marginTop: 30,
    height: 40,
    backgroundColor: Colors.light.greyLight,
    borderTopRightRadius: Sizes.borderRadius * 3.5,
    borderTopLeftRadius: Sizes.borderRadius * 3.5,
  },
  modalContainer: {
    backgroundColor: Colors.white,
    width: SCREEN_WIDTH,
    height: FILTER_BOTTOMSHEET_HEIGHT,
    borderTopRightRadius: Sizes.borderRadius * 3.5,
    borderTopLeftRadius: Sizes.borderRadius * 3.5,
    position: "absolute",
    top: SCREEN_HEIGHT,
    paddingVertical: Sizes.paddingXL,
  },
  filterSectionTitle: {
    paddingHorizontal: Sizes.paddingXL,
    marginBottom: Sizes.paddingLarge - 4,
    fontSize: Sizes.font,
  },
  filterByButton: {
    height: Sizes.componentHeight,
    padding: Sizes.paddingLarge,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: Sizes.borderRadius,
    margin: Sizes.paddingRegular,
    borderColor: Colors.light.greyLight,
  },
});
