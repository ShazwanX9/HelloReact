import { useTheme, Text, TextInput } from 'react-native-paper';
import { ScreenTemplate } from '../../utils/screentemplate';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Clipboard from '@react-native-clipboard/clipboard';

const encrypt = (text, key) => {
    const allowedChars = /[a-zA-Z0-9!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/;
    const allowedString = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!"#$%&\'()*+,-./:;<=>?@[\]^_`{|}~';

    let encryptedText = "";
    for (let i = 0; i < text.length; i++) {
        const charCode = text.charCodeAt(i) ^ key.charCodeAt(i % key.length);
        let encryptedChar = String.fromCharCode(charCode);
        if (!allowedChars.test(encryptedChar)) {
            const index = (charCode % allowedString.length + allowedString.length) % allowedString.length;
            encryptedChar = allowedString[index];
        }
        encryptedText += encryptedChar;
    }
    return encryptedText;
};

const RowItem = ({ dataLabel, secretPhrase }) => {
    const paperTheme = useTheme();
    const [password, setPassword] = useState(secretPhrase);
    const [hidePassword, setHidePassword] = useState(true);

    useEffect(() => {
        const newPassword = encrypt(secretPhrase, dataLabel);
        setPassword(newPassword);
    }, [dataLabel, secretPhrase]);

    const togglehidePassword = () => {
        setHidePassword(!hidePassword);
    };

    const copyToClipboard = () => {
        Clipboard.setString(password);
        alert("Password copied to clipboard!");
    };

    return (
        <View style={{ flexDirection: "row", height: 64, justifyContent: "space-between" }}>
            <TextInput
                label={dataLabel}
                value={password}
                mode="outlined"
                editable={false}
                secureTextEntry={hidePassword}
            />
            <View style={{ flex: 1, width: 32, justifyContent: "space-around", alignItems: "center" }}>
                <TouchableOpacity onPress={togglehidePassword}> 
                    <Ionicons name={hidePassword ? 'eye-off' : 'eye'} size={24} color={paperTheme.colors.onSurface} />
                </TouchableOpacity>
                <TouchableOpacity onPress={copyToClipboard}>
                    <Ionicons name={"copy-outline"} size={24} color={paperTheme.colors.onSurface} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const EinVaultScreen = ({ navigation, route }) => {
    const [username, setUsername] = useState("Minions");
    const [password, setPassword] = useState("Banana");
    const [newPassword, setNewPassword] = useState("");

    useEffect(() => {
        if (username.trim() !== "") {
            const newPassword = encrypt(password, username);
            setNewPassword(newPassword);
        } else {
            setNewPassword("");
        }
    }, [username, password]);

    return (
        <ScreenTemplate>
            <View style={[styles.container]}>
                <Text variant="displayMedium" style={[styles.header]}>EinVault</Text>
                <TextInput
                    label="Username"
                    value={username}
                    mode="outlined"
                    onChangeText={text => setUsername(text)}
                />
                <TextInput
                    label="Secret Phrase"
                    value={password}
                    mode="outlined"
                    secureTextEntry={true}
                    onChangeText={text => setPassword(text)}
                />
                <RowItem dataLabel="Gmail" secretPhrase={newPassword}/>
                <RowItem dataLabel="Facebook" secretPhrase={newPassword}/>
                <RowItem dataLabel="Instagram" secretPhrase={newPassword}/>
                <RowItem dataLabel="Youtube" secretPhrase={newPassword}/>
                <RowItem dataLabel="X" secretPhrase={newPassword}/>
            </View>
        </ScreenTemplate>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingVertical: 56,
        paddingHorizontal: 16
    },

    header: {
        textAlign: 'center',
    },

    table: {
        flex: 1,
        justifyContent: "space-around"
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
    segmentedButtonDesign: {
        paddingVertical: "5%",
        paddingHorizontal: "5%",
    },
    text: {
        fontSize: 24,
    },
});

export default EinVaultScreen;