import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'


const TestMyList = () => {
  return (
    <View style={styles.container}>
    {/* Header */}
    <View style={styles.header}>
      <Text style={styles.backArrow}>←</Text>
      <Text style={styles.title}>My List</Text>
    </View>

    {/* Content */}
    <View style={styles.content}></View>

    {/* Footer */}
    <View style={styles.footer}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Shop More</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.addToCartButton]}>
        <Text style={[styles.buttonText, styles.addToCartText]}>Add to cart</Text>
      </TouchableOpacity>
    </View>
  </View>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#F5FFEB', // Light green background
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#D4FF8F', // Header background
    marginTop: 50, // Adjust this value to move the header further down
  },
  backArrow: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    backgroundColor: '#F5FFEB', // Match background color
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#D4FF8F', // Footer background
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#A3E635', // Green border
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#A3E635', // Green text
    fontWeight: 'bold',
  },
  addToCartButton: {
    backgroundColor: '#A3E635', // Green background
  },
  addToCartText: {
    color: '#FFF', // White text
  },
});



export default TestMyList;