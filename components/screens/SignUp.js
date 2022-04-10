import Apploading from "expo-app-loading";
import React, {useContext, useState} from "react";
import { Image, ImageBackground, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Platform } from "react-native";
import Ionicon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import colors from "../../assets/styles/colors";
import style from "../../assets/styles/style";
import { getFonts, width } from "../../utils";
import {UserContext} from "../../context";



const SignUp = ({ navigation, route }) => {
    const [fontsLoaded, setFontsLoaded] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useContext(UserContext);

    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);

    const [password, setPassword] = useState('');
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [showHideBtn, setShowHideBtn] = useState('Show');
    
    const [passwordAgain, setPasswordAgain] = useState('');
    const [passwordAgainVisibility, setPasswordAgainVisibility] = useState(true);
    const [showHideAgainBtn, setShowHideAgainBtn] = useState('Show');

    const [isEmailValid, setIsEmailValid] = useState(null);
    const [isPasswordValid, setIsPasswordValid] = useState(null);
    const [isPasswordAgainValid, setIsPasswordAgainValid] = useState(null);


    const handlePasswordVisibility = () => {
        if (showHideBtn === 'Show') {
            setShowHideBtn('Hide');
            setPasswordVisibility(!passwordVisibility);
        } 
        else if (showHideBtn === 'Hide') {
            setShowHideBtn('Show');
            setPasswordVisibility(!passwordVisibility);
        }
    };

    const handlePasswordAgainVisibility = () => {
        if (showHideAgainBtn === 'Show') {
            setShowHideAgainBtn('Hide');
            setPasswordAgainVisibility(!passwordAgainVisibility);
        } 
      else if (showHideAgainBtn === 'Hide') {
            setShowHideAgainBtn('Show');
            setPasswordAgainVisibility(!passwordAgainVisibility);
        }
    };

    const signInHandler = () => {
        navigation.navigate('Login');
    }

    const signUpHandler = () => {
        if (isEmailValid && isPasswordValid && isPasswordAgainValid){
            setIsLoggedIn(true);
            navigation.navigate('Main');
        }
    }


    const validateEmail= (text) => {
        const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w\w+)+$/;

        let is_valid = regex.test(text);
        if (is_valid === true) {
            setIsEmailValid(true);
        } 
        else {
            setIsEmailValid(false);
        }

        setEmail(text);
    }

    const validatePassword = (text) => {
        let is_valid = text.length >= 8;

        if (is_valid === true) {
            setIsPasswordValid(true);
        } 
        else {
            setIsPasswordValid(false);
        }

        setPassword(text);
    }

    const validatePasswordAgain = (text) => {
        let is_valid = text === password;

        if (is_valid === true) {
            setIsPasswordAgainValid(true);
        } 
        else {
            setIsPasswordAgainValid(false);
        }

        setPasswordAgain(text);
    }

    if (fontsLoaded) {
        return (
            <KeyboardAvoidingView 
                style={{flex: 1}} 
                behavior={Platform.OS ==='ios' ? 'padding': ''}
                keyboardVerticalOffset={Platform.select({ios: 0, android: 500})}
            >
                <ScrollView 
                    contentContainerStyle={styles.container} 
                    bounces={false} 
                >
                    <View>
                        <Image source={require('../../assets/images/wecker_lecker_logo.png')} resizeMode='contain' style={{width: 150, height: 150}} />
                    </View>
        
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Sign Up</Text>
                    </View>

                    <View style={styles.formContainer}>
                        <View style={styles.inputContainer}>
                            <TextInput placeholder="First Name" style={styles.input} onChangeText={text => setFirstName(text)} />
                            <Ionicon 
                                name="person"
                                size={25}
                                style={[styles.inputIcon, {marginTop: 10,}]}
                                color={colors.black} 
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <TextInput placeholder="Last Name" style={styles.input} onChangeText={text => setLastName(text)} />
                            <Ionicon
                                name="person"
                                size={25}
                                style={[styles.inputIcon, {marginTop: 10,}]}
                                color={colors.black}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <TextInput placeholder="Email" style={styles.input} onChangeText={validateEmail} />
                            <MaterialIcon
                                name="email"
                                size={25}
                                style={[styles.inputIcon, {marginTop: 12,}]}
                                color={colors.black} 
                            />
                        </View>
                        {
                            isEmailValid === false ? 
                                <View style={{marginBottom: 10, marginTop: 5}}>
                                    <Text style={[styles.inputIcon, {color: 'red', fontFamily: 'MontserratRegular',}]}>Please enter a valid email address</Text>
                                </View> 
                            : 
                                null
                        }
                         
                        
                        <View style={styles.inputContainer}>
                            <TextInput 
                                placeholder="Password" 
                                style={styles.input}
                                value={password}
                                onChangeText={validatePassword}
                                secureTextEntry={passwordVisibility}
                                enablesReturnKeyAutomatically
                                onSubmitEditing={validatePassword}
                            />
                            <Ionicon
                                name="key"
                                size={25}
                                style={[styles.inputIcon, {marginTop: 12,}]}
                                color={colors.black} 
                            />
                            <TouchableOpacity onPress={() => handlePasswordVisibility()}>
                                <Text style={styles.passwordToggle}>{showHideBtn}</Text>
                            </TouchableOpacity>
                        </View>
                        {
                            isPasswordValid === false ? 
                                <View style={{marginBottom: 10, marginTop: 5}}>
                                    <Text style={[styles.inputIcon, {color: 'red', fontFamily: 'MontserratRegular',}]}>Password must be 8 characters long</Text>
                                </View> 
                            : 
                                null
                        }

                        <KeyboardAvoidingView style={styles.inputContainer}  behavior={Platform.OS === "ios" ? "padding" : "height"}>
                            <TextInput 
                                placeholder="Password again" 
                                style={styles.input} 
                                value={passwordAgain}
                                onChangeText={validatePasswordAgain}
                                secureTextEntry={passwordAgainVisibility}
                                enablesReturnKeyAutomatically
                            />
                            <Ionicon
                                name="key"
                                size={25}
                                style={[styles.inputIcon, {marginTop: 12,}]}
                                color={colors.black} 
                            />
                            <TouchableOpacity onPress={() => handlePasswordAgainVisibility()}>
                                <Text style={styles.passwordToggle}>{showHideAgainBtn}</Text>
                            </TouchableOpacity>
                        </KeyboardAvoidingView>
                        {
                            isPasswordAgainValid === false ? 
                                <View style={{marginBottom: 10, marginTop: 5}}>
                                    <Text style={[styles.inputIcon, {color: 'red', fontFamily: 'MontserratRegular',}]}>Passwords must match</Text>
                                </View> 
                            : 
                                null
                        }
                    </View>

                    <View style={styles.logInContainer}>
                        <Text style={styles.logInText}>Already have an account? </Text>
                        <TouchableOpacity onPress={() => signInHandler()}>
                            <Text style={styles.signInText}>Sign In</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.signUpBtnContainer}>
                        <TouchableOpacity 
                            onPress={() => signUpHandler()}
                            activeOpacity={isEmailValid && isPasswordValid && isPasswordAgainValid ? 0.7 : 1}
                        >
                            <View style={isEmailValid && isPasswordValid && isPasswordAgainValid ? styles.signUpBtn : styles.signUpBtnDisabled}>
                                <Text style={styles.signUpBtnText}>Sign Up</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <ImageBackground
                        style={style.imageBackground}
                        source={require('../../assets/images/sign_up_background.png')}         
                        resizeMode="stretch"
                    />
                </ScrollView>
            </KeyboardAvoidingView>
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
    title: {
        fontFamily: 'MontserratBold',
        fontWeight: 'bold',
        fontSize: 18,
        color: colors.orange,
    },
    titleContainer: {
        padding: 10,
    },
    formContainer: {
        width: width * 0.7,
    },
    inputContainer: {
        flexDirection: 'row', 
        marginTop: 20
    },
    input: {
        flex: 1,
        height: 50,
        borderRadius: 15,
        backgroundColor: 'white',
        fontFamily: 'MontserratMedium',
        color: colors.black,
        paddingLeft: 40,
        fontSize: 16,
        borderColor: '#f7f7f7',
        borderWidth: 1,
    },
    inputIcon: { 
        position: 'absolute',
        marginLeft: 10,
    },
    passwordToggle: {
        position: 'absolute', 
        right: 10, 
        marginTop: 15,
        fontFamily: 'MontserratMedium',
        fontWeight: 'bold',
        fontSize: 16,
        color: colors.orange,
    },
    logInContainer: {
        width: width * 0.7,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    logInText: {
        fontFamily: 'MontserratMedium',
        fontWeight: 'bold',
        fontSize: 16,
        color: colors.black,
    },
    signInText: {
        fontFamily: 'MontserratMedium',
        fontWeight: 'bold',
        fontSize: 16,
        color: colors.orange,
    },
    signUpBtnContainer: {
        width: width * 0.7,
        height: 100,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    signUpBtn: {
        width: width * 0.7,
        height: 50,
        backgroundColor: colors.orange,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    signUpBtnDisabled:{
        width: width * 0.7,
        height: 50,
        backgroundColor: colors.black,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    signUpBtnText: {
        fontFamily: 'MontserratBold',
        fontWeight: 'bold',
        fontSize: 18,
        color: colors.white,
    },
});

export default SignUp;