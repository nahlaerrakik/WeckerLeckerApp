import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from "react";
import BottomTabNavigator from './components/navigation/BottomTabNavigator';
import AuthenticationStackNavigator from "./components/navigation/AuthenticationStackNavigator";
import Onboard from "./components/screens/Onboard";
import {OnboardContext, UserContext, CartItemsContext} from "./context";


export default function App() {
	const [showOnboard, setShowOnboard] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [cartItems, setCartItems] = useState({})

	return (
		<>
		    {showOnboard &&
				<OnboardContext.Provider value={[showOnboard, setShowOnboard]}>
					<Onboard />
				</OnboardContext.Provider>
			}

			{!showOnboard && !isLoggedIn &&
				<UserContext.Provider value={[isLoggedIn, setIsLoggedIn]}>
					<NavigationContainer>
						<AuthenticationStackNavigator />
					</NavigationContainer>
				</UserContext.Provider>
			}

            {!showOnboard && isLoggedIn &&
				<CartItemsContext.Provider value={[cartItems, setCartItems]}>
                    <NavigationContainer>
					    <BottomTabNavigator />
				    </NavigationContainer>
                </CartItemsContext.Provider>
			}
		</>
	);
}

