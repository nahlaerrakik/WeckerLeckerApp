import Apploading from "expo-app-loading";
import React, {useState, useEffect} from 'react';
import {FlatList, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator} from 'react-native';
import colors from '../../assets/styles/colors';
import style from '../../assets/styles/style';
import {getFonts, width, BASE_URL} from '../../utils';


const Categories = ({navigation}) => {
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [contentLoaded, setContentLoaded] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
		async function fetchFonts() {
		  await getFonts();
		}
		fetchFonts().then(r => setFontsLoaded(true));
  	}, []);

    const fetchCategories = () => (
        useEffect(() => {
        fetch(BASE_URL + "/categories?skip=0&limit=100")
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => console.log(error))
            .finally(() => setContentLoaded(true))
        }, [])
    );

    const renderItem = ({item}) => (
        <TouchableOpacity onPress={() => pressHandler(item)}>
            <View style={styles.item}>
                <Text style={styles.title}>{item.name}</Text>
            </View>
        </TouchableOpacity>
    );

    const pressHandler = (item) => {
        navigation.navigate('Menu', {'category': item});
    }

    fetchCategories();

    if (fontsLoaded && contentLoaded) {
        return (
            <SafeAreaView style={{justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff'}}>
                <View style={{width: width * 0.8, justifyContent: 'center', marginTop: 50, marginBottom: 20}}>
                    <Text style={styles.header}>Categories</Text>
                </View>

                <FlatList data={data} renderItem={renderItem} keyExtractor={item => item.id} />

                <View style={{width: width, justifyContent: 'center', alignItems: 'center', marginTop: 30}}>
                    <TouchableOpacity>
                        <View style={styles.goBtn}>
                            <Text style={styles.goText}>Go</Text>
                        </View>
                    </TouchableOpacity>
                </View>


                <ImageBackground
                    style={style.imageBackground}
                    source={require('../../assets/images/categories.png')}
                    resizeMode="stretch"
                />
            </SafeAreaView>
        );
    } else {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size="large" color={colors.orange} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    headerWrapper: {
        marginHorizontal: 20,
        marginTop: 30,
        width: width * 0.8,
        paddingTop: 50,
    },
    header: {
        fontFamily: 'MontserratSemiBold',
        fontWeight: 'bold',
        fontSize: 34,
        color: colors.black,
    },
    item: {
        backgroundColor: colors.silverFaded,
        borderWidth: 1,
        borderColor: '#f7f7f7',
        marginVertical: 5,
        borderRadius: 20,
        width: width * 0.65,
        height: 50,
        justifyContent: 'center',
    },
    title: {
        fontFamily: 'MontserratMedium',
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.black,
        textAlignVertical: 'center',
        paddingLeft: 15,
    },
    goBtn: {
        backgroundColor: colors.orange,
        borderRadius: 10,
        height: 30,
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    goText: {
        fontFamily: 'MontserratMedium',
        fontWeight: 'bold',
        fontSize: 18,
        color: colors.white,
    },

});

export default Categories;