import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Alert } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { useNavigation } from "@react-navigation/native";

import axios from 'axios';
import { useState } from "react";

function LoginPage({props}) {
  
  const navigation = useNavigation();

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(){
    console.log(userName, password);
    const userData = {
      userName: userName,
      password: password,
    }
    axios
      .post('http://192.168.8.116:5001/login-user', userData)
      .then(res => {console.log(res.data);
        if(res.data.status == "ok") {
          Alert.alert('Logged In Successfull');
          navigation.navigate("Home");
        }  else {
          Alert.alert("Fill mandatory details");
      }  
      })
  }

  return (
    <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false} 
        keyboardShouldPersistTaps="always"
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <Image source={require('../../assets/Images/Logo.png')} style={styles.Logo} />
          <Text style={styles.welcomeText}>Welcome To LibroLink  !</Text>
          {/*UserName field */}
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
          {/* Password field */}
          <View style={styles.action}>
            <FontAwesome name="lock" color="#420475" style={styles.smallIcon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              placeholderTextColor="#888"
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
          <Text style={styles.registerText}>
            Don't have an account?{' '}
            <TouchableOpacity>
            <Text style={styles.registerLink} onPress={() => { navigation.navigate("Register") }}>
              Register
            </Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  welcomeText: {
    fontSize: 20, 
  },
  action: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 35,
    paddingHorizontal: 10,
  },
  smallIcon: {
    marginRight: 10,
    fontSize: 24,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 120,
  },
  Logo: {
    width: 120,
    height: 100,
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 54,
    paddingVertical: 0,
    color: '#333',
  },
  button: {
    width: 276,
    height: 54,
    backgroundColor: '#a3d949',
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  registerText: {
    marginTop: 20,
    fontSize: 16,
  },
  registerLink: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default LoginPage;
