import Apploading from "expo-app-loading";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import { getFonts } from "../../utils";



const ResetPassword = ({ navigation }) => {
    const [fontsloaded, setFontsLoaded] = useState(false);

    if (fontsloaded) {
        return (
            <SafeAreaView style={styles.container}>
                <Text>ResetPassword</Text>
            </SafeAreaView>
        );
    }
    else {
        return (
            <Apploading
                startAsync={getFonts}
                onFinish={() => { setFontsLoaded(true);}}
                onError={console.warn}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
    },
});

export default ResetPassword;