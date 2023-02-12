import { View, Image, ViewStyle } from "react-native";
import { Images, Sizes, Colors } from "../constants";
import { SansText } from "./StyledText";
import { Feather } from "@expo/vector-icons";

type ReviewProps = {
  review: {
    id: number;
    user: {
      name: string;
      image: any;
    };
    rating: number;
    comment: string;
    images?: any[];
  };
  containerStyle?: ViewStyle;
};

const MAX_RATINGS = 5;

export default function Review({ review, containerStyle }: ReviewProps) {
  return (
    <View style={{ flexDirection: "row", ...containerStyle }}>
      <Image
        source={review.user.image}
        style={{ width: 40, height: 40, borderRadius: 20 }}
      />

      <View
        style={{
          flex: 1,
          marginLeft: Sizes.paddingLarge,
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View>
            <SansText style={{ fontSize: Sizes.font, marginBottom: 4 }}>
              {review.user.name}
            </SansText>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {new Array(review.rating).fill(0).map(() => (
                <Image
                  source={Images.star}
                  style={{
                    width: 15,
                    height: 15,
                    marginRight: 5,
                    marginBottom: 1,
                  }}
                />
              ))}
              {new Array(MAX_RATINGS - review.rating).fill(0).map(() => (
                <Feather
                  name="star"
                  size={17}
                  style={{ marginRight: 5, color: Colors.grey }}
                />
              ))}
            </View>
          </View>
          <SansText style={{ color: Colors.grey, fontSize: 12 }}>
            1 Month ago
          </SansText>
        </View>

        <View style={{ marginTop: 12 }}>
          <SansText style={{ lineHeight: 20 }}>{review.comment}</SansText>

          {/* Comment Images */}
          {review.images && (
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              {review.images.map((img, index) => (
                <View
                  style={{
                    width: 60,
                    height: 60,
                    alignItems: "center",
                    justifyContent: "center",
                    borderWidth: 1,
                    borderRadius: Sizes.borderRadius,
                    borderColor: Colors.grey,
                    marginRight: Sizes.paddingMedium,
                  }}
                >
                  <Image
                    source={img}
                    key={index.toString()}
                    style={{ width: 50, height: 50 }}
                  />
                </View>
              ))}
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
