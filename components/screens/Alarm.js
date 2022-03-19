import Apploading from "expo-app-loading";
import React, { useState } from 'react';
import { ImageBackground, SafeAreaView, StyleSheet, Text } from 'react-native';
import style from "../../assets/styles/style";
import { getFonts } from "../../utils";


const Alarm = () => {
    const [fontsloaded, setFontsLoaded] = useState(false);

    if (fontsloaded){
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
            <Apploading
              startAsync={getFonts}
              onFinish={() => {
                setFontsLoaded(true);
              }}
              onError={console.warn} />
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