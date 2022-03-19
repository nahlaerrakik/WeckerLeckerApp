import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from "react";
import BottomTabNavigator from './components/navigation/BottomTabNavigator';
import { AuthenticationStackNavigator } from './components/navigation/StackNavigator';
import Onboard from "./components/screens/Onboard";

export default function App() {
	const [showOnboard, setShowOnboard] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

	const handleOboardFinish = () => {
        setShowOnboard(false);
    };

    const handleLogInFinish = () => {
        setIsLoggedIn(true);
    };

	return (
		<>
		{showOnboard && <Onboard handleOboardFinish={handleOboardFinish} />}
		{!showOnboard && !isLoggedIn && <NavigationContainer><AuthenticationStackNavigator handleLogInFinish={handleLogInFinish} /></NavigationContainer>}
		{!showOnboard && isLoggedIn && <NavigationContainer><BottomTabNavigator /></NavigationContainer>}
		</>
	);
}

