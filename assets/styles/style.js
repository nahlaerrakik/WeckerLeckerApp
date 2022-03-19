import { StyleSheet } from "react-native";
import { height, width } from "../../utils";




const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageBackground: {
        flex: 1,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        width: width,
        height: height,
    },
    wrapper: {     
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default style;

