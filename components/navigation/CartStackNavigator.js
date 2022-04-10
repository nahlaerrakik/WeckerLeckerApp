import {createStackNavigator} from "@react-navigation/stack";
import colors from "../../assets/styles/colors";
import Cart from "../screens/Cart";
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


const CartStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen
                name="Cart"
                component={Cart}
                options={{header: (props) => <TopTabNavigator {...props} isFirstScreen={true}/>}}
            />
        </Stack.Navigator>
    );
}

export default CartStackNavigator;

