import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';


function BookDetails () {
  return (
    
    <ScrollView contentContainerStyle={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
    <TouchableOpacity style={styles.backButton}>
      <FontAwesome name="arrow-left" size={24} color="#a3d949" />
    </TouchableOpacity>
    <Text style={styles.bookTitle}>RICH DAD POOR DAD</Text>
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>Title :</Text>
      <Text style={styles.detailValue}>RICH DAD POOR DAD</Text>
    </View>
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>Author :</Text>
      <Text style={styles.detailValue}>ROBERT T.KIYOSAKI</Text>
    </View>
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>Publisher :</Text>
      <Text style={styles.detailValue}>Plata Publishing, LLC.</Text>
    </View>
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>ISBN :</Text>
      <Text style={styles.detailValue}>9781612681122</Text>
    </View>
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>Publication Date:</Text>
      <Text style={styles.detailValue}>1997</Text>
    </View>
    <Image source={{ uri: 'https://m.media-amazon.com/images/I/81bsw6fnUiL.jpg' }} style={styles.bookImage} />
    <View style={styles.ratingRow}>
      <FontAwesome style={styles.star} name="star" size={24} color="orange" />
      <FontAwesome style={styles.star}name="star" size={24} color="orange" />
      <FontAwesome style={styles.star}name="star" size={24} color="orange" />
      <FontAwesome style={styles.star}name="star" size={24} color="orange" />
      <FontAwesome style={styles.star}name="star" size={24} color="orange" />
    </View>
    <Text style={styles.price}>Rs: 1,850.00</Text>
    <View style={styles.buttonRow}>
      <TouchableOpacity style={styles.exchangeButton}>
        <Text style={styles.buttonText}>Exchange</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buyButton}>
        <Text style={styles.buttonText}>Buy</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
    <ScrollView contentContainerStyle={styles.descpt}>
    <Text style={styles.descriptionTitle}>Description</Text>
    <Text style={styles.description}>
      This book teaches financial literacy and independence through investing in assets and business ownership. It contrasts the advice from the author's two "dads" – his biological father and his best friend's father.
    </Text>
  </ScrollView>
  </ScrollView>
  );
};



const styles = StyleSheet.create({

    container: {
        flexGrow: 1,
        
      },
      content: {
        flexGrow: 1,
        backgroundColor: '#cbe0a6',
        padding: 20,
        height:650
      },
      backButton: {
        alignSelf: 'flex-start',
        marginBottom: 10,
      },
      bookTitle: {
        fontSize: 30,
        color: '#5e8c12',
        fontWeight: 'bold',
        marginBottom: 10,
      },
      detailRow: {
        flexDirection: 'row',
        marginBottom: 5,
      },
      detailLabel: {
        fontSize: 16,
        fontWeight: 'bold',
      },
      detailValue: {
        fontSize: 16,
        marginLeft: 5,
      },
      bookImage: {
        width: 150,
        height: 200,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginVertical: 20,
      },
      ratingRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
        paddingRight:5
      },
      price: {
        fontSize: 20,
        color: '#506e1f',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
      },
      buttonRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
      },
      exchangeButton: {
        backgroundColor: '#a3d949',
        padding: 10,
        borderRadius: 5,
        marginRight: 10,
        width: 100,
        alignItems: 'center',
      },
      buyButton: {
        backgroundColor: '#a3d949',
        padding: 10,
        borderRadius: 5,
        width: 100,
        alignItems: 'center',
      },
      buttonText: {
        color: '#fff',
        fontWeight: 'bold',
      },
      descriptionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        padding:10
      },
      description: {
        fontSize: 16,
        textAlign: 'justify',
        padding:20
      },
      star:{
        padding:3
      }
});

export default BookDetails;