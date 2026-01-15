import { Button, Screen, Text } from "@/components";
import { colors, hp, isAndroid, lottieRegistry, wp } from "@/core";
import { closeApp, openWifiSettings } from "@/core/helpers/settings";
import useInternetConnection from "@/core/hooks/life-cycle/internet-connection";
import LottieView from "lottie-react-native";
import { StyleSheet, View } from "react-native";

export const InternetError = ({ children }: { children: React.ReactNode }) => {
    const isConnected = useInternetConnection();

    if (!isConnected) {
        return (
            <>
                <Screen safeAreaEdges={["top", "bottom"]} style={styles.container}>
                    <Text
                        tx="common.please-check-your-internet-connection"
                        style={{ textAlign: "center" }}
                        preset="titleMedium"
                        color={colors.neutrals.white}
                    />

                    {/* <LottieView
                        autoPlay
                        loop
                        source={lottieRegistry.warning}
                        style={styles.lottie}
                    /> */}
                </Screen>
                <View style={styles.controlButtons}>
                    <Button
                        preset="textButton"
                        tx="common.open-internet-settings"
                        textPreset="bodyMedium"
                        textStyle={{ color: colors.neutrals.white }}
                        onPress={() => openWifiSettings()}
                    />
                    {isAndroid && <Button
                        preset="textButton"
                        tx="common.close-app"
                        textPreset="bodySmallLight"
                        textStyle={{ color: colors.neutrals.white }}
                        onPress={() => closeApp()}
                    />}
                </View>
            </>
        );
    }

    return <>{children}</>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: wp(5),
        backgroundColor: colors.primaryDeep
    },
    lottie: {
        height: wp(50),
        width: wp(50),
        alignSelf: "center",
    },
    controlButtons: {
        position: "absolute",
        bottom: hp(10),
        alignSelf: "center",
        alignItems: "center",
        gap: hp(1)
    }
});