import {ActivityIndicator, Text, View, StyleSheet} from 'react-native';
import colors from '../../assets/styles/colors';


const LoadingIndicator = () => {
    return (
        <View style={styles.loading}>
            <ActivityIndicator size="large" color={colors.orange} />
        </View>
    )
}

const styles = StyleSheet.create({
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5FCFF88'
    }
})

export default LoadingIndicator;