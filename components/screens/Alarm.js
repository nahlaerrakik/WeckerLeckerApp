import Apploading from "expo-app-loading";
import React, { useState } from 'react';
import {ActivityIndicator, ImageBackground, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import style from "../../assets/styles/style";
import { getFonts } from "../../utils";
import colors from "../../assets/styles/colors";


const Alarm = () => {
    const [fontsLoaded, setFontsLoaded] = useState(false);

    if (fontsLoaded){
        return (
            <SafeAreaView style={styles.container}>
                <Text>Alarm</Text>
                <ImageBackground
                    style={[style.imageBackground]}
                    source={require('../../assets/images/alarm_background.png')}         
                    resizeMode="stretch"
                />
            </SafeAreaView>
        )
    }  
    else{
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Apploading
                    startAsync={getFonts}
                    onFinish={() => {
                        setFontsLoaded(true);
                    }}
                    onError={console.warn}
                />
                <ActivityIndicator size="large" color={colors.orange} />
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,    
        alignItems: 'center',   
        justifyContent: 'center',
    },
});

export default Alarm;