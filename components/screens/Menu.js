import Apploading from "expo-app-loading";
import React, { useState } from 'react';
import { FlatList, Image, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import menu from '../../assets/data/menu';
import colors from '../../assets/styles/colors';
import style from '../../assets/styles/style';
import { getFonts, height, normalizeFontSize, width } from '../../utils';



const Menu = ({ navigation, route }) => {
    const renderItem = ({item}) => (
        <TouchableOpacity onPress={() => pressHandler(item)}>
            <View>
                <View style={[styles.menuItem, styles.upperBox]}>
                    <Image source={item.image} style={styles.itemImage} />
                    <View style={styles.itemInfo}>        
                        <Text style={styles.itemTitle}>{item.title}</Text>
                        <Text style={styles.itemDescription}>{item.description}</Text>
                    </View>
                </View>
    
                <View style={styles.lowerBox}>
                    <Text style={styles.itemPrice}>{item.price}€</Text>
                    <Text style={styles.itemInformation}>Information</Text>         
                </View>
            </View>
        </TouchableOpacity>
    );
    
    const keyExtractor = (item) => item.title;
    
    const pressHandler = (item) => {
        navigation.navigate('MenuDetails', {'Menu': item});
    }

    const [fontsloaded, setFontsLoaded] = useState(false);

    if (fontsloaded) {
        return (
            <SafeAreaView style={style.container}>
                <View style={styles.headerWrapper}>
                    <Text style={styles.header}>Menu</Text>
                </View>

                <View style={style.wrapper}>
                    <FlatList 
                        data={menu} 
                        renderItem={renderItem} 
                        keyExtractor={keyExtractor} 
                    />       
                </View> 
    
                <ImageBackground
                    style={style.imageBackground}
                    source={require('../../assets/images/menu_background.png')}         
                    resizeMode="stretch" />
            </SafeAreaView>
        );
    }
    else {
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
    headerWrapper: {
        marginHorizontal: 20,
        marginVertical: 20,
        width: width * 0.8, 
        paddingTop: 80,
    },
    header: {
        fontFamily: 'MontserratSemiBold',
        fontSize: normalizeFontSize(40),
        fontWeight: 'bold',
        color: colors.black,
        paddingTop: height * 0.05,
    },
    menuItem: {
        backgroundColor: colors.silverFaded,
        marginHorizontal: 20,
        width: width * 0.8, 
        height: 100,
        padding: 5,
        flex: 1,
        flexDirection: 'row',

    },
    itemImage: {
        width: 90,
        height: 90,
    },
    itemInfo: {   
        flex: 1,
        flexDirection: 'column',
        marginVertical: 10,
    },
    itemTitle: { 
        fontFamily: 'MontserratSemiBold',
        fontWeight: 'bold',
        fontSize: normalizeFontSize(18),
        color: colors.orange,
        paddingLeft: 10,
    },
    itemDescription: {
        fontFamily: 'MontserratMedium',
        fontSize: normalizeFontSize(14),
        color: colors.gray,    
        paddingLeft: 10,
        paddingTop: 5,
    },
    upperBox: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomColor: '#ededec',
        borderBottomWidth: 1,
    },
    lowerBox: {       
        backgroundColor: colors.silverFaded,
        marginHorizontal: 20,
        width: width * 0.8, 
        height: 40,
        marginBottom: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        paddingLeft: 20,    

    },
    itemPrice: { 
        fontFamily: 'MontserratSemiBold',
        fontSize: normalizeFontSize(18),
        color: colors.navyBlue,
        marginTop: 5,
    },
    itemInformation: {
        fontFamily: 'MontserratSemiBold',
        fontWeight: 'bold',
        fontSize: normalizeFontSize(18),
        color: colors.orange,
        position: 'absolute',
        right: 20,
        marginTop: 5,
    },
});

export default Menu;