import React, {useContext, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {View, Text, ActivityIndicator} from 'react-native';
import Apploading from 'expo-app-loading';
import {getFonts} from '../../utils';
import colors from '../../assets/styles/colors';
import {CartItemsContext} from "../../context";


export const Icons = {
    MaterialCommunityIcons,
    MaterialIcons,
    Ionicons,
    Feather,
    FontAwesome,
    FontAwesome5,
    AntDesign,
    Entypo,
    SimpleLineIcons,
    Octicons,
    Foundation,
}


const Icon = ({type, name, color, style, route, props, size=30}) => {
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [cartItems, setCartItems] = useContext(CartItemsContext);
    const fontSize = 24;
    const Tag = type;

    if (fontsLoaded) {
        if (route === "CartTab" && cartItems.length > 0) {
            return (
                <View style={{width: 50}}>
                    <Tag name={name} size={30} color={color} style={style} style={{alignSelf: 'center'}}/>
                    <View style={{
                        backgroundColor: 'rgba(255, 139, 92, 0.7)',
                        position: 'absolute',
                        height: 20,
                        width: 20,
                        right: 0,
                        borderRadius: 15,
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 2000
                    }}>
                        <Text style={{fontSize: 12, fontFamily: 'MontserratMedium'}}>{cartItems.length}</Text>
                    </View>
                </View>
            )
        } else {
            return (
                <Tag name={name} size={size || fontSize} color={color} style={style} style={{alignSelf: 'center'}}/>
            )
        }
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
        )
    }
}

export default Icon;