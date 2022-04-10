import React from "react";
import { SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import Ionicon from 'react-native-vector-icons/Ionicons';
import colors from "../../assets/styles/colors";
import { normalizeFontSize, width } from "../../utils";



const pressHandler = (screen, navigation) => {
    navigation.navigate(screen);
}


const TopTabNavigator = ({navigation, backScreen, isFirstScreen=false, backgroundColor='transparent'}) => {
    if (!isFirstScreen) {
        return (
            <SafeAreaView style={[styles.container, {backgroundColor: backgroundColor}]}>
                <TouchableOpacity onPress={() => pressHandler(backScreen, navigation)}>
                    <Ionicon
                        name="chevron-back-sharp"
                        size={30}
                        color={colors.black}
                        style={{alignSelf: 'flex-start', paddingLeft: 10,}}
                    />
                </TouchableOpacity>
            </SafeAreaView>
        )
    }
    else{
        return (
            <SafeAreaView style={{backgroundColor: backgroundColor, height: 0}}>
            </SafeAreaView>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        height: 100,
    },
    backBtnContainer: {
        width: width * 0.15,
        justifyContent: 'center', 
        alignItems: 'center',
    },
    titleContainer: {
        width: width * 0.7,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleText: {
        fontFamily: 'MontserratSemiBold',
        fontWeight: 'bold',
        fontSize: normalizeFontSize(16),
        color: colors.black, 
    },
    cartBtnConatiner: {
        width: width * 0.15, 
        justifyContent: 'center', 
        alignItems: 'center',
    },
});

export default TopTabNavigator;