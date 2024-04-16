import "react-native-gesture-handler";
import {
    NavigationContainer,
    DefaultTheme as NavigationDefaultTheme,
    DarkTheme as NavigationDarkTheme,
} from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';

import React, { useState } from 'react';

import { StyleSheet } from 'react-native';

import {
    MD3LightTheme,
    MD3DarkTheme,
    PaperProvider,
} from 'react-native-paper';

import lightThemeData from './utils/theme-light.json';
import darkThemeData from './utils/theme-dark.json';

import { DrawerContent } from "./utils/drawer"
import PortfolioScreen from "./applications/Portfolio/PortfolioScreen";
import TicTacToeScreen from "./applications/TicTacToe/TicTacToeScreen";
import Password1Screen from "./applications/EinVault/EinVaultScreen"

import { MaterialCommunityIcons } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();

const LightTheme = {
    ...NavigationDefaultTheme,
    colors: {
        ...MD3LightTheme.colors,
        ...lightThemeData.colors
    },
};

const DarkTheme = {
    ...NavigationDarkTheme,
    colors: {
        ...MD3DarkTheme.colors,
        ...darkThemeData.colors
    },
};

const App = () => {
    const [isDarktheme, setTheme] = useState(false);
    // const [fontsLoaded] = useFonts({
    //     'PurplePurse-Regular': require('./assets/fonts/PurplePurse-Regular.ttf'),
    // });

    let paperTheme = isDarktheme
        ? { ...DarkTheme }
        : { ...LightTheme };

    const toggleTheme = () => { setTheme(!isDarktheme); }

    return (
        <PaperProvider theme={paperTheme}>
            <NavigationContainer theme={paperTheme}>
                <Drawer.Navigator
                    drawerContent={(props) => <DrawerContent {...props} toggleTheme={toggleTheme} />}
                    screenOptions={({ navigation }) => ({
                        drawerStyle: {
                            backgroundColor: paperTheme.colors.primaryContainer,
                        },
                        headerLeft: props => <MaterialCommunityIcons
                            name="account-outline"
                            color={paperTheme.colors.onBackground}
                            onPress={navigation.toggleDrawer}
                            size={32}
                            style={{ marginLeft: 16 }}
                        />,
                    })}
                >

                    <Drawer.Screen
                        name="Portfolio"
                        options={{
                            headerTitle: 'Portfolio',
                            drawerLabel: 'Portfolio',
                            headerTransparent: true
                        }}
                        component={PortfolioScreen}
                    ></Drawer.Screen>

                    <Drawer.Screen
                        name="TicTacToe"
                        options={{
                            headerTitle: "",
                            drawerLabel: 'Tic Tac Toe',
                            headerTransparent: true
                        }}
                        component={TicTacToeScreen}
                    ></Drawer.Screen>

                    <Drawer.Screen
                        name="EinVault"
                        options={{
                            headerTitle: "",
                            drawerLabel: 'EinVault',
                            headerTransparent: true
                        }}
                        component={Password1Screen}
                    ></Drawer.Screen>

                </Drawer.Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default App;