import { createStackNavigator } from "@react-navigation/stack";
import colors from "../../assets/styles/colors";
import Alarm from "../screens/Alarm";
import Login from "../screens/Login";
import ResetPassword from "../screens/ResetPassword";
import SignUp from "../screens/SignUp";
import BottomTabNavigator from "./BottomTabNavigator";


const Stack = createStackNavigator();

const screenOptionStyle= (backgroundColor="transparent") => {
    return(
        {
            headerStyle: {
                backgroundColor: backgroundColor,
                shadowColor: 'transparent',
              },
            headerTintColor: colors.black,
            headerBackTitle: "",
            headerTransparent: true,
        }
    ); 
};


const AuthenticationStackNavigator = (props) => {
    return (
        <Stack.Navigator screenOptions={() => screenOptionStyle()}>
            <Stack.Screen 
                name="SignUp" 
                component={SignUp} 
                options={{ headerShown: false}} 
                initialParams={props}
            />
            <Stack.Screen 
                name="Login" 
                component={Login} 
                options={{ headerShown: false}}  
                initialParams={props}
            />
            <Stack.Screen 
                name="ResetPassword" 
                component={ResetPassword} 
                options={{ headerShown: false}} 
            />
            <Stack.Screen 
                name="Main" 
                component={BottomTabNavigator} 
                options={{ gestureEnabled: false, headerShown: false }}   
            />
        </Stack.Navigator>
    );
}

const AlarmStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={() => screenOptionStyle()}>
            <Stack.Screen 
                name="Alarm"
                component={Alarm} 
                options={{ headerShown: false}} 
            />
        </Stack.Navigator>
    );
}

export {
    AuthenticationStackNavigator,
    AlarmStackNavigator,
};

