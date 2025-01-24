import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Alert } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';

function RegisterPage() {
    const [userName, setUserName] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMismatch, setPasswordMismatch] = useState(''); // State for error message

    const navigation = useNavigation();

    function handleSubmit() {
        // Reset password mismatch message
        setPasswordMismatch('');

        // Check if password and confirm password match
        if (password !== confirmPassword) {
            setPasswordMismatch("Passwords do not match!"); // Set error message
            return; // Stop further execution
        }

        const userData = {
            userName: userName,
            contactNo: contactNo,
            password: password,
            confirmPassword: confirmPassword,
        };

        if (userName && contactNo && password && confirmPassword) {
            axios
                .post('http://192.168.8.116:5001/register', userData)
                .then(res => {
                    console.log(res.data);
                    if (res.data.status === "ok") {
                        Alert.alert("Registered Successfully!!");
                        navigation.navigate("Login");
                    } else {
                        Alert.alert(JSON.stringify(res.data));
                    }
                })
                .catch(e => console.log(e));
        } else {
            Alert.alert("Fill mandatory details");
        }
    }

    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false} 
            keyboardShouldPersistTaps="always"
        >
            <View style={styles.container}>
                <View style={styles.content}>
                    <Image source={require('../../assets/Images/Logo.png')} style={styles.logo} />
                    <Text style={styles.welcomeText}>Welcome To LibroLink!</Text>
                    
                    {/* UserName field */}
                    <View style={styles.action}>
                        <FontAwesome name="user-o" color="#420475" style={styles.smallIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="UserName"
                            placeholderTextColor="#888"
                            value={userName}
                            onChangeText={(text) => setUserName(text)}
                        />
                    </View>

                    {/* ContactNo field */}
                    <View style={styles.action}>
                        <FontAwesome name="phone" color="#420475" style={styles.smallIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="ContactNo"
                            placeholderTextColor="#888"
                            keyboardType="phone-pad"
                            value={contactNo}
                            onChangeText={(text) => setContactNo(text)}
                        />
                    </View>

                    {/* Password field */}
                    <View style={styles.action}>
                        <FontAwesome name="lock" color="#420475" style={styles.smallIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            placeholderTextColor="#888"
                            secureTextEntry
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                        />
                    </View>

                    {/* Confirm Password field */}
                    <View style={styles.action}>
                        <FontAwesome name="lock" color="#420475" style={styles.smallIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Confirm Password"
                            secureTextEntry
                            placeholderTextColor="#888"
                            value={confirmPassword}
                            onChangeText={(text) => setConfirmPassword(text)}
                        />
                    </View>
                    
                    {/* Display error message if passwords don't match */}
                    {passwordMismatch ? <Text style={styles.errorText}>{passwordMismatch}</Text> : null}

                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>
                    <Text style={styles.loginText}>
                        Do you have an account?{' '}
                        <TouchableOpacity>
                            <Text style={styles.loginLink} onPress={() => { navigation.navigate("Login") }}>
                                Log In
                            </Text>
                        </TouchableOpacity>
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    errorText: {
        color: 'red',
        marginTop: 5,
        marginBottom: 20,
        fontSize: 14,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        padding: 100,
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        height: 100,
        width: 120,
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: 40,
    },
    welcomeText: {
        fontSize: 20,
        marginBottom: 30,
    },
    action: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#91908c',
        borderRadius: 28,
        paddingHorizontal: 10,
        width: 276,
        height: 54,
        marginBottom: 20,
    },
    smallIcon: {
        marginRight: 10,
        fontSize: 20,
    },
    input: {
        flex: 1,
        height: 54,
        paddingVertical: 0,
        color: '#333',
    },
    button: {
        height: 54,
        width: 276,
        backgroundColor: '#a3d949',
        paddingVertical: 15,
        paddingHorizontal: 80,
        borderRadius: 35,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    loginText: {
        marginTop: 20,
        fontSize: 16,
        fontWeight: 'bold'
    },
    loginLink: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
});

export default RegisterPage;
