import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { AppStackScreenProps } from "../../types";
import { Colors, Sizes, Images } from "../../constants";
import { IconButton, SansText, TitlePage, View } from "../../components";

type SettingsItemProps = {
  text: string;
  onPress?: () => void;
};

function SettingsItem({ text, onPress }: SettingsItemProps): JSX.Element {
  return (
    <TouchableOpacity
      activeOpacity={Sizes.activeOpacity}
      style={styles.settingsItem}
      onPress={onPress}
    >
      <SansText fontType="bold" style={styles.settingsItemText}>
        {text}
      </SansText>
    </TouchableOpacity>
  );
}

export default function ProfileScreen({
  navigation,
}: AppStackScreenProps<"Profile">) {
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
        middleComponent={() => (
          <SansText fontType="bold" style={{ fontSize: Sizes.body1 }}>
            Profile
          </SansText>
        )}
      />
    );
  };

  const renderProfile = (): JSX.Element => {
    return (
      <View style={styles.profileContainer}>
        <Image
          source={Images.profile}
          style={styles.profileImage}
          resizeMode="cover"
        />
        <View style={{ marginLeft: Sizes.paddingLarge }}>
          <SansText fontType="bold" style={{ fontSize: Sizes.body1 }}>
            Promise Sheggsmann
          </SansText>
          <SansText
            style={{
              marginTop: Sizes.paddingRegular,
              color: Colors.greyDark,
            }}
          >
            promisesheggs@gmail.com
          </SansText>
        </View>
      </View>
    );
  };

  const renderLine = (): JSX.Element => {
    return <View style={styles.line}></View>;
  };

  const renderSettings = (): JSX.Element => {
    return (
      <View style={styles.settingsContainer}>
        <View style={styles.settingsTitleContainer}>
          <SansText style={styles.settingsTitle}>General</SansText>
        </View>

        <SettingsItem text="Edit Profile" />
        <SettingsItem text="Notifications" />
        <SettingsItem text="Wishlist" />

        <View style={styles.settingsTitleContainer}>
          <SansText style={styles.settingsTitle}>Legal</SansText>
        </View>

        <SettingsItem text="Terms of Use" />
        <SettingsItem text="Privacy Policy" />

        <View style={styles.settingsTitleContainer}>
          <SansText style={styles.settingsTitle}>Personal</SansText>
        </View>

        <SettingsItem text="Report a Bug" />
        <SettingsItem
          text="Logout"
          onPress={() => navigation.replace("SignIn")}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {renderTitle()}
        {renderProfile()}
        {renderLine()}
        {renderSettings()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  line: {
    width: "100%",
    backgroundColor: Colors.light.greyLight2,
    height: 2,
    marginTop: 40,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Sizes.paddingXL,
    marginTop: Sizes.paddingMedium,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  settingsContainer: {
    paddingBottom: 10,
  },
  settingsTitleContainer: {
    padding: Sizes.paddingXL,
  },
  settingsTitle: {
    color: Colors.greyDark,
    fontSize: Sizes.font,
  },
  settingsItem: {
    paddingHorizontal: Sizes.paddingXL,
    paddingVertical: Sizes.paddingLarge,
    borderBottomWidth: 2,
    borderBottomColor: Colors.light.greyLight2,
  },
  settingsItemText: {
    fontSize: Sizes.body1,
  },
});
