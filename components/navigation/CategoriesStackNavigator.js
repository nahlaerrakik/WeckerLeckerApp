import {createStackNavigator} from "@react-navigation/stack";
import colors from "../../assets/styles/colors";
import Cart from "../screens/Cart";
import Categories from "../screens/Categories";
import Menu from "../screens/Menu";
import MenuDetails from "../screens/MenuDetails";
import ShippingAddress from "../screens/ShippingAddress";
import TopTabNavigator from "./TopTabNavigator";

const Stack = createStackNavigator();

const screenOptionStyle = (backgroundColor = "transparent") => {
    return (
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
                options={{header: (props) => <TopTabNavigator {...props} backScreen="Categories"/>}}
            />
            <Stack.Screen
                name="MenuDetails"
                component={MenuDetails}
                options={{header: (props) => <TopTabNavigator {...props} backScreen="Menu"/>}}
            />
            <Stack.Screen
                name="CartFromMenuDetails"
                component={Cart}
                options={{header: (props) => <TopTabNavigator {...props} backScreen="Menu" backgroundColor="#eeeeee"/>}}
            />
            <Stack.Screen
                name="ShippingAddress"
                component={ShippingAddress}
                options={{header: (props) => <TopTabNavigator {...props} backScreen="Cart"/>}}
            />
        </Stack.Navigator>
    );
}


export default CategoriesStackNavigator;

