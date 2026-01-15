import { getFlashMessageStyle } from '@/providers';
import * as Linking from 'expo-linking';
import { showMessage } from 'react-native-flash-message';

export enum ExternalApp {
    whatsapp,
    phone,
    email,
    googleMaps,
}

function getExternalAppUrl(type: ExternalApp, payload: any): string {
    switch (type) {
        case ExternalApp.whatsapp:
            return `whatsapp://send?phone=${payload.phoneNumber}&text=${encodeURIComponent(payload.message)}`;
        case ExternalApp.phone:
            return `tel:${payload.phone}`;
        case ExternalApp.email:
            return `mailto:${payload.email}`;
        case ExternalApp.googleMaps:
            return `https://www.google.com/maps/search/?api=1&query=${payload.latitude},${payload.longitude}`;
        default:
            throw new Error("Unsupported app type");
    }
}

export const openExternalApp = async ({
    type,
    payload
}: {
    payload: any;
    type: ExternalApp;
}) => {
    try {
        const url = getExternalAppUrl(type, payload);
        await Linking.openURL(url);
    } catch (error) {
        showMessage({
            message: payload.errorMessage || "Error opening app",
            type: "danger",
            ...getFlashMessageStyle(),
        });
    }
};
