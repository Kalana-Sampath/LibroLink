import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, TextInput } from "react-native";
import React, { useState } from "react";
import { FontAwesome } from '@expo/vector-icons';


const Exchange = () => {

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <FontAwesome name="bars" size={24} color="black" style={styles.menuIcon} />
        <TextInput style={styles.searchInput} placeholder="Search Books" />
        <FontAwesome name="search" size={24} color="black" style={styles.searchIcon} />
      </View>

      {/* Add Button */}
      <TouchableOpacity style={styles.addButton} >
        <View style={styles.addButtonIcon}>
          <FontAwesome name="plus" size={24} color="white" />
        </View>
      </TouchableOpacity>

     
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
    padding: 15,
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
  bookExchange: {
    fontSize: 14,
    color: 'green',
    fontWeight: 'bold',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#a3d949',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
  },
  addButtonIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Exchange;
