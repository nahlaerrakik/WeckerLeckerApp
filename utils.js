import * as Font from "expo-font";
import { Dimensions, PixelRatio } from "react-native";

export const {
    width,
    height,
} = Dimensions.get('window');

export function normalizeFontSize(size, multiplier = 2) {
    const scale = (width / height) * multiplier;
    
    const newSize = size * scale;
    
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

export const getFonts = () =>
    Font.loadAsync({
        MontserratRegular: require("./assets/fonts/Montserrat-Regular.ttf"),
        MontserratLight: require("./assets/fonts/Montserrat-Light.ttf"),
        MontserratMedium: require("./assets/fonts/Montserrat-Medium.ttf"),
        MontserratSemiBold: require("./assets/fonts/Montserrat-SemiBold.ttf"),
        MontserratBold: require("./assets/fonts/Montserrat-Bold.ttf"),
});

export const BASE_URL = "http://2e7b-2001-9e8-e33a-9c01-5c19-76cc-cdba-c281.ngrok.io/api/v1";

export const images = {
    "menu_item.png": require("./assets/images/menu_item.png"),
    "menu_details.png": require("./assets/images/menu_details.png")
}