import { colors, hp, TxKeyPath, wp } from "@/core";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IconButton } from "./icon-button";
import { IconTypes, Text } from "../ui";

export const CommonHeader = ({
  navigation,
  titleTx,
  buttonsList,
  onBack,
}: {
  navigation?: any;
  titleTx?: string | TxKeyPath;
  buttonsList?: { icon: IconTypes; onPress: () => void }[];
  onBack?: any;
}) => {
  const insets = useSafeAreaInsets();
  const topSpacing = insets.top + hp(2.5);

  return (
    <View style={[styles.header, { paddingTop: topSpacing }]}>
      <View style={[StyleSheet.absoluteFillObject, { paddingTop: topSpacing, alignItems: "center", justifyContent: "center", pointerEvents: "none", zIndex: 0 }]}>
        {titleTx && (
          <Text
            style={styles.title}
            tx={titleTx}
            preset="headingSmallBold"
            color={colors.primaryDeep}
          />
        )}
      </View>

      <View style={{ zIndex: 1, minWidth: wp(12) }}>
        {navigation && (
          <IconButton
            preset="commonBack"
            disabled={navigation.canGoBack() === false}
            onPress={() => {
              if (onBack) {
                onBack();
              } else if (navigation.canGoBack()) {
                navigation.goBack();
              }
            }}
          />
        )}
      </View>

      <View
        style={{
          flexDirection: "row",
          gap: wp(3),
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1,
          minWidth: wp(12)
        }}
      >
        {buttonsList ? (
          buttonsList.map((button, index) => (
            <IconButton
              onPress={button.onPress}
              preset="commonBack"
              icon={button.icon}
              key={index}
            />
          ))
        ) : (
          <IconButton style={{ opacity: 0 }} onPress={() => { }} disabled />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginHorizontal: wp(5),
    flexDirection: "row",
    justifyContent: "space-between",
    width: "auto",

    zIndex: 100,
    elevation: 10,

    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  title: {
    alignSelf: "center",
    textAlign: "center",
  },
});
