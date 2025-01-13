import { StyleSheet, Text, View ,Image,TouchableOpacity} from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Video, ResizeMode } from "expo-av";


function HomePage(){

  const video = React.useRef(null);

  const navigation = useNavigation();
  
  return (

    <View style={styles.container}>
      {/** Video */}
      <Video
        ref={video}
        style={styles.video}
        source={{
            uri: "https://cdn.pixabay.com/video/2023/10/15/185096-874643413_large.mp4",
        }}
        resizeMode={ResizeMode.COVER}
        shouldPlay
        isLooping
      />
      <View style={styles.content}>
      {/* <Image source={require('../assets/Images/Home.png')} style={styles.image} /> */}
      <Image source={require('../assets/Images/Logo.png')} style={styles.Logo}/>
      <Text style={styles.tagline}>Book Sharing Platform</Text>
      <TouchableOpacity style={styles.circle} onPress={() => { navigation.navigate("Login") }}>
      <Icon name="arrow-right" size={24} color="#fff" />
      </TouchableOpacity>
        
        
        </View>    
    </View>
  );
};



const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  video: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:105,
   },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    },
    Home: {
      width: 205,
      height: 234,
      resizeMode: 'contain',
      },
    Logo: {
        width: 195,
        height: 102.95,
        resizeMode: 'contain', 
       
       },
    tagline: {
       fontSize: 28,
       color: '#fff',
       marginBottom: 75,
      },
      circle:{
        width: 60, 
        height: 60, 
        borderRadius: 45,
        backgroundColor: '#b9fc4b', 
        justifyContent: 'center', 
        alignItems: 'center', 
        
        },  

});
export default HomePage;