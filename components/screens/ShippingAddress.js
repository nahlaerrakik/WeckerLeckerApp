import Apploading from "expo-app-loading";
import React, {useEffect, useState} from "react";
import {
    ActivityIndicator,
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { Transition, Transitioning } from 'react-native-reanimated';
import Ionicon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from "../../assets/styles/colors";
import style from "../../assets/styles/style";
import { getFonts, width } from "../../utils";


const addresses = [
    {
        "firstName": "Nahla",
        "lastName": "Errakik",
        "street": "Am Berner Wald",
        "houseNumber": 16,
        "postcode": 22159,
        "city": "Hamburg",
        "additionalInformation": "",
        "phoneNumber": "015734251225",
        "email": "nahlaerrakik@gmail.com",
    },
    {
        "firstName": "Nahla",
        "lastName": "Errakik",
        "street": "Am Berner Wald",
        "houseNumber": 16,
        "additionalInformation": "",
        "phoneNumber": "015734251225",
        "email": "nahlaerrakik@gmail.com",
    },
];

const transition = (
    <Transition.Together>
      <Transition.In type='fade' durationMs={200} />
      <Transition.Change />
      <Transition.Out type='fade' durationMs={200} />
    </Transition.Together>
  );
  
const AddAddress = () => {
    return(
        <KeyboardAvoidingView 
            style={{flex: 0.9, width: width * 0.85, margin: 10}}
            behavior={Platform.OS ==='ios' ? 'padding': ''}
            keyboardVerticalOffset={Platform.select({ios: 0, android: 500})}
        >
            <ScrollView 
                contentContainerStyle={{flex: 1}} 
                bounces={false} 
            >
                <TextInput placeholder="First Name" style={styles.input} />
                <TextInput placeholder="Last Name" style={styles.input} />

                <View>
                    <TextInput placeholder="Street" style={[styles.input, {width: '69%'}]} />
                    <TextInput placeholder="Nr." style={[styles.input, {width: '29%', position: 'absolute', right: 0}]} />
                </View> 
                <TextInput placeholder="Additional information" style={styles.input} />

                <View>
                    <TextInput placeholder="City" style={[styles.input, {width: '59%'}]} />
                    <TextInput placeholder="Postcode" style={[styles.input, {width: '39%', position: 'absolute', right: 0}]} />
                </View> 
                
                <TextInput placeholder="Phone number" style={styles.input} />   
                <TextInput placeholder="Email" style={styles.input} />
            </ScrollView>

        </KeyboardAvoidingView>
    );

};

const RenderAddress = ({navigation}) => { 
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const ref = React.useRef();

    const addNewAddressHandler = () => {
        navigation.navigate('NewAddress');
    }

    return(
        <View style={{flex: 0.9, width: width * 0.85, margin: 10,}}>
            <View style={{
                width: width * 0.85,
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: '#f7f7f7',
                borderRadius: 10,
                paddingTop: 10,
                paddingBottom: 10,
            }}>
                <Transitioning.View
                    ref={ref}
                    transition={transition}
                > 
                    {addresses.map(({ firstName, lastName, street, houseNumber, postcode, city, additionalInformation, phoneNumber, email}, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={() => {
                                    ref.current.animateNextTransition();
                                    setCurrentIndex(index === currentIndex ? null : index);
                                }}
                                style={styles.cardContainer}
                                activeOpacity={0.9}
                            >
                                <View style={styles.card}>

                                    <View style={{justifyContent: 'flex-start', flexDirection: 'row'}}>
                                        <Ionicon
                                            name={index === currentIndex ? "radio-button-on" : "radio-button-off"}
                                            size={25}
                                            color={colors.black}
                                            style={{alignSelf: 'center'}}
                                        />
                                        <View style={{flexDirection: 'column', justifyContent: 'flex-start', marginLeft: 20}}>
                                            <Text style={styles.addressDetails}>{firstName} {lastName}</Text>
                                            <Text style={styles.addressDetails}>{street} {houseNumber}</Text>
                                            {additionalInformation !== "" ? <Text style={styles.addressDetails}>{postcode} {city}</Text> : null}
                                            <Text style={styles.addressDetails}>{phoneNumber}</Text>
                                            <Text style={styles.addressDetails}>{email}</Text>
                                        </View >
                                        <TouchableOpacity style={{alignSelf: 'center', right: 0, position: 'absolute'}}>
                                            <MaterialIcons
                                                name="edit"
                                                size={25}
                                                color={colors.black}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <View style={styles.seprator}>

                                </View>
                            </TouchableOpacity>
                        );
                    })}

                    <View style={styles.addBtnWrapper}>
                        <TouchableOpacity onPress={() => addNewAddressHandler(navigation)}>
                            <View style={styles.addBtn}>
                                <Text style={styles.addBtnText}>+ Add a new address</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </Transitioning.View>
            </View>
            
        </View>
    );

};

const ShippingAddress = ({navigation}) => {
    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
		async function fetchFonts() {
		  await getFonts();
		}
		fetchFonts().then(r => setFontsLoaded(true));
  	}, []);

    const continueHandler = () => {
        navigation.navigate('BillingAddress');
    }

    if (fontsLoaded){
        return (
            <SafeAreaView style={styles.container}>
               <View style={{width: width * 0.85, flexDirection: 'row', marginTop: 20, }}>
                    <Text style={styles.header}>Add a shipping address</Text>
                </View>

                <RenderAddress navigation={navigation} />

                <View style={styles.continueBtnWrapper}>
                    <TouchableOpacity onPress={() => continueHandler()}>
                        <View style={styles.continueBtn}>
                            <Text style={styles.continueBtnText}>Continue</Text>
                        </View>
                    </TouchableOpacity>
                </View>

               <ImageBackground
                    style={[style.imageBackground]}
                    source={require('../../assets/images/address_background.png')}         
                    resizeMode="stretch"
                />
            </SafeAreaView>
        );
    }
    else{
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size="large" color={colors.orange} />
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center',  
        backgroundColor: '#fdfdfd',
    },    
    header: {
        fontFamily: 'MontserratSemiBold',
        fontSize: 25,
        fontWeight: 'bold',
        color: colors.black,
        margin: 10, 
    },
    input: {
        height: 50,
        borderRadius: 10,
        backgroundColor: 'white',
        fontFamily: 'MontserratMedium',
        color: colors.black,
        paddingLeft: 20,
        fontSize: 16,
        borderColor: '#f7f7f7',
        borderWidth: 1,
        marginVertical: 5
    },
    continueBtnWrapper: {
        width: width * 0.9, 
        justifyContent: 'center', 
        alignItems: 'center',
    },
    continueBtn: {
        width: width * 0.8, 
        height: 50,     
        borderRadius: 20,
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: colors.orange, 
    },
    continueBtnText: {
        fontFamily: 'MontserratSemiBold',
        fontWeight: 'bold',
        fontSize: 18,
        color: colors.white,
    },  
    cardContainer: {
        flexGrow: 1,
    },
    card: {
        flexGrow: 1,
        justifyContent: 'center',
        marginVertical: 5,
        paddingLeft: 10,
        paddingRight: 10,
    },
    body: {
        fontSize: 20,
        lineHeight: 20 * 1.5,
        textAlign: 'center',
    },
    addBtnWrapper: {
        width: width * 0.85, 
        justifyContent: 'center', 
        alignItems: 'center',
        marginTop: 10,
    },
    addBtn: {
        width: 150, 
        height: 40,     
        borderRadius: 15,
        justifyContent: 'center', 
        alignItems: 'center', 
    },
    addBtnText: {
        fontFamily: 'MontserratSemiBold',
        fontWeight: 'bold',
        fontSize: 14,
        color: colors.black,
    },     
    seprator: {
        width: width * 0.8, 
        height: 1,
        marginTop: 20, 
        backgroundColor: '#dddde8',
        alignSelf: 'center'
    },  
    addressDetails: {
        fontFamily: 'MontserratMedium',
        fontWeight: 'bold',
        fontSize: 14,
        color: colors.black,
        marginRight: 10,
    },
});

export default ShippingAddress;