import { colors } from "@/core";
import { Modal, StyleSheet, View } from "react-native";

type Props = {
    mode: "warning" | "normal",
};

export const CustomDialog = ({mode} : Props) => {
    return (
        <Modal style={[
            styles.container, 
            mode == "warning" && styles.warningContainer
        ]}>

        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "80%",
        height: "50%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.neutrals.gray700,
    },
    warningContainer: {

    }
});