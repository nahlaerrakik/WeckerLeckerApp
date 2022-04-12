import Apploading from "expo-app-loading";
import React, {useEffect, useState} from "react";
import {ActivityIndicator, SafeAreaView, StyleSheet, Text, View} from "react-native";
import { getFonts } from "../../utils";
import colors from "../../assets/styles/colors";



const ResetPassword = ({ navigation }) => {
    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
		async function fetchFonts() {
		  await getFonts();
		}
		fetchFonts().then(r => setFontsLoaded(true));
  	}, []);

    if (fontsLoaded) {
        return (
            <SafeAreaView style={styles.container}>
                <Text>ResetPassword</Text>
            </SafeAreaView>
        );
    }
    else {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size="large" color={colors.orange} />
            </View>
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