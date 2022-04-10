import {createStackNavigator} from "@react-navigation/stack";
import colors from "../../assets/styles/colors";
import Alarm from "../screens/Alarm";

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


const AlarmStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={() => screenOptionStyle()}>
            <Stack.Screen
                name="Alarm"
                component={Alarm}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    );
}


export default AlarmStackNavigator;

