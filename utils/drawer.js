import React, { useEffect, useState } from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import {
    DrawerItem,
    DrawerItemList,
    DrawerContentScrollView,
} from '@react-navigation/drawer';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Drawer,
    Text,
    TouchableRipple,
    Switch,
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';

import { Linking } from 'react-native';
import { Dimensions, PixelRatio } from 'react-native';

export function DrawerContent(props) {
    const { toggleTheme } = props;
    const paperTheme = useTheme();
    const [isHorizontal, setIsHorizontal] = useState(false);
    const { width, height } = useWindowDimensions();

    useEffect(() => {
        const updateOrientation = () => {
            setIsHorizontal(height < 650);
        };

        updateOrientation(); // Initial calculation

        Dimensions.addEventListener('change', updateOrientation); // Listen for dimension changes

        return () => {
            Dimensions.removeEventListener('change', updateOrientation); // Cleanup on unmount
        };
    }, [width, height]);

    return (
        <DrawerContentScrollView {...props} scrollEnabled={isHorizontal} >
            <View style={styles.drawerContent}>
                <Drawer.Section style={{ minHeight: 280 }}>
                    <View style={styles.userInfoSection}>
                        <Avatar.Image
                            source={require("../assets/me.png")}
                            size={50}
                        />
                        <Title style={styles.title}>Shazwan</Title>
                        <Caption style={styles.caption}>@ShazwanX9</Caption>
                    </View>

                    <DrawerItem
                        icon={({ color, size }) => (
                            <MaterialCommunityIcons
                                name="linkedin"
                                color={color}
                                size={size}
                            />
                        )}
                        label="LinkedIn"
                        onPress={() => { Linking.openURL('https://www.linkedin.com/in/ShazwanSharum') }}
                    />

                    <DrawerItem
                        icon={({ color, size }) => (
                            <MaterialCommunityIcons
                                name="github"
                                color={color}
                                size={size}
                            />
                        )}
                        label="Github"
                        onPress={() => { Linking.openURL('https://github.com/Shazwanx9') }}
                    />

                    <DrawerItem
                        icon={({ color, size }) => (
                            <MaterialCommunityIcons
                                name="qrcode"
                                color={color}
                                size={size}
                            />
                        )}
                        label="Portfolio"
                        onPress={() => { Linking.openURL('https://shazwanx9.github.io/Portfolio2024/') }}
                    />
                </Drawer.Section>

                <Drawer.Section title="Project" style={{ flexGrow: 1, height: isHorizontal ? 'auto' : '40dvh' }}>
                    <ScrollView style={{ flex: 1 }}>
                        <DrawerItemList {...props} />
                    </ScrollView>
                </Drawer.Section>

                <Drawer.Section title="Preferences" style={{ height: isHorizontal ? 'auto' : "15dvh" }}>
                    <TouchableRipple onPress={() => { toggleTheme() }} style={{ paddingHorizontal: 64 }}>
                        <View style={styles.preference}>
                            <Text>Dark Theme</Text>
                            <View pointerEvents="none">
                                <Switch value={paperTheme.dark} />
                            </View>
                        </View>
                    </TouchableRipple>
                </Drawer.Section>
            </View>
        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
        justifyContent: "space-between",
        // height: Dimensions.get('window').height,
    },

    userInfoSection: {
        paddingLeft: 20,
        paddingVertical: 16,
        height: 125
    },

    title: {
        fontWeight: 'bold',
    },

    caption: {
        fontSize: 14,
        lineHeight: 14,
    },

    section: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        paddingHorizontal: 8,
    },
});