import { ScreenTemplate } from '../../utils/screentemplate';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

const PortfolioScreen = ({ navigation, route }) => {
    return (
        <ScreenTemplate>
            <View style={[styles.container]}>
                <Text variant="displayMedium" style={[styles.header]}>Coming Soon!</Text>
            </View>
        </ScreenTemplate>
)}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingVertical: 56,
        paddingHorizontal: 16
    },

    header: {
        // fontFamily: 'PurplePurse-Regular',
        textAlign: 'center',
    },
});

export default PortfolioScreen;