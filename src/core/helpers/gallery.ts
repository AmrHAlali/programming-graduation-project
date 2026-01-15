import * as ImagePicker from "expo-image-picker";

export const launchGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
        allowsMultipleSelection: true,
        quality: 1,
        videoMaxDuration: 120,
    });

    return result;
};