import Apploading from "expo-app-loading";
import React, {useState, useContext, useEffect} from 'react';
import {ActivityIndicator, Dimensions, Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import onboard from '../../assets/data/onboard';
import { getFonts } from "../../utils";
import {OnboardContext} from "../../context";
import colors from "../../assets/styles/colors";



const {
	width,
    height,
} = Dimensions.get('window');

const Onboard = () => {
	const [fontsLoaded, setFontsLoaded] = useState(false);
	const [showOnboard, setShowOnboard] = useContext(OnboardContext);

	useEffect(() => {
		async function fetchFonts() {
		  await getFonts();
		}
		fetchFonts().then(r => setFontsLoaded(true));
  	}, []);

	const renderItem = ({item}) => {
		return (
			<View style={styles.container}>
				<View style={{justifyContent: 'center', height: height * 0.4}}>
					<Image source={item.image} style={styles.image} resizeMode="contain"/>
				</View>  
			
				<View style={{alignItems: 'center', justifyContent: 'center', width: width * 0.8, paddingTop: 20,}}>
					<Text style={styles.title}>{item.title}</Text>
					<Text style={styles.text}>{item.text}</Text>
				</View>
			</View>
		);
	};

	const keyExtractor = (item) => item.title;

	const renderDoneButton = () => {
		return (
			<View style={{alignItems: 'center', justifyContent: 'center'}}>
				<View style={styles.buttonTextWrapper}>
					<Text style={styles.buttonText}>Start</Text>
				</View>
			</View>
		);
	};

	const renderNextButton = () => {
		return (
			<View style={{alignItems: 'center', justifyContent: 'center'}}>
				<View style={styles.buttonTextWrapper}>
					<Text style={styles.buttonText}>Next</Text>
				</View>
			</View>
		);
	};

	const handleDone = () => {
		setShowOnboard(false);
	};
	
	if (fontsLoaded) {
		return (
			<View style={{flex: 1}}>
				<StatusBar translucent backgroundColor="transparent" />
				<AppIntroSlider 
					keyExtractor={keyExtractor}
					renderItem={renderItem} 
					renderDoneButton={renderDoneButton}
					renderNextButton={renderNextButton}
					dotStyle={styles.dotStyle}
					activeDotStyle={styles.activeDotStyle}
					data={onboard}
					onDone={handleDone}
					bottomButton
				/>
			</View>
		); 
	}
	else {
		return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size="large" color={colors.orange} />
            </View>
        );
	}
}


const styles = StyleSheet.create({
	container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
    },
    image: {
        flex: 1,
        height: height * 0.5,
        width: width,
    },
    title: {
        fontSize: 34,
        fontWeight: 'bold',
        color: '#575757',
        fontFamily: 'MontserratSemiBold',
    },
    text: {
		fontSize: 18,
		color: '#353535',
		textAlign: 'justify',
		fontFamily: 'MontserratLight',
    },
    buttonTextWrapper: {
        height: 40,
        width: 110,
        borderRadius: 30,
        backgroundColor: '#ff796b',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontFamily: 'MontserratMedium',
        color: '#ffffff',
        fontWeight: 'bold', 
        fontSize: 18,
    },
    dotStyle: {
        backgroundColor: '#575757',
    },
    activeDotStyle: {
        backgroundColor: '#ff796b',
    },
})

export default Onboard;