import Apploading from "expo-app-loading";
import React, { useState } from "react";
import { ImageBackground, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Ionicon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import colors from "../../assets/styles/colors";
import style from "../../assets/styles/style";
import { getFonts, width } from "../../utils";



const Login = ({ navigation, route }) => {
    const [fontsloaded, setFontsLoaded] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [showHideBtn, setshowHideBtn] = useState('Show');

    const [isEmailValid, setIsEmailValid] = useState('');
    const [isPasswordValid, setIsPasswordValid] = useState('');
  
    const handlePasswordVisibility = () => {
        if (showHideBtn === 'Show') {
            setshowHideBtn('Hide');
            setPasswordVisibility(!passwordVisibility);
        } 
        else if (showHideBtn === 'Hide') {
            setshowHideBtn('Show');
            setPasswordVisibility(!passwordVisibility);
        }
    };
    
    const resetPasswordHandler = () => {
        navigation.navigate('ResetPassword')
    }

    const signUpHandler = () => {
        navigation.navigate('SignUp', {'handleLogInFinish': route.params.handleLogInFinish });
    }

    const loginHandler = () => {
        if (isEmailValid && isPasswordValid){
            route.params.handleLogInFinish();
            navigation.navigate('Main');
        }
    }

    const facebookLoginHandler = () => {
        route.params.handleLogInFinish();
        navigation.navigate('Main')
    }

    const gmailLoginHandler = () => {
        route.params.handleLogInFinish();
        navigation.navigate('Main')
    }

    const validateEmail= (text) => {
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

        var is_valid = regex.test(text); 
        if (is_valid === true) {
            setIsEmailValid(true);
        } 
        else {
            setIsEmailValid(false);
        }
    }

    const validatePassword = (text) => {
        var is_valid = text.length >= 8; 

        if (is_valid === true) {
            setIsPasswordValid(true);
        } 
        else {
            setIsPasswordValid(false);
        }

        setPassword(text);
    }

    if (fontsloaded) {
        return (
            <KeyboardAvoidingView 
                style={{flex: 1}} 
                behavior={Platform.OS ==='ios' ? 'padding': ''}
                keyboardVerticalOffset={Platform.select({ios: 0, android: 500})}
            >
                <ScrollView 
                    contentContainerStyle={[styles.container, {flex: 1}]} 
                    bounces={false} 
                >
                    <View style={styles.titleContainer}>
                        <Text style={[styles.title, {color: colors.orange, position: 'absolute', left: 5, bottom: 5,}]}>Login</Text>
                        <TouchableOpacity  onPress={() => signUpHandler()}>
                            <Text style={[styles.title, {color: colors.black, position: 'absolute', right: 5, bottom: 5,}]}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.formContainer}>
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
                    </View>

                    <View style={styles.forgetPasswordContainer}>
                        <TouchableOpacity onPress={() => resetPasswordHandler()}>
                            <Text style={styles.forgotPassword}>Forgot your password?</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.logInBtnContainer}>
                        <TouchableOpacity 
                            onPress={() => loginHandler()} 
                            activeOpacity={isEmailValid && isPasswordValid? 0.7 : 1}
                        >
                            <View style={isEmailValid && isPasswordValid ? styles.logInBtn : styles.logInBtnDisabled}>
                                <Text style={styles.logInBtnText}>Login</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{marginTop: 30}}></View>

                    <View style={styles.forgetPasswordContainer}>
                        <Text style={styles.forgotPassword}>Or login with</Text>
                    </View>

                    <View style={styles.socialLoginContainer}>
                        <TouchableOpacity onPress={() => gmailLoginHandler()}>
                            <View style={[styles.socialLoginBtn, {position: 'absolute', left: 0}]}>
                                <Ionicon
                                    name="logo-google"
                                    size={25}
                                    color={colors.white} 
                                />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => facebookLoginHandler()}>
                            <View style={[styles.socialLoginBtn, {position: 'absolute', right: 0}]}>
                                <Ionicon
                                    name="logo-facebook"
                                    size={25}
                                    color={colors.white} 
                                />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <ImageBackground
                        style={style.imageBackground}
                        source={require('../../assets/images/login_background.png')}         
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
        justifyContent: 'center', 
        alignItems: 'center',
    },
    title: {
        fontFamily: 'MontserratBold',
        fontWeight: 'bold',
        fontSize: 18,
    },
    titleContainer: {
        width: width * 0.7,
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
    forgetPasswordContainer: {
        width: width * 0.7,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    signUpText: {
        fontFamily: 'MontserratMedium',
        fontWeight: 'bold',
        fontSize: 16,
        color: colors.black,
    },
    logInBtnContainer: {
        width: width * 0.7,
        height: 100,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    logInBtn: {
        width: width * 0.7,
        height: 50,
        backgroundColor: colors.orange,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logInBtnDisabled: {
        width: width * 0.7,
        height: 50,
        backgroundColor: colors.black,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logInBtnText: {
        fontFamily: 'MontserratBold',
        fontWeight: 'bold',
        fontSize: 18,
        color: colors.white,
    },
    forgotPassword: {
        fontFamily: 'MontserratMedium',
        fontWeight: 'bold',
        fontSize: 13,
        color: colors.black,
    },
    socialLoginContainer: {
        width: width * 0.7,
        marginTop: 20,      
    },
    socialLoginBtn: {
        height: 50,
        width: '48%',
        backgroundColor: colors.orange,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Login;