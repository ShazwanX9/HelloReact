import { StyleSheet, Platform, ScrollView } from 'react-native';
import { useTheme } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

export const ScreenTemplate = ({ children }) => {
    const paperTheme = useTheme();

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <LinearGradient
                colors={[paperTheme.colors.onPrimary, paperTheme.colors.primaryContainer]}
                start={[0, 0]}
                end={[1, 1]}
                style={[styles.container, styles.gradient]}
            >
                {children}
            </LinearGradient>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexGrow: 1,
        minHeight: 650,
        width: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
    },

    gradient: {
        ...StyleSheet.absoluteFillObject,
    },
});
