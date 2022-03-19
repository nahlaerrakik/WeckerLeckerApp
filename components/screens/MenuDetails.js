import Apploading from "expo-app-loading";
import React, { useState } from 'react';
import { Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../assets/styles/colors';
import style from '../../assets/styles/style';
import { getFonts, height, width } from '../../utils';


const radio_props = [
    { label: "Fresh", value: 0 },
    { label: "Cooked", value: 1 },
];

const MenuDetails  = ({ navigation, route }) => {
    const [fontsloaded, setFontsLoaded] = useState(false);

    if (fontsloaded){
        return (
            <View>
                <ScrollView contentContainerStyle={{alignItems: 'center'}}>
                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.menuImage}
                            source={require('../../assets/images/menu_details.png')}         
                            resizeMode="cover"
                        />
                    </View>       
                    
                    <View style={styles.heartContainer}>
                        <View style={styles.heartIco}>
                            <Icon name='heart-sharp' color={colors.orange} size={30} />
                        </View>
                    </View>

                    <View style={styles.titleContainer}>
                        <Text style={styles.price} adjustsFontSizeToFit>27€</Text>
                        <Text style={styles.menu} adjustsFontSizeToFit>Menu</Text>
                    </View>
                    
                    <View style={styles.descriptionContainer}>
                        <Text style={styles.description} adjustsFontSizeToFit>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</Text>
                    </View>
                    
                    <View style={styles.addToCartContainer}>
                        <View>
                            <RadioForm 
                                radio_props={radio_props}
                                initial={0}
                                labelStyle={styles.radioButtonLabel}
                                buttonColor={colors.black}
                                buttonSize={10}
                                selectedButtonColor={colors.black}
                                onPress={(value) => {this.setState({value:value})}}
                            />
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            
                            <View style={styles.quantityContainer}>
                                <TouchableOpacity>
                                    <View style={styles.quantityBtn}>
                                        <Text style={styles.quantityText}>-</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity>
                                    <View style={{ height: 30, width: 20, alignItems: 'center', justifyContent: 'center'}}>
                                        <Text style={styles.quantityText}>1</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity>
                                    <View style={styles.quantityBtn}>
                                        <Text style={styles.quantityText}>+</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <View style={{paddingLeft: 20}}>
                                <TouchableOpacity>
                                    <View style={styles.addBtn}>
                                        <Text style={styles.addText}>Add</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <ImageBackground
                    style={style.imageBackground}
                    source={require('../../assets/images/menu_details_background.png')}         
                    resizeMode="stretch"
                />
            </View>
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
    imageContainer: {
        height: height * 0.6,
    },
    menuImage: {
        width: width,
        height: '100%',
    },
    heartContainer: {
        height: 30, 
        width: width * 0.8, 
        flexDirection: 'row', 
        justifyContent: 'flex-end', 
        alignItems: 'center',
    },
    heartIco: {
        backgroundColor: '#faf6f6', 
        height:60, 
        width: 60, 
        borderRadius: 50, 
        top: -10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleContainer: {
        height: height * 0.05, 
        width: width * 0.8, 
        flexDirection: 'row', 
        justifyContent: 
        'flex-start', 
        alignItems: 'center',
    },
    price: {
        fontFamily: 'MontserratMedium',
        fontWeight: 'bold',
        fontSize: 24,
        color: colors.black,
        marginRight: 20,
    },
    menu: {
        fontFamily: 'MontserratMedium',
        fontWeight: 'bold',
        fontSize: 24,
        color: colors.orange,
    },
    descriptionContainer: {
        height: height * 0.1,
        width: width * 0.8,
        flexDirection: 'row',
        justifyContent: 'flex-start', 
        alignItems: 'center',
    },
    description: {  
        fontFamily: 'MontserratRegular',
        fontSize: 14,
        color: '#8b8b8b',
    },
    addToCartContainer: {
        height: height * 0.1,
        width: width * 0.8,
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
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
        fontSize: 16,
    },
    addBtn: {
        backgroundColor: colors.orange,
        borderRadius: 10,
        height: 30,
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addText: {
        fontFamily: 'MontserratMedium',
        fontWeight: 'bold',
        fontSize: 16,
        color: colors.white,
    },
});

export default MenuDetails;