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