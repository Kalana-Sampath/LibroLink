import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, TextInput} from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons';

const SearchBook = ( {navigation} ) => {
    const books = [
        {
          id: 1,
          title: 'RICH DAD POOR DAD',
          author: 'Robert T. Kiyosaki',
          price: 'Rs: 230.00',
          image: 'https://m.media-amazon.com/images/I/81bsw6fnUiL.jpg',
        },
        {
          id: 2,
          title: 'ZERO to ONE',
          author: 'Peter Thiel',
          price: 'Rs: 200.00',
          image: 'https://m.media-amazon.com/images/I/81bsw6fnUiL.jpg',

        },
        {
          id: 3,
          title: 'The Veins of the Ocean',
          author: 'Patricia Engel',
          price: 'Rs: 250.00',
          image: 'https://m.media-amazon.com/images/I/81bsw6fnUiL.jpg',
        },
        {
          id: 4,
          title: "Charlotte's Web",
          author: 'E.B. White',
          price: 'Rs: 180.00',
          image: 'https://m.media-amazon.com/images/I/81bsw6fnUiL.jpg',
        },
      ];
  return (
    <ScrollView contentContainerStyle={styles.container}>
    <View style={styles.header}>
      <FontAwesome name="bars" size={24} color="black" style={styles.menuIcon} />
      <TextInput style={styles.searchInput} placeholder="Search Books" />
      <FontAwesome name="search" size={24} color="black" style={styles.searchIcon} />
    </View>
    <Text style={styles.recommendedText}>Recommended for you</Text>
    {books.map((book) => (
      <View key={book.id} style={styles.bookContainer}>
        <Image source={{ uri: book.image }} style={styles.bookImage} />
        <View style={styles.bookDetails}>
          <Text style={styles.bookTitle}>{book.title}</Text>
          <Text style={styles.bookAuthor}>{book.author}</Text>
          <Text style={styles.bookPrice}>{book.price}</Text>
        </View>
        <TouchableOpacity style={styles.moreButton} onPress={() => navigation.navigate('BookD')}>
          <Text style={styles.moreButtonText}>More</Text>
        </TouchableOpacity>
      </View>
    ))}
    
  </ScrollView>
  );
};



const styles = StyleSheet.create({

        container: {
          flexGrow: 1,
          backgroundColor: '#fff',
          padding: 20,
        },
        header: {
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 20,
        },
        menuIcon: {
          marginRight: 10,
        },
        searchInput: {
          flex: 1,
          height: 40,
          borderColor: '#ddd',
          borderWidth: 1,
          borderRadius: 20,
          paddingHorizontal: 10,
          marginRight: 10,
        },
        searchIcon: {
          marginLeft: 10,
        },
        recommendedText: {
          fontSize: 20,
          fontWeight: 'bold',
          marginBottom: 20,
        },
        bookContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 20,
          padding: 10,
          backgroundColor: '#f9f9f9',
          borderRadius: 10,
        },
        bookImage: {
          width: 60,
          height: 90,
          resizeMode: 'cover',
          marginRight: 10,
        },
        bookDetails: {
          flex: 1,
        },
        bookTitle: {
          fontSize: 16,
          fontWeight: 'bold',
        },
        bookAuthor: {
          fontSize: 14,
          color: '#888',
          marginBottom: 5,
        },
        bookPrice: {
          fontSize: 14,
          color: 'red',
          fontWeight: 'bold',
        },
        moreButton: {
          backgroundColor: '#ddd',
          padding: 5,
          borderRadius: 5,
        },
        moreButtonText: {
          fontSize: 14,
          fontWeight: 'bold',
          color:'#a3d949',
        },
        footer: {
          flexDirection: 'row',
          justifyContent: 'space-around',
          paddingVertical: 10,
          borderTopWidth: 1,
          borderColor: '#ddd',
          marginTop: 20,
        },

});


export default SearchBook