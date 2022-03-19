import { createStackNavigator } from "@react-navigation/stack";
import colors from "../../assets/styles/colors";
import Alarm from "../screens/Alarm";
import Cart from "../screens/Cart";
import Categories from "../screens/Categories";
import Login from "../screens/Login";
import Menu from "../screens/Menu";
import MenuDetails from "../screens/MenuDetails";
import ResetPassword from "../screens/ResetPassword";
import ShippingAddress from "../screens/ShippingAddress";
import SignUp from "../screens/SignUp";
import BottomTabNavigator from "./BottomTabNavigator";
import TopTabNavigator from "./TopTabNavigator";

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


const CategoriesStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen 
                name="Categories" 
                component={Categories}
                options={{headerShown: false}}
            />
            <Stack.Screen 
                name="Menu" 
                component={Menu}
                options={{ header: (props) => <TopTabNavigator {...props} backScreen="Categories" /> }} 
            />
            <Stack.Screen 
                name="MenuDetails" 
                component={MenuDetails}
                options={{ header: (props) => <TopTabNavigator {...props} backScreen="Menu" /> }} 
            />
            <Stack.Screen 
                name="Cart" 
                component={Cart}
                options={{ header: (props) => <TopTabNavigator {...props} backScreen="Menu" backgroundColor="#eeeeee" /> }} 
            />
            <Stack.Screen 
                name="ShippingAddress" 
                component={ShippingAddress}
                options={{ header: (props) => <TopTabNavigator {...props} backScreen="Cart" /> }} 
            />
        </Stack.Navigator>
    );
}

export {
    AuthenticationStackNavigator,
    AlarmStackNavigator,
    CategoriesStackNavigator,
};

