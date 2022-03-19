import Apploading from "expo-app-loading";
import React, { useState } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../../assets/styles/colors";
import { getFonts, height, width } from "../../utils";


const cartItems = [
    {
        id: '1',
        title: 'Menu 1',
        price: 25.00,
        quantity: 2,
        image: require('../../assets/images/menu_item.png'),
    },
    {
        id: '2',
        title: 'Menu 2',
        price: 25.00,
        quantity: 1,
        image: require('../../assets/images/menu_item.png'),
    },
    {
        id: '3',
        title: 'Menu 3',
        price: 25.00,
        quantity: 1,
        image: require('../../assets/images/menu_item.png'),
    },
];



const renderItem = ({item}) => (
    <View style={{width: width * 0.8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',}}>
            <View style={{height: 90, width: 50,}}>
                <Image source={item.image} style={{width: 90, height: 90}} />
            </View>

            <View style={{height: 90, flexDirection: 'column', justifyContent: 'space-between',}}>
                <Text style={[styles.text, {paddingTop: 10,}]}>{item.title}</Text>
                <Text style={styles.price}>€{item.price}</Text>
            </View>
            
            <View style={{height: 90,flexDirection: 'column', justifyContent: 'flex-end'}}>
                <View style={styles.quantityContainer}>
                    <TouchableOpacity>
                        <View style={styles.quantityBtn}>
                            <Text style={styles.quantityText}>-</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={{ height: 30, width: 20, alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={styles.quantityText}>{item.quantity}</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={styles.quantityBtn}>
                            <Text style={styles.quantityText}>+</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
);

const Cart = ({navigation}) => {
    const [fontsloaded, setFontsLoaded] = useState(false);

    const checkoutHandler = () => {
        navigation.navigate('ShippingAddress');
    }

    if (fontsloaded){
        return (
            <View style={styles.container}>
                <View style={styles.cartContainer}>
                    <View style={styles.cartItemsContainer}>
                        <FlatList 
                                data={cartItems} 
                                renderItem={renderItem} 
                        />
                    </View>

                    <View style={styles.cartDetails}>
                        <Text style={styles.text}>Selected Items</Text>
                        <Text style={styles.price}>€26.00</Text>
                    </View>

                    <View style={styles.cartDetails}>
                        <Text style={styles.text}>Shipping Fees</Text>
                        <Text style={styles.price}>€2.00</Text>
                    </View>

                    <View style={styles.seprator}></View>

                    <View style={{ width: width * 0.8, flexDirection: 'row', justifyContent: 'space-between', marginTop: 20}}>
                        <Text style={styles.text}>Total</Text>
                        <Text style={styles.price}>€28.00</Text>
                    </View>

                </View>



                <View style={styles.checkoutBtnContainer}>
                    <TouchableOpacity  onPress={() => checkoutHandler()}>
                        <View style={styles.checkoutBtn}>
                            <Text style={styles.checkoutBtnText}>Checkout</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
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
        justifyContent: 'center', 
        alignItems: 'center',  
        backgroundColor: '#fdfdfd',
    },
    cartContainer: {
        width: width, 
        height: height * 0.8, 
        alignItems: 'center', 
        paddingTop: 100,
    },
    cartItemsContainer: {
        width: width, 
        backgroundColor: '#eeeeee', 
        justifyContent: 'center', 
        alignItems: 'center', 
        paddingBottom: 30, 
        borderBottomLeftRadius: 50,
    },
    quantityContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
    },
    quantityBtn: {
        borderColor: '#dddde8',
        borderWidth: 1,
        borderRadius: 10,
        height: 30,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    quantityText: {
        fontFamily: 'MontserratMedium',
        color: colors.black,
        fontWeight: 'bold',
        fontSize: 14,
    },
    cartDetails: {
        width: width * 0.8, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginTop: 20,
    },
    text: {
        fontFamily: 'MontserratSemiBold',
        color: colors.black,
        fontWeight: 'bold',
        fontSize: 15,
    },
    price: {
        fontFamily: 'MontserratSemiBold',
        color: colors.orange,
        fontWeight: 'bold',
        fontSize: 15,
    },
    seprator: {
        width: width * 0.8, 
        height: 1, marginTop: 20, 
        backgroundColor: '#dddde8',
    },
    checkoutBtnContainer: {
        width: width, 
        height: height * 0.2, 
        alignItems: 'center',
    },
    checkoutBtn: {
        width: width * 0.8, 
        height: 50,     
        borderRadius: 20,
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: colors.orange, 
    },
    checkoutBtnText: {
        fontFamily: 'MontserratSemiBold',
        fontWeight: 'bold',
        fontSize: 18,
        color: colors.white,
    },
});

export default Cart;