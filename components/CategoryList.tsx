import { useState } from "react";
import { FlatList, TouchableOpacity, ViewStyle } from "react-native";
import { Colors, Sizes } from "../constants";
import { SansText } from "./StyledText";

type BadgeProps = {
  text: string;
  index: number;
  active?: boolean;
  onPress?: () => void;
};

function Badge({ text, active, index, onPress }: BadgeProps): JSX.Element {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={Sizes.activeOpacity}
      style={{
        paddingHorizontal: Sizes.paddingRegular,
        backgroundColor: active ? Colors.primary : "transparent",
        height: 25,
        minWidth: 105,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: index === 0 ? Sizes.paddingXL : 10,
      }}
    >
      <SansText
        style={{
          color: active ? Colors.white : Colors.greyDark,
          fontSize: 14,
          letterSpacing: 0.4,
        }}
      >
        {text}
      </SansText>
    </TouchableOpacity>
  );
}

type CategoryListProps = {
  categories: string[];
  containerStyle?: ViewStyle;
};

export default function CategoryList({
  categories,
  containerStyle,
}: CategoryListProps) {
  const [active, setActive] = useState<string>(categories[0]);

  return (
    <FlatList
      contentContainerStyle={{
        paddingRight: Sizes.paddingXL,
        ...containerStyle,
      }}
      data={categories}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item, index }) => {
        return (
          <Badge
            text={item}
            index={index}
            active={item === active}
            onPress={() => setActive(item)}
          />
        );
      }}
    />
  );
}
