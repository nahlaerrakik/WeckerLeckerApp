import Apploading from "expo-app-loading";
import React, {useContext, useEffect, useState} from 'react';
import {
    ActivityIndicator,
    Image,
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Checkbox from 'expo-checkbox';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../assets/styles/colors';
import style from '../../assets/styles/style';
import {BASE_URL, getFonts, height, images, width} from '../../utils';
import {CartItemsContext} from "../../context";



const MenuDetails  = ({ navigation, route }) => {
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [contentLoaded, setContentLoaded] = useState(false);
    const [cartItems, setCartItems] = useContext(CartItemsContext);
    const [menu, setMenu] = useState({});
    const [fresh, setFresh] = useState(true);
    const [cooked, setCooked] = useState(false);
    const [menuType, setMenuType] = useState("FRESH");
    const [quantity, setQuantity] = useState(1);


    const fetchMenu = (menuId) => (
        useEffect(() => {
        fetch(BASE_URL + "/menus/" + menuId)
            .then((response) => response.json())
            .then((json) => setMenu(json))
            .catch((error) => console.log(error))
            .finally(() => setContentLoaded(true))
        }, [])
    );

    const renderFresh = () => {
        setFresh(true);
        setCooked(false);
        setMenuType("FRESH");
    };

    const renderCooked = () => {
        setCooked(true);
        setFresh(false);
        setMenuType("COOKED");
    };

    const decreaseQuantity = () => {
        if(quantity>1){
            setQuantity(quantity-1);
        }
    };

    const increaseQuantity = () => {
        setQuantity(quantity+1)
    };

    const addMenu = () => {
        setQuantity(quantity+1)
    };


    fetchMenu(route.params.menu.id);

    if (fontsLoaded && contentLoaded){
        return (
            <View>
                <ScrollView contentContainerStyle={{alignItems: 'center'}}>
                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.menuImage}
                            source={images[menu.image + "_details.png"]}
                            resizeMode="cover"
                        />
                    </View>       
                    
                    <View style={styles.heartContainer}>
                        <View style={styles.heartIco}>
                            <Icon name='heart-sharp' color={colors.orange} size={30} />
                        </View>
                    </View>

                    <View style={styles.titleContainer}>
                        <Text style={styles.price} adjustsFontSizeToFit>{menu.price}€</Text>
                        <Text style={styles.menu} adjustsFontSizeToFit>{menu.name}</Text>
                    </View>
                    
                    <View style={styles.descriptionContainer}>
                        <Text style={styles.description} adjustsFontSizeToFit>{menu.full_description}</Text>
                    </View>
                    
                    <View style={styles.addToCartContainer}>
                        <View style={{flexDirection: 'column'}}>
                            <View style={{flexDirection: 'row', justifyContent: 'flex-start', paddingBottom: 10}}>
                                <Checkbox
                                    value={fresh}
                                    onValueChange={renderFresh}
                                    color={fresh ? colors.orange : undefined}
                                />

                                <View style={{alignItems: 'center', justifyContent: 'center', paddingLeft: 5}}>
                                    <Text style={{fontFamily: 'MontserratMedium', fontSize: 14, }}>Fresh</Text>
                                </View>
                            </View>

                            <View style={{flexDirection: 'row', justifyContent: 'flex-start', }}>
                                <Checkbox
                                    value={cooked}
                                    onValueChange={renderCooked}
                                    color={cooked ? colors.orange : undefined}
                                />

                                <View style={{alignItems: 'center', justifyContent: 'center', paddingLeft: 5}}>
                                    <Text style={{fontFamily: 'MontserratMedium', fontSize: 14, }}>Cooked</Text>
                                </View>
                            </View>
                        </View>

                        <View style={{flexDirection: 'row'}}>
                            <View style={styles.quantityContainer}>
                                <TouchableOpacity onPress={() => decreaseQuantity()}>
                                    <View style={styles.quantityBtn}>
                                        <Text style={styles.quantityText}>-</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity>
                                    <View style={{ height: 30, width: 20, alignItems: 'center', justifyContent: 'center'}}>
                                        <Text style={styles.quantityText}>{quantity}</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => increaseQuantity()}>
                                    <View style={styles.quantityBtn}>
                                        <Text style={styles.quantityText}>+</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <View style={{paddingLeft: 20}}>
                                <TouchableOpacity onPress={() => addMenu(item)}>
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