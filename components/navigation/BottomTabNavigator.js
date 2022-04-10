import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect, useRef } from "react";
import { StyleSheet, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import colors from "../../assets/styles/colors";
import { width } from "../../utils";
import Icon, { Icons } from '../common/Icon';
import AlarmStackNavigator from "./AlarmStackNavigator";
import CategoriesStackNavigator from "./CategoriesStackNavigator";
import CartStackNavigator from "./CartStackNavigator";


const TabArr = [
    { route: 'AlarmTab', label: 'AlarmTab', type: Icons.MaterialCommunityIcons, activeIcon: 'clock', inactiveIcon: 'clock-outline', component: AlarmStackNavigator },
    { route: 'CategoriesTab', label: 'CategoriesTab', type: Icons.Ionicons, activeIcon: 'restaurant', inactiveIcon: 'restaurant-outline', component: CategoriesStackNavigator },
    { route: 'CartTab', label: 'CartTab', type: Icons.Ionicons, activeIcon: 'cart', inactiveIcon: 'cart-outline', component: CartStackNavigator},
];

const Tab = createBottomTabNavigator();

const TabButton = (props) => {
    const { item, onPress, accessibilityState } = props;
    const focused = accessibilityState.selected;
    const viewRef = useRef(null);

    useEffect(() => {
        if (focused) {
            viewRef.current.animate({0: {scale: .5, rotate: '0deg'}, 1: {scale: 1.2, rotate: '360deg'}});
        } else {
            viewRef.current.animate({0: {scale: .5, rotate: '360deg'}, 1: {scale: 1.2, rotate: '0deg'}});
        }
    }, [focused])

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={1}
            style={styles.container}

        >
            <Animatable.View
                ref={viewRef}
                duration={1000}
            >
                <Icon
                    type={item.type} 
                    name={focused ? item.activeIcon : item.inactiveIcon}
                    color={colors.orange}
                    route={item.route}
                    props={props}
                />
            </Animatable.View>
        </TouchableOpacity>
    );
};


const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            name="Main"
            screenOptions={{
                headerShown: false,
                tabBarStyle: styles.tabBar,
            }}
        >
            {TabArr.map((item, index) => {
                return (
                    <Tab.Screen
                        key={index}
                        name={item.route}
                        component={item.component}
                        options={{
                            tabBarShowLabel: false,
                            tabBarButton: (props) => <TabButton {...props} item={item} />
                        }}
                    />
                )
            })}
        </Tab.Navigator>
    );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    tabBar: {
        flex: 1,
        height: 60,
        width: width * 0.8,
        position: 'absolute',
        bottom: 30,
        left: '10%',
        right: '10%',
        borderRadius: 15,
        backgroundColor: '#ffffff',
        justifyContent: "center",
        borderWidth: 1,
        borderColor: colors.silverFaded,
        paddingBottom: 0,
    },
})

export default BottomTabNavigator;